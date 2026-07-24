import type { SafetyLevel } from "@/types/mail";
import { cn } from "@/lib/utils";
import { BadgeCheck, ShieldAlert, ShieldCheck } from "lucide-react";

const copy: Record<
  SafetyLevel,
  { label: string; hint: string; icon: typeof ShieldCheck }
> = {
  verified: {
    label: "Verified",
    hint: "A trusted place or person confirmed by your family",
    icon: BadgeCheck,
  },
  trusted: {
    label: "Safe contact",
    hint: "Someone on your Safe Contacts list",
    icon: ShieldCheck,
  },
  unknown: {
    label: "Be careful",
    hint: "Ask a grown-up before opening links or replying",
    icon: ShieldAlert,
  },
};

interface SafetyBadgeProps {
  level: SafetyLevel;
  className?: string;
  showLabel?: boolean;
}

export function SafetyBadge({
  level,
  className,
  showLabel = true,
}: SafetyBadgeProps) {
  const meta = copy[level];
  const Icon = meta.icon;

  return (
    <span
      title={meta.hint}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-extrabold tracking-wide",
        level === "verified" && "bg-safe-soft text-safe",
        level === "trusted" && "bg-safe-soft text-safe",
        level === "unknown" && "bg-amber-100 text-amber-800",
        className,
      )}
    >
      <Icon className="size-3.5" aria-hidden />
      {showLabel ? meta.label : <span className="sr-only">{meta.label}</span>}
    </span>
  );
}
