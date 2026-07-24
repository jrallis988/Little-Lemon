import type { Metadata, Viewport } from "next";
import { Archivo_Black, Inter } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
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

export const metadata: Metadata = {
  title: {
    default: `${candidate.fullName} for ${candidate.office} | ${candidate.state}`,
    template: `%s | ${candidate.fullName} for Senate`,
  },
  description:
    "People Over Politics. Nick Varga is an independent write-in candidate for U.S. Senate from New Hampshire — putting families first, not party bosses or donors.",
  metadataBase: new URL("https://nickvarga.com"),
  openGraph: {
    title: `${candidate.fullName} for ${candidate.office} — Write-In`,
    description: candidate.tagline,
    locale: "en_US",
    type: "website",
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
    <html lang="en" className={`${archivoBlack.variable} ${inter.variable}`}>
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
