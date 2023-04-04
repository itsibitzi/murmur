import { EuiSpacer } from "@elastic/eui";
import { invoke } from "@tauri-apps/api";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Button } from "../components/Button";
import { Controls } from "../components/editor/Controls";
import { SpeakerBlock } from "../components/editor/SpeakerBlock";
import { Speakers } from "../components/editor/Speakers";
import { Body } from "../components/layout/Body";
import { Header } from "../components/layout/Header";
import { EditorData } from "../model/bindings/EditorData";
import { Segment } from "../model/bindings/Segment";
import { Speaker } from "../model/bindings/Speaker";
import { SpeakerSpan } from "../model/bindings/SpeakerSpan";
import { SpeakerWithSegments } from "../model/SpeakersWithSegments";
import { saveTranscript } from "../utils/saveTranscript";

export const Editor = () => {
  const { fileId } = useParams();
  const navigate = useNavigate();

  const [audio, setAudio] = useState<HTMLAudioElement | undefined>();

  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [speakerSpans, setSpeakerSpans] = useState<SpeakerSpan[]>([]);
  const [segments, setSegments] = useState<Segment[]>([]);

  const [currentTime, setCurrentTime] = useState<number | null>(null);

  useEffect(() => {
    invoke<EditorData>("get_editor_data", { fileId }).then((ed) => {
      console.log(ed);
      setSpeakers(ed.speakers);
      setSegments(ed.segments);
      setSpeakerSpans(ed.speakerSpans);
    });

    invoke<string>("get_file_data", { fileId }).then((d) => {
      var audio = new Audio("data:audio/wav;base64," + d);
      setAudio(audio);
    });
  }, []);

  console.log({ speakers, segments, speakerSpans });

  const speakersWithSegments: SpeakerWithSegments[] = speakerSpans.map(
    (speakerSpan, index, speakerSpanArray) => {
      const nextSpan = speakerSpanArray[index + 1];

      // EXCLUSIVE RANGE
      const lastSegmentNumber = nextSpan
        ? nextSpan.startSegmentNumber
        : Number.POSITIVE_INFINITY;

      const speaker =
        speakers.find((s) => s.id === speakerSpan.speakerId) ||
        ({ name: "ERROR SPEAKER NOT FOUND", id: "ERROR" } as Speaker);

      const speakerSegments = segments.filter(
        (s) =>
          s.number >= speakerSpan.startSegmentNumber &&
          s.number < lastSegmentNumber
      );

      return { speaker, segments: speakerSegments };
    }
  );

  const onPlay = () => {
    if (audio) {
      audio.play();
      audio.ontimeupdate = (t: any) => {
        setCurrentTime(t.target.currentTime);
      };
      audio.onended = () => {
        // pause
      };
    }
  };

  const onPause = () => {
    if (audio) {
      audio.pause();
    }
  };

  return (
    <>
      <Header
        title={"Murmur"}
        left={<Button onClick={() => navigate("/")}>Back</Button>}
        right={
          <>
            <Button onClick={() => saveTranscript(speakersWithSegments)}>
              Export
            </Button>
            <Button
              color="danger"
              onClick={() => {
                invoke<void>("delete_file", { fileId }).then(() => {
                  navigate("/");
                });
              }}
            >
              Delete
            </Button>
          </>
        }
      />
      <Body>
        <Speakers speakers={speakers} />
        <EuiSpacer />
        {speakersWithSegments.map((speakerWithSegments, i) => {
          return (
            <SpeakerBlock
              key={i}
              speaker={speakerWithSegments.speaker}
              segments={speakerWithSegments.segments}
              currentTime={currentTime}
            />
          );
        })}
        <Controls
          onPause={onPause}
          onPlay={onPlay}
          onEdit={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      </Body>
    </>
  );
};
