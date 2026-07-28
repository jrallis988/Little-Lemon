import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { heroSlides } from "../data/heroSlides";

const INTERVAL_MS = 7000;
const BRAND = "White Mountains Community College";

function CtaButton({ action, className }) {
  if (!action) return null;
  if (action.external) {
    return (
      <a
        className={className}
        href={action.to}
        target="_blank"
        rel="noreferrer"
      >
        {action.label}
      </a>
    );
  }
  return (
    <Link className={className} to={action.to}>
      {action.label}
    </Link>
  );
}

function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    )?.matches;
    if (paused || reduceMotion) return undefined;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % heroSlides.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [paused]);

  const goTo = (next) => {
    setIndex((next + heroSlides.length) % heroSlides.length);
  };

  const onKeyDown = (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(index - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(index + 1);
    }
  };

  const slide = heroSlides[index];

  return (
    <section
      className="hero-carousel"
      aria-roledescription="carousel"
      aria-label="Featured announcements"
      tabIndex={0}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setPaused(false);
        }
      }}
      onKeyDown={onKeyDown}
    >
      {heroSlides.map((item, itemIndex) => (
        <div
          key={item.id}
          className={`hero-slide ${itemIndex === index ? "is-active" : ""}`}
          aria-hidden={itemIndex !== index}
        >
          <img
            src={item.image}
            alt={itemIndex === index ? item.imageAlt || "" : ""}
            className="hero-slide-image"
          />
        </div>
      ))}

      <div className="hero-slide-veil" aria-hidden="true" />

      <div className="hero-carousel-inner">
        <div className="hero-panel brand-first" key={slide.id}>
          <p className="hero-brand-mark">White Mountains</p>
          <h1>{BRAND}</h1>
          <p className="hero-headline">{slide.headline}</p>
          <p className="hero-support">{slide.line}</p>
          <div className="cta-actions">
            <CtaButton action={slide.cta} className="btn btn-gold" />
            <CtaButton
              action={slide.secondaryCta}
              className="btn btn-ghost-light"
            />
          </div>
        </div>
      </div>

      <button
        type="button"
        className="carousel-arrow carousel-prev"
        aria-label="Previous slide"
        onClick={() => goTo(index - 1)}
      >
        ‹
      </button>
      <button
        type="button"
        className="carousel-arrow carousel-next"
        aria-label="Next slide"
        onClick={() => goTo(index + 1)}
      >
        ›
      </button>

      <div className="carousel-dots" role="tablist" aria-label="Slide controls">
        {heroSlides.map((item, itemIndex) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={itemIndex === index}
            aria-label={`Show slide ${itemIndex + 1}: ${item.headline}`}
            className={itemIndex === index ? "is-active" : ""}
            onClick={() => setIndex(itemIndex)}
          />
        ))}
      </div>

      <button
        type="button"
        className="carousel-pause"
        aria-pressed={paused}
        aria-label={paused ? "Play slideshow" : "Pause slideshow"}
        onClick={() => setPaused((current) => !current)}
      >
        {paused ? "Play" : "Pause"}
      </button>

      <div className="carousel-progress" aria-hidden="true">
        <span
          key={`${slide.id}-${paused ? "paused" : "play"}`}
          className={paused ? "is-paused" : ""}
          style={{ animationDuration: `${INTERVAL_MS}ms` }}
        />
      </div>
    </section>
  );
}

export default HeroCarousel;
