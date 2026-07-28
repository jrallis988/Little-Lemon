import { useEffect, useRef, useState } from "react";
import { AnniversaryBadge } from "../Logo";
import { campaign, heroSlides } from "../../data/campaign";
import { useCountUp, useInView } from "../../hooks/motion";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

const SLIDE_MS = 5500;

export function CampaignHero() {
  const { ref, visible } = useInView<HTMLElement>(0.2);
  const years = useCountUp(63, visible, 1600);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = usePrefersReducedMotion();
  const touchX = useRef<number | null>(null);

  useEffect(() => {
    if (paused || reduceMotion || !visible) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % heroSlides.length);
    }, SLIDE_MS);
    return () => window.clearInterval(id);
  }, [paused, reduceMotion, visible, index]);

  useEffect(() => {
    heroSlides.forEach((slide) => {
      const img = new Image();
      img.src = slide.src;
    });
  }, []);

  const goTo = (next: number) => {
    setIndex((next + heroSlides.length) % heroSlides.length);
  };

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-[100svh] overflow-hidden"
      aria-labelledby="campaign-hero-heading"
      aria-roledescription="carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
      onTouchStart={(event) => {
        touchX.current = event.changedTouches[0]?.clientX ?? null;
      }}
      onTouchEnd={(event) => {
        if (touchX.current == null) return;
        const delta = event.changedTouches[0].clientX - touchX.current;
        touchX.current = null;
        if (Math.abs(delta) < 48) return;
        goTo(index + (delta < 0 ? 1 : -1));
      }}
    >
      <div className="absolute inset-0" aria-live="polite">
        {heroSlides.map((slide, i) => (
          <img
            key={slide.src}
            src={slide.src}
            alt={i === index ? slide.alt : ""}
            aria-hidden={i !== index}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms] ease-out ${
              i === index ? "opacity-100" : "opacity-0"
            } ${i === index && !reduceMotion ? "animate-ken-burns" : "scale-105"}`}
            style={{ objectPosition: slide.objectPosition }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/55 to-ink/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/35" />
      </div>

      <div className="section-shell relative flex min-h-[100svh] flex-col justify-end pb-14 pt-28 sm:pb-20 sm:pt-32">
        <AnniversaryBadge light className="animate-rise w-fit" />

        <h1
          id="campaign-hero-heading"
          className="animate-rise mt-6 font-display text-4xl font-bold tracking-tight text-white sm:text-6xl"
          style={{ animationDelay: "80ms", fontWeight: 700 }}
        >
          <span
            className="block font-display text-6xl font-extrabold tracking-tight sm:text-8xl md:text-9xl"
            style={{ fontWeight: 800 }}
          >
            {years}
          </span>
          Weight Watchers 63
        </h1>

        <p
          className="animate-rise mt-3 font-serif text-2xl text-tide sm:text-3xl"
          style={{ animationDelay: "160ms" }}
        >
          63 Years of You
        </p>

        <p
          className="animate-rise mt-4 max-w-xl font-sans text-base leading-relaxed text-white/80 sm:text-lg"
          style={{ animationDelay: "240ms" }}
        >
          {campaign.thesis}
        </p>

        <div
          className="animate-rise mt-8 flex flex-wrap items-end justify-between gap-6"
          style={{ animationDelay: "320ms" }}
        >
          <div className="flex flex-wrap gap-3">
            <a
              href="#why-it-matters"
              className="rounded-2xl bg-white px-6 py-3.5 font-sans text-sm font-semibold text-ink transition hover:bg-cloud"
            >
              Why it matters
            </a>
            <a
              href="#ahead"
              className="rounded-2xl border border-white/35 bg-white/5 px-6 py-3.5 font-sans text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/15"
            >
              Where we’re going
            </a>
          </div>

          <div className="flex items-center gap-3" role="group" aria-label="Hero photo slideshow">
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20"
              aria-label="Previous photo"
            >
              <span aria-hidden="true" className="text-lg leading-none">
                ‹
              </span>
            </button>

            <div className="flex items-center gap-2" role="tablist" aria-label="Choose hero photo">
              {heroSlides.map((slide, i) => (
                <button
                  key={slide.src}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Show photo ${i + 1} of ${heroSlides.length}`}
                  onClick={() => goTo(i)}
                  className={`h-2.5 rounded-full transition-all duration-500 ${
                    i === index ? "w-8 bg-tide" : "w-2.5 bg-white/45 hover:bg-white/75"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => goTo(index + 1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20"
              aria-label="Next photo"
            >
              <span aria-hidden="true" className="text-lg leading-none">
                ›
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
