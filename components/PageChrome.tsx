import Link from "next/link";
import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "@/components/Breadcrumbs";

export function PageHero({
  overline,
  title,
  subtitle,
  breadcrumbs,
}: {
  overline?: string;
  title: string;
  subtitle?: string;
  breadcrumbs?: Crumb[];
}) {
  return (
    <header className="border-b border-slate-line bg-navy">
      <div className="mx-auto max-w-content section-pad !py-14 md:!py-20">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <div className="mb-6 [&_a]:text-white [&_li]:text-white/80 [&_span]:text-white">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        )}
        <span className="accent-line" aria-hidden />
        {overline && <p className="section-overline">{overline}</p>}
        <h1 className="section-headline-light">{title}</h1>
        {subtitle && <p className="section-lead-light">{subtitle}</p>}
      </div>
    </header>
  );
}

export function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-5 text-body-lg leading-[1.75] text-slate-text">
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
        <Link href={secondary.href} className="btn-secondary">
          {secondary.label}
        </Link>
      )}
    </div>
  );
}
