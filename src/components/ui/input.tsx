import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  function Input({ className, ...props }, ref) {
    return (
      <input
        ref={ref}
        className={cn(
          'h-10 w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--color-surface-elevated)] px-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)]',
          className,
        )}
        {...props}
      />
    );
  },
);
