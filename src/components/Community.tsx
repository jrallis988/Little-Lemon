import { SocialLinks } from "./SocialLinks";

export function Community() {
  return (
    <section
      id="community"
      className="relative overflow-hidden py-20 sm:py-28"
      aria-labelledby="community-heading"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-mist/80 via-cloud to-paper" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(11,18,32,0.08) 0.7px, transparent 0.7px)",
          backgroundSize: "18px 18px",
        }}
        aria-hidden="true"
      />

      <div className="section-shell relative">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-cobalt-600">
            Community
          </p>
          <h2
            id="community-heading"
            className="mt-3 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl"
            style={{ fontWeight: 700 }}
          >
            The difference isn’t willpower. It’s people.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-serif text-lg leading-relaxed text-ink/65 sm:text-xl">
            Coach-led groups for GLP-1, menopause, nutrition, and movement—plus a legacy of
            showing up that still outperforms going it alone.
          </p>
        </div>

        <figure className="relative mx-auto mt-12 max-w-4xl overflow-hidden rounded-[1.75rem]">
          <img
            src="/images/community.jpg"
            alt="Friends laughing together indoors"
            className="h-[22rem] w-full object-cover sm:h-[28rem]"
            loading="lazy"
          />
          <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 via-ink/40 to-transparent px-6 pb-6 pt-20 text-left text-white sm:px-10 sm:pb-8">
            <blockquote className="max-w-xl font-serif text-xl leading-snug sm:text-2xl">
              “I didn’t need another diet. I needed a room where progress counted even on the messy weeks.”
            </blockquote>
            <p className="mt-3 font-sans text-sm text-white/70">
              Member story · Coach-led virtual circle
            </p>
          </figcaption>
        </figure>

        <div className="mx-auto mt-10 flex max-w-4xl flex-col items-start justify-between gap-4 rounded-[1.5rem] border border-ink/8 bg-white/70 px-6 py-5 sm:flex-row sm:items-center sm:px-8">
          <div>
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-cobalt-600">
              Stay in the loop
            </p>
            <p className="mt-1 font-serif text-lg text-ink/70">
              Official WeightWatchers social is wired into this site—jump in below.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <SocialLinks />
            <a
              href="#connect"
              className="font-sans text-sm font-semibold text-cobalt-700 transition hover:text-cobalt-800"
            >
              See all connections →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
