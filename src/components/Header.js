import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { navLinks } from "../data/content";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const solid = !isHome || scrolled || open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const linkClass = ({ isActive }) =>
    [
      "font-display text-sm font-medium tracking-wide transition",
      solid
        ? isActive
          ? "text-sunrise"
          : "text-river-deep/85 hover:text-river-deep"
        : isActive
          ? "text-sunrise"
          : "text-white/90 hover:text-white",
    ].join(" ");

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-40 transition duration-300",
        solid
          ? "border-b border-river/10 bg-river-foam/95 backdrop-blur"
          : "bg-transparent",
      ].join(" ")}
    >
      <div className="section-shell flex items-center justify-between py-4">
        <Link
          to="/"
          className={[
            "font-display text-sm font-semibold uppercase tracking-[0.18em]",
            solid ? "text-river-deep" : "text-white",
          ].join(" ")}
        >
          RVCC
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
          <Link to="/admissions" className="btn-primary !px-4 !py-2.5">
            Apply
          </Link>
        </nav>

        <button
          type="button"
          className={[
            "inline-flex items-center justify-center rounded-md border px-3 py-2 font-display text-xs font-semibold tracking-wide md:hidden",
            solid
              ? "border-river/25 text-river-deep"
              : "border-white/40 text-white",
          ].join(" ")}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open ? (
        <div
          id="mobile-nav"
          className="border-t border-river/10 bg-river-foam md:hidden"
        >
          <nav
            className="section-shell flex flex-col gap-4 py-5"
            aria-label="Mobile"
          >
            {navLinks.map((link) => (
              <NavLink key={link.to} to={link.to} className={linkClass}>
                {link.label}
              </NavLink>
            ))}
            <Link to="/admissions" className="btn-primary w-fit">
              Apply
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
