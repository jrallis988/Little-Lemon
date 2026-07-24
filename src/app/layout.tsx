import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navigation } from "@/components/layout/Navigation";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL("https://rallis.studio"),
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-dvh antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:border focus:border-ink focus:bg-paper focus:px-3 focus:py-2 focus:font-mono focus:text-meta focus:uppercase"
        >
          Skip to content
        </a>

        <Navigation />

        <div className="flex min-h-dvh flex-col pt-nav">
          <main id="main" className="flex-1">
            {children}
          </main>

          <footer className="mt-auto border-t border-ink/15">
            <div className="mx-auto flex max-w-gallery flex-col gap-6 px-gutter py-10 sm:flex-row sm:items-end sm:justify-between">
              <div className="space-y-2">
                <p className="font-sans text-sm font-medium tracking-[-0.03em] text-ink">
                  {siteConfig.mark}
                </p>
                <p className="max-w-measure text-sm text-ink-muted">
                  Graphic design & digital media — systems, identity, interface.
                </p>
              </div>

              <div className="flex flex-col items-start gap-4 sm:items-end">
                <nav
                  className="flex flex-wrap gap-x-5 gap-y-2"
                  aria-label="Social"
                >
                  <a
                    href={siteConfig.social.github}
                    className="font-mono text-meta uppercase tracking-[0.1em] text-ink-muted hover:text-ink"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                  <a
                    href={siteConfig.social.linkedin}
                    className="font-mono text-meta uppercase tracking-[0.1em] text-ink-muted hover:text-ink"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                  <a
                    href={siteConfig.social.email}
                    className="font-mono text-meta uppercase tracking-[0.1em] text-ink-muted hover:text-ink"
                  >
                    Email
                  </a>
                </nav>
                <p className="font-mono text-index uppercase tracking-[0.12em] text-ink-faint">
                  © {new Date().getFullYear()} {siteConfig.name} — All rights
                  reserved
                </p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
