"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, id, label, error, helperText, required, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;
    const descriptionId =
      error || helperText ? `${inputId}-description` : undefined;

    return (
      <div className="space-y-1.5">
        {label ? (
          <label
            htmlFor={inputId}
            className="block text-xs font-bold uppercase tracking-wide text-navy-700"
          >
            {label}
            {required ? <span className="ml-1 text-red-700">*</span> : null}
          </label>
        ) : null}
        <input
          ref={ref}
          id={inputId}
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={descriptionId}
          className={cn(
            "h-9 w-full rounded-card border border-surface-border bg-white px-3 text-sm text-navy-900 shadow-soft outline-none transition placeholder:text-navy-400 focus:border-brand focus:ring-2 focus:ring-brand/20 disabled:cursor-not-allowed disabled:bg-surface-muted",
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

Input.displayName = "Input";
