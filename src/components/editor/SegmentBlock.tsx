import { FC } from "react";
import { Segment } from "../../model/bindings/Segment";

type SegmentBlockProps = {
  segment: Segment;
  currentTime: number | null;
};

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
  let focused = false;

  if (currentTime !== null) {
    // Seems to use centiseconds???
    const currentTimeCS = currentTime * 100;
    if (currentTimeCS >= segment.start && currentTimeCS < segment.end) {
      focused = true;
    }
  }

  return (
    <div
      className={`flex flex-col rounded-lg p-4 hover:bg-slate-200 ${
        focused ? "outline outline-2 outline-cyan-200" : ""
      }`}
    >
      <div className="mb-1 flex  flex-row items-center ">
        {tsToTime(Number(segment.start))} – {tsToTime(Number(segment.end))}
      </div>

      <div className="whitespace-nowrap text-lg ">{segment.text}</div>
    </div>
  );
};
