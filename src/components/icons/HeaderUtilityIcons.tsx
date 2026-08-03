import { cn } from "@/lib/cn";

type IconProps = { className?: string };

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true as const,
};

/** Hospital building + map pin (Find a Location) */
export function IconHospitalLocation({ className }: IconProps) {
  return (
    <svg {...iconProps} className={cn("h-5 w-5", className)}>
      <path d="M4 21V8.2c0-.7.35-1.35 1-1.7L8.5 5c.45-.25 1-.25 1.45 0L13 6.5c.65.35 1 1 1 1.7V21" />
      <path d="M9.25 6.4v2.4M8.05 7.6h2.4" />
      <rect x="6.2" y="10.2" width="1.7" height="1.2" rx="0.2" />
      <rect x="6.2" y="12.8" width="1.7" height="1.2" rx="0.2" />
      <rect x="6.2" y="15.4" width="1.7" height="1.2" rx="0.2" />
      <rect x="10.1" y="10.2" width="1.7" height="1.2" rx="0.2" />
      <rect x="10.1" y="12.8" width="1.7" height="1.2" rx="0.2" />
      <rect x="10.1" y="15.4" width="1.7" height="1.2" rx="0.2" />
      <path d="M7.8 21v-2.8h2.9V21" />
      <path d="M14 21v-6.2h5.2c.55 0 1 .45 1 1V21" />
      <rect x="15.3" y="16.4" width="1.3" height="1.3" rx="0.15" />
      <rect x="17.5" y="16.4" width="1.3" height="1.3" rx="0.15" />
      <path d="M18.2 4.4c1.2 0 2.15.95 2.15 2.15 0 1.7-2.15 3.95-2.15 3.95S16.05 8.25 16.05 6.55c0-1.2.95-2.15 2.15-2.15z" />
      <circle cx="18.2" cy="6.55" r="0.7" />
    </svg>
  );
}

/** Clinician bust with plus (Second Opinion) */
export function IconSecondOpinion({ className }: IconProps) {
  return (
    <svg {...iconProps} className={cn("h-5 w-5", className)}>
      <circle cx="10.8" cy="7" r="3.1" />
      <path d="M8.1 5.2c.55-.7 1.4-1.15 2.4-1.2" />
      <path d="M4.6 20.2v-.8c0-2.55 2.35-4.4 6.2-4.4 1.15 0 2.2.15 3.1.5" />
      <path d="M9.1 14.9l1.7 2.2 1.7-2.2" />
      <path d="M17.8 15v4.4M15.6 17.2h4.4" />
    </svg>
  );
}

/** Hands holding heart (Giving Back) */
export function IconGivingBack({ className }: IconProps) {
  return (
    <svg {...iconProps} className={cn("h-5 w-5", className)}>
      <circle cx="12" cy="7.8" r="3.9" />
      <path d="M12 9.95c-.15 0-1.95-1.2-1.95-2.55 0-.75.55-1.25 1.2-1.25.4 0 .65.2.75.4.1-.2.35-.4.75-.4.65 0 1.2.5 1.2 1.25 0 1.35-1.8 2.55-1.95 2.55z" />
      <path d="M3.5 16.4c1.35-1.55 3.1-2.2 4.85-1.95 1 .15 1.85.65 2.55 1.35" />
      <path d="M20.5 16.4c-1.35-1.55-3.1-2.2-4.85-1.95-1 .15-1.85.65-2.55 1.35" />
      <path d="M4 16.9c1.45 1.85 3.55 3 5.9 3 .85 0 1.65-.2 2.4-.55" />
      <path d="M20 16.9c-1.45 1.85-3.55 3-5.9 3-.85 0-1.65-.2-2.4-.55" />
    </svg>
  );
}
