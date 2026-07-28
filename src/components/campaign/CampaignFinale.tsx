import { Link } from "react-router-dom";

export function CampaignFinale() {
  return (
    <section id="finale" className="py-20 sm:py-28" aria-labelledby="finale-heading">
      <div className="section-shell">
        <div className="relative overflow-hidden rounded-[2rem]">
          <img
            src="/images/campaign/celebrate.jpg"
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-cobalt-800/80" />
          <div className="relative px-6 py-16 text-center text-white sm:px-12 sm:py-20">
            <p className="mx-auto max-w-2xl font-serif text-2xl leading-snug sm:text-3xl">
              For 63 years, every chapter has been written by people choosing to begin again.
            </p>
            <h2
              id="finale-heading"
              className="mt-6 font-display text-4xl font-bold tracking-tight sm:text-5xl"
              style={{ fontWeight: 700 }}
            >
              Weight Watchers 63
            </h2>
            <p className="mt-2 font-serif text-xl text-tide sm:text-2xl">63 Years of You</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/find-your-year"
                className="rounded-2xl bg-white px-6 py-3.5 font-sans text-sm font-semibold text-ink transition hover:bg-cloud"
              >
                Find Your Year
              </Link>
              <a
                href="#join-next"
                className="rounded-2xl border border-white/35 px-6 py-3.5 font-sans text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Start Your Next Chapter
              </a>
            </div>
          </div>
        </div>

        <div id="join-next" className="mx-auto mt-10 max-w-xl text-center">
          <form
            className="flex flex-col gap-3 sm:flex-row"
            onSubmit={(event) => event.preventDefault()}
          >
            <label className="sr-only" htmlFor="next-email">
              Email address
            </label>
            <input
              id="next-email"
              type="email"
              required
              placeholder="Email address"
              className="h-12 flex-1 rounded-2xl border border-ink/10 px-5 font-sans text-sm outline-none ring-cobalt-600 focus:ring-2"
            />
            <button
              type="submit"
              className="h-12 rounded-2xl bg-cobalt-600 px-6 font-sans text-sm font-semibold text-white transition hover:bg-cobalt-700"
            >
              Start Your Next Chapter
            </button>
          </form>
          <p className="mt-3 font-sans text-xs text-ink/45">
            Demo signup · Cancel anytime · Clinical care availability varies
          </p>
        </div>
      </div>
    </section>
  );
}
