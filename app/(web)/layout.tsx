import { AppHandoffBanner } from "@/components/app-handoff-banner";
import { CookieConsent } from "@/components/cookie-consent";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

/**
 * Public acquisition chrome (Screens 01–20).
 * Owns discovery, pricing, promos, and join — not day-to-day member utility.
 */
export default function WebLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-pf-yellow focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-pf-ink"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main" className="pb-12">
        {children}
      </main>
      <SiteFooter />
      <AppHandoffBanner />
      <CookieConsent />
    </>
  );
}
