"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

export type BadgeVariant = "default" | "info" | "success" | "warning" | "danger";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "border-surface-border bg-surface-muted text-navy-700",
  info: "border-brand/25 bg-brand-soft text-brand-dark",
  success: "border-friend/25 bg-friend-soft text-friend-dark",
  warning: "border-amber-200 bg-amber-50 text-amber-800",
  danger: "border-red-200 bg-red-50 text-red-800",
};

export function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-btn border px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide",
        variantStyles[variant],
        className
      )}
      {...props}
    />
  );
}
