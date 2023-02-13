use sqlx::SqlitePool;
use uuid::Uuid;

use crate::{
    language::Language,
    model::{
        file::{File, FileId, FileJob},
        job::{Job, JobId, JobStatus},
        segment::Segment,
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
                file_id AS "file_id: FileId",
                language AS "language: Language",
                quality AS "quality: TranslationQuality",
                status AS "status: JobStatus",
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
                name AS "name: String",
                data AS "data: Vec<u8>"
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
                status AS "status: JobStatus"
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
                        ))
                    })
                    .collect();

                File::new(file_row.id, file_row.name, file_row.data, jobs)
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

        sqlx::query!(
            r#"
            INSERT INTO file_jobs (file_id, language, quality, status)
                VALUES (?, ?, ?, ?)
            "#,
            id,
            language,
            quality,
            JobStatus::Waiting,
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
}
