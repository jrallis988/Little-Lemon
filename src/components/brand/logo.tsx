import { cn } from '@/utils/cn';

export function Logo({
  compact = false,
  className,
}: {
  compact?: boolean;
  className?: string;
}) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div
        className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--color-brand)] text-white shadow-[var(--shadow-soft)]"
        aria-hidden
      >
        <svg width="22" height="22" viewBox="0 0 64 64" fill="none">
          <path
            d="M18 40V24l14 10 14-10v16"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="32" cy="18" r="4" fill="currentColor" opacity="0.7" />
        </svg>
      </div>
      {!compact && (
        <div className="min-w-0">
          <div className="font-display text-lg font-semibold tracking-tight">
            Working Intelligence
          </div>
          <div className="text-xs text-[var(--text-muted)]">AI Workforce Platform</div>
        </div>
      )}
    </div>
  );
}
