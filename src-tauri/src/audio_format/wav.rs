use std::io;

use anyhow::bail;
use rubato::{InterpolationParameters, InterpolationType, Resampler, SincFixedIn, WindowFunction};

use super::AudioFormat;

pub struct WavFormat;

impl AudioFormat for WavFormat {
    fn to_raw_samples(read: impl io::Read) -> anyhow::Result<Vec<f32>> {
        let mut reader = hound::WavReader::new(read)?;
        let hound::WavSpec {
            channels,
            sample_rate,
            bits_per_sample,
            ..
        } = reader.spec();

        if bits_per_sample != 16 {
            bail!("Cannot handle bits per sample != 16")
        }

        let mut audio = reader
            .samples::<i16>()
            .flat_map(|s| s.map(|s| s as f32 / 32768.0))
            .collect::<Vec<_>>();

        if channels == 2 {
            if let Ok(mono_audio) = whisper_rs::convert_stereo_to_mono_audio(&audio) {
                audio = mono_audio;
            } else {
                bail!("Failed to convert stereo to mono");
            }
        } else if channels != 1 {
            bail!(">2 channels unsupported");
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

        Ok(audio)
    }
}
