import { FC } from "react";
import { File } from "../model/bindings/File";

type AudioFileProps = {
  file: File;
  onClick?: () => void;
};

export const AudioFile: FC<AudioFileProps> = ({ file, onClick }) => {
  const mostRecentJob = file.jobs.reduce((recent, curr) => {
    return curr.createdAt > recent.createdAt ? curr : recent;
  });

  const createdAt = new Date(mostRecentJob.createdAt).toLocaleDateString();

  return (
    <div
      className="cursor-pointer rounded bg-white p-4 shadow hover:bg-slate-200"
      onClick={onClick}
    >
      <div className="flex flex-row items-baseline">
        <div className="mr-2 inline-block text-lg font-bold">{file.name}</div>
        <div className="inline-block text-sm text-gray-700">{createdAt}</div>
      </div>
    </div>
  );
};
