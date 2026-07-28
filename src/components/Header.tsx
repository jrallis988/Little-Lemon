import { useEffect, useRef, useState } from "react";
import { SealMark } from "./SealMark";

const links = [
  { href: "#beers", label: "Beers" },
  { href: "#events", label: "Events" },
  { href: "#food", label: "Food" },
  { href: "#visit", label: "Visit" },
  { href: "#shop", label: "Shop" },
  { href: "#contact", label: "Contact" },
  { href: "#story", label: "Story" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement | null>(null);
  const closeByEscapeRef = useRef(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeByEscapeRef.current = true;
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (open) return;
    if (!closeByEscapeRef.current) return;
    closeByEscapeRef.current = false;
    hamburgerRef.current?.focus();
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? "bg-ink text-foam shadow-sm shadow-ink/20"
          : "bg-transparent text-foam"
      }`}
    >
      <div className="mx-auto flex max-w-site items-center justify-between px-5 py-4 md:px-8">
        <a
          href="#top"
          className="inline-flex items-center gap-2.5 font-display text-2xl font-bold uppercase tracking-[0.06em] md:text-[1.7rem]"
        >
          <SealMark className="h-8 w-8 shrink-0" />
          <span>Smuttynose</span>
        </a>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium tracking-wide text-foam/85 transition-colors hover:text-foam"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#visit"
            className="bg-buoy px-4 py-2 text-sm font-semibold tracking-wide text-foam transition-transform duration-300 hover:-translate-y-0.5"
          >
            Plan a visit
          </a>
        </nav>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          ref={hamburgerRef}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">Menu</span>
          <span className="relative block h-3.5 w-5">
            <span
              className={`absolute left-0 top-0 h-0.5 w-full bg-current transition-transform ${
                open ? "translate-y-[6px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-[6px] h-0.5 w-full bg-current transition-opacity ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 top-[12px] h-0.5 w-full bg-current transition-transform ${
                open ? "-translate-y-[6px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      <div
        id="mobile-nav"
        className={`border-t border-foam/10 lg:hidden ${open ? "block" : "hidden"}`}
        aria-hidden={!open}
      >
        <nav className="flex flex-col gap-1 px-5 py-4" aria-label="Mobile">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="py-2 text-base font-medium"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#visit"
            className="mt-2 bg-buoy px-4 py-3 text-center text-sm font-semibold text-foam"
            onClick={() => setOpen(false)}
          >
            Plan a visit
          </a>
        </nav>
      </div>
    </header>
  );
}
