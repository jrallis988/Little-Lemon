"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  { href: "#pathways", label: "Programs" },
  { href: "#approach", label: "Approach" },
  { href: "#curriculum", label: "Components" },
  { href: "#about", label: "About" },
];

export function Navbar() {
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
      className={`fixed inset-x-0 top-0 z-50 bg-white transition-shadow duration-300 ${
        scrolled || open ? "shadow-card" : "shadow-none"
      }`}
    >
      <div className="border-b border-navy bg-navy text-white">
        <div className="mx-auto flex h-9 max-w-site items-center justify-end gap-5 px-5 text-xs font-medium sm:px-8">
          <a href="#start" className="transition-opacity hover:opacity-80">
            Ordering support
          </a>
          <a href="#start" className="transition-opacity hover:opacity-80">
            Contact sales
          </a>
        </div>
      </div>

      <nav
        className="mx-auto flex h-[4.25rem] max-w-site items-center justify-between px-5 sm:px-8"
        aria-label="Primary"
      >
        <Link
          href="/"
          className="flex items-center gap-2.5 text-navy transition-opacity hover:opacity-80"
          onClick={() => setOpen(false)}
        >
          <span
            aria-hidden
            className="inline-block h-8 w-8 rounded-sm bg-accent shadow-[2px_2px_0_0_#06235b]"
          />
          <span className="text-xl font-bold tracking-tight">Morgan Bright</span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="px-3 py-2 text-sm font-semibold text-ink-soft transition-colors hover:text-accent"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <a href="#curriculum" className="btn-outline !py-2">
            Browse programs
          </a>
          <a href="#start" className="btn-primary !py-2">
            Request quote
          </a>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded border border-line text-navy lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span aria-hidden className="flex flex-col gap-1.5">
            <span
              className={`block h-0.5 w-5 bg-current transition-transform ${
                open ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-5 bg-current transition-opacity ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-5 bg-current transition-transform ${
                open ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </nav>

      {open ? (
        <div
          id="mobile-nav"
          className="border-t border-line bg-white lg:hidden"
        >
          <ul className="mx-auto flex max-w-site flex-col px-5 py-4 sm:px-8">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block border-b border-line py-3.5 text-base font-semibold text-ink"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-3 px-5 pb-6 sm:px-8">
            <a href="#curriculum" className="btn-outline" onClick={() => setOpen(false)}>
              Browse programs
            </a>
            <a href="#start" className="btn-primary" onClick={() => setOpen(false)}>
              Request quote
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
