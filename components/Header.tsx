"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Facebook, Instagram, Menu, Twitter, X, Youtube } from "lucide-react";
import { candidate } from "@/lib/candidate";
import { AccessibilityLauncher } from "@/components/a11y/AccessibilityPanel";

const navLinks = [
  { href: "/meet-nick", label: "Meet Nick" },
  { href: "/violet-party", label: "Violet Party" },
  { href: "/issues", label: "Issues" },
  { href: "/how-to-vote", label: "How to Vote" },
  { href: "/endorsements", label: "Endorsements" },
  { href: "/volunteer", label: "Volunteer" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileNavRef = useRef<HTMLElement>(null);

  /** Home at top of hero: fully transparent. Frosted when scrolled or menu open. */
  const overlay = isHome && !scrolled && !open;

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isHome) {
      setScrolled(false);
      return;
    }
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const nav = mobileNavRef.current;
    const firstLink = nav?.querySelector<HTMLElement>("a, button");
    firstLink?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        menuButtonRef.current?.focus();
        return;
      }
      if (e.key !== "Tab" || !nav) return;
      const focusable = nav.querySelectorAll<HTMLElement>("a, button");
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    const main = document.getElementById("main-content");
    main?.setAttribute("inert", "");

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      main?.removeAttribute("inert");
      if (document.activeElement === document.body) {
        previouslyFocused?.focus?.();
      }
    };
  }, [open]);

  function isCurrent(href: string) {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <header
      className={`z-50 w-full shrink-0 ${
        isHome ? "fixed left-0 right-0 top-0" : "sticky top-0"
      }`}
    >
      {/* Utility strip stays on inner pages only so home header height never jumps */}
      {!isHome && (
        <div className="bg-navy text-white/90">
          <div className="mx-auto flex h-10 max-w-content items-center justify-between gap-3 px-6 md:px-8">
            <p className="truncate text-xs font-medium tracking-wide">
              Independent write-in · {candidate.hometown}, NH · Nov 3, 2026
            </p>
            <div className="flex shrink-0 items-center gap-2">
              <AccessibilityLauncher />
              <ul className="flex items-center gap-1" aria-label="Social media">
                {[
                  { href: candidate.social.facebook, label: "Facebook", Icon: Facebook },
                  { href: candidate.social.x, label: "X", Icon: Twitter },
                  { href: candidate.social.instagram, label: "Instagram", Icon: Instagram },
                  { href: candidate.social.youtube, label: "YouTube", Icon: Youtube },
                ].map(({ href, label, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="inline-flex rounded-cta p-1.5 hover:bg-white/10 hover:text-white"
                      aria-label={`${label} (opens in a new window)`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon className="h-4 w-4" aria-hidden />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      <div
        className={`border-b transition-[background-color,border-color,box-shadow,backdrop-filter,-webkit-backdrop-filter] duration-300 ease-out ${
          overlay
            ? "border-transparent bg-transparent shadow-none backdrop-blur-none"
            : isHome
              ? "border-white/40 bg-warm-white/75 shadow-[0_8px_24px_rgba(17,24,39,0.08)] backdrop-blur-md"
              : "border-slate-line bg-warm-white/95 shadow-none backdrop-blur-sm"
        }`}
      >
        <div className="mx-auto flex h-[4.5rem] max-w-content items-center justify-between gap-4 px-6 sm:h-[5rem] md:px-8">
          <Link
            href="/"
            className={`relative block h-12 w-[10.5rem] shrink-0 transition-[filter] duration-300 sm:h-[3.75rem] sm:w-[13.5rem] ${
              overlay ? "drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)]" : "drop-shadow-none"
            }`}
            aria-label={`${candidate.brandName} — home`}
          >
            <Image
              src="/images/logo.png"
              alt={candidate.brandName}
              fill
              sizes="(max-width: 640px) 168px, 216px"
              className="object-contain object-left"
              priority
            />
          </Link>

          <nav className="hidden min-w-0 items-center gap-0.5 xl:flex" aria-label="Primary">
            {navLinks.map((link) => {
              const current = isCurrent(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={current ? "page" : undefined}
                  className={`rounded-cta px-2.5 py-2 text-sm font-semibold transition-colors duration-300 ${
                    overlay
                      ? current
                        ? "bg-white/15 text-white"
                        : "text-white/90 hover:bg-white/10 hover:text-white"
                      : current
                        ? "nav-link-current"
                        : "text-slate-text hover:bg-granite/50 hover:text-navy"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            {isHome && <AccessibilityLauncher tone={overlay ? "onDark" : "onLight"} />}
            <Link href="/how-to-vote" className="btn-primary ml-2 shrink-0 !px-5 !py-3 text-[0.75rem]">
              How to Vote Write-In →
            </Link>
          </nav>

          <div className="flex shrink-0 items-center gap-2 xl:hidden">
            {isHome && <AccessibilityLauncher tone={overlay ? "onDark" : "onLight"} />}
            <Link href="/how-to-vote" className="btn-primary !px-3 !py-2.5 text-[0.7rem]">
              How to Vote
            </Link>
            <button
              ref={menuButtonRef}
              type="button"
              className={
                overlay
                  ? "inline-flex items-center justify-center rounded-cta border border-white/70 bg-white/10 px-3 py-2.5 text-white backdrop-blur-sm transition-colors duration-300 hover:bg-white/20"
                  : "btn-ghost !px-3 !py-2.5"
              }
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
            </button>
          </div>
        </div>

        {open && (
          <nav
            ref={mobileNavRef}
            id="mobile-nav"
            className="border-t border-slate-line bg-warm-white/95 px-6 py-4 backdrop-blur-md xl:hidden"
            aria-label="Mobile"
          >
            <ul className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const current = isCurrent(link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={current ? "page" : undefined}
                      className={`block rounded-cta px-3 py-3 text-base font-semibold hover:bg-paper ${
                        current ? "nav-link-current" : "text-slate-text"
                      }`}
                      onClick={() => setOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
