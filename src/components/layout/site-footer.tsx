import Link from "next/link";
import { Pill, ShieldCheck } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr] md:gap-8 md:py-10">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Pill className="size-4" aria-hidden />
            </span>
            <span className="font-display text-lg font-semibold">Trump RX</span>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            An improved Trump RX experience — transparent pricing, broader
            brand + generic search, and pharmacist-ready coupons for patients
            and caregivers.
          </p>
          <p className="flex items-start gap-2 text-xs text-muted-foreground">
            <ShieldCheck className="mt-0.5 size-3.5 shrink-0 text-primary" aria-hidden />
            Searches stay on your device by default. We never sell health query
            data.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-foreground">Explore</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link href="/search" className="hover:text-foreground">
                Drug price search
              </Link>
            </li>
            <li>
              <Link href="/pharmacies" className="hover:text-foreground">
                Nearby pharmacies
              </Link>
            </li>
            <li>
              <Link href="/profile" className="hover:text-foreground">
                Saved medications
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-foreground">Trust</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link href="/privacy" className="hover:text-foreground">
                Privacy &amp; compliance
              </Link>
            </li>
            <li>Not insurance · Discount cards only</li>
            <li>WCAG 2.1 AA oriented interface</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/80 py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Trump RX. Demo pricing for product
        illustration — not live claims adjudication.
      </div>
    </footer>
  );
}
