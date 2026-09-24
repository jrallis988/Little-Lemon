import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { APPLY_URL } from "../data/links";
import ExternalLink from "./ExternalLink";
import { trackEvent } from "../utils/analytics";

const MYWMCC_URL = "https://sis.ccsnh.edu/";

const navItems = [
  {
    label: "Academics",
    to: "/academics",
    children: [
      { to: "/academics", label: "Our Programs" },
      { to: "/admissions/how-to-apply", label: "How to Apply" },
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
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const toggleRef = useRef(null);
  const navRef = useRef(null);

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
    const nav = navRef.current;
    if (!nav) return undefined;

    let mobileQuery = { matches: false };
    try {
      if (typeof window.matchMedia === "function") {
        mobileQuery = window.matchMedia("(max-width: 800px)") || mobileQuery;
      }
    } catch {
      // jsdom / older environments may lack MediaQueryList
    }

    const syncInert = () => {
      const isMobileDrawer = Boolean(mobileQuery && mobileQuery.matches);
      if (isMobileDrawer && !open) {
        nav.setAttribute("inert", "");
        nav.setAttribute("aria-hidden", "true");
      } else {
        nav.removeAttribute("inert");
        nav.removeAttribute("aria-hidden");
      }
    };

    syncInert();
    if (typeof mobileQuery.addEventListener === "function") {
      mobileQuery.addEventListener("change", syncInert);
    } else if (typeof mobileQuery.addListener === "function") {
      mobileQuery.addListener(syncInert);
    }

    if (!open || !mobileQuery.matches) {
      return () => {
        if (typeof mobileQuery.removeEventListener === "function") {
          mobileQuery.removeEventListener("change", syncInert);
        } else if (typeof mobileQuery.removeListener === "function") {
          mobileQuery.removeListener(syncInert);
        }
      };
    }

    const focusable = nav.querySelector(
      'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    focusable?.focus();

    const onKey = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (event.key !== "Tab") return;

      const nodes = [
        ...nav.querySelectorAll(
          'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
        ),
      ].filter((el) => !el.hasAttribute("disabled") && el.offsetParent !== null);
      if (!nodes.length) return;

      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      if (typeof mobileQuery.removeEventListener === "function") {
        mobileQuery.removeEventListener("change", syncInert);
      }
    };
  }, [open]);

  const submitSearch = (event) => {
    event.preventDefault();
    const next = query.trim();
    setOpen(false);
    trackEvent("site_search", { search_term: next || "(empty)" });
    navigate(next ? `/search?q=${encodeURIComponent(next)}` : "/search");
  };

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="utility-bar">
        <div className="utility-inner">
          <ExternalLink href="https://www.wmcc.edu/giving/">Donate</ExternalLink>
          <Link to="/contact">Contact</Link>
          <ExternalLink href="https://www.wmcc.edu/current-students/">
            Current Students
          </ExternalLink>
          <ExternalLink href="https://www.ccsnh.edu/human-resources/">
            Faculty/Staff
          </ExternalLink>
          <ExternalLink
            className="utility-portal"
            href={MYWMCC_URL}
            trackName="portal_click"
            trackProps={{ location: "utility_bar" }}
          >
            MyWMCC
          </ExternalLink>
        </div>
      </div>

      <div className="header-inner">
        <Link to="/" className="brand" onClick={() => setOpen(false)}>
          <img
            className="brand-logo"
            src="/images/wmcc-mark.svg"
            alt="White Mountains Community College"
            width="280"
            height="72"
          />
        </Link>

        <div className="header-actions-mobile">
          <ExternalLink
            className="utility-portal mobile-portal"
            href={MYWMCC_URL}
            trackName="portal_click"
            trackProps={{ location: "mobile_chip" }}
          >
            MyWMCC
          </ExternalLink>
          <button
            ref={toggleRef}
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
        </div>

        <nav
          ref={navRef}
          id="primary-nav"
          className={`primary-nav ${open ? "is-open" : ""}`}
          aria-label="Primary"
        >
          <form
            className="header-search"
            role="search"
            aria-label="Site search"
            onSubmit={submitSearch}
          >
            <label className="sr-only" htmlFor="site-search">
              Search programs and pages
            </label>
            <input
              id="site-search"
              type="search"
              name="q"
              placeholder="Search programs…"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <button className="btn btn-primary" type="submit">
              Search
            </button>
          </form>

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

          <div className="mobile-utility-links">
            <Link to="/contact" onClick={() => setOpen(false)}>
              Contact
            </Link>
            <ExternalLink
              href="https://www.wmcc.edu/current-students/"
              onClick={() => setOpen(false)}
            >
              Current Students
            </ExternalLink>
            <ExternalLink
              className="utility-portal"
              href={MYWMCC_URL}
              trackName="portal_click"
              trackProps={{ location: "mobile_drawer" }}
              onClick={() => setOpen(false)}
            >
              MyWMCC
            </ExternalLink>
          </div>

          <ExternalLink
            className="btn btn-gold header-apply"
            href={APPLY_URL}
            trackName="apply_click"
            trackProps={{ location: "header" }}
            onClick={() => setOpen(false)}
          >
            Apply
          </ExternalLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;
