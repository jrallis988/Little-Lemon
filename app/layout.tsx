import type { Metadata, Viewport } from "next";
import { Archivo_Black, Inter, Lexend } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AccessibilityProvider } from "@/components/a11y/AccessibilityProvider";
import { AccessibilityPanel } from "@/components/a11y/AccessibilityPanel";
import { CookieBanner } from "@/components/CookieBanner";
import { ChatWidget } from "@/components/ChatWidget";
import { candidate } from "@/lib/candidate";
import "./globals.css";

const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-archivo-black",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const lexend = Lexend({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-lexend",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${candidate.fullName} for ${candidate.office} | ${candidate.state}`,
    template: `%s | ${candidate.fullName} for Senate`,
  },
  description:
    "People Over Politics. Nick Varga is an independent write-in candidate for U.S. Senate from New Hampshire — putting families first, not party bosses or donors.",
  metadataBase: new URL("https://nickvarga.com"),
  icons: {
    icon: "/images/logo-mark.svg",
    apple: "/images/logo-mark.svg",
  },
  openGraph: {
    title: `${candidate.fullName} for ${candidate.office} — Write-In`,
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
      className={`${archivoBlack.variable} ${inter.variable} ${lexend.variable}`}
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
      <body>
        <AccessibilityProvider>
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
        </AccessibilityProvider>
      </body>
    </html>
  );
}
