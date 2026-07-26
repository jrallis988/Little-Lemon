import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "border-[#FF7A18] bg-[#FF7A18] text-white hover:bg-[#E5670A] active:bg-[#CC5A09]",
  secondary:
    "border-[#7B61FF] bg-white text-[#222222] hover:bg-[#EEE9FF] active:bg-[#E0D8FF]",
  ghost:
    "border-transparent bg-transparent text-[#222222] hover:bg-[#FFF1E6] active:bg-[#FFE4CC]",
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
        "inline-flex items-center justify-center gap-2 rounded-[4px] border font-semibold leading-none shadow-[0_1px_2px_rgba(34,34,34,0.08)] transition-colors",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF7A18]",
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
