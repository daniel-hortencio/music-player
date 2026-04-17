import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

export const Button = ({
  children,
  className = "",
  variant = "",
  ...rest
}: DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & { variant?: "outline" | "contained" | "" }) => {
  const getClassName = () => {
    if (variant === "contained")
      return `h-8 border border-red-500 bg-red-500 hover:bg-red-600 hover:border-red-600 px-2 flex items-center rounded-lg text-white cursor-pointer transition-all ${className}`;

    if (variant === "outline")
      return `h-8 border border-white/20 px-2 flex items-center rounded-lg text-white hover:bg-white/10 cursor-pointer transition-all ${className}`;

    return `h-8 px-2 flex items-center rounded-lg text-white hover:bg-white/10 cursor-pointer transition-all ${className}`;
  };

  return (
    <button className={getClassName()} {...rest}>
      {children}
    </button>
  );
};
