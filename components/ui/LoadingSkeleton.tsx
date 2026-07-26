"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

export interface LoadingSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  lines?: number;
}

export function LoadingSkeleton({
  className,
  lines,
  ...props
}: LoadingSkeletonProps) {
  if (lines) {
    return (
      <div className={cn("space-y-2", className)} {...props}>
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={cn(
              "h-3 animate-pulse rounded-card bg-navy-100",
              index === lines - 1 && lines > 1 ? "w-2/3" : "w-full"
            )}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn("animate-pulse rounded-card bg-navy-100", className)}
      {...props}
    />
  );
}
