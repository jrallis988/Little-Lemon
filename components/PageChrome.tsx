import Link from "next/link";
import type { ReactNode } from "react";

export function PageHero({
  overline,
  title,
  subtitle,
}: {
  overline?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <header className="border-b border-granite-200 bg-mist">
      <div className="mx-auto max-w-content px-5 py-12 sm:px-8 md:py-16">
        {overline && (
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-pine-600">
            {overline}
          </p>
        )}
        <h1 className="mt-2 font-serif text-4xl font-bold text-granite-800 sm:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-granite-600">
            {subtitle}
          </p>
        )}
      </div>
    </header>
  );
}

export function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-5 text-lg leading-relaxed text-granite-600">
      {children}
    </div>
  );
}

export function CtaRow({
  primary,
  secondary,
}: {
  primary: { href: string; label: string };
  secondary?: { href: string; label: string };
}) {
  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
      <Link href={primary.href} className="btn-primary">
        {primary.label}
      </Link>
      {secondary && (
        <Link href={secondary.href} className="btn-outline">
          {secondary.label}
        </Link>
      )}
    </div>
  );
}
