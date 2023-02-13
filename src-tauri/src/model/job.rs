use serde::{Deserialize, Serialize};

use crate::language::Language;

use super::{file::FileId, translation_quality::TranslationQuality};

#[derive(sqlx::Type, Debug, Clone, Serialize)]
#[sqlx(transparent)]
pub struct JobId(pub i64);

pub struct Job {
    pub job_id: JobId,
    pub file_id: FileId,
    pub language: Language,
    pub quality: TranslationQuality,
    pub status: JobStatus,
    pub data: Vec<u8>,
}

#[derive(sqlx::Type, Serialize, Deserialize, Debug, Clone)]
#[sqlx(rename_all = "kebab-case")]
pub enum JobStatus {
    Waiting,
    InProgress,
    Done,
    Error,
}
