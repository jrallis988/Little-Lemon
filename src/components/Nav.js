import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const links = [
  { to: "/#work", label: "Work" },
  { to: "/#play", label: "Play" },
  { to: "/#about", label: "About" },
  { to: "/#bring", label: "Bring" },
  { to: "/#skills", label: "Toolkit" },
  { to: "/#contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

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

  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.hash]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? "bg-ink/90 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="container flex h-16 items-center justify-between lg:h-20">
        <Link
          to="/"
          className="font-display text-lg font-bold tracking-brand text-chalk transition-colors hover:text-foam-soft"
          onClick={() => setOpen(false)}
        >
          James Rallis
        </Link>

        <nav className="hidden items-center gap-4 lg:gap-6 md:flex" aria-label="Primary">
          {links.map((link) => (
            <Link key={link.to} to={link.to} className="nav-link text-sm font-medium text-sand">
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center border border-sand/25 text-chalk md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? "Close" : "Menu"}</span>
          <span className="relative block h-3.5 w-5">
            <span
              className={`absolute left-0 top-0 h-0.5 w-full bg-current transition-transform ${
                open ? "translate-y-1.5 rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 h-0.5 w-full bg-current transition-opacity ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 top-3 h-0.5 w-full bg-current transition-transform ${
                open ? "-translate-y-1.5 -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      <div
        id="mobile-nav"
        className={`border-t border-sand/10 bg-ink/95 md:hidden ${open ? "block" : "hidden"}`}
      >
        <nav className="container flex flex-col gap-1 py-4" aria-label="Mobile">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="py-3 font-display text-2xl font-semibold text-chalk"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/about"
            className="py-3 font-display text-2xl font-semibold text-foam-soft"
            onClick={() => setOpen(false)}
          >
            About (full)
          </Link>
        </nav>
      </div>
    </header>
  );
}
