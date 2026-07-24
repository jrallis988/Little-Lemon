import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Morgan Bright | Personalized Learning Paths",
    template: "%s | Morgan Bright",
  },
  description:
    "Navigate your educational journey with Morgan Bright. We help instructors and learners clear individual hurdles and tailor instruction to diverse learning styles.",
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
    <html lang="en" className={plusJakarta.variable}>
      <body className="min-h-screen font-sans text-ink">
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
