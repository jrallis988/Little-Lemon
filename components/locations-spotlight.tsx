import { HOME_CLUB } from "@/lib/home-club";

export function LocationsSpotlight() {
  return (
    <section
      id="locations"
      aria-labelledby="locations-heading"
      className="scroll-mt-14 bg-white"
    >
      <div className="pf-section-tight mx-auto max-w-3xl text-center">
        <h2
          id="locations-heading"
          className="pf-type-section text-pf-ink"
        >
          Stratham &amp; the Seacoast
        </h2>
        <p className="mt-2 text-sm text-pf-ink/65 md:text-base">
          Your home club is {HOME_CLUB.name} at {HOME_CLUB.address}. Black Card
          members can also visit nearby Portsmouth, Exeter, Seabrook, Dover, and
          more.
        </p>
        <a
          href="#clubs"
          className="mt-2 inline-block text-sm font-semibold text-pf-purple underline underline-offset-2"
        >
          See club hours &amp; rates
        </a>
      </div>
    </section>
  );
}
