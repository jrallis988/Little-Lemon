import type { ReactNode } from "react";
import Link from "next/link";
import {
  Facebook,
  Instagram,
  Youtube,
  Globe2,
} from "lucide-react";
import { PlanetFitnessLogo } from "@/components/brand-logo";
import { HOME_CLUB } from "@/lib/home-club";

const INFO = [
  { label: "Newsroom", href: "https://www.planetfitness.com/newsroom" },
  { label: "Careers", href: "https://www.planetfitness.com/careers" },
  { label: "FAQs", href: "https://www.planetfitness.com/faq" },
  { label: "Directory", href: "https://www.planetfitness.com/gyms" },
  { label: "Blog", href: "https://www.planetfitness.com/blog" },
];

const BUSINESS = [
  { label: "Franchising", href: "https://www.planetfitness.com/franchise" },
  {
    label: "Investor Relations",
    href: "https://investor.planetfitness.com/",
  },
  { label: "PF Corporate", href: "https://www.planetfitness.com/about-us" },
  {
    label: "PF Media Network",
    href: "https://www.planetfitness.com/pf-media-network",
  },
];

const LEGAL = [
  {
    label: "Privacy Policy",
    href: "https://www.planetfitness.com/privacy-policy",
  },
  {
    label: "Terms and Conditions of Use",
    href: "https://www.planetfitness.com/terms-conditions",
  },
  {
    label: "Do Not Sell or Share My Personal Information",
    href: "https://www.planetfitness.com/do-not-sell",
  },
  {
    label: "Your Privacy Choices",
    href: "https://www.planetfitness.com/do-not-sell",
    privacyChoices: true,
  },
  {
    label: "Privacy Rights",
    href: "https://www.planetfitness.com/privacy-rights",
  },
  {
    label: "Accessibility",
    href: "https://www.planetfitness.com/accessibility",
  },
];

/** CCPA-style Privacy Choices badge used next to the legal link. */
function PrivacyChoicesIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 30 14"
      className={className}
      aria-hidden
      fill="none"
    >
      <rect
        x="0.5"
        y="0.5"
        width="29"
        height="13"
        rx="6.5"
        stroke="currentColor"
        strokeWidth="1"
      />
      <circle cx="8" cy="7" r="3.25" fill="currentColor" />
      <path
        d="M19.2 4.2h2.4l.7 2.1.7-2.1h2.4v5.6h-1.55V7.1l-.55 1.85h-1.2L20.7 7.1v2.7H19.2V4.2z"
        fill="currentColor"
      />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.727-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
  );
}

function FooterLink({
  href,
  children,
  external = true,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
}) {
  return (
    <a
      className="inline-flex items-center gap-1.5 text-white/90 transition hover:text-white hover:underline"
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
    >
      {children}
    </a>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-white text-pf-ink">
      <div className="border-t border-pf-line px-4 py-6 md:px-6">
        <p className="mx-auto max-w-5xl text-xs leading-relaxed text-pf-ink/60">
          Unofficial concept site for {HOME_CLUB.name} ({HOME_CLUB.address},{" "}
          {HOME_CLUB.city}, {HOME_CLUB.state} {HOME_CLUB.zip} · {HOME_CLUB.phone}
          ). Not affiliated with or endorsed by Planet Fitness Franchising, LLC.
          Membership dues, enrollment, and annual fees vary by club and are
          confirmed before you join. Starting rates shown are illustrative until
          franchise-confirmed. Member tools (check-in, keytag, Crowd Meter) live
          in the app segment.
        </p>
      </div>

      {/* Solid brand purple (#5f259f) matching PF Stratham footer */}
      <div className="bg-pf-purple px-4 pb-8 pt-8 text-white md:px-6 md:pb-10 md:pt-10">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <Link href="/#clubs" className="inline-flex w-fit">
              <PlanetFitnessLogo
                className="[&_span]:text-white"
                markClassName="h-10 w-10"
              />
            </Link>
            <div className="flex flex-col items-start gap-3 sm:items-end">
              <Link
                href="/join"
                className="inline-flex h-11 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-pf-purple transition hover:bg-white/90"
              >
                Join Now
              </Link>
              <p
                className="inline-flex items-center gap-2 text-sm text-white"
                aria-label="Region: New Hampshire"
              >
                <Globe2 className="h-4 w-4 shrink-0" aria-hidden />
                <span>Region: NH</span>
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-8 text-sm sm:grid-cols-3 sm:gap-6">
            <div>
              <p className="mb-3 text-[13px] font-bold uppercase tracking-wide text-white">
                Info
              </p>
              <ul className="space-y-2.5">
                {INFO.map((item) => (
                  <li key={item.label}>
                    <FooterLink href={item.href}>{item.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-3 text-[13px] font-bold uppercase tracking-wide text-white">
                Business
              </p>
              <ul className="space-y-2.5">
                {BUSINESS.map((item) => (
                  <li key={item.label}>
                    <FooterLink href={item.href}>{item.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-3 text-[13px] font-bold uppercase tracking-wide text-white">
                Legal
              </p>
              <ul className="space-y-2.5">
                {LEGAL.map((item) => (
                  <li key={item.label}>
                    <FooterLink href={item.href}>
                      {item.label}
                      {"privacyChoices" in item && item.privacyChoices ? (
                        <PrivacyChoicesIcon className="h-3.5 w-7 text-white" />
                      ) : null}
                    </FooterLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-5 border-t border-white/25 pt-8">
            <ul className="flex flex-wrap items-center gap-5">
              <li>
                <a
                  href="https://www.facebook.com/planetfitness"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Planet Fitness on Facebook"
                  className="inline-flex text-white transition hover:text-pf-yellow"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/PlanetFitness"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Planet Fitness on X"
                  className="inline-flex text-white transition hover:text-pf-yellow"
                >
                  <XIcon className="h-5 w-5" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/planetfitness"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Planet Fitness on Instagram"
                  className="inline-flex text-white transition hover:text-pf-yellow"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/planetfitness"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Planet Fitness on YouTube"
                  className="inline-flex text-white transition hover:text-pf-yellow"
                >
                  <Youtube className="h-5 w-5" />
                </a>
              </li>
            </ul>
            <p className="text-xs leading-relaxed text-white/80">
              Planet Fitness is an equal opportunity employer. 4 Liberty Lane
              West, Hampton, NH 03842
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
