import { AppHandoffBanner } from "@/components/app-handoff-banner";
import { CookieConsent } from "@/components/cookie-consent";
import { SiteDisclaimer } from "@/components/site-disclaimer";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

/**
 * Public acquisition chrome.
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
      <SiteDisclaimer />
      <SiteHeader />
      <main id="main" className="min-h-[50vh] bg-white pb-12">
        {children}
      </main>
      <SiteFooter />
      <AppHandoffBanner />
      <CookieConsent />
    </>
  );
}
