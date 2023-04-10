import { FC, ReactNode } from "react";

type ButtonProps = {
  onClick?: () => void;
  disabled?: boolean;
  children: ReactNode;
  color?: "danger";
  counter?: number;
};
export const Button: FC<ButtonProps> = ({
  onClick,
  children,
  color,
  disabled,
  counter,
}) => {
  let colorClass = disabled
    ? "bg-slate-300"
    : color === "danger"
    ? "bg-red-300 hover:bg-red-400"
    : "bg-blue-300 hover:bg-blue-400";

  const showCounter = counter && counter !== 0;

  return (
    <button
      className={`relative m-2 h-10 rounded p-2 pl-6 pr-6 shadow ${colorClass}`}
      onClick={onClick}
      disabled={disabled}
    >
      {!!showCounter && (
        <span className="bg-red text-align-center absolute right-[-5px] top-[-5px] h-6 w-6 rounded-full bg-red-400 font-bold text-white">
          {counter}
        </span>
      )}
      {children}
    </button>
  );
};
