import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

const variants = {
  ocean: "bg-ocean/10 text-blue",
  blue: "bg-blue/10 text-blue",
  pink: "bg-pink/10 text-pink-text",
  green: "bg-green/12 text-success-text",
  gray: "bg-surface-2 text-text",
} as const;

export function Badge({
  children,
  variant = "ocean",
  className,
}: {
  children: ReactNode;
  variant?: keyof typeof variants;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center whitespace-nowrap rounded-full px-[9px] py-[3px] text-xs font-bold",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
