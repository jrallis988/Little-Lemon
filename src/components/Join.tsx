export function Join() {
  return (
    <section id="join" className="py-20 sm:py-28" aria-labelledby="join-heading">
      <div className="section-shell">
        <div className="relative overflow-hidden rounded-[2rem] bg-cobalt-600 px-6 py-14 text-white sm:px-12 sm:py-16">
          <div
            className="pointer-events-none absolute -right-10 top-0 h-56 w-56 animate-drift rounded-full bg-tide/30 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -left-8 bottom-0 h-48 w-48 rounded-full bg-white/10 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative mx-auto max-w-2xl text-center">
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-white/65">
              Begin where you are
            </p>
            <h2
              id="join-heading"
              className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl"
              style={{ fontWeight: 700 }}
            >
              Your next chapter doesn’t need a perfect Monday.
            </h2>
            <p className="mx-auto mt-4 max-w-lg font-serif text-lg leading-relaxed text-white/75">
              Try Weight Watchers free, find the Mode that fits this season, and build progress you
              can keep.
            </p>

            <form
              className="mx-auto mt-8 flex w-full max-w-md flex-col gap-3 sm:flex-row"
              onSubmit={(event) => event.preventDefault()}
            >
              <label className="sr-only" htmlFor="email">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="Email address"
                className="h-12 flex-1 rounded-full border-0 px-5 font-sans text-sm text-ink outline-none ring-2 ring-transparent placeholder:text-ink/40 focus:ring-white/50"
              />
              <button
                type="submit"
                className="h-12 rounded-full bg-ink px-6 font-sans text-sm font-semibold text-white transition hover:bg-ink/90"
              >
                Start free trial
              </button>
            </form>
            <p className="mt-3 font-sans text-xs text-white/55">
              No commitment demo · Cancel anytime · Clinical care availability varies by location
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
