import { CircleHelp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/utils/cn';

interface MobileScreenHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  /** Inbox-style centered SHIFT brand lockup */
  centeredBrand?: boolean;
  className?: string;
}

function BrandMark({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--color-brand)] font-display text-sm font-bold text-white',
        className,
      )}
      aria-hidden
    >
      W
    </div>
  );
}

function HelpButton({ className }: { className?: string }) {
  return (
    <Link
      to="/app/intelligence"
      aria-label="Working Intelligence help"
      className={cn(
        'flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white/55 active:bg-white/10',
        className,
      )}
    >
      <CircleHelp className="h-5 w-5" />
    </Link>
  );
}

/** Shared Marblism-style mobile header used across every Shift screen. */
export function MobileScreenHeader({
  eyebrow = 'Working Intelligence',
  title,
  subtitle,
  centeredBrand = false,
  className,
}: MobileScreenHeaderProps) {
  if (centeredBrand) {
    return (
      <header
        className={cn(
          'safe-top grid grid-cols-[2.5rem_1fr_2.5rem] items-center px-4 pt-3 pb-2',
          className,
        )}
      >
        <BrandMark />
        <div className="text-center">
          <h1 className="font-display text-[1.35rem] font-bold tracking-[0.04em]">{title}</h1>
          <p className="text-[10px] tracking-[0.18em] text-white/45 uppercase">{eyebrow}</p>
        </div>
        <HelpButton className="ml-auto" />
      </header>
    );
  }

  return (
    <header
      className={cn(
        'safe-top grid grid-cols-[2.5rem_1fr_2.5rem] items-start gap-x-3 px-4 pt-4 pb-3',
        className,
      )}
    >
      <BrandMark className="mt-0.5" />
      <div className="min-w-0">
        <p className="text-[10px] font-semibold tracking-[0.18em] text-[var(--color-brand)] uppercase">
          {eyebrow}
        </p>
        <h1 className="font-display text-2xl font-bold tracking-tight">{title}</h1>
        {subtitle && <p className="mt-1 text-sm leading-snug text-white/45">{subtitle}</p>}
      </div>
      <HelpButton className="mt-0.5 ml-auto" />
    </header>
  );
}
