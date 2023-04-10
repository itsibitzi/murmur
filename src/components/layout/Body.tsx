import { FC, ReactNode } from "react";

type BodyProps = {
  className?: string;
  children: ReactNode;
};

export const Body: FC<BodyProps> = ({ children, className }) => {
  return (
    <main className={`bg-slate-50 p-6 ${className} h-full`}>{children}</main>
  );
};
