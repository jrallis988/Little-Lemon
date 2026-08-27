import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { primaryNav } from "../data/navigation";

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="utility-bar">
        <div className="utility-inner">
          <Link to="/about/support">Donate</Link>
          <Link to="/contact">Contact</Link>
          <a href="https://mygbcc.greatbay.edu/" target="_blank" rel="noreferrer">
            Current Students
          </a>
          <Link to="/directory">Faculty/Staff</Link>
          <a
            className="utility-mygbcc"
            href="https://mygbcc.greatbay.edu/"
            target="_blank"
            rel="noreferrer"
          >
            MyGBCC
          </a>
        </div>
      </div>

      <div className="header-inner">
        <Link to="/" className="brand" onClick={() => setOpen(false)}>
          <img
            className="brand-logo"
            src="/images/gbcc-logo-header.png"
            alt="Great Bay Community College"
            width="220"
            height="69"
          />
        </Link>

        <button
          className={`nav-toggle ${open ? "is-open" : ""}`}
          type="button"
          aria-expanded={open}
          aria-controls="primary-nav"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">Menu</span>
          <span />
          <span />
          <span />
        </button>

        <nav
          id="primary-nav"
          className={`primary-nav ${open ? "is-open" : ""}`}
          aria-label="Primary"
        >
          <ul className="nav-list">
            {primaryNav.map((item) => (
              <li
                key={item.to}
                className={item.groups ? "has-children has-mega" : undefined}
              >
                <NavLink to={item.to} onClick={() => setOpen(false)}>
                  {item.label}
                </NavLink>
                {item.groups ? (
                  <div className="nav-mega" role="region" aria-label={`${item.label} menu`}>
                    {item.groups.map((group) => (
                      <div key={group.title} className="nav-mega-group">
                        <p className="nav-mega-title">{group.title}</p>
                        <ul>
                          {group.links.map((child) => (
                            <li key={child.to + child.label}>
                              <Link to={child.to} onClick={() => setOpen(false)}>
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ) : null}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
