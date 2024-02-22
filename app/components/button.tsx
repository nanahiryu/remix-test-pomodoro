import { MouseEventHandler } from "react";
import { tv } from "tailwind-variants";

interface ButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
  bg?: "default" | "active";
  w?: "fit" | "full";
}

const buttonStyle = tv({
  base: "px-4 py-1 rounded text-lg",
  variants: {
    bg: {
      default: "bg-gray-200",
      active: "bg-gray-400",
    },
    w: {
      fit: "w-fit",
      full: "w-full",
    },
  },
});

export const BaseButton = (props: ButtonProps) => {
  const { onClick, children, bg = "default", w = "fit" } = props;
  return (
    <button className={buttonStyle({ bg: bg, w: w })} onClick={onClick}>
      {children}
    </button>
  );
};
