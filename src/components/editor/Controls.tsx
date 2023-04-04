import { FC, useState } from "react";
import { Button } from "../Button";

type ControlsProps = {
  onPlay: () => void;
  onPause: () => void;
  onEdit: () => void;
};

export const Controls: FC<ControlsProps> = ({ onPlay, onPause, onEdit }) => {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="fixed bottom-0 left-0 right-0 flex flex-row items-center bg-fuchsia-200 p-4 pt-2">
      <Button onClick={() => onEdit()}>Edit</Button>
      <Button
        onClick={() => {
          setPlaying(!playing);
          if (playing) {
            onPause();
          } else {
            onPlay();
          }
          setPlaying(!playing);
        }}
      >
        {!playing ? "Play" : "Pause"}
      </Button>
    </div>
  );
};
