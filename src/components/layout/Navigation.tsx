"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/site";

function StatusIndicator() {
  return (
    <span
      className="hidden items-center gap-2 sm:inline-flex"
      title={siteConfig.status.label}
      aria-label={siteConfig.status.label}
    >
      <span className="relative flex h-1.5 w-1.5">
        <span
          className={`absolute inline-flex h-full w-full rounded-full bg-accent ${
            siteConfig.status.live ? "animate-pulse" : ""
          }`}
          aria-hidden
        />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
      </span>
      <span className="font-mono text-index uppercase tracking-[0.14em] text-ink-muted">
        {siteConfig.status.live ? "Online" : "Away"}
        <span className="ml-0.5 inline-block h-3 w-px translate-y-0.5 bg-accent animate-blink" />
      </span>
    </span>
  );
}

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-snappy ease-snap ${
        scrolled
          ? "border-ink/15 bg-paper-raised/95 backdrop-blur-[2px]"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-nav max-w-gallery items-center justify-between px-gutter">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="group flex items-baseline gap-2"
            aria-label={`${siteConfig.name} — home`}
          >
            <span className="font-sans text-sm font-medium tracking-[-0.04em] text-ink transition-colors duration-snappy group-hover:text-accent">
              {siteConfig.mark}
            </span>
            <span className="hidden font-mono text-index text-ink-faint md:inline">
              / GD · DM
            </span>
          </Link>
          <StatusIndicator />
        </div>

        <nav className="hidden items-center gap-0 md:flex" aria-label="Primary">
          {siteConfig.nav.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative px-3 py-2 font-mono text-meta uppercase tracking-[0.1em] text-ink-muted hover:text-ink"
            >
              <span className="mr-1.5 text-ink-faint transition-colors duration-snappy group-hover:text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              {item.label}
              <span className="absolute inset-x-3 bottom-1.5 h-px origin-left scale-x-0 bg-ink transition-transform duration-snappy ease-snap group-hover:scale-x-100" />
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center border border-ink/80 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <span className="flex w-3.5 flex-col gap-1" aria-hidden>
            <span
              className={`h-px w-full bg-ink transition-transform duration-snappy ease-snap ${
                open ? "translate-y-[5px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-px w-full bg-ink transition-opacity duration-snappy ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`h-px w-full bg-ink transition-transform duration-snappy ease-snap ${
                open ? "-translate-y-[5px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {open && (
        <div
          id="mobile-nav"
          className="border-t border-ink/15 bg-paper-raised md:hidden"
        >
          <nav
            className="mx-auto flex max-w-gallery flex-col px-gutter py-4"
            aria-label="Mobile"
          >
            {siteConfig.nav.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-baseline gap-3 border-b border-ink/10 py-4 font-mono text-meta uppercase tracking-[0.1em] text-ink last:border-b-0"
                onClick={() => setOpen(false)}
              >
                <span className="text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
