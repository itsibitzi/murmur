use crate::{language::Language, model::translation_quality::TranslationQuality};

#[tauri::command]
pub fn get_languages() -> Vec<Language> {
    Language::all()
}
#[tauri::command]
pub fn get_translation_quality_levels() -> Vec<TranslationQuality> {
    TranslationQuality::all()
}
