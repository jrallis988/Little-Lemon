import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

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
            <li>
              <NavLink to="/" end>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/academy-rock">Series</NavLink>
            </li>
            <li>
              <a href="#brands">Movies</a>
            </li>
            <li>
              <a href="#originals">Originals</a>
            </li>
            <li>
              <NavLink to="/#brands" className="nav-jr">
                Disney Jr
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="nav-actions">
          <button type="button" className="nav-icon-btn" aria-label="Search">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
              <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
          <button type="button" className="nav-profile" aria-label="Profile">
            <span>JR</span>
          </button>
        </div>
      </div>
    </header>
  );
}
