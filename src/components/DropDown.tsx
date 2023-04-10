import { FC, ReactNode, useState } from "react";

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

export const DropDownSeparator: FC = () => {
  return <div className="my-1 border-t border-slate-400"></div>;
};

type DropDownProps = {
  proxy: ReactNode;
  children: ReactNode;
};

export const DropDown: FC<DropDownProps> = ({ proxy, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <div onClick={() => setOpen(true)}>{proxy}</div>
      {open && (
        <div className="top-100% z-100 absolute right-0 w-40 rounded bg-slate-300 shadow-lg">
          <div className="flex flex-col ">{children}</div>
        </div>
      )}
    </div>
  );
};
