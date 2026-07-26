export function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-[100svh] overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0">
        <img
          src="/images/hero.jpg"
          alt="A person stretching outdoors in soft morning light"
          className="h-full w-full object-cover object-[center_30%] scale-105 animate-[rise_1.4s_cubic-bezier(0.22,1,0.36,1)_both]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/55 to-ink/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-ink/30" />
      </div>

      <div className="section-shell relative flex min-h-[100svh] flex-col justify-end pb-16 pt-28 sm:pb-20 sm:pt-32">
        <div className="max-w-2xl text-white">
          <p
            className="animate-rise font-display text-5xl font-extrabold tracking-tight sm:text-7xl md:text-8xl"
            style={{ animationDelay: "80ms", fontWeight: 800 }}
          >
            Weight
            <span className="mt-1 block sm:mt-2">
              Watchers
              <span
                className="ml-3 inline-block h-2 w-16 translate-y-[-0.35em] rounded-full bg-tide sm:h-2.5 sm:w-24"
                aria-hidden="true"
              />
            </span>
          </p>

          <h1
            id="hero-heading"
            className="animate-rise mt-6 max-w-xl font-serif text-2xl font-medium leading-snug tracking-tight text-white/95 sm:text-3xl md:text-[2.15rem]"
            style={{ animationDelay: "220ms" }}
          >
            Progress that fits the life you already have.
          </h1>

          <p
            className="animate-rise mt-4 max-w-md font-sans text-base leading-relaxed text-white/75 sm:text-lg"
            style={{ animationDelay: "340ms" }}
          >
            Points, coaching, community, and clinical care—united so sustainable
            weight health feels personal, not punishing.
          </p>

          <div
            className="animate-rise mt-8 flex flex-wrap items-center gap-3"
            style={{ animationDelay: "460ms" }}
          >
            <a
              href="#join"
              className="rounded-2xl bg-white px-6 py-3.5 font-sans text-sm font-semibold text-ink transition hover:bg-cloud"
            >
              Start your free trial
            </a>
            <a
              href="#pathways"
              className="rounded-2xl border border-white/35 bg-white/5 px-6 py-3.5 font-sans text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/15"
            >
              Explore programs
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
