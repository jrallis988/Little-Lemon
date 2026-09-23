import type { Metadata } from "next";
import { Courier_Prime, Instrument_Serif, Manrope } from "next/font/google";
import { company, writer } from "@/data/scripts";
import { getSiteUrl } from "@/lib/site";
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

const siteUrl = getSiteUrl();

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
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: `${company.name} — ${writer.name}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${company.name} — ${writer.name}`,
    description: writer.tagline,
    images: ["/og.png"],
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
