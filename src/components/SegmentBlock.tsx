import styled from "@emotion/styled";
import { FC } from "react";
import { Segment } from "../model/bindings/Segment";

type SegmentBlockProps = {
  segment: Segment;
  currentTime: number | null;
};

const Outer = styled.span`
  display: inline-flex;
  flex-direction: column;
  margin: 5px;
  margin-bottom: 15px;
  width: fit-content;
`;

const Times = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Text = styled.div`
  whitespace: no-wrap;
`;

const tsToTime = (t: number): string => {
  let sec = Math.floor(t / 100);
  const msec = Math.floor(t - sec * 100);
  const min = Math.floor(sec / 60);
  sec = sec - min * 60;

  return `${min}:${sec}.${msec}`;
};

export const SegmentBlock: FC<SegmentBlockProps> = ({
  segment,
  currentTime,
}) => {
  let color = "black";

  if (currentTime !== null) {
    // Seems to use centiseconds???
    const currentTimeCS = currentTime * 100;
    if (currentTimeCS >= segment.start && currentTimeCS < segment.end) {
      color = "red";
    }
  }

  return (
    <Outer>
      <Times>
        <div>{tsToTime(Number(segment.start))}</div>
        <div>{tsToTime(Number(segment.end))}</div>
      </Times>
      <Text style={{ color }}>{segment.text}</Text>
    </Outer>
  );
};
