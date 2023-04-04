import { FC, ReactNode } from "react";

type ButtonProps = {
  onClick: () => void;
  disabled?: boolean;
  children: ReactNode;
  color?: "danger";
};
export const Button: FC<ButtonProps> = ({
  onClick,
  children,
  color,
  disabled,
}) => {
  let colorClass = color === "danger" ? "bg-red-300" : "bg-blue-300";

  return (
    <button
      className={`m-2 h-10 rounded p-2 pl-6 pr-6 shadow ${colorClass}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
