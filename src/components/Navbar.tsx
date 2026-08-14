"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { company } from "@/data/scripts";

const links = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
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
      className={`fixed inset-x-0 top-0 z-40 transition-[background,border-color,backdrop-filter] duration-300 ${
        scrolled || open
          ? "border-b border-white/10 bg-black/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:h-[4.75rem] md:px-8">
        <a
          href="#top"
          className="relative block h-9 w-[9.5rem] transition-opacity hover:opacity-90 md:h-11 md:w-[12.5rem]"
          aria-label={`${company.name} — home`}
        >
          <Image
            src={company.logo}
            alt={company.name}
            fill
            className="object-contain object-left"
            sizes="200px"
            priority
          />
        </a>

        <nav className="hidden items-center gap-10 md:flex" aria-label="Primary">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm tracking-[0.16em] text-muted uppercase transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="relative flex h-10 w-10 items-center justify-center md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          <span
            className={`absolute h-px w-5 bg-foreground transition-transform duration-300 ${
              open ? "rotate-45" : "-translate-y-1.5"
            }`}
          />
          <span
            className={`absolute h-px w-5 bg-foreground transition-opacity duration-200 ${
              open ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`absolute h-px w-5 bg-foreground transition-transform duration-300 ${
              open ? "-rotate-45" : "translate-y-1.5"
            }`}
          />
        </button>
      </div>

      <div
        id="mobile-nav"
        className={`border-t border-white/10 bg-black md:hidden ${
          open ? "block" : "hidden"
        }`}
      >
        <nav className="flex flex-col px-5 py-6" aria-label="Mobile">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="py-3 font-display text-3xl text-foreground"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
