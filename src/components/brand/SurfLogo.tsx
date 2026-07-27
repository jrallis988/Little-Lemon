import { useId } from "react";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  markOnly?: boolean;
  /** Inverse wordmark for dark / mesh hero backgrounds */
  inverse?: boolean;
  showTagline?: boolean;
};

/** Official Surf mark: orange board + lowercase wordmark */
export function SurfLogo({
  className,
  markOnly = false,
  inverse = false,
  showTagline = true,
}: Props) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <SurfboardMark className="h-10 w-10 shrink-0 drop-shadow-sm" />
      {!markOnly && (
        <div className="leading-tight">
          <p
            className={cn(
              "font-display text-xl font-bold lowercase tracking-tight",
              inverse ? "text-foam" : "text-navy",
            )}
          >
            surf
          </p>
          {showTagline && (
            <p className={cn("text-xs", inverse ? "text-foam/80" : "text-slate")}>
              Search · Learn · Stay safe
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export function SurfboardMark({ className }: { className?: string }) {
  const gradId = useId().replace(/:/g, "");

  return (
    <svg
      viewBox="0 0 40 40"
      className={cn(className)}
      aria-hidden
      fill="none"
    >
      <defs>
        <linearGradient id={gradId} x1="20" y1="4" x2="20" y2="36">
          <stop stopColor="#F7921E" />
          <stop offset="1" stopColor="#F25C1D" />
        </linearGradient>
      </defs>
      <path
        d="M20 3.5c3.1 0 5.4 2.6 5.4 6.4v17.7c0 3.8-2.3 6.4-5.4 6.4s-5.4-2.6-5.4-6.4V9.9c0-3.8 2.3-6.4 5.4-6.4Z"
        fill={`url(#${gradId})`}
      />
      <path
        d="M20 6.5v24"
        stroke="#F3EFE6"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path d="M23.8 28.2 26.8 31.4 23.3 32.5z" fill="#F3EFE6" />
    </svg>
  );
}

/** Compact lockup matching the logo lockup (board + surf) */
export function SurfWordmark({
  className,
  inverse = false,
}: {
  className?: string;
  inverse?: boolean;
}) {
  return (
    <div className={cn("inline-flex items-center gap-2.5", className)}>
      <SurfboardMark className="h-9 w-9" />
      <span
        className={cn(
          "font-display text-3xl font-bold lowercase tracking-tight",
          inverse ? "text-foam" : "text-navy",
        )}
      >
        surf
      </span>
    </div>
  );
}
