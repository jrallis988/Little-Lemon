import type { Metadata } from "next";
import { Barlow_Condensed, Source_Sans_3 } from "next/font/google";
import "./globals.css";

const display = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const body = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Planet Fitness — Find a Club & Join",
    template: "%s · Planet Fitness",
  },
  description:
    "Find a nearby Planet Fitness, compare Classic and Black Card membership pricing, and join online. Day-to-day member tools live in the PF app experience.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Planet Fitness",
    title: "Planet Fitness — Find a Club & Join",
    description:
      "Explore clubs near you, compare memberships, and join with transparent local pricing.",
    images: [
      {
        url: "/images/hero-gym.jpg",
        width: 1200,
        height: 630,
        alt: "Planet Fitness gym floor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Planet Fitness — Find a Club & Join",
    description:
      "Explore clubs near you, compare memberships, and join with transparent local pricing.",
    images: ["/images/hero-gym.jpg"],
  },
  robots: { index: true, follow: true },
  manifest: "/manifest.json",
};

/** Root shell: fonts + global styles only. Segment layouts own chrome. */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="min-h-dvh font-sans antialiased">{children}</body>
    </html>
  );
}
