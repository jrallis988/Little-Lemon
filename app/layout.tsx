import type { Metadata } from "next";
import { Figtree, Syne } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth/AuthProvider";
import { APP_NAME } from "@/lib/utils";

const display = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["600", "700", "800"],
});

const body = Figtree({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: `${APP_NAME} — Your page. Your vibe. Ages 13–17.`,
    template: `%s · ${APP_NAME}`,
  },
  description:
    "Vibe is a social platform for teens 13–17. Build a customizable profile with your music, friends, photos, and personality — not a copy-paste feed.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
