import type { SafetyLevel } from "@/types/mail";
import { cn } from "@/lib/utils";
import { BadgeCheck, ShieldAlert, ShieldCheck } from "lucide-react";

const copy: Record<
  SafetyLevel,
  { label: string; hint: string; icon: typeof ShieldCheck }
> = {
  verified: {
    label: "Verified",
    hint: "Verified",
    icon: BadgeCheck,
  },
  trusted: {
    label: "Safe contact",
    hint: "Safe contact",
    icon: ShieldCheck,
  },
  unknown: {
    label: "Unknown",
    hint: "Unknown sender",
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
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold tracking-wide",
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
