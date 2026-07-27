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
    default: "Morgan Bright | Academic Software for Schools",
    template: "%s | Morgan Bright",
  },
  description:
    "Buy Morgan Bright academic software for classrooms, schools, and districts. Diagnose learning hurdles, adapt instruction, and track progress.",
  keywords: [
    "Morgan Bright",
    "academic software",
    "education software",
    "learning styles",
    "adaptive instruction",
    "school software sales",
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
