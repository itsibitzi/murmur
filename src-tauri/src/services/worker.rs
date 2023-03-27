use std::{path::PathBuf, time::Duration};

use tokio::time::sleep;

use crate::{model::translation_quality::TranslationQuality, whisper};

use super::database::Database;

pub struct Worker {
    db: Database,
    high_quality_path: PathBuf,
    medium_quality_path: PathBuf,
    low_quality_path: PathBuf,
}

impl Worker {
    pub fn new(db: &Database) -> Self {
        Worker {
            db: db.clone(),
            high_quality_path: "whisper/ggml-large.bin".into(),
            medium_quality_path: "whisper/ggml-medium.bin".into(),
            low_quality_path: "whisper/ggml-base.bin".into(),
        }
    }

    pub async fn begin(&self) {
        loop {
            println!("Polling for job");
            if let Ok(Some(task)) = self.db.select_next_job().await {
                println!("Found job {}!", task.job_id.0);
                if let Err(e) = self.db.begin_job(&task.job_id).await {
                    eprintln!("Failed to mark job {} as in progress: {}", task.job_id.0, e);
                }

                let model_path = match task.quality {
                    TranslationQuality::High => &self.high_quality_path,
                    TranslationQuality::Medium => &self.medium_quality_path,
                    TranslationQuality::Low => &self.low_quality_path,
                };

                match whisper::process_file(model_path, &task.data, task.language) {
                    Ok(segments) => {
                        println!("Finished job!");
                        self.db
                            .finish_job_with_segments(&task.file_id, &task.job_id, segments)
                            .await
                            .unwrap();
                    }
                    Err(e) => {
                        eprintln!("Failed job: {e}");
                        let _ = self.db.fail_job(&task.job_id).await;
                    }
                }
            } else {
                // TODO make this a thread park and give a waker to Tauri commands
                // so that we can wake up a worker as soon as a user adds a new task
                sleep(Duration::from_secs(10)).await;
            }
        }
    }
}
