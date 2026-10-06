import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-md border border-pf-line bg-white px-4 py-2 text-base text-pf-ink shadow-sm transition-colors placeholder:text-pf-ink/45 focus-visible:border-pf-purple focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pf-yellow/70 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
