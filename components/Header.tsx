"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { candidate } from "@/lib/candidate";
import { AccessibilityLauncher } from "@/components/a11y/AccessibilityPanel";

const NAV_LINKS = [
  { href: "/meet-nick", label: "Meet Nick" },
  { href: "/violet-party", label: "Violet Party" },
  { href: "/issues", label: "Issues" },
  { href: "/how-to-vote", label: "How to Vote" },
  { href: "/endorsements", label: "Endorsements" },
  { href: "/volunteer", label: "Volunteer" },
] as const;

/** Single fixed bar height — keep in sync with spacer + CSS */
const HEADER_H_PX = 80;

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const menuId = useId();
  const [menuOpen, setMenuOpen] = useState(false);
  const [pastHero, setPastHero] = useState(!isHome);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileNavRef = useRef<HTMLElement>(null);

  const transparent = isHome && !pastHero && !menuOpen;

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isHome) {
      setPastHero(true);
      return;
    }

    setPastHero(false);

    const update = () => {
      const hero = document.getElementById("home-hero");
      if (!hero) {
        setPastHero(window.scrollY > 64);
        return;
      }
      // Elevate once the hero has scrolled past the fixed bar
      setPastHero(hero.getBoundingClientRect().bottom <= HEADER_H_PX + 8);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [isHome]);

  useEffect(() => {
    if (!menuOpen) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const nav = mobileNavRef.current;
    nav?.querySelector<HTMLElement>("a, button")?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        setMenuOpen(false);
        menuButtonRef.current?.focus();
        return;
      }
      if (e.key !== "Tab" || !nav) return;
      const focusable = Array.from(nav.querySelectorAll<HTMLElement>("a, button"));
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
    document.body.classList.add("site-header-menu-open");

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      main?.removeAttribute("inert");
      document.body.classList.remove("site-header-menu-open");
      if (document.activeElement === document.body) {
        previouslyFocused?.focus?.();
      }
    };
  }, [menuOpen]);

  function isCurrent(href: string) {
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <>
      <header
        className="site-header"
        data-transparent={transparent ? "true" : "false"}
        data-elevated={transparent ? "false" : "true"}
      >
        <div className="site-header__surface">
          <div className="site-header__inner">
            <Link
              href="/"
              className="site-header__logo"
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

            <nav className="site-header__desktop" aria-label="Primary">
              {NAV_LINKS.map((link) => {
                const current = isCurrent(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={current ? "page" : undefined}
                    className={`site-header__link${current ? " is-current" : ""}`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="site-header__a11y">
                <AccessibilityLauncher tone="onDark" />
              </div>
              <Link href="/how-to-vote" className="btn-primary site-header__cta">
                How to Vote
              </Link>
            </nav>

            <div className="site-header__mobile-actions">
              <div className="site-header__a11y site-header__a11y--compact">
                <AccessibilityLauncher tone="onDark" />
              </div>
              <Link href="/how-to-vote" className="btn-primary site-header__cta-sm">
                How to Vote
              </Link>
              <button
                ref={menuButtonRef}
                type="button"
                className="site-header__menu-btn"
                aria-expanded={menuOpen}
                aria-controls={menuId}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                onClick={() => setMenuOpen((v) => !v)}
              >
                {menuOpen ? (
                  <X className="h-5 w-5" aria-hidden />
                ) : (
                  <Menu className="h-5 w-5" aria-hidden />
                )}
              </button>
            </div>
          </div>

          {menuOpen && (
            <nav
              ref={mobileNavRef}
              id={menuId}
              className="site-header__drawer"
              aria-label="Mobile"
            >
              <ul>
                {NAV_LINKS.map((link) => {
                  const current = isCurrent(link.href);
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        aria-current={current ? "page" : undefined}
                        className={`site-header__drawer-link${current ? " is-current" : ""}`}
                        onClick={() => setMenuOpen(false)}
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

      {/* Reserve space under the fixed bar on non-home pages only */}
      {!isHome && <div className="site-header__spacer" aria-hidden="true" />}
    </>
  );
}
