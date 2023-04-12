use anyhow::bail;
use chrono::{DateTime, Utc};
use sqlx::SqlitePool;
use uuid::Uuid;

use crate::{
    language::Language,
    model::{
        editor_data::EditorData,
        file::{File, FileId, FileJob},
        job::{Job, JobId, JobStatus},
        segment::Segment,
        speaker::{Speaker, SpeakerSpan, DEFAULT_SPEAKER_ID},
        translation_quality::TranslationQuality,
    },
};

#[derive(Clone)]
pub struct Database {
    pool: SqlitePool,
}

impl Database {
    pub async fn new(db_path: &str) -> anyhow::Result<Database> {
        let pool = SqlitePool::connect(db_path).await?;

        Ok(Database { pool })
    }

    pub async fn select_next_job(&self) -> anyhow::Result<Option<Job>> {
        let mut conn = self.pool.acquire().await?;

        let maybe_job = sqlx::query_as!(
            Job,
            r#"
            SELECT 
                file_jobs.id AS "job_id: JobId",
                name         AS "name: String",
                file_id      AS "file_id: FileId",
                language     AS "language: Language",
                quality      AS "quality: TranslationQuality",
                status       AS "status: JobStatus",
                data
            FROM file_jobs
            INNER JOIN files ON (file_id = files.id)
            WHERE status = 'waiting'
            ORDER BY file_jobs.id DESC
            LIMIT 1
            "#,
        )
        .fetch_optional(&mut conn)
        .await?;

        Ok(maybe_job)
    }

    pub async fn begin_job(&self, job_id: &JobId) -> anyhow::Result<()> {
        let mut conn = self.pool.acquire().await?;

        sqlx::query!(
            r#"
            UPDATE file_jobs SET status = ? WHERE id = ?
            "#,
            JobStatus::InProgress,
            job_id
        )
        .execute(&mut conn)
        .await?;

        Ok(())
    }

    pub async fn fail_job(&self, job_id: &JobId) -> anyhow::Result<()> {
        let mut conn = self.pool.acquire().await?;

        sqlx::query!(
            r#"
            UPDATE file_jobs SET status = ? WHERE id = ?
            "#,
            JobStatus::Error,
            job_id
        )
        .execute(&mut conn)
        .await?;

        Ok(())
    }

    pub async fn select_files(&self) -> anyhow::Result<Vec<File>> {
        let mut conn = self.pool.acquire().await?;

        let file_rows = sqlx::query!(
            r#"
            SELECT
                id AS "id: FileId",
                name AS "name: String"
            FROM files
            "#
        )
        .fetch_all(&mut conn)
        .await?;

        let job_rows = sqlx::query!(
            r#"
            SELECT 
                id AS "id: JobId",
                file_id AS "file_id: FileId",
                language AS "language: Language",
                quality AS "quality: TranslationQuality",
                status AS "status: JobStatus",
                created_at AS "created_at: DateTime<Utc>"
            FROM file_jobs
            "#
        )
        .fetch_all(&mut conn)
        .await?;

        let files = file_rows
            .into_iter()
            .map(|file_row| {
                let jobs = job_rows
                    .iter()
                    .flat_map(|job_row| {
                        if job_row.file_id != file_row.id {
                            return None;
                        }

                        Some(FileJob::new(
                            job_row.id.clone(),
                            job_row.language.clone(),
                            job_row.quality.clone(),
                            job_row.status.clone(),
                            job_row.created_at,
                        ))
                    })
                    .collect();

                File::new(file_row.id, file_row.name, jobs)
            })
            .collect();

        Ok(files)
    }

    pub async fn insert_file(
        &self,
        name: &str,
        data: Vec<u8>,
        language: Language,
        quality: TranslationQuality,
    ) -> anyhow::Result<()> {
        let mut tx = self.pool.begin().await?;

        let id = Uuid::new_v4().to_string();

        sqlx::query!(
            r#"
            INSERT INTO files (id, name, data)
                VALUES (?, ?, ?)
            "#,
            id,
            name,
            data
        )
        .execute(&mut tx)
        .await?;

        let now = Utc::now();

        sqlx::query!(
            r#"
            INSERT INTO file_jobs (file_id, language, quality, status, created_at)
                VALUES (?, ?, ?, ?, ?)
            "#,
            id,
            language,
            quality,
            JobStatus::Waiting,
            now,
        )
        .execute(&mut tx)
        .await?;

        tx.commit().await?;

        Ok(())
    }

    pub async fn finish_job_with_segments(
        &self,
        file_id: &FileId,
        job_id: &JobId,
        segments: Vec<Segment>,
    ) -> anyhow::Result<()> {
        let mut tx = self.pool.begin().await?;

        let Some(min_number) = segments.iter().min_by(|a, b| a.number.cmp(&b.number)).map(|s| s.number) else { bail!("Unable to find min number")};

        sqlx::query!(
            r#"
            INSERT INTO speaker_spans (speaker_id, file_id, job_id, start_segment_number)
            VALUES (?, ?, ?, ?)
            "#,
            DEFAULT_SPEAKER_ID,
            file_id,
            job_id,
            min_number,
        )
        .execute(&mut tx)
        .await?;

        for segment in segments {
            sqlx::query!(
                r#"
                INSERT INTO segments (file_id, job_id, number, start, end, text)
                VALUES (?, ?, ?, ?, ?, ?)
                "#,
                file_id,
                job_id,
                segment.number,
                segment.start,
                segment.end,
                segment.text,
            )
            .execute(&mut tx)
            .await?;
        }

        sqlx::query!(
            r#"
            UPDATE file_jobs SET status = ? WHERE id = ?
            "#,
            JobStatus::Done,
            job_id
        )
        .execute(&mut tx)
        .await?;

        tx.commit().await?;

        Ok(())
    }

    pub async fn select_editor_data(&self, file_id: &FileId) -> anyhow::Result<EditorData> {
        let mut tx = self.pool.begin().await?;

        let job_ids = sqlx::query!(
            r#"
            SELECT id FROM file_jobs WHERE file_id = ?
            "#,
            file_id,
        )
        .fetch_all(&mut tx)
        .await?
        .into_iter()
        .map(|row| JobId(row.id))
        .collect::<Vec<JobId>>();

        let default_job_id = *job_ids.iter().max_by(|a, b| a.0.cmp(&b.0)).unwrap();

        let segments = sqlx::query_as!(
            Segment,
            r#"
            SELECT 
                number AS "number: i32",
                start  AS "start: i64",
                end    AS "end: i64",
                text   AS "text: String"
            FROM segments
            WHERE 
                file_id = ?
                AND job_id = ?"#,
            file_id,
            default_job_id
        )
        .fetch_all(&mut tx)
        .await?;

        let speaker_spans = sqlx::query_as!(
            SpeakerSpan,
            r#"
            SELECT
                speaker_id           AS "speaker_id: String",
                start_segment_number AS "start_segment_number: i32"
            FROM speaker_spans
            WHERE 
                file_id = ?
                AND job_id = ?"#,
            file_id,
            default_job_id
        )
        .fetch_all(&mut tx)
        .await?;

        let speakers = sqlx::query_as!(
            Speaker,
            r#"
            SELECT
                id   AS "id: String",
                name AS "name: String"
            FROM speakers
            WHERE id IN (
                SELECT
                    DISTINCT speaker_id 
                FROM speaker_spans
                WHERE file_id = ? AND job_id = ?
            )"#,
            file_id,
            default_job_id
        )
        .fetch_all(&mut tx)
        .await?;

        Ok(EditorData::new(
            file_id.clone(),
            default_job_id,
            job_ids,
            segments,
            speakers,
            speaker_spans,
        ))
    }

    pub async fn select_file_data(&self, file_id: &FileId) -> anyhow::Result<Vec<u8>> {
        let mut conn = self.pool.acquire().await?;

        let row = sqlx::query!(
            r#"
            SELECT 
                data AS "data: Vec<u8>"
            FROM files 
            WHERE id = ?"#,
            file_id,
        )
        .fetch_one(&mut conn)
        .await?;

        Ok(row.data)
    }

    pub async fn delete_file(&self, file_id: &FileId) -> anyhow::Result<()> {
        let mut conn = self.pool.acquire().await?;

        sqlx::query!(
            r#"
            DELETE FROM files WHERE id = ? 
            "#,
            file_id
        )
        .execute(&mut conn)
        .await?;

        Ok(())
    }
    pub async fn update_segment(
        &self,
        file_id: &FileId,
        job_id: &JobId,
        number: i32,
        text: &str,
    ) -> anyhow::Result<()> {
        let mut conn = self.pool.acquire().await?;

        sqlx::query!(
            r#"
            UPDATE segments SET text = ? WHERE file_id = ? AND job_id = ? AND number = ?
            "#,
            text,
            file_id,
            job_id,
            number
        )
        .execute(&mut conn)
        .await?;

        Ok(())
    }
}
