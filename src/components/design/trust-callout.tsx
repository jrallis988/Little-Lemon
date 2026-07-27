import { Info, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";

interface TrustCalloutProps {
  variant?: "info" | "warning";
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function TrustCallout({
  variant = "info",
  title,
  children,
  className,
}: TrustCalloutProps) {
  const Icon = variant === "warning" ? ShieldAlert : Info;
  return (
    <aside
      className={cn(
        "flex gap-3 rounded-xl border px-3.5 py-3 text-sm",
        variant === "warning"
          ? "border-amber-200 bg-amber-50 text-amber-950"
          : "border-border bg-surface text-foreground",
        className
      )}
    >
      <Icon
        className={cn(
          "mt-0.5 size-4 shrink-0",
          variant === "warning" ? "text-amber-700" : "text-primary"
        )}
        aria-hidden
      />
      <div className="min-w-0 space-y-0.5">
        <p className="font-semibold">{title}</p>
        <div className="leading-snug text-current/85">{children}</div>
      </div>
    </aside>
  );
}
