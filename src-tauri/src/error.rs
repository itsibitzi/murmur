use thiserror::Error;

#[derive(Debug, Error)]
pub enum Error {
    #[error("Parser error")]
    Parse,
}
