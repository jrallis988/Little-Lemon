import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "border-[#0f2744] bg-[#0f2744] text-white hover:bg-[#0a1b30] active:bg-[#071424]",
  secondary:
    "border-[#3b6ea5] bg-white text-[#0f2744] hover:bg-[#d7e4f3] active:bg-[#c7d9ee]",
  ghost:
    "border-transparent bg-transparent text-[#0f2744] hover:bg-[#d7e4f3] active:bg-[#c7d9ee]",
  danger:
    "border-[#b42318] bg-[#b42318] text-white hover:bg-[#941b13] active:bg-[#7a160f]",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "min-h-8 px-3 py-1.5 text-xs",
  md: "min-h-9 px-4 py-2 text-sm",
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  type = "button",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-[4px] border font-semibold leading-none shadow-[0_1px_2px_rgba(15,39,68,0.08)] transition-colors",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3b6ea5]",
        "disabled:cursor-not-allowed disabled:opacity-55",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
