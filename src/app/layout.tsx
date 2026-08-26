import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, IBM_Plex_Sans, Geist_Mono } from "next/font/google";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { DisclaimerBanner } from "@/components/layout/disclaimer-banner";
import { SessionProvider } from "@/components/providers/session-provider";
import { ToastProvider } from "@/components/providers/toast-provider";
import { CartHydrator } from "@/components/providers/cart-hydrator";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SupportChatWidget } from "@/components/chat/support-chat-widget";
import "./globals.css";

const display = Barlow_Condensed({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const sans = IBM_Plex_Sans({
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
    default: "Trump RX — See if your medication is included",
    template: "%s · Trump RX",
  },
  description:
    "TrumpRx helps you check whether a select medication has a savings option, compare it with what you pay today, understand eligibility, and learn how to access it. Not a pharmacy and not insurance.",
  keywords: [
    "Trump RX",
    "TrumpRx",
    "medication savings",
    "prescription discount",
    "eligibility",
    "select medications",
  ],
  openGraph: {
    title: "Trump RX — See if your medication is included",
    description:
      "Select medications only. Compare options, review eligibility, and follow a clear access path — pharmacy or manufacturer-direct.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0c1f3d",
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
          <ToastProvider>
            <TooltipProvider>
              <CartHydrator />
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
              <SupportChatWidget />
            </TooltipProvider>
          </ToastProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
