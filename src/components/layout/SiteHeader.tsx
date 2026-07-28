"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import {
  IconChevronDown,
  IconChevronRight,
  IconClose,
  IconLock,
  IconMenu,
  IconSearch,
  LogoSeal,
} from "@/components/ui/Icons";
import { SearchOverlay } from "@/components/search/SearchOverlay";
import { focusFirst, getFocusableElements } from "@/lib/a11y";
import { cn } from "@/lib/cn";

const utilLinks = [
  { label: "Español", href: "/search?q=espanol" },
  { label: "For Clinicians", href: "/emergency" },
  { label: "Research", href: "/search?q=research" },
  { label: "Give to Boston Children's", href: "/about" },
];

type MegaZone = {
  title: string;
  links: { label: string; href: string }[];
  accent?: boolean;
};

type NavItem = {
  label: string;
  href: string;
  match?: string[];
  zones: MegaZone[];
  card?: {
    eyebrow: string;
    title: string;
    body: string;
    cta: string;
    href: string;
  };
};

const navItems: NavItem[] = [
  {
    label: "Care",
    href: "/find-a-doctor",
    match: ["/find-a-doctor", "/conditions", "/programs", "/emergency", "/locations", "/appointments"],
    zones: [
      {
        title: "Get care",
        accent: true,
        links: [
          { label: "Find a Doctor", href: "/find-a-doctor" },
          { label: "Request an Appointment", href: "/appointments/request" },
          { label: "Emergency Department", href: "/emergency" },
          { label: "Locations", href: "/locations" },
        ],
      },
      {
        title: "Conditions & programs",
        links: [
          { label: "Conditions A–Z", href: "/conditions" },
          { label: "Programs & Services", href: "/programs" },
          {
            label: "Epilepsy in Children",
            href: "/conditions/epilepsy-in-children",
          },
          { label: "Epilepsy Program", href: "/programs/epilepsy-program" },
        ],
      },
      {
        title: "Locations",
        links: [
          { label: "Main Campus — Longwood", href: "/locations#longwood" },
          { label: "Waltham", href: "/locations#waltham" },
          { label: "Needham", href: "/locations#needham" },
          { label: "Lexington", href: "/locations#lexington" },
        ],
      },
    ],
    card: {
      eyebrow: "Start here",
      title: "Need care for your child?",
      body: "Search specialists by name, specialty, or language.",
      cta: "Find a Doctor",
      href: "/find-a-doctor",
    },
  },
  {
    label: "Patients & Families",
    href: "/patients-families",
    match: ["/patients-families", "/portal", "/appointments"],
    zones: [
      {
        title: "Your visit",
        accent: true,
        links: [
          { label: "Patients & Families hub", href: "/patients-families" },
          { label: "MyChildren's Portal", href: "/portal" },
          { label: "Request an Appointment", href: "/appointments/request" },
          { label: "Emergency Department", href: "/emergency" },
        ],
      },
      {
        title: "Support",
        links: [
          { label: "Health Library / Search", href: "/search?q=health" },
          { label: "Locations", href: "/locations" },
          { label: "About Boston Children's", href: "/about" },
        ],
      },
    ],
  },
  {
    label: "Professionals",
    href: "/professionals",
    match: ["/professionals"],
    zones: [
      {
        title: "For clinicians",
        accent: true,
        links: [
          { label: "Professionals hub", href: "/professionals" },
          { label: "Physician Access Line", href: "/emergency" },
          { label: "Find a specialist", href: "/find-a-doctor" },
          { label: "Clinical programs", href: "/programs" },
        ],
      },
    ],
  },
  {
    label: "Research",
    href: "/research",
    match: ["/research"],
    zones: [
      {
        title: "Discover",
        accent: true,
        links: [
          { label: "Research hub", href: "/research" },
          { label: "Clinical trials", href: "/research" },
          { label: "Epilepsy Program", href: "/programs/epilepsy-program" },
          {
            label: "Cancer & Blood Disorders",
            href: "/programs/cancer-blood-disorders",
          },
        ],
      },
    ],
  },
  {
    label: "About",
    href: "/about",
    match: ["/about", "/design-system"],
    zones: [
      {
        title: "Our hospital",
        accent: true,
        links: [
          { label: "Mission & Values", href: "/about" },
          { label: "Design System", href: "/design-system" },
          { label: "Emergency Department", href: "/emergency" },
        ],
      },
    ],
  },
];

const mobileGroups = [
  {
    id: "care",
    label: "Care",
    links: [
      { label: "Find a Doctor", href: "/find-a-doctor" },
      { label: "Epilepsy Program", href: "/programs/epilepsy-program" },
      { label: "Conditions", href: "/conditions/epilepsy-in-children" },
      { label: "Emergency", href: "/emergency" },
    ],
  },
  {
    id: "pf",
    label: "Patients & Families",
    links: [
      { label: "About", href: "/about" },
      { label: "Health Library", href: "/search?q=health" },
      { label: "Emergency Department", href: "/emergency" },
    ],
  },
  {
    id: "res",
    label: "Research & Careers",
    links: [
      { label: "Search research", href: "/search?q=research" },
      { label: "About", href: "/about" },
      { label: "Design system", href: "/design-system" },
    ],
  },
];

const headerFocus =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

export function SiteHeader() {
  const pathname = usePathname();
  const baseId = useId();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [portalOpen, setPortalOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [edWait, setEdWait] = useState(22);

  const searchButtonRef = useRef<HTMLButtonElement>(null);
  const portalWrapRef = useRef<HTMLDivElement>(null);
  const portalButtonRef = useRef<HTMLButtonElement>(null);
  const portalPanelRef = useRef<HTMLDivElement>(null);
  const menuItemRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const menuPanelRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const mobileToggleRef = useRef<HTMLButtonElement>(null);

  const closeMenus = useCallback(() => {
    setOpenMenu(null);
    setPortalOpen(false);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const t = window.setTimeout(() => setEdWait(19), 4000);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenGroup(null);
    closeMenus();
  }, [pathname, closeMenus]);

  // Close mega/portal on outside click
  useEffect(() => {
    if (!openMenu && !portalOpen) return;
    const onPointer = (e: MouseEvent) => {
      const target = e.target as Node;
      if (openMenu) {
        const btn = menuItemRefs.current[openMenu];
        const panel = menuPanelRefs.current[openMenu];
        if (btn?.contains(target) || panel?.contains(target)) return;
        setOpenMenu(null);
      }
      if (portalOpen && portalWrapRef.current && !portalWrapRef.current.contains(target)) {
        setPortalOpen(false);
      }
    };
    document.addEventListener("mousedown", onPointer);
    return () => document.removeEventListener("mousedown", onPointer);
  }, [openMenu, portalOpen]);

  // Global Escape for mega + portal
  useEffect(() => {
    if (!openMenu && !portalOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (openMenu) {
        const label = openMenu;
        setOpenMenu(null);
        menuItemRefs.current[label]?.focus();
      }
      if (portalOpen) {
        setPortalOpen(false);
        portalButtonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [openMenu, portalOpen]);

  // Mobile nav: body lock, Escape, focus trap including toggle
  useEffect(() => {
    if (!mobileOpen) return;
    document.body.style.overflow = "hidden";
    const nav = document.getElementById("mob-nav");
    if (nav) {
      window.setTimeout(() => focusFirst(nav), 30);
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        mobileToggleRef.current?.focus();
        return;
      }
      if (e.key !== "Tab") return;
      const toggle = mobileToggleRef.current;
      const panel = document.getElementById("mob-nav");
      if (!toggle || !panel) return;
      const focusable = [toggle, ...getFocusableElements(panel)];
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (e.shiftKey) {
        if (active === first || !focusable.includes(active as HTMLElement)) {
          e.preventDefault();
          last.focus();
        }
      } else if (active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);

  // When portal opens via keyboard, move focus into panel
  useEffect(() => {
    if (!portalOpen) return;
    const panel = portalPanelRef.current;
    if (panel) window.setTimeout(() => focusFirst(panel), 20);
  }, [portalOpen]);

  // When mega opens via keyboard toggle, focus first link
  const openMega = useCallback((label: string, focusPanel: boolean) => {
    setPortalOpen(false);
    setOpenMenu(label);
    if (focusPanel) {
      window.setTimeout(() => {
        const panel = menuPanelRefs.current[label];
        if (panel) focusFirst(panel);
      }, 20);
    }
  }, []);

  const isActive = (item: NavItem) =>
    item.match?.some((m) => pathname === m || pathname.startsWith(`${m}/`));

  return (
    <>
      <header className="sticky top-0 z-[500]" role="banner">
        <div className="border-b border-white/[0.07] bg-nav-dark">
          <div className="wrap flex h-10 items-center justify-between gap-s2">
            <div className="flex items-center" aria-label="Utility links">
              {utilLinks.map((link, i) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={cn(
                    "flex h-10 items-center border-r border-white/[0.07] px-3.5 text-xs font-semibold text-white/45 no-underline transition-colors hover:text-white/85",
                    headerFocus,
                    i === 0 && "pl-0",
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="flex items-center">
              <div className="hidden items-center gap-[7px] border-r border-white/[0.07] px-3.5 lg:flex">
                <span
                  className="h-1.5 w-1.5 shrink-0 animate-pulse-dot rounded-full bg-[#4caf50]"
                  aria-hidden="true"
                />
                <span className="text-xs text-white/50">ED wait:</span>
                <span
                  className="text-xs font-bold text-[#7dd87f]"
                  role="status"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  <span className="sr-only">
                    Current Emergency Department wait time: approximately{" "}
                    {edWait} minutes.{" "}
                  </span>
                  ~{edWait} min
                </span>
                <Link
                  href="/emergency"
                  className={cn(
                    "ml-[5px] text-xs text-white/40 no-underline hover:text-white/75",
                    headerFocus,
                  )}
                >
                  View ED
                  <span className="sr-only"> information</span>
                </Link>
              </div>

              <div className="relative" ref={portalWrapRef}>
                <button
                  ref={portalButtonRef}
                  type="button"
                  className={cn(
                    "flex h-10 items-center gap-[9px] border-l border-white/[0.07] pl-3.5",
                    headerFocus,
                  )}
                  aria-label="Patient Portal — your health record and messages"
                  aria-haspopup="dialog"
                  aria-expanded={portalOpen}
                  aria-controls={`${baseId}-portal`}
                  onClick={() => {
                    setOpenMenu(null);
                    setPortalOpen((v) => !v);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowDown") {
                      e.preventDefault();
                      setOpenMenu(null);
                      setPortalOpen(true);
                    }
                  }}
                >
                  <span
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10"
                    aria-hidden="true"
                  >
                    <IconLock className="text-white/75" />
                  </span>
                  <span className="leading-tight max-sm:hidden">
                    <span className="block text-xs font-bold text-white">
                      Patient Portal
                    </span>
                    <span className="block text-[10px] text-white/[0.38]">
                      Your health record
                    </span>
                  </span>
                </button>
                <div
                  id={`${baseId}-portal`}
                  ref={portalPanelRef}
                  hidden={!portalOpen}
                  className={cn(
                    "absolute right-0 top-[calc(100%+10px)] z-[600] w-[300px] animate-fade-down rounded-lg border border-border bg-white shadow-lg",
                    !portalOpen && "invisible",
                  )}
                  role="dialog"
                  aria-label="Patient Portal options"
                >
                  <div className="p-5">
                    <div className="mb-1.5 flex items-center gap-2">
                      <IconLock className="h-3.5 w-3.5 text-blue" />
                      <strong className="text-base font-bold text-blue">
                        Your secure health record
                      </strong>
                    </div>
                    <p className="mb-3.5 text-sm font-light leading-[1.6] text-text-body">
                      Sign in to view test results, message your care team, and
                      manage appointments.
                    </p>
                    <div className="mb-3.5 flex flex-col gap-1.5">
                      {[
                        {
                          label: "View test results",
                          desc: "Lab results, imaging, and reports",
                        },
                        {
                          label: "Message your care team",
                          desc: "Non-urgent questions and follow-up",
                        },
                        {
                          label: "Manage appointments",
                          desc: "Upcoming visits, referrals, scheduling",
                        },
                      ].map((action) => (
                        <a
                          key={action.label}
                          href="/find-a-doctor"
                          className="flex min-h-11 items-center justify-between rounded-sm border border-border bg-surface px-3 py-[9px] no-underline transition-all hover:border-border-strong hover:bg-surface-2"
                        >
                          <div>
                            <div className="text-sm font-bold text-blue">
                              {action.label}
                            </div>
                            <div className="mt-px text-[11px] text-text-meta">
                              {action.desc}
                            </div>
                          </div>
                          <IconChevronRight className="text-text-meta" />
                        </a>
                      ))}
                    </div>
                    <a
                      href="/find-a-doctor"
                      className="mb-2 flex min-h-11 items-center justify-center rounded-sm bg-blue text-center text-base font-bold text-white no-underline hover:bg-ocean"
                    >
                      Sign in to Portal
                    </a>
                    <a
                      href="/search?q=portal"
                      className="mb-3 block text-center text-sm text-ocean"
                    >
                      New to the portal? Get help setting up
                    </a>
                    <div className="border-t border-border pt-3">
                      <p className="m-0 text-[11px] font-light leading-[1.55] text-text-meta">
                        Secured with two-factor authentication. Your information
                        is never shared without your permission.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          id="site-nav"
          tabIndex={-1}
          className="bg-blue transition-shadow duration-ease outline-none"
          style={{
            boxShadow: scrolled ? "0 2px 16px rgba(0,0,0,.18)" : undefined,
          }}
        >
          <div className="wrap flex h-[68px] items-center justify-between gap-s4">
            <Link
              href="/"
              className={cn(
                "flex shrink-0 items-center gap-3 no-underline",
                headerFocus,
              )}
              aria-label="Boston Children's Hospital — home"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-[1.5px] border-white/30 bg-white/[0.06]">
                <LogoSeal />
              </span>
              <span className="flex flex-col max-[420px]:hidden">
                <span className="text-[15px] font-bold leading-tight tracking-[-0.01em] text-white">
                  Boston Children&apos;s Hospital
                </span>
                <span className="mt-px text-[10px] font-bold tracking-[0.01em] text-pink">
                  Where the world comes for answers
                </span>
              </span>
            </Link>

            <nav
              className="hidden flex-1 items-center justify-center lg:flex"
              aria-label="Primary"
            >
              {navItems.map((item) => {
                const menuId = `${baseId}-menu-${item.label.replace(/\s+/g, "-")}`;
                const expanded = openMenu === item.label;
                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => openMega(item.label, false)}
                    onMouseLeave={() => setOpenMenu(null)}
                  >
                    <button
                      ref={(el) => {
                        menuItemRefs.current[item.label] = el;
                      }}
                      type="button"
                      className={cn(
                        "flex h-[68px] items-center gap-1 border-b-[3px] border-transparent px-3.5 text-sm font-bold text-white/65 transition-all hover:border-sky hover:text-white",
                        headerFocus,
                        (isActive(item) || expanded) && "border-sky text-white",
                      )}
                      aria-haspopup="true"
                      aria-expanded={expanded}
                      aria-controls={menuId}
                      onClick={() => {
                        if (expanded) {
                          setOpenMenu(null);
                        } else {
                          openMega(item.label, true);
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "ArrowDown") {
                          e.preventDefault();
                          openMega(item.label, true);
                        }
                        if (e.key === "Escape" && expanded) {
                          e.preventDefault();
                          setOpenMenu(null);
                        }
                      }}
                    >
                      {item.label}
                      <IconChevronDown
                        className={cn(
                          "opacity-50 transition-transform",
                          expanded && "rotate-180 opacity-80",
                        )}
                      />
                    </button>
                    <div
                      id={menuId}
                      ref={(el) => {
                        menuPanelRefs.current[item.label] = el;
                      }}
                      hidden={!expanded}
                      className={cn(
                        "absolute left-1/2 top-full z-[400] min-w-[680px] -translate-x-1/2 animate-fade-down rounded-b-md border-t-[3px] border-ocean bg-white shadow-lg",
                        !expanded && "invisible pointer-events-none",
                      )}
                      role="region"
                      aria-label={`${item.label} menu`}
                    >
                      <div
                        className={cn(
                          "grid gap-0",
                          item.card
                            ? "grid-cols-[1.2fr_1fr_1fr_200px]"
                            : "grid-cols-[1.2fr_1fr_1fr]",
                        )}
                      >
                        {item.zones.map((zone) => (
                          <div
                            key={zone.title}
                            className={cn(
                              "border-l border-border px-s5 py-s6 first:border-l-0",
                              zone.accent && "bg-surface",
                            )}
                          >
                            <h5 className="mb-s3 border-b border-border pb-s2 text-[10px] font-extrabold uppercase tracking-[0.07em] text-text-meta">
                              {zone.title}
                            </h5>
                            <ul className="flex flex-col gap-0.5">
                              {zone.links.map((link) => (
                                <li key={link.label}>
                                  <Link
                                    href={link.href}
                                    className={cn(
                                      "block no-underline transition-colors",
                                      zone.accent
                                        ? "rounded-sm px-2.5 py-[7px] text-base font-bold text-blue hover:bg-blue/[0.07]"
                                        : "py-0.5 text-sm font-light text-text-body hover:text-ocean",
                                    )}
                                    onClick={() => setOpenMenu(null)}
                                  >
                                    {link.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                        {item.card ? (
                          <div className="flex flex-col rounded-br-md bg-blue p-s5">
                            <span className="eyebrow mb-s2 text-white/40">
                              {item.card.eyebrow}
                            </span>
                            <h4 className="mb-s2 text-base font-bold text-white">
                              {item.card.title}
                            </h4>
                            <p className="mb-s4 flex-1 text-sm text-white/60">
                              {item.card.body}
                            </p>
                            <Link
                              href={item.card.href}
                              className={cn(
                                "flex w-full items-center justify-center rounded-sm border-2 border-white/30 px-[9px] py-[9px] text-sm font-bold text-white no-underline hover:bg-white/10",
                                headerFocus,
                              )}
                              onClick={() => setOpenMenu(null)}
                            >
                              {item.card.cta}
                            </Link>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                );
              })}
            </nav>

            <div className="flex shrink-0 items-center gap-s2">
              <button
                ref={searchButtonRef}
                type="button"
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-sm text-white/50 transition-all hover:bg-white/10 hover:text-white",
                  headerFocus,
                )}
                aria-label="Search the site"
                aria-haspopup="dialog"
                aria-expanded={searchOpen}
                onClick={() => setSearchOpen(true)}
              >
                <IconSearch />
              </button>
              <Link
                href="/find-a-doctor"
                className={cn(
                  "hidden h-9 items-center whitespace-nowrap rounded-sm border-[1.5px] border-white/25 px-3.5 text-sm font-bold text-white/80 no-underline transition-all hover:border-white/60 hover:bg-white/[0.08] hover:text-white lg:flex",
                  headerFocus,
                )}
              >
                Find a Doctor
              </Link>
              <Link
                href="/appointments/request"
                className={cn(
                  "hidden h-9 items-center whitespace-nowrap rounded-sm bg-ocean px-4 text-sm font-bold text-white no-underline transition-all hover:bg-[#005f9e] lg:flex",
                  headerFocus,
                )}
              >
                Book Appointment
              </Link>
              <button
                ref={mobileToggleRef}
                id="mob-toggle"
                type="button"
                className={cn(
                  "flex h-11 w-11 items-center justify-center rounded-sm text-white/60 transition-all hover:bg-white/10 hover:text-white lg:hidden",
                  headerFocus,
                )}
                aria-label={
                  mobileOpen ? "Close navigation menu" : "Open navigation menu"
                }
                aria-expanded={mobileOpen}
                aria-controls="mob-nav"
                onClick={() => setMobileOpen((v) => !v)}
              >
                {mobileOpen ? <IconClose /> : <IconMenu />}
              </button>
            </div>
          </div>
        </div>

        <nav
          id="mob-nav"
          className={cn(
            "max-h-[82vh] overflow-y-auto border-t border-white/[0.07] bg-nav-dark lg:hidden",
            mobileOpen ? "block animate-fade-down" : "hidden",
          )}
          aria-label="Mobile navigation"
          aria-hidden={!mobileOpen}
        >
          <div className="m-3 mb-2 rounded-md border border-white/12 bg-white/[0.06] p-4">
            <div className="mb-1 flex items-center gap-[7px]">
              <span
                className="flex h-5 w-5 items-center justify-center rounded-full bg-white/15"
                aria-hidden="true"
              >
                <IconLock className="text-white/80" />
              </span>
              <span className="text-sm font-bold text-white">Patient Portal</span>
            </div>
            <p className="pb-3 pl-[27px] text-xs font-light leading-[1.6] text-white/40">
              Test results, messages, and appointments
            </p>
            <Link
              href="/find-a-doctor"
              className="mb-[7px] flex min-h-11 items-center justify-center rounded-sm bg-white text-center text-base font-bold text-blue no-underline"
            >
              Sign in
            </Link>
          </div>

          <div className="px-3 pb-2 pt-1">
            {[
              { label: "Find a Doctor", href: "/find-a-doctor" },
              { label: "Book an Appointment", href: "/find-a-doctor" },
              {
                label: "Search the site",
                href: "/search",
                action: () => setSearchOpen(true),
              },
              { label: "Emergency Department", href: "/emergency" },
            ].map((task) =>
              task.action ? (
                <button
                  key={task.label}
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    task.action();
                  }}
                  className={cn(
                    "flex min-h-11 w-full items-center justify-between border-b border-white/[0.06] px-1 py-[11px] text-left text-base font-bold text-white/70",
                    headerFocus,
                  )}
                >
                  {task.label}
                  <IconChevronRight className="opacity-30" />
                </button>
              ) : (
                <Link
                  key={task.label}
                  href={task.href}
                  className={cn(
                    "flex min-h-11 items-center justify-between border-b border-white/[0.06] px-1 py-[11px] text-base font-bold text-white/70 no-underline",
                    headerFocus,
                  )}
                >
                  {task.label}
                  <IconChevronRight className="opacity-30" />
                </Link>
              ),
            )}
          </div>

          <div className="px-3 pb-2">
            {mobileGroups.map((group) => {
              const open = openGroup === group.id;
              const panelId = `${baseId}-mob-${group.id}`;
              return (
                <div key={group.id}>
                  <button
                    type="button"
                    className={cn(
                      "flex w-full items-center justify-between border-b border-white/[0.05] px-1 py-2.5 text-base font-semibold text-white/40",
                      headerFocus,
                    )}
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() =>
                      setOpenGroup((prev) =>
                        prev === group.id ? null : group.id,
                      )
                    }
                  >
                    {group.label}
                    <IconChevronDown
                      className={cn(
                        "opacity-30 transition-transform",
                        open && "rotate-180",
                      )}
                    />
                  </button>
                  <div
                    id={panelId}
                    hidden={!open}
                    className={cn(
                      "flex flex-col gap-0 py-1.5 pl-3.5 pb-2.5",
                      !open && "hidden",
                    )}
                  >
                    {group.links.map((link) => (
                      <Link
                        key={link.label}
                        href={link.href}
                        className={cn(
                          "py-1 text-sm font-light text-white/40 no-underline hover:text-white/80",
                          headerFocus,
                        )}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col gap-2 border-t border-white/[0.07] p-3">
            <Link
              href="/find-a-doctor"
              className={cn(
                "block rounded-sm bg-ocean py-3 text-center text-base font-bold text-white no-underline",
                headerFocus,
              )}
            >
              Book an Appointment
            </Link>
            <div className="flex items-center justify-between py-2">
              <span className="text-xs text-white/40">Need emergency care?</span>
              <Link
                href="/emergency"
                className={cn(
                  "text-xs font-bold text-[#ff9999] no-underline",
                  headerFocus,
                )}
              >
                View ED
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <nav
        className="fixed bottom-0 left-0 right-0 z-[800] flex gap-2 border-t border-border bg-white px-5 py-2.5 shadow-[0_-4px_20px_rgba(0,0,0,.12)] lg:hidden"
        aria-label="Quick actions"
      >
        <Link
          href="/find-a-doctor"
          className="flex min-h-11 flex-1 items-center justify-center rounded-sm bg-ocean text-sm font-bold text-white no-underline"
        >
          Book
        </Link>
        <Link
          href="/emergency"
          className="flex min-h-11 flex-1 items-center justify-center rounded-sm border-2 border-blue text-sm font-bold text-blue no-underline"
        >
          Contact
        </Link>
      </nav>

      <SearchOverlay
        open={searchOpen}
        onClose={() => {
          setSearchOpen(false);
          window.setTimeout(() => searchButtonRef.current?.focus(), 0);
        }}
      />
    </>
  );
}
