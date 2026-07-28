import Link from "next/link";
import { type LucideIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionHref?: string;
  actionLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionHref,
  actionLabel,
  secondaryHref,
  secondaryLabel,
  className,
}: EmptyStateProps) {
  return (
    <div
      role="status"
      className={cn(
        "rounded-2xl border border-dashed border-border bg-surface px-5 py-8 text-center",
        className
      )}
    >
      <span className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-secondary text-secondary-foreground">
        <Icon className="size-6" aria-hidden />
      </span>
      <h2 className="mt-3 font-display text-xl font-semibold">{title}</h2>
      <p className="mx-auto mt-1.5 max-w-md text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
      {(actionHref || secondaryHref) && (
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          {actionHref && actionLabel && (
            <Link
              href={actionHref}
              className={cn(buttonVariants({ size: "lg" }), "min-h-11")}
            >
              {actionLabel}
            </Link>
          )}
          {secondaryHref && secondaryLabel && (
            <Link
              href={secondaryHref}
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "min-h-11"
              )}
            >
              {secondaryLabel}
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
