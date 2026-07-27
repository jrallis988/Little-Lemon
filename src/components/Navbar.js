import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const links = [
  {
    to: "/",
    end: true,
    label: "Home",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 3.2 3 11h2.5v9h5v-6h3v6h5v-9H21L12 3.2z" />
      </svg>
    ),
  },
  {
    to: "/disney-jr",
    label: "Search",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="2" />
        <path d="M20 20l-3.2-3.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    to: "/disney-jr",
    label: "Watchlist",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    to: "/",
    hash: "#originals",
    label: "Originals",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2.5 14.4 9h6.6l-5.3 4 2 6.5L12 15.8 6.3 19.5l2-6.5L3 9h6.6L12 2.5z" />
      </svg>
    ),
  },
  {
    to: "/disney-jr",
    label: "Movies",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M3 5h18v14H3V5zm2 2v2h2V7H5zm0 4v2h2v-2H5zm0 4v2h2v-2H5zm12-8v2h2V7h-2zm0 4v2h2v-2h-2zm0 4v2h2v-2h-2z" />
      </svg>
    ),
  },
  {
    to: "/academy-rock",
    label: "Series",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M3 6h18v12H3V6zm2 2v8h14V8H5zm3 10h8v2H8v-2z" />
      </svg>
    ),
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`top-nav${scrolled ? " scrolled" : ""}`}>
      <div className="top-nav-inner">
        <NavLink to="/" className="brand-plus" aria-label="Disney+ home">
          <span className="brand-plus-word">Disney+</span>
        </NavLink>
        <nav aria-label="Primary">
          <ul className="nav-links">
            {links.map((link) => (
              <li key={link.label}>
                {link.hash ? (
                  <a href={`/${link.hash}`}>
                    <span className="nav-icon">{link.icon}</span>
                    {link.label}
                  </a>
                ) : (
                  <NavLink to={link.to} end={link.end}>
                    <span className="nav-icon">{link.icon}</span>
                    {link.label}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <div className="nav-actions">
          <NavLink to="/disney-jr" className="nav-jr-chip" aria-label="Disney Jr hub">
            Disney Jr.
          </NavLink>
          <button type="button" className="nav-profile" aria-label="Profile">
            <span>JR</span>
          </button>
        </div>
      </div>
    </header>
  );
}
