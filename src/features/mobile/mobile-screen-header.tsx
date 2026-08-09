import { CircleHelp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/utils/cn';

interface MobileScreenHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
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

/** Shared header chrome — same grid on every top-level mobile screen. */
export function MobileScreenHeader({
  eyebrow = 'Shift',
  title,
  subtitle,
  className,
}: MobileScreenHeaderProps) {
  return (
    <header
      className={cn(
        'safe-top grid grid-cols-[2.5rem_1fr_2.5rem] items-start gap-x-3 border-b border-white/10 px-4 pt-4 pb-3',
        className,
      )}
    >
      <BrandMark className="mt-0.5" />
      <div className="min-w-0">
        <p className="text-[10px] font-semibold tracking-[0.18em] text-[var(--color-brand)] uppercase">
          {eyebrow}
        </p>
        <h1 className="font-display text-2xl font-bold tracking-tight text-white">{title}</h1>
        {subtitle ? <p className="mt-1 text-sm leading-snug text-white/45">{subtitle}</p> : null}
      </div>
      <Link
        to="/app/intelligence"
        aria-label="Working Intelligence help"
        className="mt-0.5 ml-auto flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white/55 active:bg-white/10"
      >
        <CircleHelp className="h-5 w-5" />
      </Link>
    </header>
  );
}
