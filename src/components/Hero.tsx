import { getFeaturedProject } from "@/data/projects";

export default function Hero() {
  const featured = getFeaturedProject();

  return (
    <section
      id="top"
      className="letterbox relative flex min-h-svh items-end overflow-hidden"
      aria-label="Studio introduction"
    >
      <div className="absolute inset-0" aria-hidden="true">
        <div
          className="hero-still absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(180deg, rgba(3,3,3,0.35) 0%, rgba(3,3,3,0.1) 35%, rgba(3,3,3,0.95) 100%),
              ${featured.poster}
            `,
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_10%,rgba(0,0,0,0.55)_100%)]" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col justify-end px-5 pb-20 pt-28 md:px-8 md:pb-28 md:pt-32">
        <p className="animate-fade delay-1 mb-4 font-[family-name:var(--font-credit)] text-sm tracking-[0.4em] text-accent uppercase">
          An Independent Motion Picture Studio
        </p>

        <h1 className="animate-rise delay-2 max-w-5xl font-display text-[2.75rem] leading-[0.95] text-foreground sm:text-6xl md:text-7xl lg:text-[5.5rem]">
          The East Coast Motion Picture Company
        </h1>

        <p className="animate-rise delay-3 mt-6 max-w-xl text-base leading-relaxed text-foreground/80 md:text-lg">
          Live-action features and series rooted in East Coast weather, towns,
          and working lives.
        </p>

        <div className="animate-rise delay-4 mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#projects"
            className="inline-flex h-12 items-center justify-center bg-foreground px-8 font-[family-name:var(--font-credit)] text-[15px] tracking-[0.2em] text-background uppercase transition-opacity hover:opacity-85"
          >
            View the Slate
          </a>
          <a
            href={`#${featured.id}`}
            className="inline-flex h-12 items-center gap-3 border border-white/25 px-7 font-[family-name:var(--font-credit)] text-[15px] tracking-[0.2em] text-foreground uppercase transition-colors hover:border-foreground"
          >
            <span
              className="inline-flex h-0 w-0 border-y-[5px] border-y-transparent border-l-[9px] border-l-foreground"
              aria-hidden="true"
            />
            Watch Reel
          </a>
        </div>
      </div>
    </section>
  );
}
