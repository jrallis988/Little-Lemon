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
            A medication savings, eligibility, comparison, and access platform
            for select medications — not a universal pharmacy or replacement for
            your existing pharmacy.
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
          <h2 className="font-display text-sm font-semibold uppercase tracking-wider">
            Explore
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-trust-foreground/75">
            <li>
              <Link href="/search" className="hover:text-trust-foreground">
                Check coverage
              </Link>
            </li>
            <li>
              <Link href="/medications" className="hover:text-trust-foreground">
                Included medications
              </Link>
            </li>
            <li>
              <Link href="/pharmacies" className="hover:text-trust-foreground">
                Participating pharmacies
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-trust-foreground">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="/help" className="hover:text-trust-foreground">
                Help
              </Link>
            </li>
            <li>
              <Link href="/providers" className="hover:text-trust-foreground">
                For providers
              </Link>
            </li>
            <li>
              <Link href="/profile" className="hover:text-trust-foreground">
                Saved tools (account)
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-display text-sm font-semibold uppercase tracking-wider">
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
            <li>Not a pharmacy · Not insurance</li>
            <li>Select medications only</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-trust-foreground/15 py-4">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-2 px-4 text-center text-xs text-trust-foreground/65 sm:flex-row sm:gap-4 sm:px-6">
          <p>
            © {new Date().getFullYear()} Trump RX. Program availability and
            pricing vary. TrumpRx does not sell or dispense medications.
          </p>
        </div>
      </div>
    </footer>
  );
}
