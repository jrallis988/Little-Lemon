import { useEffect, useState } from "react";
import { SITE, asset } from "../data";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#rooms", label: "Rooms" },
  { href: "#rates", label: "Rates" },
  { href: "#reviews", label: "Reviews" },
  { href: "#location", label: "Explore" },
  { href: "#faq", label: "FAQ" },
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
          <div className="nav__left">
            <a className="nav__brand" href="#top" onClick={close} aria-label={`${SITE.name} home`}>
              <img
                className="nav__logo"
                src={asset("/seascape-inn-logo.png")}
                alt={SITE.name}
                width="180"
                height="48"
              />
            </a>

            <ul className="nav__links">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

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
        <a className="btn btn-ocean" href="#rates" onClick={close}>
          See rates & book
        </a>
      </nav>
    </>
  );
}
