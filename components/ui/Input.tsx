import { cn } from "@/lib/utils";
import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

export function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-md bg-velvet px-3 text-sm text-foam outline-none hairline placeholder:text-smoke focus:ring-2 focus:ring-spotlight/40",
        className,
      )}
      {...props}
    />
  );
}

export function Textarea({
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "min-h-28 w-full rounded-md bg-velvet px-3 py-3 text-sm text-foam outline-none hairline placeholder:text-smoke focus:ring-2 focus:ring-spotlight/40",
        className,
      )}
      {...props}
    />
  );
}
