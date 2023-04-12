use serde::Deserialize;

use crate::model::{file::FileId, job::JobId};

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct EditSegmentRequest {
    pub file_id: FileId,
    pub job_id: JobId,
    pub number: i32,
    pub text: String,
}
