import type { SocialNetwork } from "@/lib/data/social";
import { SOCIAL_LINKS } from "@/lib/data/social";
import { cn } from "@/lib/utils";

function SocialIcon({
  network,
  className,
}: {
  network: SocialNetwork;
  className?: string;
}) {
  const common = cn("size-4", className);

  switch (network) {
    case "facebook":
      return (
        <svg viewBox="0 0 24 24" className={common} aria-hidden fill="currentColor">
          <path d="M14 8h3V5h-3c-2.2 0-4 1.8-4 4v2H7v3h3v7h3v-7h3.1l.9-3H13V9c0-.6.4-1 1-1z" />
        </svg>
      );
    case "instagram":
      return (
        <svg viewBox="0 0 24 24" className={common} aria-hidden fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "x":
      return (
        <svg viewBox="0 0 24 24" className={common} aria-hidden fill="currentColor">
          <path d="M4 4h4.1l4.2 6.1L17.2 4H20l-6.1 8.2L20.5 20h-4.1l-4.6-6.7L6.8 20H4l6.5-8.8L4 4z" />
        </svg>
      );
    case "tiktok":
      return (
        <svg viewBox="0 0 24 24" className={common} aria-hidden fill="currentColor">
          <path d="M14.5 3h2.1c.3 1.7 1.4 3.2 3 4v2.2c-1.1-.1-2.1-.5-3-1.1v6.3A5.4 5.4 0 1 1 11.3 9v2.3a3.1 3.1 0 1 0 3.2 3.1V3z" />
        </svg>
      );
    case "youtube":
      return (
        <svg viewBox="0 0 24 24" className={common} aria-hidden fill="currentColor">
          <path d="M22 12.2c0-2.3-.3-4-.3-4s-.3-1.8-1.2-2.6c-1.1-1.1-2.4-1.1-3-1.2C14.6 4 12 4 12 4h0s-2.6 0-5.5.4c-.6.1-1.9.1-3 1.2C2.6 6.4 2.3 8.2 2.3 8.2S2 9.9 2 12.2v.6c0 2.3.3 4 .3 4s.3 1.8 1.2 2.6c1.1 1.1 2.6 1.1 3.2 1.2 2.3.2 5.3.3 5.3.3s2.6 0 5.5-.4c.6-.1 1.9-.1 3-1.2.9-.8 1.2-2.6 1.2-2.6s.3-1.7.3-4v-.6zM10 15.5v-6l5.2 3-5.2 3z" />
        </svg>
      );
    default:
      return null;
  }
}

export function SocialLinks({
  className,
  iconClassName,
}: {
  className?: string;
  iconClassName?: string;
}) {
  return (
    <ul className={cn("flex flex-wrap items-center gap-2", className)}>
      {SOCIAL_LINKS.map((link) => (
        <li key={link.id}>
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            className={cn(
              "inline-flex size-9 items-center justify-center rounded-lg border border-border/80 bg-surface-elevated text-foreground transition-colors hover:border-brand/40 hover:bg-brand/5 hover:text-brand",
              iconClassName,
            )}
          >
            <SocialIcon network={link.id} />
          </a>
        </li>
      ))}
    </ul>
  );
}
