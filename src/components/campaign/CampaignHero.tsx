import { Link } from "react-router-dom";
import { AnniversaryBadge } from "../Logo";
import { useCountUp, useInView } from "../../hooks/motion";

export function CampaignHero() {
  const { ref, visible } = useInView<HTMLElement>(0.2);
  const years = useCountUp(63, visible, 1600);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-[100svh] overflow-hidden"
      aria-labelledby="campaign-hero-heading"
    >
      <div className="absolute inset-0">
        <img
          src="/images/campaign/hero-cook.jpg"
          alt="Friends cooking a fresh, colorful salad together in a bright home kitchen"
          className="h-full w-full scale-105 object-cover object-[center_42%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/55 to-ink/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/35" />
      </div>

      <div className="section-shell relative flex min-h-[100svh] flex-col justify-end pb-16 pt-28 sm:pb-24 sm:pt-32">
        <AnniversaryBadge light className="animate-rise w-fit" />

        <p
          className="animate-rise mt-6 font-display text-6xl font-extrabold tracking-tight text-white sm:text-8xl md:text-9xl"
          style={{ animationDelay: "80ms", fontWeight: 800 }}
          aria-hidden="true"
        >
          {years}
        </p>

        <h1
          id="campaign-hero-heading"
          className="animate-rise mt-2 font-display text-4xl font-bold tracking-tight text-white sm:text-6xl"
          style={{ animationDelay: "160ms", fontWeight: 700 }}
        >
          Weight Watchers 63
        </h1>

        <p
          className="animate-rise mt-3 font-serif text-2xl text-tide sm:text-3xl"
          style={{ animationDelay: "240ms" }}
        >
          63 Years of You
        </p>

        <p
          className="animate-rise mt-5 max-w-xl font-sans text-base leading-relaxed text-white/80 sm:text-lg"
          style={{ animationDelay: "320ms" }}
        >
          For 63 years, Weight Watchers has evolved alongside the people it serves—helping every
          generation build healthier lives in their own way.
        </p>

        <div
          className="animate-rise mt-8 flex flex-wrap gap-3"
          style={{ animationDelay: "420ms" }}
        >
          <a
            href="#since-1963"
            className="rounded-2xl bg-white px-6 py-3.5 font-sans text-sm font-semibold text-ink transition hover:bg-cloud"
          >
            Explore 63 Years
          </a>
          <Link
            to="/#finale"
            className="rounded-2xl border border-white/35 bg-white/5 px-6 py-3.5 font-sans text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/15"
          >
            Start Your Journey
          </Link>
        </div>
      </div>
    </section>
  );
}
