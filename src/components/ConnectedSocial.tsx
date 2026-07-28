import { useMemo } from "react";
import { socialLinks } from "../data/social";

const shareTargets = [
  {
    id: "facebook",
    label: "Share on Facebook",
    build: (url: string, text: string) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`,
  },
  {
    id: "x",
    label: "Share on X",
    build: (url: string, text: string) =>
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
  },
  {
    id: "linkedin",
    label: "Share on LinkedIn",
    build: (url: string) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  },
] as const;

type ConnectedSocialProps = {
  className?: string;
};

export function ConnectedSocial({ className = "" }: ConnectedSocialProps) {
  const pageUrl = useMemo(() => {
    if (typeof window === "undefined") return "https://www.weightwatchers.com";
    return window.location.origin + window.location.pathname;
  }, []);
  const shareText =
    "Your needs first. Weight Watchers’ future with you. Explore Weight Watchers 63 — 63 Years of You.";

  return (
    <section
      id="connect"
      className={`relative py-20 sm:py-28 ${className}`}
      aria-labelledby="connect-heading"
    >
      <div className="section-shell">
        <div className="max-w-2xl">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-cobalt-600">
            Connected channels
          </p>
          <h2
            id="connect-heading"
            className="mt-3 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl"
            style={{ fontWeight: 700 }}
          >
            This site talks to the real WeightWatchers network.
          </h2>
          <p className="mt-4 font-serif text-lg leading-relaxed text-ink/65 sm:text-xl">
            Every icon below opens an official WeightWatchers profile—the same channels listed on
            weightwatchers.com. Follow there, or share this experience back out.
          </p>
        </div>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {socialLinks.map((link) => {
            const host = new URL(link.href).hostname.replace(/^www\./, "");
            return (
              <li key={link.id}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer me"
                  data-social-network={link.id}
                  className="group flex h-full flex-col justify-between rounded-[1.5rem] border border-ink/10 bg-white px-5 py-5 transition hover:border-cobalt-300 hover:shadow-glow"
                >
                  <div>
                    <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-tide">
                      Live connection
                    </p>
                    <p
                      className="mt-2 font-display text-2xl font-bold text-ink"
                      style={{ fontWeight: 700 }}
                    >
                      {link.label}
                    </p>
                    <p className="mt-1 font-sans text-sm text-ink/55">{link.handle}</p>
                  </div>
                  <div className="mt-6 flex items-center justify-between gap-3 border-t border-ink/8 pt-4">
                    <span className="truncate font-sans text-xs text-ink/45">{host}</span>
                    <span className="font-sans text-xs font-semibold text-cobalt-700 transition group-hover:translate-x-0.5">
                      Open profile →
                    </span>
                  </div>
                </a>
              </li>
            );
          })}
        </ul>

        <div className="mt-10 rounded-[1.5rem] bg-mist/80 px-5 py-6 sm:px-8 sm:py-7">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-ink/45">
            Share this site
          </p>
          <p className="mt-2 max-w-xl font-serif text-lg text-ink/70">
            Push this experience back into the WeightWatchers social graph.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            {shareTargets.map((target) => (
              <a
                key={target.id}
                href={target.build(pageUrl, shareText)}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl bg-cobalt-600 px-5 py-3 font-sans text-sm font-semibold text-white transition hover:bg-cobalt-700"
              >
                {target.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
