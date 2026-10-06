"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, User, X } from "lucide-react";
import { PlanetFitnessLogo } from "@/components/brand-logo";
import { Button } from "@/components/ui/button";

const NAV = [
  { href: "/#pricing", label: "Memberships", dropdown: false },
  { href: "/#welcome", label: "Why PF", dropdown: true },
  { href: "/#workout-guides", label: "Work Out With Us", dropdown: true },
  { href: "/#summer-pass", label: "PF Store", dropdown: false },
  { href: "/product", label: "Product", dropdown: false },
];

function UsFlag({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 12" className={className} aria-hidden>
      <rect width="16" height="12" fill="#B22234" />
      <rect y="1" width="16" height="1" fill="#fff" />
      <rect y="3" width="16" height="1" fill="#fff" />
      <rect y="5" width="16" height="1" fill="#fff" />
      <rect y="7" width="16" height="1" fill="#fff" />
      <rect y="9" width="16" height="1" fill="#fff" />
      <rect y="11" width="16" height="1" fill="#fff" />
      <rect width="7" height="6.5" fill="#3C3B6E" />
    </svg>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-white text-pf-ink">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 md:px-6">
        <div className="flex min-w-0 items-center gap-5">
          <Link href="/" className="shrink-0" onClick={() => setOpen(false)}>
            <PlanetFitnessLogo />
          </Link>
          <nav aria-label="Primary" className="hidden items-center gap-0.5 lg:flex">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium text-pf-ink/85 transition hover:bg-pf-mist hover:text-pf-purple focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pf-purple"
              >
                {item.label}
                {item.dropdown ? (
                  <ChevronDown className="h-3.5 w-3.5 opacity-70" aria-hidden />
                ) : null}
              </Link>
            ))}
          </nav>
        </div>

        <nav aria-label="Account" className="flex items-center gap-1">
          <span className="hidden items-center gap-1.5 px-2 text-sm text-pf-ink/75 md:inline-flex">
            <UsFlag className="h-3 w-4 rounded-[1px]" />
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
              { href: "/app", label: "My Account", dropdown: false },
              { href: "/join", label: "Join Now", dropdown: false },
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
