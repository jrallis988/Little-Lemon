import type { Metadata } from "next";
import { Instrument_Serif, Manrope } from "next/font/google";
import "./globals.css";

const display = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const body = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The East Coast Motion Picture Company",
  description:
    "Independent live-action feature films and series produced on the East Coast of the United States.",
  openGraph: {
    title: "The East Coast Motion Picture Company",
    description:
      "Independent live-action cinema with East Coast roots. Features, series, and disciplined production.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} h-full`}>
      <body className="min-h-full bg-background font-sans text-foreground antialiased">
        <div className="film-grain" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
