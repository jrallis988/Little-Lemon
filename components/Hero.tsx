export function Hero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden">
      {/* Full-bleed visual plane */}
      <div
        aria-hidden
        className="absolute inset-0 animate-fade-in"
        style={{ animationDelay: "0.05s" }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#dfe8e4_0%,#e8eef3_42%,#d5e0ea_100%)]" />
        <div className="grain absolute inset-0 opacity-[0.35] mix-blend-multiply" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,rgba(31,111,91,0.14),transparent_55%)]" />
        {/* Geometric learning motif — visual anchor, not overlay chrome */}
        <svg
          className="absolute -right-[8%] top-[12%] h-[78%] w-[70%] text-ink/[0.07] sm:-right-[4%] sm:w-[58%]"
          viewBox="0 0 640 640"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="320" cy="320" r="280" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="320" cy="320" r="190" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="320" cy="320" r="100" stroke="currentColor" strokeWidth="1.5" />
          <path d="M320 40 L560 500 L80 500 Z" stroke="currentColor" strokeWidth="1.5" />
          <path d="M80 220 H560" stroke="currentColor" strokeWidth="1.25" strokeDasharray="6 8" />
          <path d="M180 120 L460 520" stroke="currentColor" strokeWidth="1.25" />
          <path d="M460 120 L180 520" stroke="currentColor" strokeWidth="1.25" />
        </svg>
      </div>

      <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-5 pb-16 pt-28 sm:justify-center sm:px-8 sm:pb-24 sm:pt-32">
        <div className="max-w-2xl">
          <p
            className="animate-rise-in font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl md:text-6xl lg:text-7xl"
            style={{ animationDelay: "0.1s" }}
          >
            Morgan Bright
          </p>

          <div
            aria-hidden
            className="mt-5 h-px w-16 origin-left animate-draw-line bg-accent sm:mt-6 sm:w-20"
            style={{ animationDelay: "0.35s" }}
          />

          <h1
            className="mt-6 animate-rise-in font-display text-2xl font-medium leading-snug tracking-tight text-ink text-balance sm:mt-8 sm:text-3xl md:text-[2.15rem] md:leading-snug"
            style={{ animationDelay: "0.25s" }}
          >
            Clear the hurdle. Teach to how you learn.
          </h1>

          <p
            className="mt-4 max-w-xl animate-rise-in font-body text-lg leading-relaxed text-ink-soft sm:mt-5 sm:text-xl"
            style={{ animationDelay: "0.4s" }}
          >
            An educational platform that diagnoses individual learning barriers
            and shapes instruction around the styles that unlock progress.
          </p>

          <div
            className="mt-8 flex animate-rise-in flex-wrap items-center gap-3 sm:mt-10"
            style={{ animationDelay: "0.55s" }}
          >
            <a
              href="#start"
              className="inline-flex items-center justify-center bg-accent px-5 py-3 font-sans text-sm font-semibold text-white transition-[background-color,transform] duration-200 hover:bg-accent-deep active:translate-y-px"
            >
              Begin assessment
            </a>
            <a
              href="#curriculum"
              className="inline-flex items-center justify-center border border-ink/20 bg-white/50 px-5 py-3 font-sans text-sm font-semibold text-ink transition-[border-color,background-color] duration-200 hover:border-ink/40 hover:bg-white/80"
            >
              View curriculum
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
