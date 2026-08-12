"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  const isHome = pathname === "/";
  const menuId = useId();
  const [open, setOpen] = useState(false);
  const [elevated, setElevated] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", open);
    return () => document.body.classList.remove("overflow-hidden");
  }, [open]);

  useEffect(() => {
    const onScroll = () => setElevated(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`header style-1${elevated || !isHome ? " fixed-top-menu" : ""}`}
    >
      <div className="container">
        <nav className="navbar navbar-expand-lg p-lg-0">
          <Link className="navbar-brand logo" href="/" aria-label={candidate.brandName}>
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
