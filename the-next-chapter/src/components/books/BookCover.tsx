import type { BookCoverArt } from "@/types/book";

interface BookCoverProps {
  title: string;
  author: string;
  cover: BookCoverArt;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeClasses = {
  sm: "w-24 md:w-28",
  md: "w-36 md:w-40",
  lg: "w-48 md:w-56",
  xl: "w-full max-w-xs md:max-w-sm",
};

function wrapTitle(title: string, maxLen = 16): string[] {
  if (title.length <= maxLen) return [title];
  const words = title.split(" ");
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > maxLen && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }
  if (current) lines.push(current);
  return lines.slice(0, 3);
}

function CoverArt({ pattern, accent, bg }: { pattern: BookCoverArt["pattern"]; accent: string; bg: string }) {
  switch (pattern) {
    case "compass":
      return (
        <g>
          <defs>
            <radialGradient id="c-glow" cx="50%" cy="40%" r="55%">
              <stop offset="0%" stopColor={accent} stopOpacity="0.35" />
              <stop offset="100%" stopColor={bg} stopOpacity="0" />
            </radialGradient>
          </defs>
          <ellipse cx="50" cy="48" rx="42" ry="38" fill="url(#c-glow)" />
          <path d="M0 95 Q25 78 50 88 T100 80 L100 150 L0 150 Z" fill="#1a3329" opacity="0.55" />
          <path d="M0 110 Q30 95 55 108 T100 98 L100 150 L0 150 Z" fill="#243d32" opacity="0.7" />
          <g transform="translate(50 42)" fill="none" stroke={accent} strokeWidth="1.2">
            <circle r="22" opacity="0.9" />
            <circle r="14" opacity="0.55" />
            <circle r="3" fill={accent} stroke="none" />
            <line x1="0" y1="-28" x2="0" y2="28" opacity="0.7" />
            <line x1="-28" y1="0" x2="28" y2="0" opacity="0.7" />
            <polygon points="0,-26 3.5,-14 0,-16 -3.5,-14" fill={accent} stroke="none" />
            <polygon points="0,26 -2.5,16 0,18 2.5,16" fill={accent} stroke="none" opacity="0.5" />
          </g>
          <path d="M72 28 Q78 22 84 28" fill="none" stroke={accent} strokeWidth="0.8" opacity="0.5" />
          <circle cx="78" cy="22" r="1.5" fill={accent} opacity="0.6" />
        </g>
      );
    case "lantern":
      return (
        <g>
          <defs>
            <radialGradient id="l-glow" cx="50%" cy="45%" r="40%">
              <stop offset="0%" stopColor={accent} stopOpacity="0.55" />
              <stop offset="100%" stopColor={bg} stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="100" height="150" fill={bg} />
          {[12, 28, 45, 62, 78, 88].map((x, i) => (
            <circle key={x} cx={x} cy={18 + (i % 3) * 12} r={0.8 + (i % 2) * 0.4} fill={accent} opacity="0.35" />
          ))}
          <ellipse cx="50" cy="55" rx="28" ry="32" fill="url(#l-glow)" />
          <g transform="translate(50 48)">
            <rect x="-10" y="-22" width="20" height="6" rx="1" fill={accent} opacity="0.85" />
            <path d="M-8 -16 L-8 18 Q-8 26 0 28 Q8 26 8 18 L8 -16 Z" fill={accent} opacity="0.25" stroke={accent} strokeWidth="1" />
            <ellipse cx="0" cy="2" rx="5" ry="9" fill={accent} opacity="0.7" />
            <rect x="-12" y="28" width="24" height="3" fill={accent} opacity="0.6" />
            <line x1="0" y1="-28" x2="0" y2="-22" stroke={accent} strokeWidth="1.5" />
          </g>
          <path d="M0 120 Q40 105 70 118 T100 112 L100 150 L0 150 Z" fill="#0d0b09" opacity="0.5" />
        </g>
      );
    case "stars":
      return (
        <g>
          <defs>
            <linearGradient id="s-sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2a1a42" />
              <stop offset="100%" stopColor={bg} />
            </linearGradient>
          </defs>
          <rect width="100" height="90" fill="url(#s-sky)" />
          {[
            [18, 22, 1.2],
            [35, 14, 0.8],
            [52, 28, 1.5],
            [70, 16, 1],
            [85, 30, 0.7],
            [25, 40, 0.6],
            [60, 42, 1.1],
            [78, 48, 0.9],
            [42, 52, 0.5],
          ].map(([x, y, r], i) => (
            <circle key={i} cx={x} cy={y} r={r} fill={accent} opacity={0.5 + (i % 3) * 0.15} />
          ))}
          <path
            d="M15 70 Q35 55 50 68 Q65 80 85 60"
            fill="none"
            stroke={accent}
            strokeWidth="0.6"
            opacity="0.35"
            strokeDasharray="2 3"
          />
          <g transform="translate(50 78)">
            <ellipse cx="0" cy="0" rx="18" ry="8" fill={accent} opacity="0.15" />
            <path
              d="M-8 -4 Q0 -18 8 -4 Q4 2 0 10 Q-4 2 -8 -4"
              fill={accent}
              opacity="0.85"
            />
            <circle cx="0" cy="-2" r="3" fill={bg} opacity="0.4" />
          </g>
          <path d="M0 115 Q50 100 100 118 L100 150 L0 150 Z" fill="#241832" opacity="0.6" />
        </g>
      );
    case "lunch":
      return (
        <g>
          <circle cx="78" cy="28" r="18" fill="#e8b84a" opacity="0.35" />
          <circle cx="78" cy="28" r="12" fill="#f0c95a" opacity="0.5" />
          <g transform="translate(50 55)">
            <rect x="-28" y="-8" width="56" height="36" rx="4" fill={accent} opacity="0.2" stroke={accent} strokeWidth="1.2" />
            <rect x="-24" y="-14" width="48" height="10" rx="2" fill={accent} opacity="0.75" />
            <rect x="-18" y="2" width="16" height="12" rx="1.5" fill={accent} opacity="0.45" />
            <rect x="4" y="2" width="16" height="12" rx="1.5" fill={bg} opacity="0.35" stroke={accent} strokeWidth="0.8" />
            <circle cx="-10" cy="8" r="2" fill={bg} opacity="0.5" />
          </g>
          <path d="M8 100 Q20 92 28 100 Q36 108 48 98" fill="none" stroke={accent} strokeWidth="1.5" opacity="0.4" strokeLinecap="round" />
          <path d="M55 105 Q68 95 78 104" fill="none" stroke={accent} strokeWidth="1.2" opacity="0.3" strokeLinecap="round" />
        </g>
      );
    case "club":
      return (
        <g>
          <rect x="8" y="12" width="84" height="70" fill="#3d1a24" opacity="0.4" />
          <line x1="8" y1="30" x2="92" y2="30" stroke={accent} strokeWidth="0.5" opacity="0.3" />
          <line x1="8" y1="48" x2="92" y2="48" stroke={accent} strokeWidth="0.5" opacity="0.3" />
          <line x1="8" y1="66" x2="92" y2="66" stroke={accent} strokeWidth="0.5" opacity="0.3" />
          <g opacity="0.85">
            <rect x="18" y="38" width="20" height="14" rx="1" fill="none" stroke={accent} strokeWidth="1" />
            <rect x="40" y="48" width="20" height="14" rx="1" fill="none" stroke={accent} strokeWidth="1" />
            <rect x="62" y="58" width="20" height="14" rx="1" fill={accent} opacity="0.25" stroke={accent} strokeWidth="1" />
          </g>
          <circle cx="28" cy="45" r="2" fill={accent} opacity="0.6" />
          <circle cx="50" cy="55" r="2" fill={accent} opacity="0.6" />
          <circle cx="72" cy="65" r="2" fill={accent} opacity="0.8" />
          <text x="50" y="28" textAnchor="middle" fill={accent} fontSize="5" opacity="0.5" letterSpacing="0.2em" fontFamily="Georgia, serif">
            12B
          </text>
        </g>
      );
    case "circuits":
      return (
        <g>
          <defs>
            <linearGradient id="st-sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0f2744" />
              <stop offset="100%" stopColor={bg} />
            </linearGradient>
          </defs>
          <rect width="100" height="85" fill="url(#st-sky)" />
          {[
            [20, 18],
            [40, 12],
            [55, 22],
            [75, 14],
            [88, 26],
            [30, 32],
            [65, 36],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={i % 2 ? 0.7 : 1.2} fill={accent} opacity="0.6" />
          ))}
          <g stroke={accent} strokeWidth="0.9" fill="none" opacity="0.7">
            <path d="M12 75 L28 75 L28 58 L48 58 L48 42" />
            <path d="M85 70 L70 70 L70 55 L55 55" />
            <circle cx="28" cy="75" r="2.5" fill={accent} stroke="none" />
            <circle cx="48" cy="42" r="2.5" fill={accent} stroke="none" />
            <circle cx="70" cy="70" r="2" fill={accent} stroke="none" opacity="0.5" />
          </g>
          <g transform="translate(50 88)" fill={accent}>
            <ellipse cx="0" cy="0" rx="22" ry="3" opacity="0.2" />
            <rect x="-14" y="-6" width="28" height="18" rx="2" opacity="0.15" stroke={accent} strokeWidth="0.8" fill="none" />
            <circle cx="-6" cy="2" r="2" opacity="0.7" />
            <circle cx="6" cy="2" r="2" opacity="0.7" />
          </g>
        </g>
      );
    case "letters":
      return (
        <g>
          <rect x="14" y="18" width="52" height="68" fill="#d4b896" opacity="0.25" transform="rotate(-6 40 52)" />
          <rect x="22" y="22" width="52" height="68" fill="#e8d4b8" opacity="0.35" stroke={accent} strokeWidth="0.6" transform="rotate(3 48 56)" />
          <g fill={accent} opacity="0.55" fontFamily="Georgia, serif" fontSize="6">
            <text x="30" y="42">
              Dear Thomas,
            </text>
            <line x1="30" y1="50" x2="68" y2="50" stroke={accent} strokeWidth="0.4" opacity="0.4" />
            <line x1="30" y1="58" x2="64" y2="58" stroke={accent} strokeWidth="0.4" opacity="0.35" />
            <line x1="30" y1="66" x2="60" y2="66" stroke={accent} strokeWidth="0.4" opacity="0.3" />
            <text x="30" y="80" fontSize="5" opacity="0.7">
              — Ruth
            </text>
          </g>
          <path d="M70 95 Q82 88 88 98" fill="none" stroke={accent} strokeWidth="0.8" opacity="0.4" />
          <rect x="74" y="100" width="14" height="10" fill={accent} opacity="0.2" stroke={accent} strokeWidth="0.5" />
        </g>
      );
    case "leaves":
      return (
        <g>
          <defs>
            <linearGradient id="lv-fade" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#3a4555" />
              <stop offset="100%" stopColor={bg} />
            </linearGradient>
          </defs>
          <rect width="100" height="100" fill="url(#lv-fade)" />
          <g fill={accent}>
            <ellipse cx="22" cy="30" rx="10" ry="4.5" transform="rotate(-35 22 30)" opacity="0.55" />
            <ellipse cx="38" cy="42" rx="12" ry="5" transform="rotate(15 38 42)" opacity="0.4" />
            <ellipse cx="72" cy="28" rx="11" ry="4.5" transform="rotate(40 72 28)" opacity="0.5" />
            <ellipse cx="80" cy="48" rx="9" ry="4" transform="rotate(-20 80 48)" opacity="0.35" />
            <ellipse cx="55" cy="55" rx="8" ry="3.5" transform="rotate(5 55 55)" opacity="0.45" />
          </g>
          <path d="M30 70 L50 55 L70 72" fill="none" stroke={accent} strokeWidth="1" opacity="0.4" />
          <circle cx="50" cy="55" r="3" fill="none" stroke={accent} strokeWidth="1" opacity="0.6" />
          <text x="50" y="85" textAnchor="middle" fill={accent} fontSize="8" opacity="0.3" fontFamily="Georgia, serif">
            5
          </text>
        </g>
      );
    default:
      return null;
  }
}

export function BookCover({
  title,
  author,
  cover,
  size = "md",
  className = "",
}: BookCoverProps) {
  const lines = wrapTitle(title);
  const titleStartY = 108 - (lines.length - 1) * 5;

  return (
    <div
      className={`book-cover relative aspect-[2/3] overflow-hidden shadow-[6px_10px_28px_rgba(26,22,18,0.28)] transition-transform duration-500 ease-out ${sizeClasses[size]} ${className}`}
      role="img"
      aria-label={`Book cover: ${title} by ${author}`}
    >
      <svg
        viewBox="0 0 100 150"
        className="h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="100" height="150" fill={cover.background} />
        <CoverArt pattern={cover.pattern} accent={cover.accent} bg={cover.background} />

        {/* Spine edge */}
        <rect x="0" y="0" width="5" height="150" fill="rgba(0,0,0,0.2)" />
        <rect x="5" y="0" width="1.5" height="150" fill="rgba(255,255,255,0.08)" />

        {/* Title plate */}
        <rect
          x="10"
          y={titleStartY - 12}
          width="80"
          height={20 + lines.length * 6}
          fill="rgba(0,0,0,0.28)"
          rx="1"
        />

        {lines.map((line, i) => (
          <text
            key={line}
            x="50"
            y={titleStartY + i * 7}
            textAnchor="middle"
            fill={cover.accent}
            fontSize="6.5"
            fontFamily="Arcanite Slab, Georgia, serif"
            fontWeight="700"
            letterSpacing="0.04em"
          >
            {line}
          </text>
        ))}

        <line
          x1="28"
          y1={titleStartY + lines.length * 7 + 2}
          x2="72"
          y2={titleStartY + lines.length * 7 + 2}
          stroke={cover.accent}
          strokeWidth="0.4"
          opacity="0.5"
        />

        <text
          x="50"
          y={titleStartY + lines.length * 7 + 10}
          textAnchor="middle"
          fill={cover.accent}
          fontSize="4.5"
          fontFamily="Georgia, serif"
          opacity="0.85"
        >
          {author}
        </text>

        <text
          x="50"
          y="142"
          textAnchor="middle"
          fill={cover.accent}
          fontSize="3.5"
          fontFamily="Arcanite Slab, Georgia, serif"
          opacity="0.45"
          letterSpacing="0.2em"
        >
          HARBORLIGHT
        </text>
      </svg>
    </div>
  );
}
