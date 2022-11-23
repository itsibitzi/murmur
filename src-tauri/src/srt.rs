use std::ops::Sub;

use chrono::{NaiveTime, ParseError};
use nom::{
    branch::alt,
    bytes::complete::{tag, take_till, take_until},
    character::complete::{digit1, newline},
    combinator::map_res,
    multi::many0,
    sequence::{separated_pair, tuple},
    IResult,
};

use crate::error::Error;

#[derive(Debug)]
pub struct Subtitle {
    pub number: u32,
    pub start: NaiveTime,
    pub end: NaiveTime,
    pub text: String,
}

impl Subtitle {
    pub fn new(number: u32, start: NaiveTime, end: NaiveTime, text: String) -> Subtitle {
        Subtitle {
            number,
            start,
            end,
            text,
        }
    }
}

#[derive(Debug)]
pub struct SrtFile {
    pub subtitles: Vec<Subtitle>,
}

impl SrtFile {
    pub fn new(subtitles: Vec<Subtitle>) -> SrtFile {
        SrtFile { subtitles }
    }

    pub fn parse(input: &str) -> anyhow::Result<SrtFile> {
        if let Ok((_, file)) = parse_srt_file(input) {
            Ok(file)
        } else {
            Err(Error::Parse)?
        }
    }
}

// Parser combinators!
fn parse_u32(input: &str) -> IResult<&str, u32> {
    map_res(digit1, str::parse::<u32>)(input)
}

fn parse_time(input: &str) -> IResult<&str, NaiveTime> {
    let (input, (hour, _, min, _, sec, _, milli)) = tuple((
        parse_u32,
        tag(":"),
        parse_u32,
        tag(":"),
        parse_u32,
        tag("."),
        parse_u32,
    ))(input)?;

    let time = NaiveTime::from_hms_milli(hour, min, sec, milli);
    Ok((input, time))
}

fn parse_timespan(input: &str) -> IResult<&str, (NaiveTime, NaiveTime)> {
    separated_pair(parse_time, tag(" --> "), parse_time)(input)
}

fn parse_subtitle(input: &str) -> IResult<&str, Subtitle> {
    let text = take_until("\n\n");

    let (input, (number, _, (start, end), _, text, _)) = tuple((
        parse_u32,
        newline,
        parse_timespan,
        newline,
        text,
        tag("\n\n"),
    ))(input)?;

    Ok((input, Subtitle::new(number, start, end, text.to_owned())))
}

fn parse_srt_file(input: &str) -> IResult<&str, SrtFile> {
    let (input, (_, subtitles)) = tuple((many0(newline), many0(parse_subtitle)))(input)?;

    Ok((input, SrtFile::new(subtitles)))
}

#[cfg(test)]
mod tests {
    use crate::srt::parse_srt_file;

    use super::{parse_subtitle, parse_time, parse_timespan};
    use chrono::NaiveTime;

    #[test]
    fn parse_time_works() {
        assert_eq!(
            parse_time("1:23:45.678"),
            Ok(("", NaiveTime::from_hms_milli(1, 23, 45, 678)))
        );
    }

    #[test]
    fn parse_timespan_works() {
        assert_eq!(
            parse_timespan("1:23:45.678 --> 2:34:56.789"),
            Ok((
                "",
                (
                    NaiveTime::from_hms_milli(1, 23, 45, 678),
                    NaiveTime::from_hms_milli(2, 34, 56, 789)
                )
            ))
        );
    }

    #[test]
    fn parse_subtitle_works() {
        let text = r#"1
0:00:01.440 --> 0:00:07.760
This is a voice memo to test the processing speed of different models in the

"#;
        assert!(matches!(parse_subtitle(text), Ok(_)));
    }

    #[test]
    fn parse_srt_file_works() {
        let text = r#"
1
0:00:01.440 --> 0:00:07.760
This is a voice memo to test the processing speed of different models in the

2
0:00:07.760 --> 0:00:14.640
Whisper Open Source library. My name is Sam, I'm here to speak random words at this

3
0:00:14.640 --> 0:00:34.000
voice memo recorder until I've got a reasonable sample size of audio. Let's call it a day at that.

        "#;

        assert!(matches!(parse_srt_file(text), Ok(_)));
    }
}
