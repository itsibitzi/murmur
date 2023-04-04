import { FC, ReactNode } from "react";

type HeaderProps = {
  title: string;
  left?: ReactNode;
  right?: ReactNode;
};

export const Header: FC<HeaderProps> = ({ left, title, right }) => {
  return (
    <header className="sticky left-0 right-0 top-0 flex flex-row content-baseline justify-between space-x-4 bg-slate-200 p-2 pl-4 shadow-lg">
      {left && <div>{left}</div>}
      <div className=" text-center text-3xl font-bold">{title}</div>{" "}
      <div>{right && right}</div>
    </header>
  );
};
