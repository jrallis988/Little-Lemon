import type { Metadata, Viewport } from "next";
import { Lexend } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ThemeStyles } from "@/components/theme/ThemeStyles";
import { AccessibilityProvider } from "@/components/a11y/AccessibilityProvider";
import { AccessibilityPanel } from "@/components/a11y/AccessibilityPanel";
import { CookieBanner } from "@/components/CookieBanner";
import { ChatWidget } from "@/components/ChatWidget";
import { StoreProvider } from "@/components/store/StoreProvider";
import { candidate } from "@/lib/candidate";
import "./globals.css";

const lexend = Lexend({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-lexend",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${candidate.brandName} | ${candidate.state}`,
    template: `%s | ${candidate.brandName}`,
  },
  description:
    "People Over Politics. Varga for Senate — an independent write-in campaign for U.S. Senate from New Hampshire, putting families first, not party bosses or donors.",
  metadataBase: new URL("https://nickvarga.com"),
  icons: {
    icon: "/images/logo-mark.png",
    apple: "/images/logo-mark.png",
  },
  openGraph: {
    title: `${candidate.brandName} — Independent Write-In`,
    description: candidate.tagline,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/newmarket-hero.jpg",
        width: 2400,
        height: 1607,
        alt: "Downtown Newmarket, New Hampshire along the Lamprey River",
      },
    ],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#1a2a4e",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={lexend.variable}
      data-theme="light"
      data-contrast="default"
      data-text-scale="100"
      data-motion="system"
      data-font="default"
      data-line-spacing="normal"
      data-letter-spacing="normal"
      data-underline-links="false"
      data-big-targets="false"
    >
      <head>
        <ThemeStyles />
      </head>
      <body className="theme-neta">
        <AccessibilityProvider>
          <StoreProvider>
            <a href="#main-content" className="skip-link">
              Skip to main content
            </a>
            <Header />
            <main id="main-content" tabIndex={-1}>
              {children}
            </main>
            <Footer />
            <AccessibilityPanel />
            <CookieBanner />
            <ChatWidget />
          </StoreProvider>
        </AccessibilityProvider>
      </body>
    </html>
  );
}
