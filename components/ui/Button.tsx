import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  ...props
}: Props) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md font-semibold tracking-wide transition active:scale-[0.98] disabled:opacity-50",
        size === "sm" && "h-9 px-3 text-sm",
        size === "md" && "h-11 px-4 text-sm",
        size === "lg" && "h-12 px-5 text-base",
        variant === "primary" &&
          "bg-spotlight text-stage hover:brightness-110 shadow-spot",
        variant === "secondary" &&
          "bg-foam/10 text-foam hairline hover:bg-foam/15",
        variant === "ghost" && "bg-transparent text-foam hover:bg-foam/5",
        variant === "danger" && "bg-marquee text-foam hover:brightness-110",
        className,
      )}
      {...props}
    />
  );
}
