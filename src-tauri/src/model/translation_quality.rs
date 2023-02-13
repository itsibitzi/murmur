use serde::{Deserialize, Serialize};

#[derive(Clone, Deserialize, Serialize, sqlx::Type, Debug)]
#[sqlx(rename_all = "lowercase")]
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
