import Link from "next/link";

import { SocialLinks } from "@/components/layout/social-links";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/brand";
import { NAV_CATEGORIES } from "@/lib/data/catalog";

const SUPPORT_LINKS = [
  { href: "/help", label: "Help center & FAQ" },
  { href: "/account", label: "Account & orders" },
  { href: "/pharmacy-notice", label: "Pharmacy notice" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Use" },
];

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border/70 bg-surface/80">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <p className="font-display text-2xl font-bold text-brand">{SITE_NAME}</p>
          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            {SITE_TAGLINE} — shop the aisles, clip deals, pick up photo, and use
            a pharmacy that actually works.
          </p>
          <div className="mt-6">
            <p className="text-sm font-semibold text-foreground">Follow us</p>
            <SocialLinks className="mt-3" />
          </div>
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
          <ul className="mt-3 space-y-2">
            {SUPPORT_LINKS.map((item) => (
              <li key={item.href}>
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
      </div>
      <div className="border-t border-border/60 px-4 py-4 text-center text-xs text-muted-foreground sm:px-6">
        {SITE_NAME} redesign prototype · Not affiliated with Walgreens Boots
        Alliance · Official social links point to Walgreens public profiles
      </div>
    </footer>
  );
}
