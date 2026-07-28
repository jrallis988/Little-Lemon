import { SealMark } from "./SealMark";

export function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-[100svh] overflow-hidden text-foam"
      aria-label="Smuttynose Brewing hero"
    >
      <div className="absolute inset-0">
        <img
          src="/images/campus-dusk.jpg"
          alt="Smuttynose Brewing on Towle Farm at golden hour — red brewery building and grain silos"
          className="h-full w-full object-cover animate-ken-burns"
        />
        {/* Sunset mood overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a0e08]/90 via-[#3a1d10]/35 to-[#1b3a55]/45" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/45 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#d94e1f]/25 to-transparent" />
      </div>

      <div className="relative mx-auto flex min-h-[100svh] max-w-site flex-col justify-end px-5 pb-16 pt-28 md:px-8 md:pb-24">
        <div
          className="mb-5 flex items-center gap-3 animate-fade-up"
          style={{ animationDelay: "0.05s" }}
        >
          <SealMark className="h-10 w-10 text-foam" />
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-foam/80">
            Hampton, NH
          </span>
        </div>

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
