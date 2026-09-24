import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import { SocialLinks } from "./SocialLinks";
import { legalLinks, trademarkNotice, trustBadges } from "../data/social";

const siteColumns = [
  {
    title: "Campaign",
    links: [
      { label: "Why it matters", to: "/#why-it-matters" },
      { label: "Your priorities", to: "/#years-of-you" },
      { label: "What’s next", to: "/#ahead" },
      { label: "Find Your Year", to: "/find-your-year" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "Programs", to: "/programs" },
      { label: "What’s Next", to: "/whats-next" },
      { label: "Stories", to: "/stories" },
      { label: "Innovation", to: "/innovation" },
      { label: "Research", to: "/research" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "About", to: "/about" },
      { label: "Case Study", to: "/case-study" },
      { label: "Social channels", to: "/#connect" },
      { label: "Start Your Journey", to: "/#finale" },
      { label: "Community", to: "/#present-63" },
    ],
  },
];

function LegitScriptBadge() {
  return (
    <a
      href={trustBadges.legitScript.href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-md bg-[#0b2a4a] px-3 py-2 text-white transition hover:opacity-90"
      aria-label={trustBadges.legitScript.label}
    >
      <span className="relative inline-flex h-8 w-8 items-center justify-center">
        <span className="absolute inset-0 rotate-0 rounded-md border-2 border-[#3ecf8e]/60 [clip-path:polygon(50%_0,93%_25%,93%_75%,50%_100%,7%_75%,7%_25%)]" />
        <span className="font-sans text-sm font-bold text-[#3ecf8e]">✓</span>
      </span>
      <span className="text-left leading-tight">
        <span className="block font-sans text-[0.65rem] font-semibold uppercase tracking-wide">
          LegitScript
        </span>
        <span className="block font-sans text-[0.6rem] text-white/75">Certified</span>
      </span>
    </a>
  );
}

export function Footer() {
  return (
    <footer className="mt-6">
      <div className="border-t border-ink/8 bg-paper pb-10 pt-14">
        <div className="section-shell">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_repeat(3,0.7fr)]">
            <div>
              <Logo />
              <p className="mt-4 max-w-xs font-serif text-base leading-relaxed text-ink/60">
                Science-backed weight health for real life—since 1963, redesigned for what’s next.
              </p>
            </div>

            {siteColumns.map((column) => (
              <div key={column.title}>
                <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-ink/40">
                  {column.title}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.to}
                        className="font-sans text-sm text-ink/65 transition hover:text-ink"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-periwinkle text-ink">
        <div className="section-shell py-10 sm:py-12">
          <ul className="space-y-3">
            {legalLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-sm font-medium text-ink transition hover:text-cobalt-800 hover:underline"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <p className="mt-8 max-w-3xl font-sans text-xs leading-relaxed text-ink/80 sm:text-sm">
            {trademarkNotice}
          </p>

          <SocialLinks className="mt-8" />

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={trustBadges.truste.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded bg-white px-2 py-1 shadow-sm transition hover:opacity-90"
            >
              <img
                src={trustBadges.truste.seal}
                alt={trustBadges.truste.label}
                width={142}
                height={45}
                className="h-10 w-auto"
                loading="lazy"
              />
            </a>
            <LegitScriptBadge />
          </div>

          <p className="mt-6 font-sans text-xs text-ink/55">
            Independent conceptual redesign created for portfolio purposes. Not affiliated with or
            commissioned by WeightWatchers. Future product experiences are labeled as Concept /
            Future Vision / Prototype and do not represent live WeightWatchers products.
          </p>
        </div>

        <div className="overflow-hidden border-t border-cobalt-800/10">
          <p
            className="select-none whitespace-nowrap px-5 pb-2 pt-6 text-center font-display text-[18vw] font-extrabold leading-none tracking-tight text-cobalt-700/90 sm:text-[12vw]"
            style={{ fontWeight: 800 }}
            aria-hidden="true"
          >
            WEIGHT WATCHERS
          </p>
        </div>
      </div>
    </footer>
  );
}
