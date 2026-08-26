import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./LowerThird.css";

export type LowerThirdKind =
  | "athlete"
  | "coach"
  | "reporter"
  | "location"
  | "statistic";

interface Props {
  kind: LowerThirdKind;
  primary: string;
  secondary: string;
  animate?: boolean;
  className?: string;
}

/** Video lower-third system — quick in/out, high readability. */
export function LowerThird({
  kind,
  primary,
  secondary,
  animate = true,
  className = "",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!animate || !ref.current) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { x: -24, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.35, ease: "power3.out" }
      );
    }, ref);
    return () => ctx.revert();
  }, [animate, primary, kind]);

  return (
    <div
      ref={ref}
      className={`l3 l3--${kind} ${className}`}
      role="group"
      aria-label={`${primary}, ${secondary}`}
    >
      <span className="l3__accent" aria-hidden="true" />
      <div className="l3__body">
        <strong className="l3__primary">{primary}</strong>
        <span className="l3__secondary">{secondary}</span>
      </div>
      {kind === "statistic" && <span className="l3__stat-mark" aria-hidden="true" />}
    </div>
  );
}
