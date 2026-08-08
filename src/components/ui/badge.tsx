import { cn } from '@/utils/cn';

export function Badge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex min-w-5 items-center justify-center rounded-full bg-[var(--color-brand)] px-1.5 py-0.5 text-[11px] font-semibold text-white',
        className,
      )}
    >
      {children}
    </span>
  );
}
