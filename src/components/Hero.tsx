export function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-[100svh] overflow-hidden text-foam"
      aria-label="Smuttynose Brewing hero"
    >
      <div className="absolute inset-0">
        <img
          src="/images/campus-day.jpg"
          alt="Smuttynose Brewing headquarters on Towle Farm in Hampton, New Hampshire — red brewery building with grain silos"
          className="h-full w-full object-cover animate-ken-burns"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/88 via-ink/55 to-ink/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-ink/35" />
      </div>

      <div className="relative mx-auto flex min-h-[100svh] max-w-site flex-col justify-end px-5 pb-16 pt-28 md:px-8 md:pb-24">
        <p className="font-display animate-fade-up text-[clamp(3.25rem,11vw,7.5rem)] font-bold uppercase leading-[0.88] tracking-[0.04em]">
          Smuttynose
        </p>
        <div
          className="mt-4 h-1 w-28 origin-left bg-buoy animate-draw-line"
          style={{ animationDelay: "0.25s" }}
        />
        <h1
          className="mt-6 max-w-xl font-display text-[clamp(1.7rem,3.8vw,2.6rem)] font-semibold uppercase leading-tight tracking-wide animate-fade-up"
          style={{ animationDelay: "0.15s" }}
        >
          New Hampshire brewed since &apos;94.
        </h1>
        <p
          className="mt-4 max-w-md text-base leading-relaxed text-foam/85 animate-fade-up md:text-lg"
          style={{ animationDelay: "0.3s" }}
        >
          Named for an Isles of Shoals island. Brewed on Towle Farm in Hampton.
        </p>
        <div
          className="mt-8 flex flex-wrap gap-3 animate-fade-up"
          style={{ animationDelay: "0.45s" }}
        >
          <a
            href="#beers"
            className="bg-foam px-5 py-3 text-sm font-semibold tracking-wide text-ink transition-transform duration-300 hover:-translate-y-0.5"
          >
            See what&apos;s on tap
          </a>
          <a
            href="#visit"
            className="border border-foam/70 px-5 py-3 text-sm font-semibold tracking-wide text-foam transition-colors duration-300 hover:bg-foam/10"
          >
            Visit Towle Farm
          </a>
        </div>
      </div>
    </section>
  );
}
