use serde::{Deserialize, Serialize};
use ts_rs::TS;

use crate::language::Language;

use super::{file::FileId, translation_quality::TranslationQuality};

#[derive(TS, sqlx::Type, Debug, Clone, Serialize)]
#[sqlx(transparent)]
#[ts(export)]
pub struct JobId(pub i64);

pub struct Job {
    pub job_id: JobId,
    pub file_id: FileId,
    pub name: String,
    pub language: Language,
    pub quality: TranslationQuality,
    pub status: JobStatus,
    pub data: Vec<u8>,
}

#[derive(TS, sqlx::Type, Serialize, Deserialize, Debug, Clone)]
#[sqlx(rename_all = "kebab-case")]
#[ts(export)]
pub enum JobStatus {
    Waiting,
    InProgress,
    Done,
    Error,
}
