"use client";

import * as React from "react";
import type { LucideIcon } from "lucide-react";
import { Archive } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "./Button";

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: LucideIcon;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  icon: Icon = Archive,
  title,
  description,
  actionLabel,
  onAction,
  className,
  ...props
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "rounded-card border border-dashed border-surface-border bg-white px-6 py-8 text-center shadow-soft",
        className
      )}
      {...props}
    >
      <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-card bg-brand-soft text-brand">
        <Icon className="h-5 w-5" aria-hidden />
      </div>
      <h3 className="text-base font-bold text-navy-900">{title}</h3>
      {description ? (
        <p className="mx-auto mt-1 max-w-sm text-sm leading-6 text-navy-600">
          {description}
        </p>
      ) : null}
      {actionLabel && onAction ? (
        <Button className="mt-4" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
}
