export function Join() {
  return (
    <section id="join" className="relative py-20 sm:py-28" aria-labelledby="join-heading">
      <div className="section-shell">
        <div className="relative overflow-hidden rounded-[2rem]">
          <img
            src="/images/campaign/celebrate.jpg"
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-cobalt-700/85" />
          <div className="absolute inset-0 bg-gradient-to-br from-cobalt-800/70 via-cobalt-600/75 to-tide/40" />

          <div className="relative px-6 py-14 text-white sm:px-12 sm:py-16">
            <div className="mx-auto max-w-2xl text-center">
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
              <p className="mx-auto mt-4 max-w-lg font-serif text-lg leading-relaxed text-white/80">
                Try Weight Watchers free, find the Mode that fits this season, and build progress
                you can keep.
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
                  className="h-12 flex-1 rounded-2xl border-0 px-5 font-sans text-sm text-ink outline-none ring-2 ring-transparent placeholder:text-ink/40 focus:ring-white/50"
                />
                <button
                  type="submit"
                  className="h-12 rounded-2xl bg-ink px-6 font-sans text-sm font-semibold text-white transition hover:bg-ink/90"
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
      </div>
    </section>
  );
}
