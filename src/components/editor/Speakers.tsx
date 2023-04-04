import { FC } from "react";
import { Speaker } from "../../model/bindings/Speaker";

type SpeakersProps = {
  speakers: Speaker[];
};

export const Speakers: FC<SpeakersProps> = ({ speakers }) => {
  return (
    <div>
      <h1 className="text-lg">Speakers</h1>
      {speakers.map((speaker) => {
        return <div>{speaker.name}</div>;
      })}
    </div>
  );
};
