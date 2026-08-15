import { Link } from "react-router-dom";

function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[min(100vh,52rem)] items-end overflow-hidden text-white"
    >
      <img
        src="/images/hero-community.jpg"
        alt=""
        className="absolute inset-0 h-full w-full scale-105 object-cover object-[center_35%] animate-fade"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-charcoal-deep/90 via-charcoal-deep/45 to-charcoal-deep/35"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-charcoal-deep/55 to-transparent"
        aria-hidden="true"
      />

      <div className="container relative z-10 pb-16 pt-28 md:pb-24 md:pt-32">
        <p className="eyebrow-accent !text-white/80 opacity-0 animate-rise after:!bg-chartreuse">
          Youth support · belonging · wellbeing
        </p>
        <h1 className="display mt-5 max-w-3xl text-5xl leading-[0.95] text-white opacity-0 animate-rise-delay sm:text-6xl md:text-7xl">
          Civic Bound
        </h1>
        <p className="mt-5 max-w-xl font-display text-xl font-medium text-white/95 opacity-0 animate-rise-delay-2 md:text-2xl">
          Communities where young people belong, learn, and thrive.
        </p>
        <p className="mt-4 max-w-lg font-body text-base leading-relaxed text-white/85 opacity-0 animate-rise-delay-2 md:text-lg">
          A youth-centered network for life direction, mental wellbeing, and
          student success—built around young people, not adult bureaucracy.
        </p>
        <div className="mt-9 flex flex-wrap gap-3 opacity-0 animate-rise-delay-3">
          <Link to="/get-support" className="btn-primary">
            Get Support
          </Link>
          <a
            href="#pillars"
            className="inline-flex items-center justify-center rounded-sm border border-white/55 bg-transparent px-6 py-3 font-body text-sm font-semibold tracking-wide text-white transition duration-300 hover:border-white hover:bg-white/10"
          >
            How we help
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
