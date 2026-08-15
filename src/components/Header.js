import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

const links = [
  { to: "/#mission", label: "About Us" },
  { to: "/#approach", label: "Our Solutions" },
  { to: "/stories", label: "Real Stories" },
  { to: "/partners", label: "Coalition Partners" },
  { to: "/news", label: "Latest News" },
];

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition duration-300 ${
        scrolled
          ? "border-b border-paper-line bg-paper-soft/95 backdrop-blur-md"
          : "border-b border-transparent bg-paper/80 backdrop-blur-sm"
      }`}
    >
      <div className="container flex h-16 items-center justify-between gap-4 md:h-[4.5rem]">
        <Link
          to="/"
          className="font-display text-xl font-semibold tracking-tight text-charcoal-deep md:text-2xl"
          onClick={() => setOpen(false)}
        >
          Civic Bound
        </Link>

        <nav className="hidden items-center gap-6 lg:flex xl:gap-8">
          {links.map((link) =>
            link.to.includes("#") ? (
              <Link
                key={link.to}
                to={link.to}
                className="font-body text-sm font-medium text-charcoal transition hover:text-violet"
              >
                {link.label}
              </Link>
            ) : (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `font-body text-sm font-medium transition hover:text-violet ${
                    isActive ? "text-violet" : "text-charcoal"
                  }`
                }
              >
                {link.label}
              </NavLink>
            )
          )}
          <Link to="/get-support" className="btn-primary !px-5 !py-2.5 text-xs">
            Find Support
          </Link>
        </nav>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center border border-paper-line text-charcoal-deep lg:hidden"
          aria-expanded={open}
          aria-label="Toggle navigation"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">Menu</span>
          <span className="flex w-5 flex-col gap-1.5">
            <span
              className={`h-0.5 w-full bg-charcoal-deep transition ${
                open ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`h-0.5 w-full bg-charcoal-deep transition ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-0.5 w-full bg-charcoal-deep transition ${
                open ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {open && (
        <div className="border-t border-paper-line bg-paper-soft lg:hidden">
          <nav className="container flex flex-col gap-4 py-6">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="font-body text-base text-charcoal"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/get-support"
              className="btn-primary w-fit"
              onClick={() => setOpen(false)}
            >
              Find Support
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
