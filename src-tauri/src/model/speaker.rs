use serde::Serialize;
use ts_rs::TS;

pub const DEFAULT_SPEAKER_ID: &str = "default_speaker";

#[derive(TS, Debug, Serialize)]
#[ts(export)]
pub struct Speaker {
    pub id: String,
    pub name: String,
}

#[derive(TS, Debug, Serialize)]
#[serde(rename_all = "camelCase")]
#[ts(export, rename_all = "camelCase")]
pub struct SpeakerSpan {
    pub speaker_id: String,
    pub start_segment_number: i32,
}
