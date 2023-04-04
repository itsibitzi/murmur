import { FC, ReactElement, ReactNode, useState } from "react";

type DropDownItemProps = {
  text: string;
  onClick?: () => void;
};

export const DropDownItem: FC<DropDownItemProps> = ({ text, onClick }) => {
  return (
    <button className="p-1 hover:bg-slate-400" onClick={onClick}>
      {text}
    </button>
  );
};

type DropDownProps = {
  proxy: ReactNode;
  items: ReactElement<DropDownItemProps>[];
};

export const DropDown: FC<DropDownProps> = ({ proxy, items }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <div onClick={() => setOpen(true)}>{proxy}</div>
      {open && (
        <div className="top-100% absolute right-0 z-10 w-40 rounded bg-slate-300 shadow-lg">
          <div className="flex flex-col ">{items}</div>
        </div>
      )}
    </div>
  );
};
