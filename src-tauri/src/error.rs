use serde::{Deserialize, Serialize};
use thiserror::Error;

#[derive(Debug, Error, Serialize, Deserialize)]
pub enum Error {
    #[error("I/O error")]
    Io,
    #[error("Database error {0}")]
    DatabaseError(String),
}
