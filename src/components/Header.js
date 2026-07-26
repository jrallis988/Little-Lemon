import { useState } from "react";
import { NavLink, Link } from "react-router-dom";

const links = [
  { to: "/academics", label: "Academics" },
  { to: "/admissions", label: "Admissions" },
  { to: "/campus", label: "Campus Life" },
  { to: "/about", label: "About" },
];

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link to="/" className="brand-mark" onClick={() => setOpen(false)}>
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
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                isActive ? "nav-link is-active" : "nav-link"
              }
            >
              {link.label}
            </NavLink>
          ))}
          <Link
            to="/admissions"
            className="btn btn--solid btn--compact"
            onClick={() => setOpen(false)}
          >
            Apply
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
