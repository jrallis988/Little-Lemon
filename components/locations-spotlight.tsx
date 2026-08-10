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
          2,700+ locations
        </h2>
        <p className="mt-2 text-sm text-pf-ink/65 md:text-base">
          More than 2,700 Planet Fitness locations worldwide.
        </p>
        <a
          href="#clubs"
          className="mt-3 inline-block text-sm font-semibold text-pf-purple underline underline-offset-2"
        >
          Learn More
        </a>
      </div>
    </section>
  );
}
