import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Instrument_Sans, Literata } from "next/font/google";
import { AuthProvider } from "@/lib/auth";
import "./globals.css";

const display = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
});

const sans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const bit = Literata({
  subsets: ["latin"],
  variable: "--font-bit",
});

export const metadata: Metadata = {
  title: {
    default: "Greenroom",
    template: "%s · Greenroom",
  },
  description:
    "Greenroom is the social network for comedians — share bits, find open mics, and workshop with comics who get the room.",
  applicationName: "Greenroom",
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#0c0b0a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${display.variable} ${sans.variable} ${bit.variable} antialiased`}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
