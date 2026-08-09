import type { ReactNode } from 'react';
import { MobileScreenHeader } from '@/features/mobile/mobile-screen-header';
import { cn } from '@/utils/cn';

interface MobileScreenShellProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  /** Extra classes for the scrollable content region */
  contentClassName?: string;
  className?: string;
}

/** Identical page chrome for every top-level Shift mobile tab. */
export function MobileScreenShell({
  eyebrow = 'Shift',
  title,
  subtitle,
  children,
  contentClassName,
  className,
}: MobileScreenShellProps) {
  return (
    <div className={cn('flex h-full min-h-0 flex-col', className)}>
      <MobileScreenHeader eyebrow={eyebrow} title={title} subtitle={subtitle} />
      <div
        className={cn(
          'scrollbar-thin flex-1 overflow-y-auto px-4 pt-1 pb-24',
          contentClassName,
        )}
      >
        {children}
      </div>
    </div>
  );
}
