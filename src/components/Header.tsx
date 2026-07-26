import { useEffect, useState } from "react";
import { Logo } from "./Logo";

const links = [
  { href: "#pathways", label: "Programs" },
  { href: "#modes", label: "Modes" },
  { href: "#tools", label: "Tools" },
  { href: "#community", label: "Community" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
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

  const overHero = !scrolled && !open;

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

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`link-underline font-sans text-sm font-medium transition ${
                overHero
                  ? "text-white/75 hover:text-white"
                  : "text-ink/70 hover:text-ink"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href="#join"
            className={`font-sans text-sm font-semibold transition ${
              overHero ? "text-white/75 hover:text-white" : "text-ink/70 hover:text-ink"
            }`}
          >
            Sign in
          </a>
          <a
            href="#join"
            className={`rounded-2xl px-5 py-2.5 font-sans text-sm font-semibold transition ${
              overHero
                ? "bg-white text-ink hover:bg-cloud"
                : "bg-cobalt-600 text-white hover:bg-cobalt-700"
            }`}
          >
            Start free
          </a>
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
            <a
              key={link.href}
              href={link.href}
              className="rounded-xl px-3 py-3 font-sans text-base font-medium text-ink/80 hover:bg-mist"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#join"
            className="mt-2 rounded-2xl bg-cobalt-600 px-5 py-3 text-center font-sans text-sm font-semibold text-white"
            onClick={() => setOpen(false)}
          >
            Start free
          </a>
        </nav>
      </div>
    </header>
  );
}
