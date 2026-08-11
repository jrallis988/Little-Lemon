import Link from "next/link";
import type { ReactNode } from "react";
import type { Crumb } from "@/components/Breadcrumbs";

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
    <section className="page-header">
      <div className="overlay">
        <div className="container">
          <div className="page-header-content text-center">
            {overline && <p className="mb-2 text-white" style={{ opacity: 0.85 }}>{overline}</p>}
            <h2>{title}</h2>
            {subtitle && (
              <p className="mt-3 mb-0 text-white" style={{ maxWidth: 640, margin: "12px auto 0", opacity: 0.9 }}>
                {subtitle}
              </p>
            )}
            {breadcrumbs && breadcrumbs.length > 0 && (
              <ul className="breadcrumb justify-content-center">
                {breadcrumbs.map((crumb, i) => {
                  const last = i === breadcrumbs.length - 1;
                  return (
                    <li key={`${crumb.label}-${i}`} className={last ? "active" : undefined}>
                      {crumb.href && !last ? (
                        <Link href={crumb.href}>{crumb.label}</Link>
                      ) : (
                        crumb.label
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-5 text-body-lg leading-[1.75] text-slate-text theme-island">
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
      <Link href={primary.href} className="custom-btn">
        {primary.label}
      </Link>
      {secondary && (
        <Link href={secondary.href} className="custom-btn" style={{ background: "transparent", border: "2px solid #e72f4b", color: "#e72f4b" }}>
          {secondary.label}
        </Link>
      )}
    </div>
  );
}

/** Optional wrapper for inner page content under the Neta page header */
export function ThemePageBody({
  children,
  narrow = false,
}: {
  children: ReactNode;
  narrow?: boolean;
}) {
  return (
    <div className="theme-page-body">
      <div className={`container${narrow ? " container-narrow" : ""}`}>{children}</div>
    </div>
  );
}
