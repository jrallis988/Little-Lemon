import type { Metadata } from "next";
import { Courier_Prime, Instrument_Serif, Manrope } from "next/font/google";
import { company, writer } from "@/data/scripts";
import "./globals.css";

const display = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const script = Courier_Prime({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-script",
  display: "swap",
});

const body = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${company.name} — ${writer.name}`,
    template: `%s · ${company.shortName}`,
  },
  description: `${writer.name}, screenwriter for film and television at ${company.name}. ${writer.tagline}`,
  applicationName: company.shortName,
  authors: [{ name: writer.name, url: `mailto:${writer.email}` }],
  openGraph: {
    title: `${company.name} — ${writer.name}`,
    description: writer.tagline,
    type: "website",
    siteName: company.name,
    locale: "en_US",
    images: [
      {
        url: company.logo,
        alt: `${company.name} neon logo`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${company.name} — ${writer.name}`,
    description: writer.tagline,
    images: [company.logo],
  },
  icons: {
    icon: "/favicon-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${script.variable} ${body.variable} h-full`}
    >
      <body className="min-h-full bg-background font-sans text-foreground antialiased">
        <div className="page-grain" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
