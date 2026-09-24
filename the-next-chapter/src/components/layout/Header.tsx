"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "/books", label: "Fall Books" },
  { href: "/find-a-book", label: "Find a Book" },
  { href: "/fall-reading-week", label: "Fall Reading Week" },
  { href: "/educators", label: "Educators" },
  { href: "/newsletter", label: "Newsletter" },
  { href: "/campaign", label: "Campaign" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-cream/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 md:px-8">
        <Link
          href="/"
          className="group flex items-center gap-3"
          aria-label="The Next Chapter — Home"
        >
          <span
            className="flex h-9 w-9 items-center justify-center bg-forest text-amber"
            aria-hidden="true"
          >
            <span className="font-display text-sm font-extrabold">N</span>
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-xs font-bold uppercase tracking-[0.22em] text-burgundy transition-colors group-hover:text-burgundy-dark">
              The Next Chapter
            </span>
            <span className="mt-0.5 font-accent text-[0.65rem] uppercase tracking-[0.15em] text-ink-muted">
              Fall 2026
            </span>
          </span>
        </Link>

        <nav aria-label="Main navigation" className="hidden lg:block">
          <ul className="flex items-center gap-0.5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`px-2.5 py-2 font-display text-[0.7rem] font-bold uppercase tracking-wider transition-colors xl:px-3 ${
                    isActive(link.href)
                      ? "text-burgundy underline decoration-amber decoration-2 underline-offset-8"
                      : "text-ink-muted hover:text-burgundy"
                  }`}
                  aria-current={isActive(link.href) ? "page" : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="font-display text-xs font-bold uppercase tracking-wider text-ink lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile navigation"
          className="animate-fade-in border-t border-line bg-paper lg:hidden"
        >
          <ul className="mx-auto max-w-7xl px-5 py-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`block py-3 font-display text-xs font-bold uppercase tracking-wider ${
                    isActive(link.href) ? "text-burgundy" : "text-ink-muted"
                  }`}
                  aria-current={isActive(link.href) ? "page" : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
