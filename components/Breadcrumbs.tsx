import Link from "next/link";

export type Crumb = { href?: string; label: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  if (!items.length) return null;
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-muted">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={`${item.label}-${i}`} className="inline-flex items-center gap-2">
              {i > 0 && (
                <span aria-hidden="true" className="text-slate-line">
                  /
                </span>
              )}
              {last || !item.href ? (
                <span
                  className={last ? "font-semibold text-slate-text" : undefined}
                  aria-current={last ? "page" : undefined}
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="font-semibold text-navy underline-offset-2 hover:underline"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
