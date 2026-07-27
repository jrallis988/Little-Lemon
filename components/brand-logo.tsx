import { cn } from "@/lib/utils";

/**
 * PF badge + wordmark aligned to the classic Planet Fitness mark:
 * yellow seal, black rim, flexing figure in the center.
 */
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
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg
        viewBox="0 0 64 64"
        aria-hidden={showWordmark ? true : undefined}
        role={showWordmark ? undefined : "img"}
        aria-label={showWordmark ? undefined : "Planet Fitness"}
        className={cn("h-9 w-9 shrink-0", markClassName)}
      >
        <circle cx="32" cy="32" r="31" fill="#FFCE08" />
        <circle cx="32" cy="32" r="26.75" fill="#111111" />
        <circle cx="32" cy="32" r="20.5" fill="#FFCE08" />
        <defs>
          <path
            id="pf-logo-arc"
            d="M14.2,32 a17.8,17.8 0 1,1 35.6,0"
            fill="none"
          />
        </defs>
        <text
          fill="#FFCE08"
          fontSize="4.8"
          fontWeight="800"
          letterSpacing="0.85"
          fontFamily="Arial Black, Helvetica Neue, Arial, sans-serif"
        >
          <textPath
            xlinkHref="#pf-logo-arc"
            href="#pf-logo-arc"
            startOffset="50%"
            textAnchor="middle"
          >
            PLANET FITNESS
          </textPath>
        </text>
        {/* Classic flexing figure */}
        <g fill="#111111">
          <circle cx="32" cy="23.2" r="3.15" />
          <path d="M28.6 26.4c-.35 2.1-.4 4.2-.15 6.2.2 1.5 1.15 2.35 2.45 2.55.55.08 1.15.08 1.7 0 1.3-.2 2.25-1.05 2.45-2.55.25-2 .2-4.1-.15-6.2-.2-1.15-.85-1.85-1.95-1.95h-2.4c-1.1.1-1.75.8-1.95 1.95z" />
          <path d="M27.4 28.1c-1.55.55-3.35 1.85-4.55 3.55-1.05 1.5-1.35 2.85-.55 3.45.7.5 1.55.05 2.45-1.05 1.05-1.3 2.05-2.55 2.85-3.25.35-.3.55-.65.4-1.1-.15-.45-.45-.7-.6-1.6z" />
          <path d="M36.6 28.1c1.55.55 3.35 1.85 4.55 3.55 1.05 1.5 1.35 2.85.55 3.45-.7.5-1.55.05-2.45-1.05-1.05-1.3-2.05-2.55-2.85-3.25-.35-.3-.55-.65-.4-1.1.15-.45.45-.7.6-1.6z" />
          <path d="M29.35 35.1c-.2 2.4-.25 4.7-.1 6.7h2.05c.1-2 .05-4.3-.1-6.7-.1-1.35-.55-1.95-1.2-1.95h-.4c-.65 0-1.1.6-1.2 1.95-.2 2.4-.25 4.7-.1 6.7h2.05c.1-2 .05-4.3-.1-6.7" />
          <path d="M28.15 41.6h2.45v2.15c0 .55-.4.95-.95.95h-.55c-.55 0-.95-.4-.95-.95zm2.8 0h2.45v2.15c0 .55-.4.95-.95.95h-.55c-.55 0-.95-.4-.95-.95z" />
        </g>
      </svg>
      {showWordmark ? (
        <span className="font-display text-xl leading-none tracking-tight text-pf-purple md:text-[1.65rem]">
          planet fitness
        </span>
      ) : (
        <span className="sr-only">Planet Fitness</span>
      )}
    </span>
  );
}
