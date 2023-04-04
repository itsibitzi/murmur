pub mod wav;

use std::io;

pub trait AudioFormat {
    fn to_raw_samples(read: impl io::Read) -> anyhow::Result<Vec<f32>>;
}

// pub fn decode_audio_file(audio_bytes: &[u8], extension: &str) -> anyhow::Result<Vec<f32>> {
//     // let source = Cursor::new(audio_bytes);
//     // let mss = MediaSourceStream::new(Box::new(source), Default::default());

//     // let mut hint = Hint::new();
//     // hint.with_extension(extension);

//     todo!()
// }
