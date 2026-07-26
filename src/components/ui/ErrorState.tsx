import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "./Button";
import { cn } from "@/lib/utils/cn";

export interface ErrorStateProps {
  message: string;
  title?: string;
  retryLabel?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({
  message,
  title = "Something went wrong",
  retryLabel = "Try again",
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <section
      className={cn(
        "mp-card flex flex-col items-start gap-3 border-[#b42318]/40 p-4",
        className
      )}
      role="alert"
    >
      <div className="flex gap-3">
        <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[4px] bg-[#b42318]/10 text-[#b42318]">
          <AlertTriangle aria-hidden="true" className="h-4 w-4" />
        </span>
        <div>
          <h2 className="text-sm font-bold text-[#222222]">{title}</h2>
          <p className="mt-1 text-sm text-[#6E6E6E]">{message}</p>
        </div>
      </div>
      {onRetry ? (
        <Button variant="secondary" size="sm" onClick={onRetry}>
          <RefreshCw aria-hidden="true" className="h-3.5 w-3.5" />
          {retryLabel}
        </Button>
      ) : null}
    </section>
  );
}
