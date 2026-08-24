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
            Trump RX helps you compare cash-discount prescription prices at
            nearby pharmacies and show a pharmacist-ready coupon — brand and
            generic. A private discount service, not insurance.
          </p>
          <p className="flex items-start gap-2 text-xs text-muted-foreground">
            <ShieldCheck className="mt-0.5 size-3.5 shrink-0 text-primary" aria-hidden />
            We never sell health query or medication data.
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
            <li>
              <Link href="/help" className="hover:text-foreground">
                How coupons work
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-foreground">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="/help/pharmacist" className="hover:text-foreground">
                Pharmacist guide
              </Link>
            </li>
            <li>
              <Link href="/transfer" className="hover:text-foreground">
                Transfer a prescription
              </Link>
            </li>
            <li>
              <Link href="/help/counter-issue" className="hover:text-foreground">
                Counter issue help
              </Link>
            </li>
            <li>
              <span className="text-foreground/80">
                Chat with us — use the Messages button
              </span>
            </li>
            <li>
              <Link href="/membership" className="hover:text-foreground">
                Free vs membership
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-foreground">Trust</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link href="/privacy" className="hover:text-foreground">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-foreground">
                Terms of Service
              </Link>
            </li>
            <li>Not insurance · Discount cards only</li>
            <li>WCAG 2.1 AA oriented interface</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/80 py-4">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-2 px-4 text-center text-xs text-muted-foreground sm:flex-row sm:gap-4 sm:px-6">
          <p>
            © {new Date().getFullYear()} Trump RX. Prices are network
            cash-discount pricing and may vary at the pharmacy.
          </p>
          <span className="hidden sm:inline" aria-hidden>
            ·
          </span>
          <Link
            href="/privacy"
            className="font-medium text-foreground/80 underline-offset-2 hover:text-foreground hover:underline"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
