import { cn } from "@/lib/cn";

type IconProps = { className?: string };

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.55,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true as const,
};

/** Hospital building + map pin (Find a Location) */
export function IconHospitalLocation({ className }: IconProps) {
  return (
    <svg {...iconProps} className={cn("h-5 w-5", className)}>
      {/* Main tower */}
      <path d="M3.5 21V7.5c0-.8.4-1.5 1.15-1.85L8 4.2c.5-.25 1.1-.25 1.6 0l3.35 1.45c.75.35 1.15 1.05 1.15 1.85V21" />
      {/* Cross */}
      <path d="M9.8 6.6v2.8M8.4 8h2.8" />
      {/* Windows */}
      <path d="M6.4 11h2.2M6.4 13.4h2.2M6.4 15.8h2.2" />
      <path d="M11.2 11h2.2M11.2 13.4h2.2M11.2 15.8h2.2" />
      {/* Doors */}
      <path d="M8.2 21v-3.2h3.6V21" />
      {/* Side wing */}
      <path d="M14.1 21V14h5.4c.6 0 1.1.5 1.1 1.1V21" />
      <path d="M15.8 16.2h1.4M18.2 16.2h1.4" />
      {/* Map pin above wing */}
      <path d="M18.2 5.2c1.35 0 2.45 1.1 2.45 2.45 0 1.85-2.45 4.35-2.45 4.35S15.75 9.5 15.75 7.65c0-1.35 1.1-2.45 2.45-2.45z" />
      <circle cx="18.2" cy="7.65" r="0.85" />
    </svg>
  );
}

/** Clinician bust with plus (Second Opinion) */
export function IconSecondOpinion({ className }: IconProps) {
  return (
    <svg {...iconProps} className={cn("h-5 w-5", className)}>
      {/* Head */}
      <circle cx="11" cy="7.2" r="3.2" />
      {/* Side part / hair suggestion */}
      <path d="M8.2 5.4c.7-.9 1.7-1.35 2.8-1.35" />
      {/* Shoulders / coat with V collar */}
      <path d="M4.8 20.5v-1.2c0-2.6 2.4-4.5 6.2-4.5 1.4 0 2.65.25 3.7.7" />
      <path d="M9.4 14.9l1.6 2.1 1.6-2.1" />
      {/* Plus badge */}
      <path d="M17.6 15.2v4.2M15.5 17.3h4.2" />
    </svg>
  );
}

/** Hands holding heart (Giving Back) */
export function IconGivingBack({ className }: IconProps) {
  return (
    <svg {...iconProps} className={cn("h-5 w-5", className)}>
      {/* Heart in circle */}
      <circle cx="12" cy="8.2" r="4.1" />
      <path d="M12 10.6c-.2 0-2.2-1.35-2.2-2.85 0-.85.65-1.4 1.35-1.4.45 0 .75.2.85.45.1-.25.4-.45.85-.45.7 0 1.35.55 1.35 1.4 0 1.5-2 2.85-2.2 2.85z" />
      {/* Cupped hands */}
      <path d="M3.8 16.8c1.2-1.6 2.9-2.4 4.6-2.2.9.1 1.7.5 2.4 1.1" />
      <path d="M20.2 16.8c-1.2-1.6-2.9-2.4-4.6-2.2-.9.1-1.7.5-2.4 1.1" />
      <path d="M4.2 17.2c1.4 1.8 3.5 3 5.8 3h0c.7 0 1.35-.15 2-.4" />
      <path d="M19.8 17.2c-1.4 1.8-3.5 3-5.8 3h0c-.7 0-1.35-.15-2-.4" />
      <path d="M8.2 15.2c.5 1.3 1.5 2.2 2.8 2.5" />
      <path d="M15.8 15.2c-.5 1.3-1.5 2.2-2.8 2.5" />
    </svg>
  );
}
