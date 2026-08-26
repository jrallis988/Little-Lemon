import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ApexLogo } from "./ApexLogo";
import { brand, movementCycle } from "../data/content";

export function MotionPrototypes() {
  const physicsRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);
  const [beat, setBeat] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => {
      setBeat((b) => (b + 1) % movementCycle.length);
    }, 900);
    return () => window.clearInterval(id);
  }, [reduced]);

  useEffect(() => {
    if (reduced) return;

    const ctx = gsap.context(() => {
      const reveal = revealRef.current;
      const end = endRef.current;
      const physics = physicsRef.current;
      if (!reveal || !end || !physics) return;

      const stick = reveal.querySelector(".motion-reveal__stick");
      const line = reveal.querySelector(".motion-reveal__line");
      gsap.set([stick, line], { autoAlpha: 0 });
      gsap.set(stick, { x: -100, skewX: 12 });
      gsap.set(line, { x: -40, letterSpacing: "0.35em" });

      const revealTl = gsap.timeline({ repeat: -1, repeatDelay: 0.9 });
      revealTl
        // accelerate
        .to(stick, { autoAlpha: 1, x: 0, skewX: 0, duration: 0.55, ease: "power3.in" })
        // cut / stop into line
        .to(line, { autoAlpha: 1, x: 0, letterSpacing: "0.04em", duration: 0.35, ease: "power4.out" })
        // impact hold
        .to({}, { duration: 1.1 })
        // reset
        .to([stick, line], { autoAlpha: 0, duration: 0.3 });

      const endBits = end.querySelectorAll(".motion-end__bit");
      gsap.set(endBits, { autoAlpha: 0, y: 20 });
      const endTl = gsap.timeline({ repeat: -1, repeatDelay: 0.8 });
      endTl
        .to(endBits, { autoAlpha: 1, y: 0, duration: 0.3, stagger: 0.1, ease: "power2.out" })
        .to({}, { duration: 1.5 })
        .to(endBits, { autoAlpha: 0, duration: 0.25 });

      const puck = physics.querySelector(".physics-puck");
      gsap.set(puck, { x: 0, y: 0 });
      const physTl = gsap.timeline({ repeat: -1, repeatDelay: 0.4 });
      physTl
        .to(puck, { x: 40, duration: 0.35, ease: "power1.in" }) // accelerate
        .to(puck, { x: 120, y: -30, duration: 0.25, ease: "power2.inOut" }) // cut
        .to(puck, { x: 160, y: -30, duration: 0.12, ease: "none" }) // stop windup
        .to(puck, { x: 280, y: 10, duration: 0.2, ease: "power4.out" }) // impact release
        .to(puck, { autoAlpha: 0, duration: 0.2 })
        .set(puck, { x: 0, y: 0, autoAlpha: 1 }); // reset
    });

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section className="section motion" id="motion" aria-labelledby="motion-title">
      <div className="section__inner">
        <p className="section__eyebrow">Motion — Hockey Physics</p>
        <h2 id="motion-title" className="section__title">
          Start. Accelerate. Cut. Stop. Impact. Reset.
        </h2>
        <p className="section__lead">
          Motion prototypes follow the rhythm of a shift — not generic fast sports animation.
        </p>

        <ol className="motion__beats" aria-label="Active movement beat">
          {movementCycle.map((b, i) => (
            <li key={b.id} className={i === beat ? "is-active" : ""}>
              {b.label}
            </li>
          ))}
        </ol>

        <div className="motion__grid">
          <article className="motion-card">
            <h3 className="headline">Physics Path</h3>
            <div className="motion-stage motion-stage--physics" ref={physicsRef}>
              <div className="physics-path" aria-hidden="true" />
              <span className="physics-puck" aria-hidden="true" />
              <p className="motion-stage__caption">Puck path as motion grammar</p>
            </div>
          </article>

          <article className="motion-card">
            <h3 className="headline">Product → Line</h3>
            <div className="motion-stage" ref={revealRef}>
              <div className="motion-reveal__stick" aria-hidden="true">
                <span className="stick-shape" />
              </div>
              <p className="motion-reveal__line display-lg">{brand.line}</p>
            </div>
          </article>

          <article className="motion-card motion-card--wide">
            <h3 className="headline">Social End Card · Mark Stamp</h3>
            <div className="motion-stage motion-stage--end" ref={endRef}>
              <div className="motion-end__bit">
                <ApexLogo />
              </div>
              <p className="motion-end__bit motion-end__product">{brand.product}</p>
              <p className="motion-end__bit motion-end__ask">{brand.ask}</p>
              <p className="motion-end__bit motion-end__mono">APEX MARK LOGGED</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
