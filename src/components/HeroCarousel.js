import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { heroSlides } from "../data/heroSlides";

const INTERVAL_MS = 7000;

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

  const slide = heroSlides[index];

  return (
    <section
      className="hero-carousel"
      aria-roledescription="carousel"
      aria-label="Featured announcements"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {heroSlides.map((item, itemIndex) => (
        <div
          key={item.id}
          className={`hero-slide ${itemIndex === index ? "is-active" : ""}`}
          aria-hidden={itemIndex !== index}
        >
          <img src={item.image} alt="" className="hero-slide-image" />
        </div>
      ))}

      <div className="hero-slide-veil" aria-hidden="true" />

      <div className="hero-carousel-inner">
        <div className="hero-panel" key={slide.id}>
          {slide.kicker ? <p className="hero-panel-kicker">{slide.kicker}</p> : null}
          <h1>{slide.title}</h1>
          {slide.lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
          <Link className="btn btn-gold" to={slide.cta.to}>
            {slide.cta.label}
          </Link>
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
            aria-label={`Show slide ${itemIndex + 1}: ${item.title}`}
            className={itemIndex === index ? "is-active" : ""}
            onClick={() => setIndex(itemIndex)}
          />
        ))}
      </div>

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
