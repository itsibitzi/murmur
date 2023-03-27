use std::path::Path;

use rubato::{InterpolationParameters, InterpolationType, Resampler, SincFixedIn, WindowFunction};
use uuid::Uuid;
use whisper_rs::{FullParams, SamplingStrategy, WhisperContext};

use crate::{language::Language, model::segment::Segment};

pub fn process_file(
    model_path: impl AsRef<Path>,
    audio_bytes: &[u8],
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
    params.set_max_len(1);

    // Threads
    let cpu_count = num_cpus::get() as i32;
    let thread_count = if cpu_count > 1 { cpu_count - 1 } else { 1 };
    params.set_n_threads(thread_count);

    params.set_translate(true);
    params.set_language(Some(language.whisper_str()));

    let mut reader = hound::WavReader::new(audio_bytes)?;
    let hound::WavSpec {
        channels,
        sample_rate,
        bits_per_sample,
        ..
    } = reader.spec();

    if bits_per_sample != 16 {
        panic!("Cannot handle bits per sample != 16")
    }

    let mut audio = reader
        .samples::<i16>()
        .map(|s| {
            let s = s.expect("invalid sample");

            s as f32 / 32768.0
        })
        .collect::<Vec<_>>();

    if channels == 2 {
        audio = whisper_rs::convert_stereo_to_mono_audio(&audio);
    } else if channels != 1 {
        panic!(">2 channels unsupported");
    }

    // Resample if we need to
    if sample_rate != 16000 {
        let params = InterpolationParameters {
            sinc_len: 256,
            f_cutoff: 0.95,
            interpolation: InterpolationType::Linear,
            oversampling_factor: 256,
            window: WindowFunction::BlackmanHarris2,
        };
        let mut resampler = SincFixedIn::<f32>::new(
            16000 as f64 / sample_rate as f64,
            2.0,
            params,
            audio.len(),
            1,
        )
        .unwrap();

        let waves_in = vec![audio];
        let mut waves_out = resampler.process(&waves_in, None).unwrap();
        audio = waves_out.pop().unwrap();
    };

    // Run the model.
    ctx.full(params, &audio[..]).expect("failed to run model");

    let mut segments = vec![];

    let num_segments = ctx.full_n_segments();
    for i in 0..num_segments {
        let text = ctx.full_get_segment_text(i).expect("failed to get segment");
        let start = ctx.full_get_segment_t0(i);
        let end = ctx.full_get_segment_t1(i);
        let speaker_id = Uuid::new_v4().to_string();

        segments.push(Segment {
            number: i,
            start,
            end,
            text,
            speaker_id,
        })
    }

    Ok(segments)
}
