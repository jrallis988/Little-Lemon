import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

const links = [
  { to: "/#mission", label: "About" },
  { to: "/#approach", label: "Programs" },
  { to: "/hubs", label: "Hubs" },
  { to: "/stories", label: "Stories" },
  { to: "/volunteers", label: "Volunteer" },
  { to: "/partners", label: "Partners" },
  { to: "/leadership", label: "Leadership" },
];

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition duration-300 ${
        scrolled
          ? "border-b border-violet-bright/25 bg-ink/90 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="container flex h-16 items-center justify-between gap-4 md:h-20">
        <Link
          to="/"
          className="font-display text-xl font-extrabold tracking-tight text-white md:text-2xl"
          onClick={() => setOpen(false)}
        >
          Civic <span className="text-chartreuse">Bound</span>
        </Link>

        <nav className="hidden items-center gap-4 xl:flex xl:gap-6">
          {links.map((link) =>
            link.to.includes("#") ? (
              <Link
                key={link.to}
                to={link.to}
                className="font-body text-xs font-medium uppercase tracking-[0.12em] text-violet-mist transition hover:text-chartreuse xl:text-sm"
              >
                {link.label}
              </Link>
            ) : (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `font-body text-xs font-medium uppercase tracking-[0.12em] transition hover:text-chartreuse xl:text-sm ${
                    isActive ? "text-chartreuse" : "text-violet-mist"
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
          className="inline-flex h-10 w-10 items-center justify-center border border-violet-mist/30 text-white xl:hidden"
          aria-expanded={open}
          aria-label="Toggle navigation"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">Menu</span>
          <span className="flex w-5 flex-col gap-1.5">
            <span
              className={`h-0.5 w-full bg-chartreuse transition ${
                open ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`h-0.5 w-full bg-chartreuse transition ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-0.5 w-full bg-chartreuse transition ${
                open ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {open && (
        <div className="border-t border-violet-bright/25 bg-ink/95 xl:hidden">
          <nav className="container flex flex-col gap-4 py-6">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="font-body text-base uppercase tracking-[0.12em] text-violet-mist"
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
