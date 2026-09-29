import type { ButtonHTMLAttributes, ReactNode } from 'react';

export function Panel({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`bg-panel border border-border-subtle rounded-[var(--radius-panel)] p-4 ${className}`}
    >
      {children}
    </section>
  );
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-[11px] font-semibold tracking-[0.16em] uppercase text-ink-faint mb-3">
      {children}
    </h2>
  );
}

export function Metric({
  label,
  value,
  tone = 'default',
}: {
  label: string;
  value: string;
  tone?: 'default' | 'accent' | 'ready' | 'danger';
}) {
  const toneClass =
    tone === 'accent'
      ? 'text-accent'
      : tone === 'ready'
        ? 'text-ready'
        : tone === 'danger'
          ? 'text-danger'
          : 'text-ink';

  return (
    <div className="min-w-0">
      <p className="text-[10px] uppercase tracking-[0.14em] text-ink-faint mb-1">{label}</p>
      <p className={`font-metric text-base leading-none ${toneClass}`}>{value}</p>
    </div>
  );
}

type BtnProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'md' | 'lg' | 'sm';
};

export function Button({
  variant = 'secondary',
  size = 'md',
  className = '',
  children,
  ...rest
}: BtnProps) {
  const variants = {
    primary:
      'bg-accent text-slate-950 hover:bg-amber-400 active:bg-accent-strong border-transparent font-bold',
    secondary:
      'bg-panel-raised text-ink border-border-strong hover:border-accent/50 hover:text-white',
    ghost: 'bg-transparent text-ink-muted border-border-subtle hover:border-border-strong hover:text-ink',
    danger: 'bg-danger/15 text-danger border-danger/40 hover:bg-danger/25',
  };
  const sizes = {
    sm: 'px-3 py-2 text-xs min-h-10',
    md: 'px-4 py-3 text-sm min-h-12',
    lg: 'px-5 py-4 text-base min-h-14',
  };

  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center gap-2 rounded-[var(--radius-control)] border transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

export function StatusPill({
  children,
  tone = 'ready',
}: {
  children: ReactNode;
  tone?: 'ready' | 'accent' | 'muted' | 'danger';
}) {
  const tones = {
    ready: 'text-ready border-ready/30 bg-ready/10',
    accent: 'text-accent border-accent/30 bg-accent/10',
    muted: 'text-ink-muted border-border-strong bg-slate-950/50',
    danger: 'text-danger border-danger/30 bg-danger/10',
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider border px-2 py-1 rounded ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

export function SliderControl({
  label,
  value,
  min,
  max,
  step = 1,
  unit = '',
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  onChange: (v: number) => void;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="space-y-3">
      <div className="flex items-end justify-between gap-3">
        <span className="text-sm text-ink-muted">{label}</span>
        <span className="font-metric text-lg text-accent">
          {value}
          {unit}
        </span>
      </div>
      <div className="relative h-3 rounded-full bg-slate-950 border border-border-subtle overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-accent-strong to-accent"
          style={{ width: `${pct}%` }}
        />
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={label}
        className="w-full accent-amber-500 cursor-pointer"
      />
      <div className="flex justify-between font-metric text-[10px] text-ink-faint">
        <span>
          {min}
          {unit}
        </span>
        <span>
          {max}
          {unit}
        </span>
      </div>
    </div>
  );
}
