import { useEffect, useState } from "react";
import { ApexLogo } from "./ApexLogo";
import { navLinks } from "../data/content";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
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
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="site-header__inner">
        <a className="site-header__brand" href="#top" aria-label="APEX Hockey — top">
          <ApexLogo />
        </a>
        <button
          className="nav-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="case-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <span />
          <span />
          <span />
        </button>
        <nav id="case-nav" className={`site-nav ${open ? "is-open" : ""}`} aria-label="Case study">
          <ul>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={() => setOpen(false)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a className="btn site-nav__cta" href="#key-visual" onClick={() => setOpen(false)}>
            View Campaign
          </a>
        </nav>
      </div>
    </header>
  );
}
