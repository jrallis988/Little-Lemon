import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./StatCard.css";

interface StatItem {
  label: string;
  value: string;
}

interface Props {
  variant?: "individual" | "card" | "compare" | "season" | "game";
  title?: string;
  subtitle?: string;
  stats: StatItem[];
  compareStats?: StatItem[];
  compareName?: string;
  animate?: boolean;
}

/** Reusable sports statistics system — numbers as design. */
export function StatCard({
  variant = "card",
  title,
  subtitle,
  stats,
  compareStats,
  compareName,
  animate = false,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!animate || !ref.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const nums = ref.current.querySelectorAll(".stat-card__value");
    const ctx = gsap.context(() => {
      gsap.from(nums, {
        y: 18,
        opacity: 0,
        duration: 0.4,
        stagger: 0.08,
        ease: "power3.out",
      });
    }, ref);
    return () => ctx.revert();
  }, [animate, stats]);

  return (
    <div ref={ref} className={`stat-card stat-card--${variant}`}>
      {(title || subtitle) && (
        <header className="stat-card__head">
          {subtitle && <span className="stat-card__sub">{subtitle}</span>}
          {title && <h3 className="stat-card__title">{title}</h3>}
        </header>
      )}
      <div className="stat-card__grid">
        {stats.map((s) => (
          <div key={s.label} className="stat-card__item">
            <span className="stat-card__value num-display">{s.value}</span>
            <span className="stat-card__label">{s.label}</span>
          </div>
        ))}
      </div>
      {variant === "compare" && compareStats && (
        <div className="stat-card__compare">
          <span className="stat-card__vs">VS {compareName ?? "OPP"}</span>
          <div className="stat-card__grid">
            {compareStats.map((s) => (
              <div key={s.label} className="stat-card__item stat-card__item--muted">
                <span className="stat-card__value num-display">{s.value}</span>
                <span className="stat-card__label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
