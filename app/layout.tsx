import type { Metadata } from "next";
import { Figtree, Pacifico, Syne } from "next/font/google";
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

const script = Pacifico({
  subsets: ["latin"],
  variable: "--font-script",
  weight: "400",
});

export const metadata: Metadata = {
  title: {
    default: `${APP_NAME} — Real Friends. Real Moments. Real You.`,
    template: `%s · ${APP_NAME}`,
  },
  description:
    "Real Friends. Real Moments. Real You. Vibe is a verified student ecosystem for teens 13–17 with profiles, music, friends, photos, and personality.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${script.variable}`}>
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
