import { socialLinks, type SocialLink } from "../data/social";

function SocialIcon({ id }: { id: SocialLink["id"] }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    className: "h-4 w-4",
  };

  switch (id) {
    case "instagram":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
        </svg>
      );
    case "facebook":
      return (
        <svg {...common}>
          <path d="M14 9h3V6h-3c-2 0-3 1.2-3 3v2H9v3h2v7h3v-7h3l1-3h-4V9c0-.5.2-1 1-1Z" />
        </svg>
      );
    case "tiktok":
      return (
        <svg {...common}>
          <path d="M14 4v10.2a3.8 3.8 0 1 1-2.8-3.65V13a1.7 1.7 0 1 0 1.2 1.62V4h1.6c.4 2.1 1.8 3.4 4 3.7V9.4c-1.5-.2-2.7-1-3.4-2.3V4H14Z" />
        </svg>
      );
    case "youtube":
      return (
        <svg {...common}>
          <rect x="2.5" y="6" width="19" height="12" rx="3.5" />
          <path d="M10.5 9.5v5l5-2.5-5-2.5Z" fill="currentColor" stroke="none" />
        </svg>
      );
    case "x":
      return (
        <svg {...common}>
          <path d="M5 5l14 14M19 5 5 19" />
        </svg>
      );
    case "pinterest":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M11 17.5c.4-1.7.8-3.3 1-4.2.2-.7-.1-1.1-.7-1.1-.8 0-1.4.8-1.4 1.9 0 .7.2 1.2.2 1.2l-1 4.1" />
          <path d="M12.8 8.4c2.1 0 3.4 1.4 3.4 3.4 0 2.2-1.3 4-3.3 4-.8 0-1.6-.5-1.8-1.1" />
        </svg>
      );
    default:
      return null;
  }
}

type SocialLinksProps = {
  variant?: "footer" | "panel";
  className?: string;
};

export function SocialLinks({ variant = "footer", className = "" }: SocialLinksProps) {
  if (variant === "panel") {
    return (
      <div className={className}>
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-cobalt-600">
          Follow along
        </p>
        <p className="mt-2 max-w-xl font-serif text-lg text-ink/65">
          Recipes, member wins, coach tips, and daily motivation from the official Weight Watchers
          channels.
        </p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {socialLinks.map((link) => (
            <li key={link.id}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-2xl border border-ink/8 bg-white/80 px-4 py-3 transition hover:border-cobalt-200 hover:bg-white"
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-mist text-cobalt-700 transition group-hover:bg-cobalt-600 group-hover:text-white">
                  <SocialIcon id={link.id} />
                </span>
                <span>
                  <span className="block font-sans text-sm font-semibold text-ink">{link.label}</span>
                  <span className="block font-sans text-xs text-ink/50">{link.handle}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className={className}>
      <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-ink/40">
        Social
      </p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {socialLinks.map((link) => (
          <li key={link.id}>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${link.label} ${link.handle}`}
              className="inline-flex items-center gap-2 rounded-xl border border-ink/10 bg-white px-3 py-2 font-sans text-xs font-semibold text-ink/70 transition hover:border-cobalt-200 hover:text-cobalt-700"
            >
              <SocialIcon id={link.id} />
              <span>{link.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
