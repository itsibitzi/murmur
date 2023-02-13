use serde::Serialize;

/// An audio segment produced by Whisper
#[derive(Debug, Serialize)]
pub struct Segment {
    pub number: i32,
    pub start: i64,
    pub end: i64,
    pub text: String,
}
