import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { campaignHash, isCampaignHome } from "../lib/routing";
import { Logo } from "./Logo";

export function Header() {
  const location = useLocation();
  const home = isCampaignHome(location.pathname);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const primaryLinks = [
    { href: campaignHash("why-it-matters", location.pathname), label: "Why it matters" },
    { href: campaignHash("years-of-you", location.pathname), label: "Your priorities" },
    { href: campaignHash("ahead", location.pathname), label: "What’s next" },
    { href: "/find-your-year", label: "Find Your Year" },
  ];

  const moreLinks = [
    { href: "/whats-next", label: "What’s Next" },
    { href: "/case-study", label: "Case Study" },
    { href: "/programs", label: "Programs" },
    { href: "/stories", label: "Stories" },
    { href: "/innovation", label: "Innovation" },
    { href: "/research", label: "Research" },
    { href: campaignHash("connect", location.pathname), label: "Social" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    if (!location.hash) window.scrollTo(0, 0);
  }, [location.pathname, location.hash]);

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

  const overHero = home && !scrolled && !open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open ? "border-b border-ink/5 bg-paper/90 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="section-shell flex h-16 items-center justify-between gap-4">
        <Logo light={overHero} variant="anniversary" homePath={home ? location.pathname : "/"} />

        <nav className="hidden items-center gap-5 lg:flex" aria-label="Primary">
          {primaryLinks.map((link) => (
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
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            to={campaignHash("finale", location.pathname)}
            className={`rounded-2xl px-5 py-2.5 font-sans text-sm font-semibold transition ${
              overHero
                ? "bg-white text-ink hover:bg-cloud"
                : "bg-cobalt-600 text-white hover:bg-cobalt-700"
            }`}
          >
            Start Your Journey
          </Link>
        </div>

        <button
          type="button"
          className={`inline-flex h-10 w-10 items-center justify-center rounded-2xl border lg:hidden ${
            overHero ? "border-white/25" : "border-ink/10"
          }`}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="flex w-4 flex-col gap-1.5">
            <span
              className={`h-0.5 w-full ${overHero && !open ? "bg-white" : "bg-ink"} ${open ? "translate-y-2 rotate-45" : ""}`}
            />
            <span
              className={`h-0.5 w-full ${overHero && !open ? "bg-white" : "bg-ink"} ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`h-0.5 w-full ${overHero && !open ? "bg-white" : "bg-ink"} ${open ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </span>
        </button>
      </div>

      <div id="mobile-nav" className={`lg:hidden ${open ? "block" : "hidden"} border-t border-ink/5 bg-paper`}>
        <nav className="section-shell flex flex-col gap-1 py-4" aria-label="Mobile">
          {[...primaryLinks, ...moreLinks].map((link) => (
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
            to={campaignHash("finale", location.pathname)}
            className="mt-2 rounded-2xl bg-cobalt-600 px-5 py-3 text-center font-sans text-sm font-semibold text-white"
            onClick={() => setOpen(false)}
          >
            Start Your Journey
          </Link>
        </nav>
      </div>

      {(scrolled || !home) && !open && (
        <div className="hidden border-t border-ink/5 bg-paper/80 lg:block">
          <div className="section-shell flex h-9 items-center gap-5 overflow-x-auto">
            {moreLinks.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                className={({ isActive }) =>
                  `whitespace-nowrap font-sans text-xs font-semibold uppercase tracking-[0.14em] ${
                    isActive ? "text-cobalt-700" : "text-ink/45 hover:text-ink"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
