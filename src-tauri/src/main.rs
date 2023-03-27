mod cli_args;
mod commands;
mod error;
mod language;
mod model;
mod services;
mod whisper;

use commands::{constants, translate};
use services::{database::Database, worker::Worker};

// #![cfg_attr(
//     all(not(debug_assertions), target_os = "windows"),
//     windows_subsystem = "windows"
// )]

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    let db = Database::new("murmur.db").await?;
    let worker = Worker::new(&db);

    tauri::Builder::default()
        .setup(|_| {
            tauri::async_runtime::spawn(async move {
                worker.begin().await;
            });

            Ok(())
        })
        .manage(db)
        .invoke_handler(tauri::generate_handler![
            constants::get_languages,
            constants::get_translation_quality_levels,
            translate::upload_file,
            translate::get_files,
            translate::get_segments,
            translate::get_file_data,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");

    Ok(())
}
