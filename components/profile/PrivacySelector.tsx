"use client";

import { Globe2, Lock, Users } from "lucide-react";

import type { Visibility } from "@/lib/types";
import { cn } from "@/lib/utils";

export interface PrivacySelectorProps {
  value: Visibility;
  onChange: (value: Visibility) => void;
  label?: string;
  className?: string;
}

const options: Array<{
  value: Visibility;
  label: string;
  description: string;
  icon: typeof Globe2;
}> = [
  {
    value: "public",
    label: "Public",
    description: "Everyone can see it",
    icon: Globe2,
  },
  {
    value: "friends",
    label: "Friends",
    description: "Only friends can see it",
    icon: Users,
  },
  {
    value: "private",
    label: "Private",
    description: "Only you can see it",
    icon: Lock,
  },
];

export function PrivacySelector({
  value,
  onChange,
  label = "Privacy",
  className,
}: PrivacySelectorProps) {
  return (
    <fieldset className={cn("space-y-2", className)}>
      <legend className="text-xs font-bold uppercase tracking-wide text-navy-700">
        {label}
      </legend>
      <div className="grid gap-2 sm:grid-cols-3">
        {options.map((option) => {
          const Icon = option.icon;
          const selected = option.value === value;
          return (
            <button
              key={option.value}
              type="button"
              className={cn(
                "rounded-card border px-3 py-2 text-left transition",
                selected
                  ? "border-brand bg-brand-soft text-brand-dark"
                  : "border-surface-border bg-white text-navy-700 hover:border-brand/50"
              )}
              aria-pressed={selected}
              onClick={() => onChange(option.value)}
            >
              <span className="flex items-center gap-2 text-sm font-bold">
                <Icon className="h-4 w-4" aria-hidden />
                {option.label}
              </span>
              <span className="mt-0.5 block text-xs text-navy-500">
                {option.description}
              </span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
