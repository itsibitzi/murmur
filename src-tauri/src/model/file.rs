use serde::{Deserialize, Serialize};

use crate::language::Language;

use super::{
    job::{JobId, JobStatus},
    translation_quality::TranslationQuality,
};

#[derive(Clone, Debug, sqlx::Type, Serialize, Deserialize, PartialEq, Eq)]
#[sqlx(transparent)]
pub struct FileId(pub String);

#[derive(Serialize)]
pub struct File {
    pub id: FileId,
    pub name: String,
    pub data: Vec<u8>,
    pub jobs: Vec<FileJob>,
}

impl File {
    pub fn new(id: FileId, name: String, data: Vec<u8>, jobs: Vec<FileJob>) -> Self {
        Self {
            id,
            name,
            data,
            jobs,
        }
    }
}

#[derive(Serialize)]
pub struct FileJob {
    pub id: JobId,
    pub language: Language,
    pub quality: TranslationQuality,
    pub status: JobStatus,
}

impl FileJob {
    pub fn new(
        id: JobId,
        language: Language,
        quality: TranslationQuality,
        status: JobStatus,
    ) -> Self {
        Self {
            id,
            language,
            quality,
            status,
        }
    }
}
