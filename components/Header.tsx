"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { candidate } from "@/lib/candidate";

/** Right-side nav tabs — order locked to campaign request */
const NAV_LINKS = [
  { href: "/meet-nick", label: "Meet Nick" },
  { href: "/violet-party", label: "Violet Party" },
  { href: "/issues", label: "Issues" },
  { href: "/how-to-vote", label: "How to Vote" },
  { href: "/shop", label: "Store" },
  { href: "/volunteer", label: "Volunteer" },
] as const;

function linkActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";
  const menuId = useId();
  const [open, setOpen] = useState(false);
  const [pastHero, setPastHero] = useState(!isHome);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", open);
    return () => document.body.classList.remove("overflow-hidden");
  }, [open]);

  useEffect(() => {
    if (!isHome) {
      setPastHero(true);
      return;
    }

    const update = () => {
      const hero = document.getElementById("home-hero");
      if (!hero) {
        setPastHero(window.scrollY > 48);
        return;
      }
      const bottom = hero.getBoundingClientRect().bottom;
      // Stay transparent while hero still fills the area under the fixed nav
      setPastHero(bottom <= 72);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [isHome]);

  function goHome(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    setOpen(false);
    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    router.push("/");
  }

  const solid = pastHero || open || !isHome;

  return (
    <header
      className={`header style-1 site-header${solid ? " is-solid" : " is-over-hero"}`}
    >
      <div className="container">
        <nav className="navbar navbar-expand-lg p-lg-0">
          <Link
            className="navbar-brand logo site-logo-link"
            href="/"
            prefetch
            aria-label={`${candidate.brandName} — Home`}
            onClick={goHome}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/theme/assets/images/logo/varga-logo.png" alt={candidate.brandName} />
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            aria-controls={menuId}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className={`fa ${open ? "fa-times" : "fa-bars"}`} aria-hidden />
          </button>

          <div
            className={`navbar-collapse neta-nav-collapse justify-content-end${open ? " is-open" : ""}`}
            id={menuId}
          >
            <ul className="nav navbar-nav ml-auto">
              {NAV_LINKS.map((item) => {
                const active = linkActive(pathname, item.href);
                return (
                  <li key={item.href} className={active ? "active" : undefined}>
                    <Link href={item.href} onClick={() => setOpen(false)}>
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}
