"use client";

import * as React from "react";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "border-brand bg-brand text-white shadow-soft hover:bg-brand-dark focus-visible:ring-brand/30",
  secondary:
    "border-surface-border bg-white text-navy-800 shadow-soft hover:bg-brand-soft focus-visible:ring-brand/25",
  ghost:
    "border-transparent bg-transparent text-navy-700 hover:bg-navy-50 focus-visible:ring-brand/20",
  danger:
    "border-red-700 bg-red-700 text-white shadow-soft hover:bg-red-800 focus-visible:ring-red-300",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-xs",
  md: "h-9 px-4 text-sm",
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  isLoading = false,
  disabled,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-btn border font-semibold leading-none transition focus:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-55",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : null}
      <span>{children}</span>
    </button>
  );
}
