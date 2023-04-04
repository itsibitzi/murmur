use std::{io, path::Path};

use anyhow::bail;
use whisper_rs::{FullParams, SamplingStrategy, WhisperContext};

use crate::{
    audio_format::{wav::WavFormat, AudioFormat},
    language::Language,
    model::segment::Segment,
};

pub fn process_file(
    model_path: impl AsRef<Path>,
    audio_reader: impl io::Read,
    language: Language,
) -> anyhow::Result<Vec<Segment>> {
    let model_path = format!("{}", model_path.as_ref().display());
    let mut ctx = WhisperContext::new(&model_path).unwrap();

    let mut params = FullParams::new(SamplingStrategy::default());

    // Turn off printing to stdout
    params.set_print_special(false);
    params.set_print_progress(false);
    params.set_print_realtime(false);
    params.set_print_timestamps(false);

    // Emit a word at a time
    params.set_max_len(1);

    // Threads
    let cpu_count = num_cpus::get() as i32;
    let thread_count = if cpu_count > 1 { cpu_count - 1 } else { 1 };
    params.set_n_threads(thread_count);

    params.set_translate(true);
    params.set_language(Some(language.whisper_str()));

    let audio = WavFormat::to_raw_samples(audio_reader)?;

    // Run the model.
    if let Err(e) = ctx.full(params, &audio[..]) {
        bail!("Failed to run model: {:?}", e);
    }

    let mut segments = vec![];

    let num_segments = ctx.full_n_segments();
    for i in 0..num_segments {
        let Ok(text) = ctx.full_get_segment_text(i) else { bail!("failed to get segment") };
        let start = ctx.full_get_segment_t0(i);
        let end = ctx.full_get_segment_t1(i);

        segments.push(Segment {
            number: i,
            start,
            end,
            text,
        })
    }

    Ok(segments)
}
