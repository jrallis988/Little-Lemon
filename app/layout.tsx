import type { Metadata } from "next";
import { DM_Sans, Fraunces, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  axes: ["opsz"],
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  axes: ["opsz"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Morgan Bright — Learning, tailored",
    template: "%s · Morgan Bright",
  },
  description:
    "Morgan Bright helps learners clear individual hurdles and build instruction that fits how they learn best.",
  keywords: [
    "Morgan Bright",
    "learning styles",
    "adaptive education",
    "diagnostic learning",
    "personalized instruction",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${sourceSerif.variable} ${dmSans.variable}`}
    >
      <body className="min-h-screen font-body text-ink">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
