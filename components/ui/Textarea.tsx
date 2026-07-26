"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, id, label, error, helperText, required, rows = 4, ...props }, ref) => {
    const generatedId = React.useId();
    const textareaId = id ?? generatedId;
    const descriptionId =
      error || helperText ? `${textareaId}-description` : undefined;

    return (
      <div className="space-y-1.5">
        {label ? (
          <label
            htmlFor={textareaId}
            className="block text-xs font-bold uppercase tracking-wide text-navy-700"
          >
            {label}
            {required ? <span className="ml-1 text-red-700">*</span> : null}
          </label>
        ) : null}
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={descriptionId}
          className={cn(
            "w-full resize-y rounded-card border border-surface-border bg-white px-3 py-2 text-sm text-navy-900 shadow-soft outline-none transition placeholder:text-navy-400 focus:border-brand focus:ring-2 focus:ring-brand/20 disabled:cursor-not-allowed disabled:bg-surface-muted",
            error && "border-red-600 focus:border-red-700 focus:ring-red-200",
            className
          )}
          {...props}
        />
        {error || helperText ? (
          <p
            id={descriptionId}
            className={cn("text-xs", error ? "text-red-700" : "text-navy-500")}
          >
            {error ?? helperText}
          </p>
        ) : null}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
