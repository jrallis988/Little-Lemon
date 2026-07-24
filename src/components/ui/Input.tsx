import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  error?: string;
  hint?: string;
}

export function Input({
  id,
  label,
  error,
  hint,
  className,
  required,
  ...props
}: InputProps) {
  const errorId = error ? `${id}-error` : undefined;
  const hintId = hint ? `${id}-hint` : undefined;
  const describedBy = [errorId, hintId].filter(Boolean).join(" ") || undefined;

  return (
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className="block text-xs font-semibold uppercase tracking-wide text-[#0f2744]"
      >
        {label}
        {required ? <span className="ml-1 text-[#b42318]">*</span> : null}
      </label>
      <input
        id={id}
        required={required}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={describedBy}
        className={cn(
          "block min-h-9 w-full rounded-[4px] border bg-white px-3 py-2 text-sm text-[#1a2332] shadow-[0_1px_2px_rgba(15,39,68,0.04)]",
          "placeholder:text-[#5b6b7c] focus:border-[#3b6ea5] focus:outline-none focus:ring-2 focus:ring-[#3b6ea5]/20",
          "disabled:cursor-not-allowed disabled:bg-[#eef3f8] disabled:text-[#5b6b7c]",
          error ? "border-[#b42318]" : "border-[#c5d0dc]",
          className
        )}
        {...props}
      />
      {hint ? (
        <p id={hintId} className="text-xs text-[#5b6b7c]">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className="text-xs font-medium text-[#b42318]">
          {error}
        </p>
      ) : null}
    </div>
  );
}
