import { useEffect, useState } from "react";
import { SITE } from "../data";

const LINKS = [
  { href: "#rooms", label: "Rooms" },
  { href: "#rates", label: "Rates" },
  { href: "#reviews", label: "Reviews" },
  { href: "#location", label: "Location" },
  { href: "#booking", label: "Book" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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

  const close = () => setOpen(false);

  return (
    <>
      <header className={`nav${scrolled || open ? " is-scrolled" : ""}`}>
        <div className="nav__inner">
          <a className="nav__brand" href="#top" onClick={close}>
            <img className="nav__mark" src="/icon.svg" alt="" width="36" height="36" />
            <span>{SITE.name}</span>
          </a>

          <ul className="nav__links">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>

          <a
            className="btn btn-primary nav__cta"
            href={SITE.bookingUrl}
            target="_blank"
            rel="noreferrer"
          >
            Book a stay
          </a>

          <button
            className="nav__menu-btn"
            type="button"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <span className={`nav__burger${open ? " is-open" : ""}`} aria-hidden="true" />
          </button>
        </div>
      </header>

      <nav
        id="mobile-nav"
        className={`nav__drawer${open ? " is-open" : ""}`}
        aria-label="Mobile"
      >
        {LINKS.map((link) => (
          <a key={link.href} href={link.href} onClick={close}>
            {link.label}
          </a>
        ))}
        <a
          className="btn btn-ocean"
          href={SITE.bookingUrl}
          target="_blank"
          rel="noreferrer"
          onClick={close}
        >
          Book a stay
        </a>
      </nav>
    </>
  );
}
