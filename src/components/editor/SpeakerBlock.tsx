import { FC } from "react";
import { Segment } from "../../model/bindings/Segment";
import { Speaker } from "../../model/bindings/Speaker";
import { SegmentBlock } from "./SegmentBlock";

type SpeakerBlockProps = {
  speaker: Speaker;
  segments: Segment[];
  currentTime: number | null;
};

export const SpeakerBlock: FC<SpeakerBlockProps> = ({
  speaker,
  segments,
  currentTime,
}) => {
  return (
    <div className="mb-2 rounded border-slate-900 bg-white p-3 shadow-md even:bg-slate-200">
      <h2 className="mb-2 text-lg font-bold">{speaker.name}</h2>
      <div className="flex flex-col pl-4">
        {segments.map((segment: Segment) => {
          return (
            <SegmentBlock
              key={segment.number}
              segment={segment}
              currentTime={currentTime}
            />
          );
        })}
      </div>
    </div>
  );
};
