import type { Metadata } from "next";
import { Source_Serif_4 } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { campaign } from "@/data/campaign";
import "./globals.css";

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${campaign.name} — ${campaign.season}`,
    template: `%s | ${campaign.name}`,
  },
  description: `${campaign.tagline} Discover the ${campaign.season} children's and middle-grade collection from ${campaign.publisher}.`,
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${sourceSerif.variable} h-full`}>
      <body className="flex min-h-full flex-col antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-amber focus:px-4 focus:py-2 focus:font-display focus:text-sm focus:uppercase focus:tracking-wider focus:text-ink"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
