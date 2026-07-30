import { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";

const primaryLinks = [
  { to: "/academics", label: "Academics" },
  { to: "/admissions", label: "Admissions" },
  { to: "/financial-aid", label: "Financial Aid" },
  { to: "/campus", label: "Campus Life" },
  { to: "/workforce", label: "Workforce Education" },
  { to: "/about", label: "About" },
];

const utilityLinks = [
  { href: "https://lynx.nhti.edu/", label: "Current Students", external: true },
  {
    href: "https://www.nhti.edu/contact-us/departments/",
    label: "Departments",
    external: true,
  },
  {
    href: "https://www.nhti.edu/directory/",
    label: "Directory",
    external: true,
  },
  {
    href: "https://givenhcc.org/where-to-give/nhti/",
    label: "Donate",
    external: true,
  },
  {
    href: "https://www.nhti.edu/contact-us/",
    label: "Contact Us",
    external: true,
  },
];

function Header() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function closeMenu() {
    setOpen(false);
    setSearchOpen(false);
  }

  function handleSearch(event) {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    closeMenu();
    navigate(`/academics?q=${encodeURIComponent(trimmed)}`);
    setQuery("");
  }

  return (
    <header className="site-header">
      <div className="utility-bar" aria-label="Quick links">
        <div className="utility-bar__inner">
          {utilityLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      <div className="header-inner">
        <Link to="/" className="brand-mark" onClick={closeMenu}>
          <img
            className="brand-mark__seal"
            src="/brand/nhti-seal-256.png"
            alt=""
            width="52"
            height="52"
          />
          <span className="brand-mark__text">
            <strong>NHTI</strong>
            <span>Concord&apos;s Community College</span>
          </span>
        </Link>

        <button
          className="nav-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="primary-nav"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">Menu</span>
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>

        <nav
          id="primary-nav"
          className={`primary-nav ${open ? "is-open" : ""}`}
          aria-label="Primary"
        >
          <div className="primary-nav__main">
            {primaryLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={closeMenu}
                className={({ isActive }) =>
                  isActive ? "nav-link is-active" : "nav-link"
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          <div className="primary-nav__utility" aria-label="More links">
            {utilityLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                onClick={closeMenu}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="primary-nav__actions">
            <button
              type="button"
              className="nav-search-toggle"
              aria-expanded={searchOpen}
              aria-controls="nav-search"
              onClick={() => setSearchOpen((value) => !value)}
            >
              <span className="sr-only">Search</span>
              <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                <circle
                  cx="11"
                  cy="11"
                  r="7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M16.5 16.5 21 21"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            <Link
              to="/admissions"
              className="btn btn--solid btn--compact"
              onClick={closeMenu}
            >
              Apply
            </Link>
          </div>

          {searchOpen ? (
            <form
              id="nav-search"
              className="nav-search"
              role="search"
              onSubmit={handleSearch}
            >
              <label className="sr-only" htmlFor="nav-search-input">
                Search programs
              </label>
              <input
                id="nav-search-input"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search programs…"
                autoFocus
              />
              <button type="submit" className="btn btn--solid btn--compact">
                Search
              </button>
            </form>
          ) : null}
        </nav>
      </div>
    </header>
  );
}

export default Header;
