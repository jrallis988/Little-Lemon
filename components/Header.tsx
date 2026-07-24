"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { candidate } from "@/lib/candidate";

const navLinks = [
  { href: "/#issues", label: "Issues" },
  { href: "/#events", label: "Events" },
  { href: "/#meet", label: "Meet Morgan" },
  { href: "/#action", label: "Take Action" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-granite-200/80 bg-snow/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-content items-center justify-between gap-4 px-5 py-3.5 sm:px-8">
        <Link
          href="/"
          className="group flex flex-col leading-tight"
          aria-label={`${candidate.fullName} for ${candidate.office} — home`}
        >
          <span className="font-serif text-lg font-bold tracking-tight text-granite-800 sm:text-xl">
            {candidate.fullName}
          </span>
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-pine-600">
            for {candidate.office}
          </span>
        </Link>

        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="Primary"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-sm px-3 py-2 text-sm font-semibold text-granite-600 transition-colors hover:bg-mist hover:text-pine-700"
            >
              {link.label}
            </Link>
          ))}
          <Link href="/#donate" className="btn-accent ml-2 px-4 py-2 text-sm">
            Chip In
          </Link>
        </nav>

        <button
          type="button"
          className="btn-ghost px-3 py-2 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          className="border-t border-granite-200 bg-snow px-5 py-4 md:hidden"
          aria-label="Mobile"
        >
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block rounded-sm px-3 py-3 text-base font-semibold text-granite-700 hover:bg-mist"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link
                href="/#donate"
                className="btn-accent w-full"
                onClick={() => setOpen(false)}
              >
                Chip In
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
