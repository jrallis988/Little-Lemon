import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import { SkipNav } from "@/components/layout/SkipNav";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import "./globals.css";

const nunito = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "Boston Children's Hospital — Where the world comes for answers",
    template: "%s · Boston Children's Hospital",
  },
  description:
    "Boston Children's Hospital redesign prototype — modular Next.js architecture from the BCH design system.",
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
        <SiteHeader />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
