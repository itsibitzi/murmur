use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use ts_rs::TS;

use crate::language::Language;

use super::{
    job::{JobId, JobStatus},
    translation_quality::TranslationQuality,
};

#[derive(TS, Clone, Debug, sqlx::Type, Serialize, Deserialize, PartialEq, Eq)]
#[sqlx(transparent)]
#[ts(export)]
pub struct FileId(pub String);

#[derive(TS, Serialize)]
#[ts(export)]
pub struct File {
    pub id: FileId,
    pub name: String,
    pub jobs: Vec<FileJob>,
}

impl File {
    pub fn new(id: FileId, name: String, jobs: Vec<FileJob>) -> Self {
        Self { id, name, jobs }
    }
}

#[derive(TS, Serialize)]
#[serde(rename_all = "camelCase")]
#[ts(export, rename_all = "camelCase")]
pub struct FileJob {
    pub id: JobId,
    pub language: Language,
    pub quality: TranslationQuality,
    pub status: JobStatus,
    #[ts(type = "string")]
    pub created_at: DateTime<Utc>,
}

impl FileJob {
    pub fn new(
        id: JobId,
        language: Language,
        quality: TranslationQuality,
        status: JobStatus,
        created_at: DateTime<Utc>,
    ) -> Self {
        Self {
            id,
            language,
            quality,
            status,
            created_at,
        }
    }
}
