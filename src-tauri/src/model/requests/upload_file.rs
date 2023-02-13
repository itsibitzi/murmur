use std::path::PathBuf;

use serde::Deserialize;

use crate::{language::Language, model::translation_quality::TranslationQuality};

#[derive(Deserialize)]
pub struct UploadFileRequest {
    pub path: PathBuf,
    pub language: Language,
    pub quality: TranslationQuality,
}
