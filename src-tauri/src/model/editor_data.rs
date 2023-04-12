use serde::Serialize;
use ts_rs::TS;

use super::{
    file::FileId,
    job::JobId,
    segment::Segment,
    speaker::{Speaker, SpeakerSpan},
};

/// Data required to run the editor
#[derive(TS, Debug, Serialize)]
#[serde(rename_all = "camelCase")]
#[ts(export, rename_all = "camelCase")]
pub struct EditorData {
    pub file_id: FileId,
    pub default_job_id: JobId,
    pub job_ids: Vec<JobId>,
    pub segments: Vec<Segment>,
    pub speakers: Vec<Speaker>,
    pub speaker_spans: Vec<SpeakerSpan>,
}

impl EditorData {
    pub fn new(
        file_id: FileId,
        default_job_id: JobId,
        job_ids: Vec<JobId>,
        segments: Vec<Segment>,
        speakers: Vec<Speaker>,
        speaker_spans: Vec<SpeakerSpan>,
    ) -> Self {
        Self {
            file_id,
            default_job_id,
            job_ids,
            segments,
            speakers,
            speaker_spans,
        }
    }
}
