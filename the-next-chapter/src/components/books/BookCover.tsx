import type { BookCoverArt } from "@/types/book";

interface BookCoverProps {
  title: string;
  author: string;
  cover: BookCoverArt;
  size?: "sm" | "md" | "lg" | "xl";
  priority?: boolean;
}

const sizeClasses = {
  sm: "w-24 md:w-28",
  md: "w-36 md:w-40",
  lg: "w-48 md:w-56",
  xl: "w-full max-w-xs md:max-w-sm",
};

function CoverPattern({ pattern, accent }: { pattern: BookCoverArt["pattern"]; accent: string }) {
  const opacity = "opacity-20";

  switch (pattern) {
    case "compass":
      return (
        <g className={opacity} stroke={accent} strokeWidth="1" fill="none">
          <circle cx="50" cy="55" r="30" />
          <circle cx="50" cy="55" r="20" />
          <line x1="50" y1="20" x2="50" y2="90" />
          <line x1="15" y1="55" x2="85" y2="55" />
          <polygon points="50,25 53,35 50,32 47,35" fill={accent} />
        </g>
      );
    case "lantern":
      return (
        <g className={opacity} fill={accent}>
          <rect x="40" y="30" width="20" height="35" rx="2" opacity="0.6" />
          <rect x="35" y="65" width="30" height="4" />
          <ellipse cx="50" cy="50" rx="8" ry="12" opacity="0.4" />
        </g>
      );
    case "stars":
      return (
        <g className={opacity} fill={accent}>
          {[20, 45, 70, 30, 60, 80].map((x, i) => (
            <circle key={i} cx={x} cy={25 + (i % 3) * 25} r={1.5 + (i % 2)} />
          ))}
        </g>
      );
    case "circuits":
      return (
        <g className={opacity} stroke={accent} strokeWidth="0.8" fill="none">
          <path d="M10,70 L30,70 L30,50 L50,50 L50,30 L70,30" />
          <path d="M80,20 L80,40 L60,40 L60,60 L40,60" />
          <circle cx="30" cy="70" r="3" fill={accent} />
          <circle cx="50" cy="30" r="3" fill={accent} />
        </g>
      );
    case "letters":
      return (
        <g className={opacity} fill={accent} fontSize="8" fontFamily="serif">
          <text x="15" y="35" opacity="0.5">
            Dear
          </text>
          <text x="15" y="55" opacity="0.4">
            Ruth,
          </text>
          <line x1="15" y1="65" x2="60" y2="65" stroke={accent} strokeWidth="0.5" />
        </g>
      );
    case "lunch":
      return (
        <g className={opacity} fill={accent}>
          <rect x="25" y="40" width="50" height="30" rx="4" opacity="0.5" />
          <rect x="30" y="35" width="40" height="8" rx="2" opacity="0.7" />
        </g>
      );
    case "club":
      return (
        <g className={opacity} stroke={accent} strokeWidth="1" fill="none">
          <rect x="20" y="35" width="25" height="18" />
          <rect x="35" y="45" width="25" height="18" />
          <rect x="50" y="55" width="25" height="18" />
        </g>
      );
    case "leaves":
      return (
        <g className={opacity} fill={accent}>
          <ellipse cx="25" cy="40" rx="8" ry="4" transform="rotate(-30 25 40)" opacity="0.5" />
          <ellipse cx="70" cy="55" rx="10" ry="5" transform="rotate(20 70 55)" opacity="0.4" />
          <ellipse cx="45" cy="75" rx="7" ry="3.5" transform="rotate(-10 45 75)" opacity="0.6" />
        </g>
      );
    default:
      return null;
  }
}

export function BookCover({ title, author, cover, size = "md" }: BookCoverProps) {
  return (
    <div
      className={`relative aspect-[2/3] overflow-hidden shadow-[4px_8px_24px_rgba(26,22,18,0.25)] ${sizeClasses[size]}`}
      role="img"
      aria-label={`Book cover: ${title} by ${author}`}
    >
      <svg
        viewBox="0 0 100 150"
        className="h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="100" height="150" fill={cover.background} />
        <CoverPattern pattern={cover.pattern} accent={cover.accent} />

        <rect x="8" y="0" width="3" height="150" fill="rgba(0,0,0,0.15)" />

        <text
          x="50"
          y="95"
          textAnchor="middle"
          fill={cover.accent}
          fontSize="7"
          fontFamily="Georgia, serif"
          fontWeight="bold"
          letterSpacing="0.05em"
        >
          {title.length > 28 ? title.slice(0, 26) + "…" : title}
        </text>

        <line
          x1="20"
          y1="102"
          x2="80"
          y2="102"
          stroke={cover.accent}
          strokeWidth="0.5"
          opacity="0.5"
        />

        <text
          x="50"
          y="112"
          textAnchor="middle"
          fill={cover.accent}
          fontSize="5"
          fontFamily="Georgia, serif"
          opacity="0.8"
        >
          {author}
        </text>

        <text
          x="50"
          y="138"
          textAnchor="middle"
          fill={cover.accent}
          fontSize="4"
          fontFamily="Georgia, serif"
          opacity="0.5"
          letterSpacing="0.15em"
        >
          HARBORLIGHT
        </text>
      </svg>
    </div>
  );
}
