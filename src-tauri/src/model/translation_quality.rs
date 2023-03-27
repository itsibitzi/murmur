use serde::{Deserialize, Serialize};
use ts_rs::TS;

#[derive(TS, Clone, Deserialize, Serialize, sqlx::Type, Debug)]
#[sqlx(rename_all = "lowercase")]
#[ts(export)]
pub enum TranslationQuality {
    High,
    Medium,
    Low,
}

impl TranslationQuality {
    pub fn all() -> Vec<Self> {
        vec![
            TranslationQuality::Low,
            TranslationQuality::Medium,
            TranslationQuality::High,
        ]
    }
}
