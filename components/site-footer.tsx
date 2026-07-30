import {
  Facebook,
  Instagram,
  Youtube,
  ChevronDown,
} from "lucide-react";
import { PlanetFitnessLogo } from "@/components/brand-logo";

const INFO = [
  { label: "Newsroom", href: "https://www.planetfitness.com/newsroom" },
  { label: "Careers", href: "https://www.planetfitness.com/careers" },
  { label: "FAQs", href: "https://www.planetfitness.com/faq" },
  { label: "Directory", href: "https://www.planetfitness.com/gyms" },
  { label: "Blog", href: "https://www.planetfitness.com/blog" },
];

const PARTNERS = [
  { label: "Franchising", href: "https://www.planetfitness.com/franchise" },
  {
    label: "Investor Relations",
    href: "https://investor.planetfitness.com/",
  },
  { label: "PF Purpose", href: "https://www.planetfitness.com/purpose" },
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
    label: "Your State and EU Privacy Rights",
    href: "https://www.planetfitness.com/privacy-rights",
  },
  {
    label: "Accessibility",
    href: "https://www.planetfitness.com/accessibility",
  },
];

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.3 6.34 6.34 0 0 0 9.49 21.6a6.34 6.34 0 0 0 6.34-6.34V8.84a8.2 8.2 0 0 0 4.76 1.52V6.9a4.85 4.85 0 0 1-.99-.21z" />
    </svg>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-pf-purple text-white">
      <div className="mx-auto max-w-5xl px-4 py-10 md:px-6 md:py-12">
        <div className="flex flex-col gap-5">
          <a href="#clubs" className="inline-flex w-fit">
            <PlanetFitnessLogo
              className="[&_span]:text-white"
              markClassName="h-9 w-9"
            />
          </a>

          <a
            href="https://www.planetfitness.com/mobileapp"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-12 w-full items-center justify-center rounded-full bg-white px-5 text-sm font-semibold text-pf-purple transition hover:bg-white/90 sm:w-auto sm:self-start"
          >
            Download the PF App
          </a>

          <button
            type="button"
            className="inline-flex w-fit items-center gap-2 text-sm text-white/90"
            aria-label="Region: US (English)"
          >
            <span aria-hidden className="text-base leading-none">
              🇺🇸
            </span>
            <span>Region: US (English)</span>
            <ChevronDown className="h-4 w-4 opacity-80" aria-hidden />
          </button>
        </div>

        <div className="mt-8 grid gap-8 border-t border-white/20 pt-8 text-sm sm:grid-cols-3">
          <div>
            <p className="mb-3 font-bold text-white">Info</p>
            <ul className="space-y-2.5 text-white/90">
              {INFO.map((item) => (
                <li key={item.label}>
                  <a
                    className="hover:underline"
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-3 font-bold text-white">Partners</p>
            <ul className="space-y-2.5 text-white/90">
              {PARTNERS.map((item) => (
                <li key={item.label}>
                  <a
                    className="hover:underline"
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-3 font-bold text-white">Legal</p>
            <ul className="space-y-2.5 text-white/90">
              {LEGAL.map((item) => (
                <li key={item.label}>
                  <a
                    className="hover:underline"
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-4 border-t border-white/20 pt-8">
          <ul className="flex items-center gap-5">
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
                href="https://www.tiktok.com/@planetfitness"
                target="_blank"
                rel="noreferrer"
                aria-label="Planet Fitness on TikTok"
                className="inline-flex text-white transition hover:text-pf-yellow"
              >
                <TikTokIcon className="h-5 w-5" />
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
          <p className="text-center text-xs text-white/70">
            © 2026 Planet Fitness Franchising, LLC.
          </p>
        </div>
      </div>
    </footer>
  );
}
