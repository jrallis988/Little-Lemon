import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { brand } from "../data/brand";
import "./MotionPreview.css";

export type MotionKind =
  | "intro"
  | "series"
  | "lowerthird"
  | "stat"
  | "transition"
  | "endcard";

interface Props {
  kind: MotionKind;
  seriesLabel?: string;
}

const titles: Record<MotionKind, string> = {
  intro: "COURTSIDE INTRO · 2–3s",
  series: "SERIES INTRO · ~2s",
  lowerthird: "LOWER THIRD",
  stat: "STATISTIC REVEAL",
  transition: "TRANSITION",
  endcard: "END CARD",
};

/** Fast motion identity prototypes (GSAP). */
export function MotionPreview({ kind, seriesLabel = "THE PLAYER" }: Props) {
  const stageRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);

  const play = () => {
    if (!stageRef.current) return;
    setPlaying(true);
    const root = stageRef.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.killTweensOf(root.querySelectorAll("[data-m]"));

    if (reduced) {
      gsap.set(root.querySelectorAll("[data-m]"), { clearProps: "all", opacity: 1 });
      setPlaying(false);
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => setPlaying(false),
    });

    if (kind === "intro") {
      gsap.set(root.querySelectorAll("[data-m]"), { opacity: 0, y: 20 });
      tl.to(root.querySelector('[data-m="bar"]'), {
        opacity: 1,
        scaleY: 1,
        duration: 0.25,
        ease: "power3.out",
      })
        .fromTo(
          root.querySelector('[data-m="word"]'),
          { opacity: 0, y: 28, skewY: 4 },
          { opacity: 1, y: 0, skewY: 0, duration: 0.45, ease: "power4.out" },
          "-=0.05"
        )
        .fromTo(
          root.querySelector('[data-m="tag"]'),
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" },
          "-=0.15"
        );
    } else if (kind === "series") {
      gsap.set(root.querySelectorAll("[data-m]"), { opacity: 0 });
      tl.fromTo(
        root.querySelector('[data-m="series"]'),
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.35, ease: "power3.out" }
      ).fromTo(
        root.querySelector('[data-m="line"]'),
        { scaleX: 0, opacity: 1 },
        { scaleX: 1, duration: 0.3, ease: "power2.inOut" },
        "-=0.1"
      );
    } else if (kind === "lowerthird") {
      gsap.set(root.querySelector('[data-m="l3"]'), { opacity: 0, x: -40 });
      tl.to(root.querySelector('[data-m="l3"]'), {
        opacity: 1,
        x: 0,
        duration: 0.3,
        ease: "power3.out",
      }).to(root.querySelector('[data-m="l3"]'), {
        opacity: 0,
        x: -20,
        duration: 0.25,
        delay: 1.1,
        ease: "power2.in",
      });
    } else if (kind === "stat") {
      gsap.set(root.querySelectorAll("[data-m]"), { opacity: 0, y: 16 });
      tl.to(root.querySelector('[data-m="stat"]'), {
        opacity: 1,
        y: 0,
        duration: 0.35,
        ease: "power3.out",
      }).to(
        root.querySelector('[data-m="label"]'),
        { opacity: 1, y: 0, duration: 0.25 },
        "-=0.1"
      );
    } else if (kind === "transition") {
      gsap.set(root.querySelector('[data-m="wipe"]'), {
        opacity: 1,
        scaleX: 0,
        transformOrigin: "left center",
      });
      tl.to(root.querySelector('[data-m="wipe"]'), {
        scaleX: 1,
        duration: 0.22,
        ease: "power3.in",
      })
        .set(root.querySelector('[data-m="mark"]'), { opacity: 1 })
        .to(root.querySelector('[data-m="wipe"]'), {
          scaleX: 0,
          transformOrigin: "right center",
          duration: 0.22,
          ease: "power3.out",
        })
        .set(root.querySelector('[data-m="mark"]'), { opacity: 0 });
    } else if (kind === "endcard") {
      gsap.set(root.querySelectorAll("[data-m]"), { opacity: 0, y: 14 });
      tl.to(root.querySelector('[data-m="end-brand"]'), {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power3.out",
      }).to(
        root.querySelector('[data-m="end-tag"]'),
        { opacity: 1, y: 0, duration: 0.35 },
        "-=0.15"
      );
    }
  };

  useEffect(() => {
    play();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kind]);

  return (
    <div className="motion-preview">
      <div className="motion-preview__head">
        <span className="label-chip">{titles[kind]}</span>
        <button type="button" className="btn btn--ghost" onClick={play} disabled={playing}>
          {playing ? "Playing…" : "Replay"}
        </button>
      </div>
      <div className="motion-preview__stage" ref={stageRef}>
        {kind === "intro" && (
          <>
            <span className="motion-preview__bar" data-m="bar" />
            <strong className="motion-preview__word brand-mark" data-m="word">
              {brand.name}
            </strong>
            <span className="motion-preview__tag" data-m="tag">
              {brand.tagline}
            </span>
          </>
        )}
        {kind === "series" && (
          <>
            <strong className="motion-preview__series" data-m="series">
              {seriesLabel}
            </strong>
            <span className="motion-preview__line" data-m="line" />
          </>
        )}
        {kind === "lowerthird" && (
          <div className="motion-preview__l3" data-m="l3">
            <span className="motion-preview__l3-accent" />
            <div>
              <strong>MARCUS REED</strong>
              <span>Point Guard · Metro United</span>
            </div>
          </div>
        )}
        {kind === "stat" && (
          <div className="motion-preview__stat-wrap">
            <strong className="num-display motion-preview__stat" data-m="stat">
              27.4
            </strong>
            <span data-m="label">PPG</span>
          </div>
        )}
        {kind === "transition" && (
          <>
            <span className="motion-preview__wipe" data-m="wipe" />
            <span className="brand-mark motion-preview__tmark" data-m="mark">
              CS
            </span>
          </>
        )}
        {kind === "endcard" && (
          <div className="motion-preview__end">
            <strong className="brand-mark" data-m="end-brand">
              {brand.name}
            </strong>
            <span data-m="end-tag">{brand.tagline}</span>
          </div>
        )}
      </div>
    </div>
  );
}
