import { cn } from "@/lib/utils";

/** Simplified PF-style mark for this redesign (gear + flex). */
export function PlanetFitnessLogo({
  className,
  markClassName,
  showWordmark = true,
}: {
  className?: string;
  markClassName?: string;
  showWordmark?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <svg
        viewBox="0 0 48 48"
        aria-hidden={!showWordmark}
        className={cn("h-8 w-8 shrink-0", markClassName)}
      >
        <circle cx="24" cy="24" r="22" fill="#111111" />
        <circle
          cx="24"
          cy="24"
          r="18"
          fill="none"
          stroke="#FFCE08"
          strokeWidth="3"
        />
        <path
          d="M18 30c0-6 3.2-9.5 7.8-9.5 1.7 0 3.1.4 4.2 1.1V14.8h3.4V30c0 2.4-1.9 4.2-4.3 4.2h-1.2c-1.5 0-2.7-.7-3.4-1.8-.8 1.1-2.1 1.8-3.6 1.8-2.8 0-4.9-2-4.9-4.2zm7.6-6.4c-2.4 0-4 1.8-4 4.2s1.6 4.1 4 4.1 4-1.8 4-4.1-1.6-4.2-4-4.2z"
          fill="#FFCE08"
        />
      </svg>
      {showWordmark ? (
        <span className="font-display text-xl leading-none tracking-tight text-pf-purple md:text-2xl">
          planet fitness
        </span>
      ) : (
        <span className="sr-only">Planet Fitness</span>
      )}
    </span>
  );
}
