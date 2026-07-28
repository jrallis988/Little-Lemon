import Link from "next/link";

export type Crumb = { label: string; href?: string };

export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav className="border-b border-border py-2.5" aria-label="Breadcrumb">
      <div className="wrap">
        <ol className="flex flex-wrap items-center gap-0">
          {items.map((item, i) => {
            const isLast = i === items.length - 1;
            return (
              <li key={item.label} className="flex items-center text-xs">
                {isLast || !item.href ? (
                  <span
                    className="font-semibold text-text-body"
                    aria-current={isLast ? "page" : undefined}
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link href={item.href} className="py-[5px] text-ocean">
                    {item.label}
                  </Link>
                )}
                {!isLast ? (
                  <span className="px-2 text-border-strong" aria-hidden="true">
                    ›
                  </span>
                ) : null}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
