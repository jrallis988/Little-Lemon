import type { Metadata, Viewport } from "next";
import { Merriweather, Source_Sans_3 } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { candidate } from "@/lib/candidate";
import "./globals.css";

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-merriweather",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-source-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${candidate.fullName} for ${candidate.office} | ${candidate.state}`,
    template: `%s | ${candidate.fullName} for Senate`,
  },
  description:
    "New Hampshire deserves a Senator grounded in the people, places, and values of this state — that's Nick Varga. Lower costs, Main Street, public lands, and local schools.",
  metadataBase: new URL("https://vargaforsenate.nh"),
  openGraph: {
    title: `${candidate.fullName} for ${candidate.office}`,
    description: candidate.tagline,
    locale: "en_US",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#2D5A45",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${merriweather.variable} ${sourceSans.variable}`}>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
