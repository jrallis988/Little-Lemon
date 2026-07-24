import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/auth/AuthProvider";
import { APP_NAME } from "@/lib/utils";

export const metadata: Metadata = {
  title: {
    default: `${APP_NAME} — Your profile should feel like your place`,
    template: `%s · ${APP_NAME}`,
  },
  description:
    "Build a page that sounds like you, looks like you, and brings together the people, music, photos, and interests that matter to you.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
