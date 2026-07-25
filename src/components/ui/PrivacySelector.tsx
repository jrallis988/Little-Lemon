import type { SelectHTMLAttributes } from "react";
import type { Visibility } from "@/lib/types/database";
import { cn } from "@/lib/utils/cn";

const privacyOptions: Array<{
  value: Visibility;
  label: string;
  description: string;
}> = [
  {
    value: "public",
    label: "Public",
    description: "Visible to everyone on Vibe.",
  },
  {
    value: "friends",
    label: "Friends only",
    description: "Visible only to accepted friends.",
  },
  {
    value: "private",
    label: "Private",
    description: "Visible only to you.",
  },
];

export interface PrivacySelectorProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "value" | "onChange"> {
  id: string;
  label?: string;
  value: Visibility;
  onChange: (value: Visibility) => void;
  error?: string;
}

export function PrivacySelector({
  id,
  label = "Privacy",
  value,
  onChange,
  error,
  className,
  required,
  ...props
}: PrivacySelectorProps) {
  const selected = privacyOptions.find((option) => option.value === value);
  const errorId = error ? `${id}-error` : undefined;
  const descriptionId = `${id}-description`;

  return (
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className="block text-xs font-semibold uppercase tracking-wide text-[#0f2744]"
      >
        {label}
        {required ? <span className="ml-1 text-[#b42318]">*</span> : null}
      </label>
      <select
        id={id}
        value={value}
        required={required}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? `${descriptionId} ${errorId}` : descriptionId}
        onChange={(event) => onChange(event.target.value as Visibility)}
        className={cn(
          "block min-h-9 w-full rounded-[4px] border bg-white px-3 py-2 text-sm font-medium text-[#0f2744] shadow-[0_1px_2px_rgba(15,39,68,0.04)]",
          "focus:border-[#3b6ea5] focus:outline-none focus:ring-2 focus:ring-[#3b6ea5]/20 disabled:cursor-not-allowed disabled:bg-[#eef3f8]",
          error ? "border-[#b42318]" : "border-[#c5d0dc]",
          className
        )}
        {...props}
      >
        {privacyOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <p id={descriptionId} className="text-xs text-[#5b6b7c]">
        {selected?.description}
      </p>
      {error ? (
        <p id={errorId} className="text-xs font-medium text-[#b42318]">
          {error}
        </p>
      ) : null}
    </div>
  );
}
