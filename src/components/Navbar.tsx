"use client";

import Image from "next/image";
import { useEffect, useId, useState } from "react";
import { company, writer } from "@/data/scripts";

const links = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuId = useId();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
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

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  function closeMenu() {
    setOpen(false);
  }

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[80] transition-[background-color,border-color,backdrop-filter] duration-300 ${
          open
            ? "border-b border-transparent bg-transparent"
            : scrolled
              ? "border-b border-white/10 bg-black/90 backdrop-blur-md"
              : "border-b border-transparent bg-black/40 backdrop-blur-sm"
        }`}
      >
        <div className="mx-auto flex h-[4.25rem] max-w-6xl items-center justify-between gap-4 px-4 sm:px-5 md:h-[4.75rem] md:px-8">
          <a
            href="#top"
            onClick={closeMenu}
            className="relative z-[81] flex shrink-0 items-center gap-3"
            aria-label={`${company.name} — home`}
          >
            <span className="relative flex h-11 w-11 items-center justify-center sm:h-12 sm:w-12 md:h-14 md:w-14">
              <Image
                src={company.mark}
                alt=""
                width={112}
                height={112}
                className="h-full w-full object-contain drop-shadow-[0_0_12px_rgba(255,61,184,0.35)]"
                sizes="56px"
                priority
              />
            </span>
            <span className="hidden flex-col leading-none sm:flex">
              <span className="text-[0.65rem] tracking-[0.22em] text-muted uppercase">
                East Coast
              </span>
              <span className="font-display text-lg tracking-wide text-foreground md:text-xl">
                {company.shortName}
              </span>
            </span>
          </a>

          <nav
            className="relative z-[81] hidden items-center gap-8 lg:gap-10 md:flex"
            aria-label="Primary"
          >
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
            className="relative z-[82] -mr-1 flex h-11 w-11 shrink-0 items-center justify-center md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? (
              <span aria-hidden="true" className="relative block h-5 w-5">
                <span className="absolute top-1/2 left-0 h-px w-5 -translate-y-1/2 rotate-45 bg-foreground" />
                <span className="absolute top-1/2 left-0 h-px w-5 -translate-y-1/2 -rotate-45 bg-foreground" />
              </span>
            ) : (
              <span aria-hidden="true" className="relative block h-4 w-5">
                <span className="absolute top-0 left-0 h-px w-5 bg-foreground" />
                <span className="absolute top-1/2 left-0 h-px w-5 -translate-y-1/2 bg-foreground" />
                <span className="absolute bottom-0 left-0 h-px w-5 bg-foreground" />
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Full-screen mobile menu — King-style overlay, not a dropdown under the bar */}
      <div
        id={menuId}
        className={`fixed inset-0 z-[70] md:hidden transition-[opacity,visibility] duration-300 ease-out ${
          open
            ? "visible opacity-100"
            : "invisible pointer-events-none opacity-0"
        }`}
        aria-hidden={!open}
      >
        <div className="absolute inset-0 bg-[#050508]" />
        <div
          className="absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(ellipse 80% 55% at 15% 0%, rgba(90, 40, 90, 0.35), transparent 55%), radial-gradient(ellipse 70% 60% at 95% 100%, rgba(70, 45, 95, 0.45), transparent 50%)",
          }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-[0.06] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
          aria-hidden="true"
        />

        <nav
          className="relative z-10 flex h-full flex-col px-6 pb-10 pt-[5.5rem] sm:px-8"
          aria-label="Mobile"
        >
          <ul className="flex flex-1 flex-col justify-center gap-2">
            {links.map((link, index) => (
              <li
                key={link.href}
                className={`transition-all duration-500 ${
                  open
                    ? "translate-y-0 opacity-100"
                    : "translate-y-3 opacity-0"
                }`}
                style={{ transitionDelay: open ? `${120 + index * 70}ms` : "0ms" }}
              >
                <a
                  href={link.href}
                  onClick={closeMenu}
                  className="block py-3 font-display text-[2.75rem] leading-none text-foreground transition-colors hover:text-accent sm:text-6xl"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div
            className={`mt-auto border-t border-white/10 pt-6 transition-opacity duration-500 ${
              open ? "opacity-100 delay-300" : "opacity-0"
            }`}
          >
            <p className="font-[family-name:var(--font-script)] text-sm text-muted">
              {writer.name}
            </p>
            <a
              href="#contact"
              onClick={closeMenu}
              className="mt-4 inline-flex text-sm tracking-[0.16em] text-accent uppercase transition-colors hover:text-foreground"
            >
              Request Pages →
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
