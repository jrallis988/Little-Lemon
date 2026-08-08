import type { AvailabilityStatus } from '@/types';
import { cn } from '@/utils/cn';

const colors: Record<AvailabilityStatus, string> = {
  online: 'bg-[var(--color-success)]',
  away: 'bg-[var(--color-warning)]',
  busy: 'bg-[var(--color-danger)]',
  offline: 'bg-[var(--color-muted)]',
};

export function StatusDot({
  status,
  className,
}: {
  status: AvailabilityStatus;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-block h-2.5 w-2.5 rounded-full ring-2 ring-[var(--color-surface-elevated)]',
        colors[status],
        className,
      )}
      title={status}
      aria-label={status}
    />
  );
}
