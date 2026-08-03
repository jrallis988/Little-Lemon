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
  IconClose,
  IconGlobe,
  IconLock,
  IconMenu,
  IconSearch,
} from "@/components/ui/Icons";
import { BchMark } from "@/components/brand/BchLogo";
import { SearchOverlay } from "@/components/search/SearchOverlay";
import { DesktopPrimaryNav, type NavItem } from "@/components/layout/DesktopPrimaryNav";
import { HeaderMenu } from "@/components/layout/HeaderMenu";
import { focusFirst, getFocusableElements } from "@/lib/a11y";
import { cn } from "@/lib/cn";

const languageOptions = [
  { label: "English", href: "/", code: "en", native: "English" },
  { label: "Spanish", href: "/es", code: "es", native: "Español" },
  { label: "Mandarin", href: "/zh", code: "zh", native: "中文" },
];

const navItems: NavItem[] = [
  {
    label: "Programs & Services",
    shortLabel: "Programs",
    href: "/programs",
    match: ["/conditions", "/programs", "/emergency", "/appointments", "/find-a-doctor", "/locations"],
    zones: [
      {
        title: "Explore care",
        accent: true,
        links: [
          { label: "Find a Doctor", href: "/find-a-doctor" },
          { label: "Find a Location", href: "/locations" },
          { label: "Request an Appointment", href: "/appointments/request" },
          { label: "Emergency Department", href: "/emergency" },
        ],
      },
      {
        title: "Programs & conditions",
        links: [
          { label: "Programs & Services", href: "/programs" },
          { label: "Conditions A–Z", href: "/conditions" },
          {
            label: "Epilepsy in Children",
            href: "/conditions/epilepsy-in-children",
          },
          { label: "Heart Center", href: "/programs/heart-center" },
        ],
      },
      {
        title: "Visit support",
        links: [
          { label: "Prepare for your visit", href: "/patients-families/prepare-for-your-visit" },
          { label: "Patients & Families", href: "/patients-families" },
          { label: "International patients", href: "/international" },
        ],
      },
    ],
    card: {
      eyebrow: "Start here",
      title: "Need care for your child?",
      body: "Search specialists by name or specialty, then book an appointment.",
      cta: "Find a Doctor",
      href: "/find-a-doctor",
    },
  },
  {
    label: "Patients & Families",
    shortLabel: "Patients",
    href: "/patients-families",
    match: ["/patients-families", "/portal"],
    zones: [
      {
        title: "Your visit",
        accent: true,
        links: [
          { label: "Patients & Families hub", href: "/patients-families" },
          { label: "Prepare for your visit", href: "/patients-families/prepare-for-your-visit" },
          { label: "Patient Portal", href: "/portal" },
          { label: "Emergency Department", href: "/emergency" },
        ],
      },
      {
        title: "Support",
        links: [
          { label: "Pay My Bill", href: "/patients-families/billing" },
          { label: "Medical records", href: "/patients-families/medical-records" },
          { label: "Health Library / Search", href: "/search?q=health" },
          { label: "About Boston Children's", href: "/about" },
        ],
      },
    ],
  },
  {
    label: "Healthcare Professionals",
    shortLabel: "Professionals",
    href: "/professionals",
    match: ["/professionals"],
    zones: [
      {
        title: "For clinicians",
        accent: true,
        links: [
          { label: "Professionals hub", href: "/professionals" },
          { label: "Refer a patient", href: "/professionals/refer" },
          { label: "Get a Second Opinion", href: "/professionals/second-opinion" },
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
    match: ["/about", "/design-system", "/international"],
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
          { label: "Work Here", href: "/about" },
          { label: "Donate", href: "/#giving" },
          { label: "International patients", href: "/international" },
          { label: "Design System", href: "/design-system" },
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
    label: "Programs & Services",
    links: [
      { label: "Find a Doctor", href: "/find-a-doctor" },
      { label: "Find a Location", href: "/locations" },
      { label: "Programs & Services", href: "/programs" },
      { label: "Conditions A–Z", href: "/conditions" },
      { label: "Request an Appointment", href: "/appointments/request" },
      { label: "Emergency Department", href: "/emergency" },
    ],
  },
  {
    id: "pf",
    label: "Patients & Families",
    links: [
      { label: "Patients & Families hub", href: "/patients-families" },
      { label: "Prepare for your visit", href: "/patients-families/prepare-for-your-visit" },
      { label: "Patient Portal", href: "/portal" },
      { label: "Pay My Bill", href: "/patients-families/billing" },
      { label: "Medical records", href: "/patients-families/medical-records" },
    ],
  },
  {
    id: "pro",
    label: "Healthcare Professionals",
    links: [
      { label: "Professionals hub", href: "/professionals" },
      { label: "Refer a patient", href: "/professionals/refer" },
      { label: "Get a Second Opinion", href: "/professionals/second-opinion" },
    ],
  },
  {
    id: "res",
    label: "Research & About",
    links: [
      { label: "Research", href: "/research" },
      { label: "About Us", href: "/about" },
      { label: "Our History", href: "/about/history" },
      { label: "Donate", href: "/#giving" },
      { label: "Work Here", href: "/about" },
      { label: "International patients", href: "/international" },
    ],
  },
];

const headerFocus =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

function currentLanguage(pathname: string) {
  if (pathname === "/es" || pathname.startsWith("/es/")) return languageOptions[1];
  if (pathname === "/zh" || pathname.startsWith("/zh/")) return languageOptions[2];
  return languageOptions[0];
}

export function SiteHeader() {
  const pathname = usePathname();
  const baseId = useId();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [portalOpen, setPortalOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const language = currentLanguage(pathname);

  const searchButtonRef = useRef<HTMLButtonElement>(null);
  const portalWrapRef = useRef<HTMLDivElement>(null);
  const portalButtonRef = useRef<HTMLButtonElement>(null);
  const portalPanelRef = useRef<HTMLDivElement>(null);
  const mobileToggleRef = useRef<HTMLButtonElement>(null);

  const closeMenus = useCallback(() => {
    setPortalOpen(false);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenGroup(null);
    closeMenus();
  }, [pathname, closeMenus]);

  useEffect(() => {
    if (!portalOpen) return;
    const onPointer = (e: MouseEvent) => {
      if (portalWrapRef.current && !portalWrapRef.current.contains(e.target as Node)) {
        setPortalOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setPortalOpen(false);
      portalButtonRef.current?.focus();
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [portalOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    document.body.style.overflow = "hidden";
    const nav = document.getElementById("mob-nav");
    if (nav) window.setTimeout(() => focusFirst(nav), 30);

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

  useEffect(() => {
    if (!portalOpen) return;
    const panel = portalPanelRef.current;
    if (panel) window.setTimeout(() => focusFirst(panel), 20);
  }, [portalOpen]);

  return (
    <>
      <header className="sticky top-0 z-[500]" role="banner">
        <div
          id="site-nav"
          tabIndex={-1}
          className="bg-blue transition-shadow duration-ease outline-none"
          style={{
            boxShadow: scrolled ? "0 2px 16px rgba(0,0,0,.18)" : undefined,
          }}
        >
          <div className="wrap flex h-16 items-center gap-s2 xl:gap-s3">
            <Link
              href="/"
              className={cn(
                "flex shrink-0 items-center gap-3 no-underline",
                headerFocus,
              )}
              aria-label="Boston Children's Hospital — home"
            >
              <BchMark variant="onDark" className="h-12 w-12" />
              <span className="hidden font-sans text-[15px] font-bold leading-[1.12] tracking-[-0.01em] text-white min-[1100px]:block">
                Boston
                <br />
                Children&apos;s
                <br />
                Hospital
              </span>
            </Link>

            <div className="hidden min-w-0 items-center xl:flex">
              <DesktopPrimaryNav items={navItems} />
            </div>

            <div className="ml-auto flex shrink-0 items-center gap-1">
              <HeaderMenu
                label="International"
                align="right"
                icon={<IconGlobe className="text-white/85" />}
                items={[
                  {
                    label: "International patients",
                    href: "/international",
                    description: "Global care and destination medicine",
                  },
                  ...languageOptions.map((option) => ({
                    label: option.native,
                    href: option.href,
                    description: option.label,
                  })),
                ]}
                triggerClassName={cn(
                  "max-sm:px-2",
                  (pathname === "/international" ||
                    pathname.startsWith("/international/") ||
                    language.code !== "en") &&
                    "bg-white/10 text-white",
                )}
              />

              <div className="relative" ref={portalWrapRef}>
                <button
                  ref={portalButtonRef}
                  type="button"
                  className={cn(
                    "flex h-10 items-center gap-2 rounded-sm px-2.5 transition-colors hover:bg-white/10",
                    headerFocus,
                  )}
                  aria-label="Patient Portal preview — not a live medical record"
                  aria-haspopup="dialog"
                  aria-expanded={portalOpen}
                  aria-controls={`${baseId}-portal`}
                  onClick={() => setPortalOpen((v) => !v)}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowDown") {
                      e.preventDefault();
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
                  <span className="hidden text-[12.5px] font-bold text-white/90 sm:block">
                    Patient Portal
                  </span>
                </button>
                <div
                  id={`${baseId}-portal`}
                  ref={portalPanelRef}
                  hidden={!portalOpen}
                  className={cn(
                    "absolute right-0 top-[calc(100%+10px)] z-[700] w-[300px] animate-fade-down rounded-lg border border-border bg-white shadow-lg",
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
                    <Link
                      href="/portal"
                      className="mb-2 flex min-h-11 items-center justify-center rounded-sm bg-blue text-center text-base font-bold text-white no-underline hover:bg-ocean"
                      onClick={() => setPortalOpen(false)}
                    >
                      Open portal preview
                    </Link>
                    <p className="m-0 text-[11px] font-light leading-[1.55] text-text-meta">
                      Preview only — not a live medical record.
                    </p>
                  </div>
                </div>
              </div>

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

              <button
                ref={mobileToggleRef}
                id="mob-toggle"
                type="button"
                className={cn(
                  "flex h-11 w-11 items-center justify-center rounded-sm text-white/70 transition-all hover:bg-white/10 hover:text-white xl:hidden",
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
            "max-h-[82vh] overflow-y-auto border-t border-white/[0.07] bg-nav-dark xl:hidden",
            mobileOpen ? "block animate-fade-down" : "hidden",
          )}
          aria-label="Mobile navigation"
          aria-hidden={!mobileOpen}
        >
          <div className="flex flex-wrap gap-2 border-b border-white/[0.07] p-3">
            {languageOptions.map((option) => (
              <Link
                key={option.code}
                href={option.href}
                className={cn(
                  "inline-flex min-h-10 items-center rounded-sm border px-3 text-sm font-bold no-underline",
                  language.code === option.code
                    ? "border-white bg-white text-blue"
                    : "border-white/25 text-white/85 hover:border-white/55",
                  headerFocus,
                )}
                onClick={() => setMobileOpen(false)}
              >
                {option.native}
              </Link>
            ))}
            <Link
              href="/international"
              className={cn(
                "inline-flex min-h-10 items-center rounded-sm border border-sky/50 px-3 text-sm font-bold text-sky no-underline",
                headerFocus,
              )}
              onClick={() => setMobileOpen(false)}
            >
              International
            </Link>
          </div>

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
            <p className="pb-3 pl-[27px] text-xs font-light leading-[1.6] text-white/80">
              UX preview only — not a live medical record
            </p>
            <Link
              href="/portal"
              className="flex min-h-11 items-center justify-center rounded-sm bg-white text-center text-base font-bold text-blue no-underline"
              onClick={() => setMobileOpen(false)}
            >
              Open preview
            </Link>
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
                        "opacity-30 transition-transform duration-200",
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
                          "py-1.5 text-sm font-light text-white/80 no-underline hover:text-white",
                          headerFocus,
                        )}
                        onClick={() => setMobileOpen(false)}
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
              href="/appointments/request"
              className={cn(
                "block rounded-sm bg-ocean py-3 text-center text-base font-bold text-white no-underline",
                headerFocus,
              )}
              onClick={() => setMobileOpen(false)}
            >
              Request an Appointment
            </Link>
            <Link
              href="/emergency"
              className={cn(
                "block rounded-sm border border-emergency-bright/50 py-3 text-center text-base font-bold text-emergency-bright no-underline",
                headerFocus,
              )}
              onClick={() => setMobileOpen(false)}
            >
              Emergency Department
            </Link>
          </div>
        </nav>
      </header>

      <nav
        className="fixed bottom-0 left-0 right-0 z-[800] flex gap-2 border-t border-border bg-white px-5 py-2.5 shadow-[0_-4px_20px_rgba(0,0,0,.12)] xl:hidden"
        aria-label="Quick actions"
      >
        <Link
          href="/find-a-doctor"
          className="flex min-h-11 flex-1 items-center justify-center rounded-sm bg-ocean text-sm font-bold text-white no-underline"
        >
          Find a Doctor
        </Link>
        <Link
          href="/locations"
          className="flex min-h-11 flex-1 items-center justify-center rounded-sm border-2 border-blue text-sm font-bold text-blue no-underline"
        >
          Locations
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
