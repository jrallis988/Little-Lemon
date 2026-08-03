import { cn } from "@/lib/cn";

type IconProps = { className?: string };

const socialSvgProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true as const,
};

/** Outline Facebook “f” */
export function IconFacebook({ className }: IconProps) {
  return (
    <svg {...socialSvgProps} className={cn("h-5 w-5", className)}>
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
    </svg>
  );
}

/** Outline Instagram camera */
export function IconInstagram({ className }: IconProps) {
  return (
    <svg {...socialSvgProps} className={cn("h-5 w-5", className)}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Outline LinkedIn “in” */
export function IconLinkedIn({ className }: IconProps) {
  return (
    <svg {...socialSvgProps} className={cn("h-5 w-5", className)}>
      <circle cx="6.4" cy="6" r="1.5" />
      <path d="M5.1 9.5h2.6V18.5H5.1z" />
      <path d="M10.4 9.5h2.5v1.25c.45-.8 1.4-1.55 2.95-1.55 2.15 0 3.65 1.4 3.65 4.35V18.5h-2.55v-4.55c0-1.45-.5-2.45-1.85-2.45-1 0-1.6.7-1.9 1.35-.1.25-.15.6-.15 1V18.5H10.4z" />
    </svg>
  );
}

/** Outline Pinterest “P” in circle */
export function IconPinterest({ className }: IconProps) {
  return (
    <svg {...socialSvgProps} className={cn("h-5 w-5", className)}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M13.1 7.4c-2.15 0-3.55 1.35-3.55 3.15 0 1.2.55 2.15 1.7 2.5-.1.4-.2.85-.35 1.35-.45 1.7-.5 1.95-.5 1.95l1.55.3s.1-.4.35-1.3c.15-.55.35-1.4.4-1.65.25.4.85.75 1.55.75 2.05 0 3.45-1.85 3.45-4.25 0-2.25-1.7-3.8-4.6-3.8zm.35 5.85c-.55 0-1-.25-1.2-.7l-.2-.55c-.1.4-.35.85-.85 1.05-.35-.4-.55-.95-.55-1.55 0-1.2.8-2.15 2.05-2.15 1.1 0 1.85.7 1.85 1.75 0 1.2-.65 2.15-1.1 2.15z" />
    </svg>
  );
}

/** Outline YouTube play mark */
export function IconYouTube({ className }: IconProps) {
  return (
    <svg {...socialSvgProps} className={cn("h-5 w-5", className)}>
      <rect x="2.5" y="5.5" width="19" height="13" rx="3.5" />
      <path d="M10.2 9.2v5.6l5-2.8z" />
    </svg>
  );
}

/** Outline laptop + profile (MyChildren's / portal) */
export function IconPortalDevice({ className }: IconProps) {
  return (
    <svg {...socialSvgProps} className={cn("h-5 w-5", className)}>
      <rect x="3" y="4" width="18" height="12.5" rx="1.75" />
      <circle cx="8.2" cy="9" r="1.7" />
      <path d="M5.8 13.2c.55-1.4 1.45-2.1 2.4-2.1s1.85.7 2.4 2.1" />
      <path d="M13.2 8.2h4.5M13.2 10.4h3.6M13.2 12.6h2.8" />
      <path d="M2.5 18.5h19" />
      <path d="M5 18.5c.4-1 1.2-1.5 2.2-1.5h9.6c1 0 1.8.5 2.2 1.5" />
    </svg>
  );
}

/** Outline smartphone with receiver */
export function IconPhoneDevice({ className }: IconProps) {
  return (
    <svg {...socialSvgProps} className={cn("h-5 w-5", className)}>
      <rect x="7" y="2" width="10" height="20" rx="2.25" />
      <path d="M10.2 3.6h3.6" />
      <path d="M10 20.2h4" />
      <path d="M10.2 14.8c1.2 1.1 2.8 1.5 4.2.4M9.8 10.4c.15-.95.95-1.55 1.85-1.5.45 0 .85.2 1.1.5l.45.45c.2.2.2.5 0 .7l-.85.85c.7 1.15 1.7 1.95 2.95 2.4l.85-.85c.2-.2.5-.2.7 0l.45.45c.3.25.5.65.5 1.1.05.9-.55 1.7-1.5 1.85-2.45.35-4.65-1.35-5.55-3.65-.25-.65-.35-1.35-.25-2.05.05-.4.25-.8.55-1.05z" />
    </svg>
  );
}

export const socialLinks = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/BostonChildrensHospital",
    Icon: IconFacebook,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/bostonchildrens",
    Icon: IconInstagram,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/boston-children's-hospital",
    Icon: IconLinkedIn,
  },
  {
    name: "Pinterest",
    href: "https://www.pinterest.com/bostonchildrens",
    Icon: IconPinterest,
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/user/ChildrensHospital",
    Icon: IconYouTube,
  },
] as const;
