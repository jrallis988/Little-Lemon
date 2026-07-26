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
        className="block text-xs font-semibold uppercase tracking-wide text-[#222222]"
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
          "block min-h-9 w-full rounded-[4px] border bg-white px-3 py-2 text-sm text-[#222222] shadow-[0_1px_2px_rgba(34,34,34,0.04)]",
          "placeholder:text-[#6E6E6E] focus:border-[#FF7A18] focus:outline-none focus:ring-2 focus:ring-[#FF7A18]/20",
          "disabled:cursor-not-allowed disabled:bg-[#eef3f8] disabled:text-[#6E6E6E]",
          error ? "border-[#b42318]" : "border-[#E5E5E5]",
          className
        )}
        {...props}
      />
      {hint ? (
        <p id={hintId} className="text-xs text-[#6E6E6E]">
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
