import { useEffect, useId, useRef, useState } from "react";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { VIRTUAL_TOUR } from "../data/campus";

const navItems = [
  {
    id: "academics",
    label: "Academics",
    to: "/academics",
    children: [
      { label: "Departments & Programs", to: "/academics" },
      {
        label: "Academic Programs",
        href: "https://www.nhti.edu/academics/academic-programs/",
      },
      {
        label: "Online Academic Programs",
        href: "https://www.nhti.edu/programs/?wpv-wpcf-online=yes",
      },
      {
        label: "Early College",
        href: "https://www.nhti.edu/academics/early-college/",
      },
      {
        label: "Academic Calendar",
        href: "https://www.nhti.edu/academics/academic-calendar/",
      },
      {
        label: "College Catalog",
        href: "https://catalog.nhti.edu/",
      },
      {
        label: "Transfer Opportunities",
        href: "https://lynx.nhti.edu/academics/transfer-opportunities/",
      },
    ],
  },
  {
    id: "admissions",
    label: "Admissions",
    to: "/admissions",
    children: [
      { label: "How to Apply", to: "/admissions" },
      {
        label: "Admissions Events",
        href: "https://www.nhti.edu/admissions/events/",
      },
      {
        label: "Admissions Requirements",
        href: "https://www.nhti.edu/admissions/requirements/",
      },
      {
        label: "Next Steps for New Students",
        href: "https://www.nhti.edu/admissions/next-steps-for-new-students/",
      },
      { label: "Request Info", to: "/admissions#inquiry-form" },
      { label: "Take a Virtual Tour", href: VIRTUAL_TOUR },
    ],
  },
  {
    id: "financial-aid",
    label: "Financial Aid",
    to: "/financial-aid",
    children: [
      { label: "Financial Aid Overview", to: "/financial-aid" },
      {
        label: "Tuition Rates",
        href: "https://www.nhti.edu/financial-aid/tuition-rates/",
      },
      {
        label: "Scholarships & Grants",
        href: "https://www.nhti.edu/financial-aid/scholarship-grants/",
      },
      {
        label: "Bursar’s Office",
        href: "https://lynx.nhti.edu/financial-aid/bursar/",
      },
    ],
  },
  {
    id: "current-students",
    label: "Current Students",
    href: "https://lynx.nhti.edu/",
    children: [
      { label: "Lynx Den / Student Portal", href: "https://lynx.nhti.edu/" },
      {
        label: "Directory",
        href: "https://www.nhti.edu/directory/",
      },
      {
        label: "Departments",
        href: "https://www.nhti.edu/contact-us/departments/",
      },
    ],
  },
  {
    id: "campus-life",
    label: "Campus Life",
    to: "/campus",
    children: [
      { label: "Campus Life Overview", to: "/campus" },
      { label: "Residence Life", to: "/residence-life" },
      { label: "Athletics", to: "/athletics" },
      { label: "Events", to: "/events" },
      {
        label: "Student Life",
        href: "https://www.nhti.edu/campus-life/student-life/",
      },
      { label: "Take a Virtual Tour", href: VIRTUAL_TOUR },
    ],
  },
  {
    id: "workforce",
    label: "Workforce Education",
    to: "/workforce",
    children: [
      { label: "Overview of Short-Term Trainings", to: "/workforce" },
      {
        label: "Online Career Trainings",
        href: "https://www.nhti.edu/workforce/career-training-programs/",
      },
      {
        label: "Corporate and Customized Trainings",
        href: "https://www.nhti.edu/workforce/corporate-and-customized-training/",
      },
      {
        label: "Education Trainings",
        href: "https://www.nhti.edu/workforce/education-training-programs/",
      },
      {
        label: "Healthcare Trainings",
        href: "https://www.nhti.edu/workforce/healthcare-training-programs/",
      },
      {
        label: "Dental Continuing Education",
        href: "https://www.nhti.edu/workforce/dental-continuing-education/",
      },
      {
        label: "Expanded Function Dental Auxiliary",
        href: "https://www.nhti.edu/workforce/efda/",
      },
      {
        label: "WorkReadyNH",
        href: "https://www.nhti.edu/workforce-development/workreadynh-program/",
      },
    ],
  },
  {
    id: "about",
    label: "About",
    to: "/about",
    children: [
      { label: "About NHTI", to: "/about" },
      { label: "News", to: "/news" },
      {
        label: "Administration & Leadership",
        href: "https://www.nhti.edu/about/presidents-office/",
      },
      {
        label: "Offices & Campus Services",
        href: "https://www.nhti.edu/contact-us/departments/",
      },
      {
        label: "Student Success Data",
        href: "https://www.nhti.edu/about/student-success-data-points/",
      },
      {
        label: "Alumni",
        href: "https://www.nhti.edu/about/alumni/",
      },
    ],
  },
  {
    id: "contact",
    label: "Contact",
    to: "/contact",
    children: [
      { label: "Contact Us", to: "/contact" },
      {
        label: "Departments",
        href: "https://www.nhti.edu/contact-us/departments/",
      },
      {
        label: "Directory",
        href: "https://www.nhti.edu/directory/",
      },
      { label: "Take a Virtual Tour", href: VIRTUAL_TOUR },
    ],
  },
];

function DropdownLink({ item, onNavigate }) {
  if (item.to) {
    return (
      <Link to={item.to} onClick={onNavigate}>
        {item.label}
      </Link>
    );
  }
  return (
    <a href={item.href} target="_blank" rel="noreferrer" onClick={onNavigate}>
      {item.label}
    </a>
  );
}

function NavItem({ item, mobile, openId, setOpenId, onNavigate }) {
  const panelId = useId();
  const isOpen = openId === item.id;
  const location = useLocation();
  const isActive = item.to
    ? location.pathname === item.to ||
      (item.to !== "/" && location.pathname.startsWith(`${item.to}/`))
    : false;

  function open() {
    setOpenId(item.id);
  }

  function close() {
    setOpenId((current) => (current === item.id ? null : current));
  }

  const triggerClass = [
    "nav-link",
    isActive ? "is-active" : "",
    isOpen ? "is-open" : "",
    item.children?.length ? "has-submenu" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={`nav-item ${isOpen ? "is-open" : ""}`}
      onMouseEnter={!mobile ? open : undefined}
      onMouseLeave={!mobile ? close : undefined}
      onFocus={!mobile ? open : undefined}
    >
      <div className="nav-item__trigger">
        {item.to ? (
          <NavLink
            to={item.to}
            className={triggerClass}
            onClick={onNavigate}
          >
            {item.label}
          </NavLink>
        ) : (
          <a
            href={item.href}
            className={triggerClass}
            target="_blank"
            rel="noreferrer"
            onClick={onNavigate}
          >
            {item.label}
          </a>
        )}
        {item.children?.length ? (
          <button
            type="button"
            className="nav-item__chevron"
            aria-expanded={isOpen}
            aria-controls={panelId}
            onClick={() => setOpenId(isOpen ? null : item.id)}
          >
            <span className="sr-only">{item.label} submenu</span>
          </button>
        ) : null}
      </div>

      {item.children?.length ? (
        <div
          id={panelId}
          className={`nav-dropdown ${isOpen ? "is-open" : ""}`}
          role="region"
          aria-label={`${item.label} submenu`}
        >
          {item.children.map((child) => (
            <DropdownLink
              key={child.label}
              item={child}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openId, setOpenId] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef(null);

  useEffect(() => {
    if (typeof window.matchMedia !== "function") return undefined;
    const media = window.matchMedia("(max-width: 980px)");
    const sync = () => setIsMobile(media.matches);
    sync();
    if (media.addEventListener) {
      media.addEventListener("change", sync);
      return () => media.removeEventListener("change", sync);
    }
    media.addListener(sync);
    return () => media.removeListener(sync);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (searchOpen && searchRef.current) searchRef.current.focus();
  }, [searchOpen]);

  function closeAll() {
    setMenuOpen(false);
    setOpenId(null);
    setSearchOpen(false);
  }

  function handleSearch(event) {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    closeAll();
    navigate(`/academics?q=${encodeURIComponent(trimmed)}`);
    setQuery("");
  }

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link to="/" className="brand-mark" onClick={closeAll}>
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
          aria-expanded={menuOpen}
          aria-controls="primary-nav"
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span className="sr-only">Menu</span>
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>

        <nav
          id="primary-nav"
          className={`primary-nav ${menuOpen ? "is-open" : ""}`}
          aria-label="Primary"
        >
          <div className="primary-nav__main">
            {navItems.map((item) => (
              <NavItem
                key={item.id}
                item={item}
                mobile={isMobile}
                openId={openId}
                setOpenId={setOpenId}
                onNavigate={closeAll}
              />
            ))}
          </div>

          <div className="primary-nav__actions">
            <Link to="/admissions" className="btn btn--solid btn--compact nav-apply">
              Apply
            </Link>
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
                ref={searchRef}
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search programs…"
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
