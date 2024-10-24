import { ReactNode } from "react";

interface ButtonProps {
  handleClick: () => void;
  children: ReactNode;
  size: number;
}

const Button = ({ handleClick, children, size }: ButtonProps) => {
  return (
    <button
      style={{ height: size, width: size }}
      onClick={handleClick}
      className="flex items-center justify-center rounded-full hover:bg-purple-500 hover:text-white transition-all"
    >
      {children}
    </button>
  );
};

export default Button;
