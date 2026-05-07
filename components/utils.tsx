import { cn } from "@/utils";
import { Loader2 } from "lucide-react";
import { HTMLAttributes } from "react";

export const Loader = ({
  children,
  className,
}: HTMLAttributes<HTMLElement>) => {
  return (
    <main
      className={cn(
        "bg-background flex justify-center items-center flex-col space-y-3",
        className,
      )}
    >
      <Loader2 size={30} className="text-primary animate-spin" />
      {children}
    </main>
  );
};
