const HERO_IMAGE =
  "https://images.unsplash.com/photo-1571613316887-6f8d5cbf7ef7?auto=format&fit=crop&w=2400&q=80";

export function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-[100svh] overflow-hidden text-foam"
      aria-label="Millhouse Brewing hero"
    >
      <div className="absolute inset-0">
        <img
          src={HERO_IMAGE}
          alt="Rows of craft beer taps in a warmly lit brewery bar"
          className="h-full w-full object-cover animate-ken-burns"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/88 via-ink/55 to-ink/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/35" />
      </div>

      <div className="relative mx-auto flex min-h-[100svh] max-w-site flex-col justify-end px-5 pb-16 pt-28 md:px-8 md:pb-24">
        <p className="font-display animate-fade-up text-[clamp(3.5rem,12vw,8.5rem)] font-extrabold leading-[0.85] tracking-[0.02em]">
          MILLHOUSE
        </p>
        <div
          className="mt-4 h-0.5 w-24 origin-left bg-ember animate-draw-line"
          style={{ animationDelay: "0.25s" }}
        />
        <h1
          className="mt-6 max-w-xl font-display text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-tight tracking-wide animate-fade-up"
          style={{ animationDelay: "0.15s" }}
        >
          Small-batch ales from a riverside mill.
        </h1>
        <p
          className="mt-4 max-w-md text-base leading-relaxed text-foam/85 animate-fade-up md:text-lg"
          style={{ animationDelay: "0.3s" }}
        >
          Pouring Vermont-made beer where the river meets the grain.
        </p>
        <div
          className="mt-8 flex flex-wrap gap-3 animate-fade-up"
          style={{ animationDelay: "0.45s" }}
        >
          <a
            href="#beers"
            className="bg-foam px-5 py-3 text-sm font-semibold tracking-wide text-ink transition-transform duration-300 hover:-translate-y-0.5"
          >
            See what's on tap
          </a>
          <a
            href="#taproom"
            className="border border-foam/70 px-5 py-3 text-sm font-semibold tracking-wide text-foam transition-colors duration-300 hover:bg-foam/10"
          >
            Visit the taproom
          </a>
        </div>
      </div>
    </section>
  );
}
