use base64::{engine::general_purpose, Engine};

use crate::{
    error::Error,
    model::{
        editor_data::EditorData,
        file::{File, FileId},
        requests::UploadFileRequest,
    },
    services::database::Database,
};

#[tauri::command]
pub async fn upload_file(
    req: UploadFileRequest,
    db: tauri::State<'_, Database>,
) -> Result<(), Error> {
    let name = req
        .path
        .file_name()
        .and_then(|file_name| file_name.to_str())
        .unwrap_or("<INVALID FILENAME>");

    let data = std::fs::read(&req.path).map_err(|e| {
        eprintln!("I/O error reading file: {e}");
        Error::Io
    })?;

    db.insert_file(name, data, req.language, req.quality)
        .await
        .map_err(|e| Error::DatabaseError(e.to_string()))
}

#[tauri::command]
pub async fn get_files(db: tauri::State<'_, Database>) -> Result<Vec<File>, Error> {
    db.select_files()
        .await
        .map_err(|e| Error::DatabaseError(e.to_string()))
}

#[tauri::command]
pub async fn get_editor_data(
    file_id: FileId,
    db: tauri::State<'_, Database>,
) -> Result<EditorData, Error> {
    db.select_editor_data(&file_id)
        .await
        .map_err(|e| Error::DatabaseError(e.to_string()))
}

#[tauri::command]
pub async fn get_file_data(
    file_id: FileId,
    db: tauri::State<'_, Database>,
) -> Result<String, Error> {
    let data = db
        .select_file_data(&file_id)
        .await
        .map_err(|e| Error::DatabaseError(e.to_string()))?;

    let data_base64 = general_purpose::STANDARD.encode(data);

    Ok(data_base64)
}

#[tauri::command]
pub async fn delete_file(file_id: FileId, db: tauri::State<'_, Database>) -> Result<(), Error> {
    db.delete_file(&file_id)
        .await
        .map_err(|e| Error::DatabaseError(e.to_string()))
}
