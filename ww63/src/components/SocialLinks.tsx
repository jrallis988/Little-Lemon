import { socialLinks, type SocialLink } from "../data/social";

function SocialIcon({ id }: { id: SocialLink["id"] }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": true,
    className: "h-[1.05rem] w-[1.05rem]",
  };

  switch (id) {
    case "facebook":
      return (
        <svg {...common}>
          <path d="M14.5 8.5V6.8c0-.7.1-1.1 1.2-1.1H17V3h-2.4C11.8 3 11 4.6 11 6.6v1.9H9v2.8h2V21h3.5v-9.7h2.3l.4-2.8h-2.7Z" />
        </svg>
      );
    case "x":
      return (
        <svg {...common}>
          <path d="M4.5 4h4.1l3.2 4.5L15.8 4H19l-5.2 6.1L19.5 20h-4.1l-3.5-4.9L7.7 20H4.5l5.5-6.4L4.5 4Zm3.2 1.5 8.7 13h1.5L9.2 5.5H7.7Z" />
        </svg>
      );
    case "youtube":
      return (
        <svg {...common}>
          <path d="M22 12.1c0-2.3-.2-3.9-.5-4.8-.3-.9-.9-1.5-1.7-1.8C18.3 5 12 5 12 5s-6.3 0-7.8.5c-.8.3-1.4.9-1.7 1.8-.3.9-.5 2.5-.5 4.8s.2 3.9.5 4.8c.3.9.9 1.5 1.7 1.8 1.5.5 7.8.5 7.8.5s6.3 0 7.8-.5c.8-.3 1.4-.9 1.7-1.8.3-.9.5-2.5.5-4.8ZM10.2 15.2V8.9l5.3 3.15-5.3 3.15Z" />
        </svg>
      );
    case "pinterest":
      return (
        <svg {...common}>
          <path d="M12 3a9 9 0 0 0-3.3 17.4c-.1-.7-.2-1.8 0-2.6.2-.7 1.3-5.5 1.3-5.5s-.3-.7-.3-1.6c0-1.5.9-2.7 2-2.7.9 0 1.4.7 1.4 1.6 0 1-.6 2.4-1 3.7-.3 1.1.6 2 1.7 2 2.1 0 3.5-2.7 3.5-5.8 0-2.4-1.6-4.2-4.5-4.2-3.3 0-5.3 2.4-5.3 5.2 0 1 .3 1.7.8 2.2.1.1.1.2.1.3l-.3 1.1c0 .2-.2.2-.4.1-1.4-.6-2.1-2.2-2.1-4 0-3 2.5-6.6 7.5-6.6 4 0 6.7 2.9 6.7 6 0 4.1-2.3 7.1-5.6 7.1-1.1 0-2.2-.6-2.5-1.3l-.7 2.6c-.2.9-.9 2-1.4 2.7A9 9 0 1 0 12 3Z" />
        </svg>
      );
    case "instagram":
      return (
        <svg {...common}>
          <path d="M12 7.2A4.8 4.8 0 1 0 12 16.8 4.8 4.8 0 0 0 12 7.2Zm0 7.9a3.1 3.1 0 1 1 0-6.2 3.1 3.1 0 0 1 0 6.2Zm5.1-8.9a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0Zm3.1 1.1c-.1-1.8-.5-3.3-1.8-4.6S15.5 1.4 13.7 1.3C11.8 1.1 12.2 1.1 12 1.1s-.2 0-1.7.2C8.5 1.4 7 1.8 5.6 3.2 4.3 4.5 3.9 6 3.8 7.8 3.6 9.7 3.6 10.1 3.6 12s0 2.3.2 4.2c.1 1.8.5 3.3 1.8 4.6 1.4 1.4 2.8 1.8 4.6 1.9 1.9.1 2.3.2 4 .2s2.1 0 4-.2c1.8-.1 3.3-.5 4.6-1.9 1.4-1.4 1.7-2.8 1.9-4.6.1-1.9.2-2.3.2-4.2s0-2.3-.2-4.2Zm-2 8.1a4.3 4.3 0 0 1-2.4 2.4c-.7.3-1.4.4-4.1.5-2.7 0-3.1 0-4.1-.2a4.3 4.3 0 0 1-2.4-2.4c-.3-.7-.5-1.4-.5-4.1 0-2.7 0-3.1.2-4.1a4.3 4.3 0 0 1 2.4-2.4c.7-.3 1.4-.5 4.1-.5 2.7 0 3.1 0 4.1.2a4.3 4.3 0 0 1 2.4 2.4c.3.7.5 1.4.5 4.1 0 2.7 0 3.1-.2 4.1Z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg {...common}>
          <path d="M6.2 9.2H3.4V20h2.8V9.2ZM4.8 4A1.7 1.7 0 1 0 4.8 7.4 1.7 1.7 0 0 0 4.8 4ZM20.6 20h-2.8v-5.7c0-1.6-.6-2.7-2-2.7-1.1 0-1.7.7-2 1.4-.1.3-.1.6-.1.9V20h-2.8s0-9.4 0-10.8h2.8v1.7c.5-.8 1.5-2 3.7-2 2.6 0 4.4 1.7 4.4 5.3V20Z" />
        </svg>
      );
    default:
      return null;
  }
}

type SocialLinksProps = {
  variant?: "circles" | "panel";
  className?: string;
};

export function SocialLinks({ variant = "circles", className = "" }: SocialLinksProps) {
  if (variant === "panel") {
    return (
      <div className={className}>
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-cobalt-600">
          Follow along
        </p>
        <p className="mt-2 max-w-xl font-serif text-lg text-ink/65">
          Recipes, member wins, coach tips, and daily motivation from the official WeightWatchers
          channels.
        </p>
        <ul className="mt-6 flex flex-wrap gap-3">
          {socialLinks.map((link) => (
            <li key={link.id}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${link.label} ${link.handle}`}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-cobalt-700 shadow-sm transition hover:bg-cobalt-600 hover:text-white"
              >
                <SocialIcon id={link.id} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <ul className={`flex flex-wrap items-center gap-3 ${className}`}>
      {socialLinks.map((link) => (
        <li key={link.id}>
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${link.label} ${link.handle}`}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-cobalt-700 transition hover:scale-105 hover:text-cobalt-800"
          >
            <SocialIcon id={link.id} />
          </a>
        </li>
      ))}
    </ul>
  );
}
