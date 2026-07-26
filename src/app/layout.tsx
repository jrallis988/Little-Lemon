import type { Metadata } from "next";
import { Outfit, Source_Sans_3 } from "next/font/google";
import { AuthProvider } from "@/lib/auth/context";
import { PLATFORM_DESCRIPTION, PLATFORM_NAME, PLATFORM_TAGLINE } from "@/lib/constants";
import { SkipToContent } from "@/components/layout/SkipToContent";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-display",
  subsets: ["latin"],
});

const sourceSans = Source_Sans_3({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${PLATFORM_NAME} - ${PLATFORM_TAGLINE}`,
    template: `%s | ${PLATFORM_NAME}`,
  },
  description: PLATFORM_DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${sourceSans.variable} antialiased`}>
        <AuthProvider>
          <SkipToContent />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
