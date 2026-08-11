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
    default: "Planet Fitness Stratham, NH — Join Online",
    template: "%s · Planet Fitness Stratham",
  },
  description:
    "Join Planet Fitness Stratham at 20 Portsmouth Ave — Open & Staffed 24/7. Compare Classic and Black Card rates for the Seacoast NH Judgement Free Zone®.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Planet Fitness Stratham",
    title: "Planet Fitness Stratham, NH — Join Online",
    description:
      "Your home club in Stratham, NH. Compare memberships, explore Seacoast clubs, and join with transparent local pricing.",
    images: [
      {
        url: "/images/hero-gym.jpg",
        width: 1200,
        height: 630,
        alt: "Planet Fitness Stratham gym floor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Planet Fitness Stratham, NH — Join Online",
    description:
      "Your home club in Stratham, NH. Compare memberships and join with transparent local pricing.",
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
