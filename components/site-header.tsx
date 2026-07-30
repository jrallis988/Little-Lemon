"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { PlanetFitnessLogo } from "@/components/brand-logo";
import { Button } from "@/components/ui/button";

const NAV = [
  { href: "#clubs", label: "Find a Club" },
  { href: "#pricing", label: "Memberships" },
  { href: "#summer-pass", label: "Summer Pass" },
  { href: "#tour", label: "Virtual Tour" },
  { href: "/join", label: "Join Now" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-white/95 text-pf-ink backdrop-blur-md">
      <div className="flex h-14 items-center justify-between gap-3 px-4 md:px-6">
        <Link href="/" className="shrink-0" onClick={() => setOpen(false)}>
          <PlanetFitnessLogo />
        </Link>
        <nav aria-label="Primary" className="flex items-center gap-1">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="hidden text-pf-ink hover:bg-pf-mist hover:text-pf-purple md:inline-flex"
          >
            <a href="#clubs">Find a Club</a>
          </Button>
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="hidden text-pf-ink hover:bg-pf-mist hover:text-pf-purple sm:inline-flex"
          >
            <a href="#pricing">Memberships</a>
          </Button>
          <Button asChild variant="purple" size="sm">
            <Link href="/join">Join Now</Link>
          </Button>
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-pf-ink hover:bg-pf-mist md:hidden"
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
          className="border-t border-pf-line bg-white px-4 py-3 md:hidden"
        >
          <ul className="space-y-1">
            {NAV.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-pf-ink hover:bg-pf-mist hover:text-pf-purple"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
