import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-trust text-trust-foreground">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr] md:gap-10 md:py-12">
        <div className="space-y-3">
          <p className="font-display text-2xl font-bold uppercase tracking-tight">
            Trump RX
          </p>
          <p className="max-w-sm text-sm leading-relaxed text-trust-foreground/80">
            Compare cash-discount prescription prices at nearby pharmacies and
            show a pharmacist-ready coupon — brand and generic. A private
            discount service, not insurance.
          </p>
          <p className="flex items-start gap-2 text-xs text-trust-foreground/70">
            <ShieldCheck
              className="mt-0.5 size-3.5 shrink-0 text-savings"
              aria-hidden
            />
            We never sell health query or medication data.
          </p>
        </div>

        <div>
          <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-trust-foreground">
            Explore
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-trust-foreground/75">
            <li>
              <Link href="/search" className="hover:text-trust-foreground">
                Drug price search
              </Link>
            </li>
            <li>
              <Link href="/pharmacies" className="hover:text-trust-foreground">
                Nearby pharmacies
              </Link>
            </li>
            <li>
              <Link href="/profile" className="hover:text-trust-foreground">
                Saved medications
              </Link>
            </li>
            <li>
              <Link href="/help" className="hover:text-trust-foreground">
                How coupons work
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-trust-foreground">
                FAQ
              </Link>
            </li>
            <li>
              <Link
                href="/tools/insurance-calculator"
                className="hover:text-trust-foreground"
              >
                Insurance calculator
              </Link>
            </li>
            <li>
              <Link href="/providers" className="hover:text-trust-foreground">
                For providers
              </Link>
            </li>
            <li>
              <Link
                href="/help/pharmacist"
                className="hover:text-trust-foreground"
              >
                Pharmacist guide
              </Link>
            </li>
            <li>
              <Link href="/transfer" className="hover:text-trust-foreground">
                Transfer a prescription
              </Link>
            </li>
            <li>
              <Link href="/membership" className="hover:text-trust-foreground">
                Free vs membership
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-trust-foreground">
            Trust
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-trust-foreground/75">
            <li>
              <Link href="/privacy" className="hover:text-trust-foreground">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-trust-foreground">
                Terms of Service
              </Link>
            </li>
            <li>Not insurance · Discount cards only</li>
            <li>WCAG 2.1 AA oriented interface</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-trust-foreground/15 py-4">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-2 px-4 text-center text-xs text-trust-foreground/65 sm:flex-row sm:gap-4 sm:px-6">
          <p>
            © {new Date().getFullYear()} Trump RX. Prices are network
            cash-discount pricing and may vary at the pharmacy.
          </p>
          <span className="hidden sm:inline" aria-hidden>
            ·
          </span>
          <Link
            href="/privacy"
            className="font-medium text-trust-foreground/85 underline-offset-2 hover:text-trust-foreground hover:underline"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
