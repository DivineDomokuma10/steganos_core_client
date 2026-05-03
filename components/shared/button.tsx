import { cn } from "@/utils";
import { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ children, className, ...props }: Props) => {
  return (
    <button
      {...props}
      className={cn(
        "bg-primary btn-glow transition duration-200 cursor-pointer hover:scale-102",
        className,
      )}
    >
      {children}
    </button>
  );
};

export default Button;
