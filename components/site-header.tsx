"use client";

import { useState } from "react";
import Link from "next/link";
import { Globe2, Menu, User, X } from "lucide-react";
import { PlanetFitnessLogo } from "@/components/brand-logo";
import { Button } from "@/components/ui/button";

const NAV = [
  { href: "/#pricing", label: "Memberships" },
  { href: "/#welcome", label: "Why PF" },
  { href: "/#workout-guides", label: "Work Out With Us" },
  { href: "/#summer-pass", label: "PF Store" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-white text-pf-ink">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 md:px-6">
        <div className="flex min-w-0 items-center gap-5">
          <Link href="/" className="shrink-0" onClick={() => setOpen(false)}>
            <PlanetFitnessLogo />
          </Link>
          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-3 py-2 text-sm font-medium text-pf-ink/85 transition hover:bg-pf-mist hover:text-pf-purple"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <nav aria-label="Account" className="flex items-center gap-1">
          <span className="hidden items-center gap-1.5 px-2 text-sm text-pf-ink/70 md:inline-flex">
            <Globe2 className="h-4 w-4" aria-hidden />
            English
          </span>
          <Link
            href="/app"
            className="hidden items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-pf-ink/85 transition hover:bg-pf-mist hover:text-pf-purple sm:inline-flex"
          >
            <User className="h-4 w-4" aria-hidden />
            My Account
          </Link>
          <Button asChild variant="purple" size="sm">
            <Link href="/join">Join Now</Link>
          </Button>
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-pf-ink hover:bg-pf-mist lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="border-t border-pf-line bg-white px-4 py-3 lg:hidden"
        >
          <ul className="space-y-1">
            {[
              ...NAV,
              { href: "/app", label: "My Account" },
              { href: "/join", label: "Join Now" },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-pf-ink hover:bg-pf-mist hover:text-pf-purple"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
