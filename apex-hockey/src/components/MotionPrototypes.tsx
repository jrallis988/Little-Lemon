import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ApexLogo } from "./ApexLogo";
import { brand } from "../data/content";

export function MotionPrototypes() {
  const revealRef = useRef<HTMLDivElement>(null);
  const typeRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reduced) return;

    const ctx = gsap.context(() => {
      const reveal = revealRef.current;
      const type = typeRef.current;
      const end = endRef.current;
      if (!reveal || !type || !end) return;

      const stick = reveal.querySelector(".motion-reveal__stick");
      const line = reveal.querySelector(".motion-reveal__line");
      gsap.set([stick, line], { autoAlpha: 0 });
      gsap.set(stick, { x: -80, rotate: -8 });
      gsap.set(line, { y: 24 });

      const revealTl = gsap.timeline({ repeat: -1, repeatDelay: 1.2 });
      revealTl
        .to(stick, { autoAlpha: 1, x: 0, rotate: 0, duration: 0.7, ease: "power3.out" })
        .to(line, { autoAlpha: 1, y: 0, duration: 0.45, ease: "power2.out" }, "-=0.15")
        .to({}, { duration: 1.4 })
        .to([stick, line], { autoAlpha: 0, duration: 0.35 });

      const words = type.querySelectorAll(".motion-type__word");
      gsap.set(words, { yPercent: 110, autoAlpha: 0 });
      const typeTl = gsap.timeline({ repeat: -1, repeatDelay: 0.8 });
      typeTl
        .to(words, {
          yPercent: 0,
          autoAlpha: 1,
          duration: 0.45,
          stagger: 0.08,
          ease: "power3.out",
        })
        .to({}, { duration: 1.1 })
        .to(words, { yPercent: -40, autoAlpha: 0, duration: 0.35, stagger: 0.04 });

      const endBits = end.querySelectorAll(".motion-end__bit");
      gsap.set(endBits, { autoAlpha: 0, y: 16 });
      const endTl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
      endTl
        .to(endBits, { autoAlpha: 1, y: 0, duration: 0.35, stagger: 0.12, ease: "power2.out" })
        .to({}, { duration: 1.6 })
        .to(endBits, { autoAlpha: 0, duration: 0.3 });
    });

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section className="section motion" id="motion" aria-labelledby="motion-title">
      <div className="section__inner">
        <p className="section__eyebrow">Motion</p>
        <h2 id="motion-title" className="section__title">
          Controlled motion prototypes.
        </h2>
        <p className="section__lead">
          Restrained web prototypes for later After Effects production — no bounce, particles, or
          glow theater.
        </p>

        <div className="motion__grid">
          <article className="motion-card">
            <h3 className="headline">Product Reveal</h3>
            <div className="motion-stage" ref={revealRef}>
              <div className="motion-reveal__stick" aria-hidden="true">
                <span className="stick-shape" />
              </div>
              <p className="motion-reveal__line display-lg">{brand.line}</p>
            </div>
          </article>

          <article className="motion-card">
            <h3 className="headline">Campaign Typography</h3>
            <div className="motion-stage motion-stage--type" ref={typeRef}>
              <p className="motion-type" aria-label={brand.line}>
                {"RELEASE FASTER.".split(" ").map((word) => (
                  <span key={word} className="motion-type__word">
                    {word}
                  </span>
                ))}
              </p>
            </div>
          </article>

          <article className="motion-card motion-card--wide">
            <h3 className="headline">Social End Card · ~2–3s</h3>
            <div className="motion-stage motion-stage--end" ref={endRef}>
              <div className="motion-end__bit">
                <ApexLogo />
              </div>
              <p className="motion-end__bit motion-end__product">{brand.product}</p>
              <p className="motion-end__bit motion-end__line">{brand.line}</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
