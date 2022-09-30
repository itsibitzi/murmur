use std::process::Command;

use subparse::SubtitleFileInterface;
use tempdir::TempDir;

#[tauri::command]
pub fn process_file(path: String) -> Result<(), String> {
    let tmp_dir = TempDir::new("murmur").map_err(|_| "Failed to create directory".to_owned())?;

    let dir_path = tmp_dir.path().to_string_lossy();

    let mut hack = "/Users/sam_cutler/Downloads/".to_owned();
    hack.push_str(&path);

    println!("Running whisper {} !", &hack);

    if let Ok(output) = Command::new("whisper")
        .args([&hack, "--language", "English", "--output_dir", &dir_path])
        .output()
    {
        println!("{:?}", output);
        let glob_str = format!("{}/*.srt", dir_path);
        println!("{}", glob_str);
        let mut paths = glob::glob(&glob_str).unwrap();

        if let Some(Ok(path)) = paths.next() {
            let s = std::fs::read_to_string(path).unwrap();
            let subtitles = subparse::SrtFile::parse(&s)
                .unwrap()
                .get_subtitle_entries()
                .unwrap();
            println!("{:?}", subtitles);

            Ok(())
        } else {
            // bad
            Err("Could not find SRT file".to_owned())
        }
    } else {
        Err("FUCK!".to_owned())
    }
}
