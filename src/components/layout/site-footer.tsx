import Link from "next/link";

import { NAV_CATEGORIES } from "@/lib/data/catalog";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border/70 bg-surface/80">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <p className="font-display text-2xl font-bold text-brand">Walgreens</p>
          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            Pharmacy care, clinical services, and everyday essentials — redesigned
            for clarity, speed, and accessibility.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">Explore</p>
          <ul className="mt-3 space-y-2">
            {NAV_CATEGORIES.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">Support</p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>WCAG 2.1 AA focused UI patterns</li>
            <li>Guest & quick-pay checkout</li>
            <li>Caregiver multi-profile pharmacy</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60 py-4 text-center text-xs text-muted-foreground">
        Redesign prototype · Not affiliated with Walgreens Boots Alliance
      </div>
    </footer>
  );
}
