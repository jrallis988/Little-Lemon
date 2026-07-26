import type { LucideIcon } from "lucide-react";
import { Inbox } from "lucide-react";
import { Button } from "./Button";
import { cn } from "@/lib/utils/cn";

export interface EmptyStateProps {
  title: string;
  description: string;
  icon?: LucideIcon;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  title,
  description,
  icon: Icon = Inbox,
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <section
      className={cn(
        "mp-card flex flex-col items-center px-5 py-8 text-center",
        className
      )}
    >
      <span className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-[4px] border border-[#E5E5E5] bg-[#EEE9FF] text-[#222222]">
        <Icon aria-hidden="true" className="h-5 w-5" />
      </span>
      <h2 className="text-base font-bold text-[#222222]">{title}</h2>
      <p className="mt-1 max-w-md text-sm text-[#6E6E6E]">{description}</p>
      {actionLabel && onAction ? (
        <Button onClick={onAction} className="mt-4" size="sm">
          {actionLabel}
        </Button>
      ) : null}
    </section>
  );
}
