"use client";

import * as React from "react";

import { cn, initials } from "@/lib/utils";

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  name: string;
  size?: AvatarSize;
  online?: boolean;
  showOnlineIndicator?: boolean;
}

const sizeStyles: Record<AvatarSize, string> = {
  xs: "h-7 w-7 text-[10px]",
  sm: "h-9 w-9 text-xs",
  md: "h-12 w-12 text-sm",
  lg: "h-20 w-20 text-xl",
  xl: "h-28 w-28 text-2xl",
};

const indicatorStyles: Record<AvatarSize, string> = {
  xs: "h-2 w-2",
  sm: "h-2.5 w-2.5",
  md: "h-3 w-3",
  lg: "h-4 w-4",
  xl: "h-4 w-4",
};

export function Avatar({
  src,
  alt,
  name,
  size = "md",
  online,
  showOnlineIndicator = false,
  className,
  ...props
}: AvatarProps) {
  return (
    <div
      className={cn(
        "relative inline-flex shrink-0 overflow-visible rounded-card border border-surface-border bg-brand-soft text-brand-dark shadow-soft",
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {src ? (
        <img
          src={src}
          alt={alt ?? `${name}'s avatar`}
          className="h-full w-full rounded-[3px] object-cover"
          loading="lazy"
        />
      ) : (
        <span className="flex h-full w-full items-center justify-center rounded-[3px] font-bold">
          {initials(name)}
        </span>
      )}
      {showOnlineIndicator ? (
        <span
          className={cn(
            "absolute -bottom-0.5 -right-0.5 rounded-full border-2 border-white",
            indicatorStyles[size],
            online ? "bg-green-500" : "bg-navy-300"
          )}
          aria-label={online ? "Online" : "Offline"}
          role="status"
        />
      ) : null}
    </div>
  );
}
