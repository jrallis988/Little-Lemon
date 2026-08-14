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

export const metadata: Metadata = {
  title: `${company.name} — ${writer.name}`,
  description: `${writer.name}, screenwriter at ${company.name}. ${writer.tagline}`,
  openGraph: {
    title: `${company.name} — ${writer.name}`,
    description: writer.tagline,
    type: "website",
    images: [{ url: company.logo }],
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
