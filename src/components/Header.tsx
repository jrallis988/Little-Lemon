import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Logo } from "./Logo";

const homeLinks = [
  { href: "/#pathways", label: "Programs" },
  { href: "/#modes", label: "Modes" },
  { href: "/#tools", label: "Tools" },
  { href: "/#community", label: "Community" },
  { href: "/#connect", label: "Social" },
];

const campaignLinks = [
  { href: "/63#timeline", label: "Timeline" },
  { href: "/63#archive", label: "Archive" },
  { href: "/63#philosophy", label: "Philosophy" },
];

export function Header() {
  const location = useLocation();
  const isCampaign = location.pathname.startsWith("/63");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      });
    }
  }, [location.hash, location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const overHero = !scrolled && !open;
  const links = isCampaign ? campaignLinks : homeLinks;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "border-b border-ink/5 bg-paper/90 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="section-shell flex h-[4.25rem] items-center justify-between">
        <Logo light={overHero} />

        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {links.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`link-underline font-sans text-sm font-medium transition ${
                overHero ? "text-white/75 hover:text-white" : "text-ink/70 hover:text-ink"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <NavLink
            to={isCampaign ? "/" : "/63"}
            className={`font-sans text-sm font-semibold transition ${
              overHero ? "text-tide hover:text-white" : "text-cobalt-700 hover:text-cobalt-800"
            }`}
          >
            {isCampaign ? "Today" : "WW 63"}
          </NavLink>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            to="/#join"
            className={`font-sans text-sm font-semibold transition ${
              overHero ? "text-white/75 hover:text-white" : "text-ink/70 hover:text-ink"
            }`}
          >
            Sign in
          </Link>
          <Link
            to="/#join"
            className={`rounded-2xl px-5 py-2.5 font-sans text-sm font-semibold transition ${
              overHero
                ? "bg-white text-ink hover:bg-cloud"
                : "bg-cobalt-600 text-white hover:bg-cobalt-700"
            }`}
          >
            Start free
          </Link>
        </div>

        <button
          type="button"
          className={`inline-flex h-10 w-10 items-center justify-center rounded-2xl border md:hidden ${
            overHero ? "border-white/25" : "border-ink/10"
          }`}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <span className="flex w-4 flex-col gap-1.5">
            <span
              className={`h-0.5 w-full transition ${overHero ? "bg-white" : "bg-ink"} ${
                open ? "translate-y-2 rotate-45 !bg-ink" : ""
              }`}
            />
            <span
              className={`h-0.5 w-full transition ${overHero ? "bg-white" : "bg-ink"} ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-0.5 w-full transition ${overHero ? "bg-white" : "bg-ink"} ${
                open ? "-translate-y-2 -rotate-45 !bg-ink" : ""
              }`}
            />
          </span>
        </button>
      </div>

      <div
        id="mobile-nav"
        className={`md:hidden ${open ? "block" : "hidden"} border-t border-ink/5 bg-paper`}
      >
        <nav className="section-shell flex flex-col gap-1 py-4" aria-label="Mobile">
          {links.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="rounded-xl px-3 py-3 font-sans text-base font-medium text-ink/80 hover:bg-mist"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to={isCampaign ? "/" : "/63"}
            className="rounded-xl px-3 py-3 font-sans text-base font-medium text-cobalt-700 hover:bg-mist"
            onClick={() => setOpen(false)}
          >
            {isCampaign ? "Back to today" : "Weight Watchers 63"}
          </Link>
          <Link
            to="/#join"
            className="mt-2 rounded-2xl bg-cobalt-600 px-5 py-3 text-center font-sans text-sm font-semibold text-white"
            onClick={() => setOpen(false)}
          >
            Start free
          </Link>
        </nav>
      </div>
    </header>
  );
}
