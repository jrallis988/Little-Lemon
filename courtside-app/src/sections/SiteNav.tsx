import { useEffect, useState } from "react";
import { Logo } from "../components/Logo";
import { chapters } from "../data/brand";
import "./SiteNav.css";

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`site-nav ${scrolled ? "site-nav--scrolled" : ""}`}
      aria-label="Case study chapters"
    >
      <div className="site-nav__bar wrap-wide">
        <a href="#top" className="site-nav__brand" onClick={() => setOpen(false)}>
          <Logo inverted />
        </a>
        <button
          type="button"
          className="site-nav__toggle btn btn--ghost"
          aria-expanded={open}
          aria-controls="site-nav-panel"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Chapters"}
        </button>
        <div
          id="site-nav-panel"
          className={`site-nav__panel ${open ? "is-open" : ""}`}
        >
          <ul>
            {chapters.map((c) => (
              <li key={c.id}>
                <a href={`#${c.id}`} onClick={() => setOpen(false)}>
                  {c.num} {c.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
