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
import { DesktopPrimaryNav } from "@/components/layout/DesktopPrimaryNav";
import { focusFirst, getFocusableElements } from "@/lib/a11y";
import { cn } from "@/lib/cn";

const utilLinks = [
  { label: "Español", href: "/patients-families" },
  { label: "For Clinicians", href: "/professionals" },
  { label: "Give", href: "/#giving" },
  { label: "Emergency", href: "/emergency" },
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
          { label: "Portal preview (not live)", href: "/portal" },
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
          { label: "About Us", href: "/about" },
          { label: "Leadership", href: "/about/leadership" },
          { label: "Our History", href: "/about/history" },
          { label: "Community Health", href: "/about/community" },
        ],
      },
      {
        title: "Also explore",
        links: [
          { label: "Locations", href: "/locations" },
          { label: "Research", href: "/research" },
          { label: "Design System", href: "/design-system" },
          { label: "Emergency Department", href: "/emergency" },
        ],
      },
    ],
    card: {
      eyebrow: "About Us",
      title: "Here for every child.",
      body: "Mission, leadership, history, and community impact.",
      cta: "Explore About Us",
      href: "/about",
    },
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
        {/* Global utility bar — secondary high-intent actions */}
        <div className="border-b border-white/[0.06] bg-nav-dark">
          <div className="wrap flex h-9 items-center justify-between gap-s4">
            <nav
              className="flex min-w-0 items-center gap-1 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              aria-label="Utility links"
            >
              {utilLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={cn(
                    "flex h-9 shrink-0 items-center px-3 text-[11px] font-semibold tracking-[0.01em] text-white/65 no-underline transition-colors hover:text-white",
                    headerFocus,
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="flex shrink-0 items-center gap-s1">
              <div className="hidden items-center gap-2 px-2 lg:flex">
                <span
                  className="h-1.5 w-1.5 shrink-0 animate-pulse-dot rounded-full bg-green-bright"
                  aria-hidden="true"
                />
                <span className="text-[11px] text-white/60">ED wait</span>
                <span
                  className="text-[11px] font-bold text-green-bright"
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
                    "text-[11px] text-white/55 no-underline hover:text-white",
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
                    "flex h-9 items-center gap-2 rounded-sm px-2.5 transition-colors hover:bg-white/[0.06]",
                    headerFocus,
                  )}
                  aria-label="Patient Portal preview — not a live medical record"
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
                    className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.08]"
                    aria-hidden="true"
                  >
                    <IconLock className="text-white/70" />
                  </span>
                  <span className="leading-tight max-sm:hidden">
                    <span className="block text-[11px] font-bold text-white/90">
                      Portal
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
                  aria-label="Portal preview options"
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
                          href: "/portal",
                        },
                        {
                          label: "Message your care team",
                          desc: "Non-urgent questions and follow-up",
                          href: "/portal",
                        },
                        {
                          label: "Manage appointments",
                          desc: "Upcoming visits, referrals, scheduling",
                          href: "/appointments/request",
                        },
                      ].map((action) => (
                        <Link
                          key={action.label}
                          href={action.href}
                          className="flex min-h-11 items-center justify-between rounded-sm border border-border bg-surface px-3 py-[9px] no-underline transition-all hover:border-border-strong hover:bg-surface-2"
                          onClick={() => setPortalOpen(false)}
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
                        </Link>
                      ))}
                    </div>
                    <Link
                      href="/portal"
                      className="mb-2 flex min-h-11 items-center justify-center rounded-sm bg-blue text-center text-base font-bold text-white no-underline hover:bg-ocean"
                      onClick={() => setPortalOpen(false)}
                    >
                      Open portal preview
                    </Link>
                    <Link
                      href="/patients-families"
                      className="mb-3 block text-center text-sm text-ocean"
                      onClick={() => setPortalOpen(false)}
                    >
                      Patients &amp; families resources
                    </Link>
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

        {/* Primary navigation — logo, mega menus, search, primary CTA */}
        <div
          id="site-nav"
          tabIndex={-1}
          className="bg-blue transition-shadow duration-ease outline-none"
          style={{
            boxShadow: scrolled ? "0 2px 16px rgba(0,0,0,.18)" : undefined,
          }}
        >
          <div className="wrap flex h-[72px] items-center justify-between gap-s5">
            <Link
              href="/"
              className={cn(
                "flex shrink-0 items-center gap-3.5 no-underline",
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
                <span className="mt-0.5 text-[10px] font-bold tracking-[0.01em] text-pink">
                  Where the world comes for answers
                </span>
              </span>
            </Link>

            <DesktopPrimaryNav items={navItems} />

            <div className="flex shrink-0 items-center gap-s3">
              <button
                ref={searchButtonRef}
                type="button"
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-sm text-white/75 transition-all hover:bg-white/10 hover:text-white",
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
                  "hidden h-10 items-center whitespace-nowrap px-1 text-sm font-bold text-white/80 no-underline transition-colors hover:text-white lg:flex",
                  headerFocus,
                )}
              >
                Find a Doctor
              </Link>
              <Link
                href="/appointments/request"
                className={cn(
                  "hidden h-10 items-center whitespace-nowrap rounded-sm bg-pink px-5 text-sm font-bold text-white no-underline transition-all hover:bg-pink-text lg:flex",
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
                  "flex h-11 w-11 items-center justify-center rounded-sm text-white/70 transition-all hover:bg-white/10 hover:text-white lg:hidden",
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
              <span className="text-sm font-bold text-white">Portal preview</span>
            </div>
            <p className="pb-3 pl-[27px] text-xs font-light leading-[1.6] text-white/80">
              UX preview only — not a live medical record
            </p>
            <Link
              href="/portal"
              className="mb-[7px] flex min-h-11 items-center justify-center rounded-sm bg-white text-center text-base font-bold text-blue no-underline"
            >
              Open preview
            </Link>
          </div>

          <div className="px-3 pb-2 pt-1">
            {[
              { label: "Find a Doctor", href: "/find-a-doctor" },
              { label: "Book an Appointment", href: "/appointments/request" },
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
                      "flex w-full items-center justify-between border-b border-white/[0.05] px-1 py-2.5 text-base font-semibold text-white/85",
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
                          "py-1 text-sm font-light text-white/80 no-underline hover:text-white",
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
              <span className="text-xs text-white/80">Need emergency care?</span>
              <Link
                href="/emergency"
                className={cn(
                  "text-xs font-bold text-emergency-bright no-underline",
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
