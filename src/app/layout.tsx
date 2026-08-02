import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import { SkipNav } from "@/components/layout/SkipNav";
import { StagingBanner } from "@/components/layout/StagingBanner";
import { ConstructionAlert } from "@/components/layout/ConstructionAlert";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { MessengerButton } from "@/components/layout/MessengerButton";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const nunito = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s · ${siteConfig.name}`,
  },
  description:
    "Find doctors, explore conditions and programs, request appointments, and prepare for your visit.",
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description:
      "Find doctors, explore conditions and programs, request appointments, and prepare for your visit.",
    url: siteConfig.url,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description:
      "Find doctors, explore conditions and programs, request appointments, and prepare for your visit.",
  },
  robots:
    siteConfig.mode === "production"
      ? { index: true, follow: true }
      : { index: false, follow: false },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={nunito.variable}>
      <body className="pb-[68px] font-sans lg:pb-0">
        <SkipNav />
        <StagingBanner />
        <ConstructionAlert />
        <SiteHeader />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <SiteFooter />
        <MessengerButton />
      </body>
    </html>
  );
}
