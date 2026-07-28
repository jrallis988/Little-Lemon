import type { Metadata, Viewport } from "next";
import { Fraunces, Source_Sans_3, Geist_Mono } from "next/font/google";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { DisclaimerBanner } from "@/components/layout/disclaimer-banner";
import { SessionProvider } from "@/components/providers/session-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
});

const sans = Source_Sans_3({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const mono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Trump RX — Lower prescription prices at pharmacies near you",
    template: "%s · Trump RX",
  },
  description:
    "Search brand and generic medications, compare local pharmacy coupon prices, and show a digital discount at the counter. Trump RX is a private discount provider — not insurance and not a government service.",
  keywords: [
    "Trump RX",
    "TrumpRx",
    "prescription coupons",
    "drug prices",
    "pharmacy discount",
    "medication savings",
    "generic vs brand",
  ],
  openGraph: {
    title: "Trump RX — Compare pharmacy prices. Keep more of your money.",
    description:
      "Search medications, compare nearby pharmacies, and show a digital coupon at the counter. Private discount service — not insurance.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#e24a2e",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${display.variable} ${sans.variable} ${mono.variable} min-h-dvh font-sans antialiased`}
      >
        <SessionProvider>
          <TooltipProvider>
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
            >
              Skip to main content
            </a>
            <DisclaimerBanner />
            <SiteHeader />
            <main id="main-content">{children}</main>
            <SiteFooter />
          </TooltipProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
