import type { Metadata } from "next";
import { Barlow_Condensed, Source_Sans_3 } from "next/font/google";
import { AppHandoffBanner } from "@/components/app-handoff-banner";
import { SiteHeader } from "@/components/site-header";
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

export const metadata: Metadata = {
  title: {
    default: "Planet Fitness — Find a Club & Join",
    template: "%s · Planet Fitness",
  },
  description:
    "Lightning-fast club lookup, transparent Classic vs Black Card pricing, and a frictionless path to join. Member check-ins live in the app.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="pb-28 font-sans antialiased">
        <SiteHeader />
        <main>{children}</main>
        <AppHandoffBanner />
      </body>
    </html>
  );
}
