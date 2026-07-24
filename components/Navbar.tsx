"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  { href: "#approach", label: "Approach" },
  { href: "#curriculum", label: "Curriculum" },
  { href: "#start", label: "Start" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled
          ? "border-b border-line/80 bg-paper/90 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:h-[4.25rem] sm:px-8"
        aria-label="Primary"
      >
        <Link
          href="/"
          className="font-display text-lg font-semibold tracking-tight text-ink transition-opacity hover:opacity-70 sm:text-xl"
        >
          Morgan Bright
        </Link>

        <ul className="flex items-center gap-1 sm:gap-2">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="group relative px-2.5 py-2 font-sans text-sm font-medium text-ink-soft transition-colors hover:text-ink sm:px-3"
              >
                {link.label}
                <span
                  aria-hidden
                  className="absolute inset-x-2.5 bottom-1.5 h-px origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100 sm:inset-x-3"
                />
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
