import { useEffect, useState } from "react";
import { Logo } from "../components/Logo";
import "./SiteNav.css";

const primary = [
  { id: "challenge", label: "Case" },
  { id: "brand", label: "Brand" },
  { id: "channel", label: "Channel" },
  { id: "series", label: "Series" },
  { id: "thumbnails", label: "Thumbs" },
  { id: "compare", label: "Compare" },
  { id: "interview", label: "Packages" },
  { id: "motion", label: "Motion" },
  { id: "shorts", label: "Shorts" },
  { id: "performance", label: "Perf" },
];

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
      aria-label="Case study"
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
          {open ? "Close" : "Menu"}
        </button>
        <div
          id="site-nav-panel"
          className={`site-nav__panel ${open ? "is-open" : ""}`}
        >
          <ul>
            {primary.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} onClick={() => setOpen(false)}>
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
