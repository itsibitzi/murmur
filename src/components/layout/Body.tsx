import { FC, ReactNode } from "react";

type BodyProps = {
  children: ReactNode;
};

export const Body: FC<BodyProps> = ({ children }) => {
  return <main className="p-6">{children}</main>;
};
