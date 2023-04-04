use serde::Serialize;
use ts_rs::TS;

use super::{
    file::FileId,
    segment::Segment,
    speaker::{Speaker, SpeakerSpan},
};

/// Data required to run the editor
#[derive(TS, Debug, Serialize)]
#[serde(rename_all = "camelCase")]
#[ts(export, rename_all = "camelCase")]
pub struct EditorData {
    pub file_id: FileId,
    pub segments: Vec<Segment>,
    pub speakers: Vec<Speaker>,
    pub speaker_spans: Vec<SpeakerSpan>,
}

impl EditorData {
    pub fn new(
        file_id: FileId,
        segments: Vec<Segment>,
        speakers: Vec<Speaker>,
        speaker_spans: Vec<SpeakerSpan>,
    ) -> Self {
        Self {
            file_id,
            segments,
            speakers,
            speaker_spans,
        }
    }
}
