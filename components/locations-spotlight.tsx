import { HOME_CLUB } from "@/lib/home-club";

export function LocationsSpotlight() {
  return (
    <section
      id="locations"
      aria-labelledby="locations-heading"
      className="scroll-mt-14 bg-white"
    >
      <div className="mx-auto max-w-xl px-4 py-10 text-center md:px-6">
        <h2
          id="locations-heading"
          className="font-display text-3xl tracking-tight text-pf-ink md:text-4xl"
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
          className="mt-3 inline-block text-sm font-semibold text-pf-purple underline underline-offset-2"
        >
          See club hours &amp; rates
        </a>
      </div>
    </section>
  );
}
