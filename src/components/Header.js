import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

const navItems = [
  {
    label: "Academics",
    to: "/academics",
    children: [
      { to: "/academics", label: "Our Programs" },
      { to: "/academics/resources", label: "Academic Resources" },
      { to: "/academics/calendar", label: "Calendar & Schedule" },
      { to: "/directory", label: "Faculty Directory" },
    ],
  },
  {
    label: "Admissions & Aid",
    to: "/admissions",
    children: [
      { to: "/admissions/how-to-apply", label: "How to Apply" },
      { to: "/admissions/visit", label: "Visit Campus" },
      { to: "/admissions/tuition", label: "Tuition" },
      { to: "/admissions/financial-aid", label: "Financial Aid" },
    ],
  },
  {
    label: "Student Experience",
    to: "/student-experience",
  },
  {
    label: "Workforce Development",
    to: "/workforce",
  },
  {
    label: "About",
    to: "/about",
    children: [
      { to: "/about", label: "Mission & Values" },
      { to: "/news", label: "News" },
      { to: "/contact", label: "Hours & Directions" },
    ],
  },
];

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
          <a href="https://www.greatbay.edu/about/giving/" target="_blank" rel="noreferrer">
            Donate
          </a>
          <Link to="/contact">Contact</Link>
          <a href="https://www.greatbay.edu/current-students/" target="_blank" rel="noreferrer">
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
            {navItems.map((item) => (
              <li
                key={item.to}
                className={item.children ? "has-children" : undefined}
              >
                <NavLink to={item.to} onClick={() => setOpen(false)}>
                  {item.label}
                </NavLink>
                {item.children ? (
                  <ul className="nav-dropdown">
                    {item.children.map((child) => (
                      <li key={child.to + child.label}>
                        <Link to={child.to} onClick={() => setOpen(false)}>
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
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
