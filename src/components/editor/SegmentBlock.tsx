import { FC, useState } from "react";
import { Segment } from "../../model/bindings/Segment";
import { Button } from "../Button";

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
  const [editing, setEditing] = useState(false);

  const [value, setValue] = useState(segment.text);

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
      className={`group relative flex flex-col rounded-lg p-4 hover:bg-slate-200 ${
        focused ? "outline outline-2 outline-cyan-200" : ""
      }`}
    >
      <div className="invisible absolute right-0 top-0 group-hover:visible">
        <Button onClick={() => setEditing(true)}>edit</Button>
      </div>
      <div className="mb-1 flex  flex-row items-center ">
        {tsToTime(Number(segment.start))} – {tsToTime(Number(segment.end))}
      </div>

      {editing ? (
        <input
          className="text-lg"
          autoFocus
          value={value}
          onBlur={() => {
            setEditing(false);
          }}
          onChange={(e) => setValue(e.target.value)}
        />
      ) : (
        <div className="whitespace-nowrap text-lg ">{value}</div>
      )}
    </div>
  );
};
