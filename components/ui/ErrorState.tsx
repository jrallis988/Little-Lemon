"use client";

import * as React from "react";
import { AlertTriangle } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "./Button";

export interface ErrorStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  message: string;
  retryLabel?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = "Something went wrong",
  message,
  retryLabel = "Try again",
  onRetry,
  className,
  ...props
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        "rounded-card border border-red-200 bg-red-50 px-5 py-4 text-red-900",
        className
      )}
      role="alert"
      {...props}
    >
      <div className="flex gap-3">
        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden />
        <div>
          <h3 className="text-sm font-bold">{title}</h3>
          <p className="mt-1 text-sm leading-6">{message}</p>
          {onRetry ? (
            <Button
              className="mt-3"
              size="sm"
              variant="danger"
              onClick={onRetry}
            >
              {retryLabel}
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
