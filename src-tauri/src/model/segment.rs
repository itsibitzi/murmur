use serde::Serialize;
use ts_rs::TS;

/// An audio segment produced by Whisper
#[derive(TS, Debug, Serialize)]
#[ts(export)]
pub struct Segment {
    pub number: i32,
    pub start: i64,
    pub end: i64,
    pub text: String,
}
