import { MouseEventHandler } from "react";

interface ButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
}

export const BaseButton = (props: ButtonProps) => {
  const { onClick, children } = props;
  return (
    <button
      className="bg-gray-200 w-fit px-4 py-1 rounded text-lg"
      onClick={onClick}
    >
      {children}
    </button>
  );
};
