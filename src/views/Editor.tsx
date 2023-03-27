import {
  EuiButton,
  EuiFlexGroup,
  EuiPageTemplate,
  EuiSpacer,
} from "@elastic/eui";
import { invoke } from "@tauri-apps/api";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { SegmentBlock } from "../components/SegmentBlock";
import { Segment } from "../model/bindings/Segment";

export const Editor = () => {
  const { fileId } = useParams();
  const navigate = useNavigate();

  const [audio, setAudio] = useState<HTMLAudioElement | undefined>();
  const [segments, setSegments] = useState<Segment[]>([]);
  const [currentTime, setCurrentTime] = useState<number | null>(null);

  useEffect(() => {
    invoke<Segment[]>("get_segments", { fileId }).then((s) => setSegments(s));
    invoke<string>("get_file_data", { fileId }).then((d) => {
      var audio = new Audio("data:audio/wav;base64," + d);
      setAudio(audio);
    });
  }, []);

  return (
    <EuiPageTemplate grow={true}>
      <EuiPageTemplate.Header
        pageTitle={
          <span
            style={{ cursor: "pointer", color: "darkblue" }}
            onClick={() => {
              navigate("/");
            }}
          >
            Murmur
          </span>
        }
        rightSideItems={[<EuiButton>Export</EuiButton>]}
      ></EuiPageTemplate.Header>
      <EuiPageTemplate.Section>
        <EuiButton
          onClick={() => {
            if (audio) {
              audio.play();
              audio.ontimeupdate = (t: any) => {
                setCurrentTime(t.target.currentTime);
              };
            }
          }}
        >
          Play
        </EuiButton>
        <EuiSpacer />
        <EuiFlexGroup wrap={true}>
          {segments.map((segment: Segment) => (
            <SegmentBlock
              key={segment.number}
              segment={segment}
              currentTime={currentTime}
            />
          ))}
        </EuiFlexGroup>
      </EuiPageTemplate.Section>
    </EuiPageTemplate>
  );
};
