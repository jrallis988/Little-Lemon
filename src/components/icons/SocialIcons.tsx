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

/** Hospital building + map pin (footer address) */
export function IconLocationHospital({ className }: IconProps) {
  return (
    <svg {...socialSvgProps} className={cn("h-5 w-5", className)}>
      {/* Taller left tower with rounded top */}
      <path d="M3.5 21V7.2c0-1.2.7-2.2 1.8-2.55L8 3.5c.55-.2 1.15-.2 1.7 0l1.2.45c.7.25 1.15 1 1.15 1.8V21" />
      {/* Medical cross in circle */}
      <circle cx="9.5" cy="7.6" r="1.55" />
      <path d="M9.5 6.55v2.1M8.45 7.6h2.1" />
      {/* Three tower windows */}
      <path d="M7.4 10.6h4.2M7.4 12.7h4.2M7.4 14.8h4.2" />
      {/* Shorter right wing */}
      <path d="M12.05 21V11.2c0-.66.54-1.2 1.2-1.2h5.05c.66 0 1.2.54 1.2 1.2V21" />
      <path d="M14.3 13.1h3.5M14.3 15.4h3.5" />
      {/* Location pin above right wing */}
      <path d="M16.75 2.4c-1.55 0-2.8 1.2-2.8 2.7 0 1.85 2.8 4.4 2.8 4.4s2.8-2.55 2.8-4.4c0-1.5-1.25-2.7-2.8-2.7z" />
      <circle cx="16.75" cy="5.05" r="0.95" />
    </svg>
  );
}

/** Outline laptop + profile (MyChildren's / portal) */
export function IconPortalDevice({ className }: IconProps) {
  return (
    <svg {...socialSvgProps} className={cn("h-5 w-5", className)}>
      {/* Screen */}
      <rect x="2.75" y="3.5" width="18.5" height="13" rx="1.75" />
      {/* Profile avatar */}
      <circle cx="8" cy="8.2" r="1.85" />
      <path d="M5.2 14.2c.6-1.7 1.7-2.55 2.8-2.55s2.2.85 2.8 2.55" />
      {/* Text lines */}
      <path d="M12.6 7.1h5.2M12.6 9.35h5.2M12.6 11.6h4.2M12.6 13.85h3.4" />
      {/* Laptop base */}
      <path d="M4.2 19.4h15.6" />
      <path d="M2.8 19.4c.35-.85 1.15-1.35 2.15-1.35h14.1c1 0 1.8.5 2.15 1.35" />
    </svg>
  );
}

/** Outline smartphone with receiver */
export function IconPhoneDevice({ className }: IconProps) {
  return (
    <svg {...socialSvgProps} className={cn("h-5 w-5", className)}>
      <rect x="7" y="2" width="10" height="20" rx="2.25" />
      {/* Earpiece / speaker */}
      <path d="M10.4 3.7h3.2" />
      {/* Home indicator */}
      <path d="M10 20.15h4" />
      {/* Classic handset, tilted diagonally */}
      <path d="M10.1 9.4c-.55.55-.7 1.35-.4 2.05.85 1.95 2.5 3.45 4.55 4.1.7.25 1.5 0 1.95-.55l.55-.65c.25-.3.2-.75-.1-.95l-1.45-.85c-.3-.18-.7-.1-.9.2l-.25.35c-1.05-.35-1.95-1.1-2.45-2.1l.35-.25c.3-.2.38-.6.2-.9l-.85-1.45c-.2-.3-.65-.35-.95-.1l-.65.55z" />
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
