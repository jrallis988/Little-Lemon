import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { links } from "../data/links";
import { useCart } from "../context/CartContext";
import { SealMark } from "./SealMark";

const sectionLinks = [
  { href: "/#beers", label: "Beers" },
  { href: "/#events", label: "Events" },
  { href: "/#food", label: "Food" },
  { href: "/#visit", label: "Visit" },
  { href: "/#story", label: "Story" },
];

const pageLinks = [
  { to: "/shop", label: "Shop" },
  { to: "/finder", label: "Beer finder" },
  { to: "/events/private", label: "Private events" },
  { to: "/#contact", label: "Contact", hash: true },
];

type HeaderProps = {
  /** Force solid header (interior pages) */
  solid?: boolean;
  /** Start with mobile drawer open (for screen captures) */
  defaultMenuOpen?: boolean;
};

export function Header({ solid = false, defaultMenuOpen = false }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(defaultMenuOpen);
  const hamburgerRef = useRef<HTMLButtonElement | null>(null);
  const closeByEscapeRef = useRef(false);
  const { count, setOpen: setCartOpen } = useCart();

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

  const solidBar = solid || scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solidBar
          ? "bg-ink text-foam shadow-sm shadow-ink/20"
          : "bg-transparent text-foam"
      }`}
    >
      <div className="mx-auto flex max-w-site items-center justify-between px-5 py-4 md:px-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2.5 font-display text-2xl font-bold uppercase tracking-[0.06em] md:text-[1.7rem]"
        >
          <SealMark className="h-8 w-8 shrink-0" />
          <span>Smuttynose</span>
        </Link>

        <nav className="hidden items-center gap-5 lg:flex" aria-label="Primary">
          {sectionLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium tracking-wide text-foam/85 transition-colors hover:text-foam"
            >
              {link.label}
            </a>
          ))}
          <NavLink
            to="/shop"
            className="text-sm font-medium tracking-wide text-foam/85 transition-colors hover:text-foam"
          >
            Shop
          </NavLink>
          <NavLink
            to="/finder"
            className="text-sm font-medium tracking-wide text-foam/85 transition-colors hover:text-foam"
          >
            Finder
          </NavLink>
          <NavLink
            to="/events/private"
            className="text-sm font-medium tracking-wide text-foam/85 transition-colors hover:text-foam"
          >
            Book
          </NavLink>
          <button
            type="button"
            onClick={() => setCartOpen(true)}
            className="text-sm font-medium tracking-wide text-foam/85 transition-colors hover:text-foam"
          >
            Cart{count > 0 ? ` (${count})` : ""}
          </button>
          <Link
            to="/#visit"
            className="bg-buoy px-4 py-2 text-sm font-semibold tracking-wide text-foam transition-transform duration-300 hover:-translate-y-0.5"
          >
            Plan a visit
          </Link>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            className="relative inline-flex h-10 w-10 items-center justify-center"
            aria-label="Open cart"
            onClick={() => setCartOpen(true)}
          >
            <span className="text-sm font-semibold">Bag</span>
            {count > 0 ? (
              <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center bg-buoy px-1 text-[0.65rem] font-bold">
                {count}
              </span>
            ) : null}
          </button>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center"
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
      </div>

      {/* Full-screen mobile drawer */}
      <div
        id="mobile-nav"
        className={`fixed inset-0 z-40 bg-ink text-foam transition-transform duration-300 lg:hidden ${
          open ? "translate-x-0" : "pointer-events-none translate-x-full"
        }`}
        aria-hidden={!open}
      >
        <div className="flex h-full flex-col px-5 pb-8 pt-24">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-salt">
            Explore campus
          </p>
          <nav className="mt-4 flex flex-col gap-1" aria-label="Mobile">
            {sectionLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="border-b border-foam/10 py-3 font-display text-3xl font-bold uppercase tracking-wide"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            {pageLinks.map((link) =>
              "hash" in link && link.hash ? (
                <a
                  key={link.to}
                  href={link.to}
                  className="border-b border-foam/10 py-3 font-display text-3xl font-bold uppercase tracking-wide"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.to}
                  to={link.to}
                  className="border-b border-foam/10 py-3 font-display text-3xl font-bold uppercase tracking-wide"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              ),
            )}
          </nav>

          <div className="mt-8 grid gap-3">
            <Link
              to="/#visit"
              className="bg-buoy px-4 py-3 text-center text-sm font-semibold text-foam"
              onClick={() => setOpen(false)}
            >
              Plan a visit
            </Link>
            <Link
              to="/shop"
              className="border border-foam/40 px-4 py-3 text-center text-sm font-semibold text-foam"
              onClick={() => setOpen(false)}
            >
              Shop merch
            </Link>
          </div>

          <div className="mt-auto space-y-3 pt-10 text-sm text-foam/70">
            <p className="font-semibold uppercase tracking-[0.16em] text-salt">
              Follow
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href={links.facebook}
                target="_blank"
                rel="noreferrer"
                className="underline-offset-2 hover:text-foam hover:underline"
              >
                Facebook
              </a>
              <a
                href={links.home}
                target="_blank"
                rel="noreferrer"
                className="underline-offset-2 hover:text-foam hover:underline"
              >
                smuttynose.com
              </a>
              <a
                href={links.phone}
                className="underline-offset-2 hover:text-foam hover:underline"
              >
                {links.phoneDisplay}
              </a>
            </div>
            <p className="text-xs text-foam/45">{links.address}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
