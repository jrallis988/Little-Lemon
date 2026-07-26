"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
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
import { cn } from "@/lib/cn";

const utilLinks = [
  { label: "Español", href: "#" },
  { label: "For Clinicians", href: "#" },
  { label: "Research", href: "#" },
  { label: "Give to Boston Children's", href: "#" },
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
  card?: { eyebrow: string; title: string; body: string; cta: string; href: string };
};

const navItems: NavItem[] = [
  {
    label: "Care",
    href: "/find-a-doctor",
    match: ["/find-a-doctor", "/conditions", "/programs", "/emergency"],
    zones: [
      {
        title: "Get care",
        accent: true,
        links: [
          { label: "Find a Doctor", href: "/find-a-doctor" },
          { label: "Book an Appointment", href: "/find-a-doctor" },
          { label: "Emergency Department", href: "/emergency" },
          { label: "Second Opinion", href: "#" },
        ],
      },
      {
        title: "Conditions & programs",
        links: [
          { label: "Epilepsy in Children", href: "/conditions/epilepsy-in-children" },
          { label: "Epilepsy Program", href: "/programs/epilepsy-program" },
          { label: "Heart Center", href: "/programs/heart-center" },
          { label: "Cancer & Blood Disorders", href: "/programs/cancer-blood-disorders" },
        ],
      },
      {
        title: "Locations",
        links: [
          { label: "Main Campus — Longwood", href: "#" },
          { label: "Waltham", href: "#" },
          { label: "Peabody", href: "#" },
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
    href: "#",
    zones: [
      {
        title: "Your visit",
        accent: true,
        links: [
          { label: "Prepare for Your Visit", href: "#" },
          { label: "Patient Portal", href: "#" },
          { label: "Billing & Insurance", href: "#" },
          { label: "Medical Records", href: "#" },
        ],
      },
      {
        title: "Support",
        links: [
          { label: "Family Support Services", href: "#" },
          { label: "Interpreter Services", href: "#" },
          { label: "Health Library", href: "/search?q=health" },
        ],
      },
    ],
  },
  {
    label: "Professionals",
    href: "#",
    zones: [
      {
        title: "For clinicians",
        accent: true,
        links: [
          { label: "Refer a Patient", href: "#" },
          { label: "Physician Access Line", href: "/emergency" },
          { label: "CME & Education", href: "#" },
        ],
      },
    ],
  },
  {
    label: "Research",
    href: "#",
    zones: [
      {
        title: "Discover",
        accent: true,
        links: [
          { label: "Research Labs", href: "#" },
          { label: "Clinical Trials", href: "#" },
          { label: "Publications", href: "#" },
          { label: "Research News", href: "#" },
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
          { label: "Leadership", href: "#" },
          { label: "Newsroom", href: "#" },
          { label: "Careers", href: "#" },
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
      { label: "Patient Portal", href: "#" },
      { label: "Prepare for Your Visit", href: "#" },
      { label: "Billing", href: "#" },
    ],
  },
  {
    id: "res",
    label: "Research & Careers",
    links: [
      { label: "Research Labs", href: "#" },
      { label: "Clinical Trials", href: "#" },
      { label: "About", href: "/about" },
    ],
  },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [edWait, setEdWait] = useState(22);

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
  }, [pathname]);

  const isActive = (item: NavItem) =>
    item.match?.some((m) => pathname === m || pathname.startsWith(`${m}/`));

  return (
    <>
      <header className="sticky top-0 z-[500]" role="banner">
        {/* Utility bar */}
        <div className="border-b border-white/[0.07] bg-nav-dark">
          <div className="wrap flex h-10 items-center justify-between gap-s2">
            <div className="flex items-center">
              {utilLinks.map((link, i) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={cn(
                    "flex h-10 items-center border-r border-white/[0.07] px-3.5 text-xs font-semibold text-white/45 no-underline transition-colors hover:text-white/85",
                    i === 0 && "pl-0",
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="flex items-center">
              <div className="hidden items-center gap-[7px] border-r border-white/[0.07] px-3.5 max-lg:hidden lg:flex">
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
                  aria-label={`Current Emergency Department wait time: approximately ${edWait} minutes`}
                >
                  ~{edWait} min
                </span>
                <Link
                  href="/emergency"
                  className="ml-[5px] text-xs text-white/40 no-underline hover:text-white/75"
                  aria-label="View Emergency Department information"
                >
                  View ED
                </Link>
              </div>

              <div className="group relative">
                <a
                  href="#"
                  className="flex h-10 items-center gap-[9px] border-l border-white/[0.07] pl-3.5 no-underline"
                  aria-label="Patient Portal — your health record and messages"
                  aria-haspopup="true"
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
                </a>
                <div
                  className="absolute right-0 top-[calc(100%+10px)] z-[600] hidden w-[300px] animate-fade-down rounded-lg border border-border bg-white shadow-lg group-hover:block"
                  role="region"
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
                    <div className="mb-3.5 flex flex-col gap-1.5" role="list">
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
                          href="#"
                          role="listitem"
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
                      href="#"
                      className="mb-2 flex min-h-11 items-center justify-center rounded-sm bg-blue text-center text-base font-bold text-white no-underline hover:bg-ocean"
                    >
                      Sign in to Portal
                    </a>
                    <a
                      href="#"
                      className="mb-3 block text-center text-sm text-ocean"
                    >
                      New to the portal? Get help setting up
                    </a>
                    <div className="flex items-start gap-[7px] border-t border-border pt-3">
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

        {/* Main nav */}
        <div
          className="bg-blue transition-shadow duration-ease"
          style={{
            boxShadow: scrolled ? "0 2px 16px rgba(0,0,0,.18)" : undefined,
          }}
        >
          <div className="wrap flex h-[68px] items-center justify-between gap-s4">
            <Link
              href="/"
              className="flex shrink-0 items-center gap-3 no-underline"
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

            <div
              className="hidden flex-1 items-center justify-center lg:flex"
              role="menubar"
            >
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className={cn("group relative", isActive(item) && "active")}
                >
                  <button
                    type="button"
                    className={cn(
                      "flex h-[68px] items-center gap-1 border-b-[3px] border-transparent px-3.5 text-sm font-bold text-white/65 transition-all hover:border-sky hover:text-white",
                      isActive(item) && "border-sky text-white",
                    )}
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {item.label}
                    <IconChevronDown className="opacity-50 transition-transform group-hover:rotate-180 group-hover:opacity-80" />
                  </button>
                  <div
                    className="absolute left-1/2 top-full z-[400] hidden min-w-[680px] -translate-x-1/2 animate-fade-down rounded-b-md border-t-[3px] border-ocean bg-white shadow-lg group-hover:block"
                    role="menu"
                    aria-label={`${item.label} submenu`}
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
                            className="flex w-full items-center justify-center rounded-sm border-2 border-white/30 px-[9px] py-[9px] text-sm font-bold text-white no-underline hover:bg-white/10"
                          >
                            {item.card.cta}
                          </Link>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex shrink-0 items-center gap-s2">
              <button
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded-sm text-white/50 transition-all hover:bg-white/10 hover:text-white"
                aria-label="Search the site"
                onClick={() => setSearchOpen(true)}
              >
                <IconSearch />
              </button>
              <Link
                href="/find-a-doctor"
                className="hidden h-9 items-center whitespace-nowrap rounded-sm border-[1.5px] border-white/25 px-3.5 text-sm font-bold text-white/80 no-underline transition-all hover:border-white/60 hover:bg-white/[0.08] hover:text-white lg:flex"
              >
                Find a Doctor
              </Link>
              <Link
                href="/find-a-doctor"
                className="hidden h-9 items-center whitespace-nowrap rounded-sm bg-ocean px-4 text-sm font-bold text-white no-underline transition-all hover:bg-[#005f9e] lg:flex"
              >
                Book Appointment
              </Link>
              <button
                type="button"
                className="flex h-11 w-11 items-center justify-center rounded-sm text-white/60 transition-all hover:bg-white/10 hover:text-white lg:hidden"
                aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={mobileOpen}
                aria-controls="mob-nav"
                onClick={() => setMobileOpen((v) => !v)}
              >
                {mobileOpen ? <IconClose /> : <IconMenu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile nav */}
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
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/15">
                <IconLock className="text-white/80" />
              </span>
              <span className="text-sm font-bold text-white">Patient Portal</span>
            </div>
            <p className="pb-3 pl-[27px] text-xs font-light leading-[1.6] text-white/40">
              Test results, messages, and appointments
            </p>
            <a
              href="#"
              className="mb-[7px] flex min-h-11 items-center justify-center rounded-sm bg-white text-center text-base font-bold text-blue no-underline"
            >
              Sign in
            </a>
          </div>

          <div className="px-3 pb-2 pt-1">
            {[
              { label: "Find a Doctor", href: "/find-a-doctor" },
              { label: "Book an Appointment", href: "/find-a-doctor" },
              { label: "Search the site", href: "/search", action: () => setSearchOpen(true) },
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
                  className="flex min-h-11 w-full items-center justify-between border-b border-white/[0.06] px-1 py-[11px] text-left text-base font-bold text-white/70"
                >
                  {task.label}
                  <IconChevronRight className="opacity-30" />
                </button>
              ) : (
                <Link
                  key={task.label}
                  href={task.href}
                  className="flex min-h-11 items-center justify-between border-b border-white/[0.06] px-1 py-[11px] text-base font-bold text-white/70 no-underline"
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
              return (
                <div key={group.id} className={cn(open && "open")}>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between border-b border-white/[0.05] px-1 py-2.5 text-base font-semibold text-white/40"
                    aria-expanded={open}
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
                  {open ? (
                    <div className="flex flex-col gap-0 py-1.5 pl-3.5 pb-2.5">
                      {group.links.map((link) => (
                        <Link
                          key={link.label}
                          href={link.href}
                          className="py-1 text-sm font-light text-white/40 no-underline hover:text-white/80"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>

          <div className="flex flex-col gap-2 border-t border-white/[0.07] p-3">
            <Link
              href="/find-a-doctor"
              className="block rounded-sm bg-ocean py-3 text-center text-base font-bold text-white no-underline"
            >
              Book an Appointment
            </Link>
            <div className="flex items-center justify-between py-2">
              <span className="text-xs text-white/40">Need emergency care?</span>
              <Link
                href="/emergency"
                className="text-xs font-bold text-[#ff9999] no-underline"
              >
                View ED
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile sticky bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 z-[800] flex gap-2 border-t border-border bg-white px-5 py-2.5 shadow-[0_-4px_20px_rgba(0,0,0,.12)] lg:hidden">
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
      </div>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
