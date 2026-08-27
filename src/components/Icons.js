/** Monoline icon set — 24px grid, 2pt stroke, optional Coastal Gold accent */

const defaults = {
  width: 24,
  height: 24,
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  focusable: "false",
};

function Svg({ children, accent = false, className = "", ...props }) {
  return (
    <svg
      className={`icon ${accent ? "icon-accent" : ""} ${className}`.trim()}
      viewBox="0 0 24 24"
      {...defaults}
      {...props}
    >
      {children}
      {accent ? (
        <circle cx="19" cy="5" r="2" fill="var(--gold)" stroke="none" />
      ) : null}
    </svg>
  );
}

export function IconBook(props) {
  return (
    <Svg {...props}>
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5V5.5Z" />
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    </Svg>
  );
}

export function IconCalendar(props) {
  return (
    <Svg {...props}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18" />
      <path d="M8 3v4M16 3v4" />
    </Svg>
  );
}

export function IconUsers(props) {
  return (
    <Svg {...props}>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 19c0-2.8 2.7-5 6-5s6 2.2 6 5" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M21 19c0-2.2-1.8-4-4-4" />
    </Svg>
  );
}

export function IconMapPin(props) {
  return (
    <Svg {...props}>
      <path d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </Svg>
  );
}

export function IconBriefcase(props) {
  return (
    <Svg {...props}>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7" />
      <path d="M3 12h18" />
    </Svg>
  );
}

export function IconHeart(props) {
  return (
    <Svg {...props}>
      <path d="M12 20s-7-4.4-7-9.2A4.2 4.2 0 0 1 12 7a4.2 4.2 0 0 1 7 3.8C19 15.6 12 20 12 20Z" />
    </Svg>
  );
}

export function IconTrophy(props) {
  return (
    <Svg {...props}>
      <path d="M8 21h8" />
      <path d="M12 17v4" />
      <path d="M7 4h10v5a5 5 0 0 1-10 0V4Z" />
      <path d="M7 6H5a2 2 0 0 0 2 4" />
      <path d="M17 6h2a2 2 0 0 1-2 4" />
    </Svg>
  );
}

export function IconShield(props) {
  return (
    <Svg {...props}>
      <path d="M12 3 5 6v6c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3Z" />
    </Svg>
  );
}

export function IconGraduation(props) {
  return (
    <Svg {...props}>
      <path d="M2 9.5 12 4l10 5.5-10 5.5L2 9.5Z" />
      <path d="M6 12v4.5c0 .8 2.7 2.5 6 2.5s6-1.7 6-2.5V12" />
      <path d="M22 10v6" />
    </Svg>
  );
}

export function IconSearch(props) {
  return (
    <Svg {...props}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M16.5 16.5 21 21" />
    </Svg>
  );
}

export function IconArrowRight(props) {
  return (
    <Svg {...props}>
      <path d="M4 12h14" />
      <path d="m13 6 6 6-6 6" />
    </Svg>
  );
}

export function IconBuilding(props) {
  return (
    <Svg {...props}>
      <path d="M4 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16" />
      <path d="M16 10h2a2 2 0 0 1 2 2v9" />
      <path d="M8 8h2M8 12h2M8 16h2" />
      <path d="M4 21h16" />
    </Svg>
  );
}

export function IconClipboard(props) {
  return (
    <Svg {...props}>
      <rect x="6" y="4" width="12" height="17" rx="2" />
      <path d="M9 4.5h6V6a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V4.5Z" />
      <path d="M9 11h6M9 15h6" />
    </Svg>
  );
}

export const iconMap = {
  book: IconBook,
  calendar: IconCalendar,
  users: IconUsers,
  map: IconMapPin,
  briefcase: IconBriefcase,
  heart: IconHeart,
  trophy: IconTrophy,
  shield: IconShield,
  graduation: IconGraduation,
  search: IconSearch,
  arrow: IconArrowRight,
  building: IconBuilding,
  clipboard: IconClipboard,
};
