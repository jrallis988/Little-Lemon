import { HOME_CLUB } from "@/lib/home-club";

/** Unofficial / portfolio framing — keeps the product honest without looking like a class demo. */
export function SiteDisclaimer({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <p className="text-xs leading-relaxed text-pf-ink/55">
        Unofficial concept site for {HOME_CLUB.name}. Not affiliated with or
        endorsed by Planet Fitness Franchising, LLC.
      </p>
    );
  }

  return (
    <aside
      role="note"
      className="border-b border-pf-line bg-pf-mist px-4 py-2.5 text-center md:px-6"
    >
      <p className="mx-auto max-w-5xl text-xs leading-relaxed text-pf-ink/65 md:text-[13px]">
        <span className="font-semibold text-pf-ink/80">Concept site</span> for{" "}
        {HOME_CLUB.name} ({HOME_CLUB.city}, {HOME_CLUB.state}). Independent
        product exploration — not an official Planet Fitness property, and not
        affiliated with or endorsed by Planet Fitness Franchising, LLC.
      </p>
    </aside>
  );
}
