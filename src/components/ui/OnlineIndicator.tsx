import type { OnlineStatus } from "@/lib/types/database";
import { cn } from "@/lib/utils/cn";

const statusClasses: Record<OnlineStatus, string> = {
  online: "bg-[#1f7a4d]",
  away: "bg-[#a15c00]",
  offline: "bg-[#8a98a8]",
};

const statusLabels: Record<OnlineStatus, string> = {
  online: "Online",
  away: "Away",
  offline: "Offline",
};

const sizeClasses = {
  sm: "h-2 w-2",
  md: "h-2.5 w-2.5",
  lg: "h-3 w-3",
};

export interface OnlineIndicatorProps {
  status: OnlineStatus;
  size?: keyof typeof sizeClasses;
  className?: string;
}

export function OnlineIndicator({
  status,
  size = "md",
  className,
}: OnlineIndicatorProps) {
  return (
    <span className="inline-flex items-center">
      <span
        aria-hidden="true"
        className={cn(
          "inline-block rounded-full ring-2 ring-white",
          status === "online" ? "animate-online" : "",
          statusClasses[status],
          sizeClasses[size],
          className
        )}
      />
      <span className="sr-only">{statusLabels[status]}</span>
    </span>
  );
}
