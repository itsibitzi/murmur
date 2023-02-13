use clap::{Parser, Subcommand};
use std::path::PathBuf;

use crate::language::Language;

#[derive(Parser)]
#[clap(author, version, about, long_about = None)]
#[clap(propagate_version = true)]
pub struct CliArgs {
    pub model_path: PathBuf,
    #[clap(subcommand)]
    pub command: Command,
}

#[derive(Subcommand)]
pub enum Command {
    Gui,
    Translate {
        audio_path: PathBuf,
        #[clap(long, value_enum, default_value_t = Language::English)]
        language: Language,
    },
}
