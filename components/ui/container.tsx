import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export const Container = ({ children, className = "" }: Props) => (
  <div className={cn("mx-auto w-dvw max-w-7xl px-5", className)}>
    {children}
  </div>
);
