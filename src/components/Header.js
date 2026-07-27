import { useEffect, useMemo, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { navLinks, programs, utilityLinks } from "../data/content";
import Logo from "./Logo";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isHome = pathname === "/";
  const solid = !isHome || scrolled || open || searchOpen;

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return programs
      .filter(
        (program) =>
          program.name.toLowerCase().includes(q) ||
          program.area.toLowerCase().includes(q) ||
          program.summary.toLowerCase().includes(q)
      )
      .slice(0, 6);
  }, [query]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setSearchOpen(false);
    setQuery("");
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

  function handleSearchSubmit(event) {
    event.preventDefault();
    if (results[0]) {
      navigate(`/programs/${results[0].slug}`);
      setSearchOpen(false);
      setQuery("");
    }
  }

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-40 transition duration-300",
        solid
          ? "border-b border-river/10 bg-river-foam/95 backdrop-blur"
          : "bg-gradient-to-b from-river-deep/75 via-river-deep/35 to-transparent",
      ].join(" ")}
    >
      <div
        className={[
          "hidden border-b text-xs md:block",
          solid
            ? "border-river/10 bg-river-mist/80 text-granite-muted"
            : "border-white/10 text-white/75",
        ].join(" ")}
      >
        <div className="section-shell flex items-center justify-between py-2">
          <p>Claremont · Keene · Lebanon</p>
          <div className="flex items-center gap-5">
            {utilityLinks.map((link) =>
              link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="transition hover:text-sunrise"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  to={link.to}
                  className="transition hover:text-sunrise"
                >
                  {link.label}
                </Link>
              )
            )}
          </div>
        </div>
      </div>

      <div className="section-shell flex items-center justify-between py-3.5">
        <Link to="/" aria-label="River Valley Community College home">
          <Logo solid={solid} />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
          <button
            type="button"
            className={[
              "font-display text-sm font-medium tracking-wide transition",
              solid ? "text-river-deep/85 hover:text-river-deep" : "text-white/90 hover:text-white",
            ].join(" ")}
            onClick={() => setSearchOpen((value) => !value)}
            aria-expanded={searchOpen}
          >
            Search
          </button>
          <Link to="/admissions" className="btn-primary !px-4 !py-2.5">
            Apply
          </Link>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            className={[
              "inline-flex items-center justify-center rounded-md border px-3 py-2 font-display text-xs font-semibold tracking-wide",
              solid
                ? "border-river/25 text-river-deep"
                : "border-white/40 text-white",
            ].join(" ")}
            onClick={() => setSearchOpen((value) => !value)}
          >
            Search
          </button>
          <button
            type="button"
            className={[
              "inline-flex items-center justify-center rounded-md border px-3 py-2 font-display text-xs font-semibold tracking-wide",
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
      </div>

      {searchOpen ? (
        <div className="border-t border-river/10 bg-river-foam">
          <form
            onSubmit={handleSearchSubmit}
            className="section-shell py-4"
            role="search"
          >
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-river-deep">
                Search programs
              </span>
              <input
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Try nursing, cybersecurity, accounting…"
                className="w-full rounded-md border border-river/20 bg-white px-3 py-2.5 outline-none ring-sunrise/40 focus:ring-2"
              />
            </label>
            {results.length > 0 ? (
              <ul className="mt-3 divide-y divide-river/10 border border-river/10 bg-white">
                {results.map((program) => (
                  <li key={program.slug}>
                    <Link
                      to={`/programs/${program.slug}`}
                      className="block px-4 py-3 transition hover:bg-river-mist"
                      onClick={() => {
                        setSearchOpen(false);
                        setQuery("");
                      }}
                    >
                      <span className="font-medium text-river-deep">
                        {program.name}
                      </span>
                      <span className="mt-1 block text-sm text-granite-muted">
                        {program.area}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </form>
        </div>
      ) : null}

      {open ? (
        <div
          id="mobile-nav"
          className="border-t border-river/10 bg-river-foam lg:hidden"
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
            {utilityLinks.map((link) =>
              link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="font-display text-sm font-medium text-river-deep/85"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  to={link.to}
                  className="font-display text-sm font-medium text-river-deep/85"
                >
                  {link.label}
                </Link>
              )
            )}
            <Link to="/admissions" className="btn-primary w-fit">
              Apply
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
