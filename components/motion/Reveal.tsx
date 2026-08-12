"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { prefersReducedMotion } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger delay in ms once visible */
  delayMs?: number;
  /** Intersection root margin */
  rootMargin?: string;
  as?: "div" | "section" | "article" | "li";
};

/**
 * Scroll-triggered fade/slide-up. Content stays visible until JS mounts,
 * then (if motion is allowed) waits for intersection before animating in.
 */
export function Reveal({
  children,
  className = "",
  delayMs = 0,
  rootMargin = "0px 0px -10% 0px",
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [phase, setPhase] = useState<"idle" | "pending" | "visible">("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      setPhase("visible");
      return;
    }

    setPhase("pending");

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setPhase("visible");
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  const style: CSSProperties | undefined =
    delayMs > 0 && phase === "visible" ? { transitionDelay: `${delayMs}ms` } : undefined;

  const motionClass =
    phase === "pending"
      ? "varga-reveal is-pending"
      : phase === "visible"
        ? "varga-reveal is-visible"
        : "";

  return (
    <Tag
      ref={ref as never}
      className={[motionClass, className].filter(Boolean).join(" ")}
      style={style}
    >
      {children}
    </Tag>
  );
}
