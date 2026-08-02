import { cn } from "@/lib/cn";

type BadgeProps = {
  className?: string;
};

/** Placeholder U.S. News Best Children's Hospitals Honor Roll 2025–2026 badge */
export function UsNewsHonorRollBadge({ className }: BadgeProps) {
  return (
    <svg
      viewBox="0 0 120 150"
      role="img"
      aria-label="U.S. News Best Children's Hospitals Honor Roll 2025-2026"
      className={cn("h-[88px] w-auto drop-shadow-md", className)}
    >
      <defs>
        <linearGradient id="usn-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f0d48a" />
          <stop offset="45%" stopColor="#d4a83a" />
          <stop offset="100%" stopColor="#b8891f" />
        </linearGradient>
      </defs>
      <path
        d="M8 4h104c2 0 4 2 4 4v108c0 18-22 30-56 34C26 146 4 134 4 116V8c0-2 2-4 4-4z"
        fill="url(#usn-gold)"
        stroke="#fff"
        strokeWidth="2"
      />
      <text
        x="60"
        y="34"
        textAnchor="middle"
        fill="#1a1d2e"
        fontFamily="var(--font-nunito), sans-serif"
        fontWeight="900"
        fontSize="18"
      >
        BEST
      </text>
      <text
        x="60"
        y="50"
        textAnchor="middle"
        fill="#1a1d2e"
        fontFamily="var(--font-nunito), sans-serif"
        fontWeight="800"
        fontSize="11"
      >
        CHILDREN&apos;S
      </text>
      <text
        x="60"
        y="64"
        textAnchor="middle"
        fill="#1a1d2e"
        fontFamily="var(--font-nunito), sans-serif"
        fontWeight="800"
        fontSize="11"
      >
        HOSPITALS
      </text>
      <rect x="6" y="72" width="108" height="28" fill="#003087" />
      <text
        x="60"
        y="85"
        textAnchor="middle"
        fill="#ffffff"
        fontFamily="var(--font-nunito), sans-serif"
        fontWeight="800"
        fontSize="9"
      >
        U.S. NEWS
      </text>
      <text
        x="60"
        y="95"
        textAnchor="middle"
        fill="#ffffff"
        fontFamily="var(--font-nunito), sans-serif"
        fontWeight="600"
        fontSize="6"
        letterSpacing="0.06em"
      >
        &amp; WORLD REPORT
      </text>
      <rect x="6" y="100" width="108" height="3" fill="#ffffff" />
      <rect x="6" y="103" width="108" height="4" fill="#e30000" />
      <text
        x="60"
        y="122"
        textAnchor="middle"
        fill="#1a1d2e"
        fontFamily="var(--font-nunito), sans-serif"
        fontWeight="800"
        fontSize="10"
        letterSpacing="0.04em"
      >
        HONOR ROLL
      </text>
      <text
        x="60"
        y="138"
        textAnchor="middle"
        fill="#ffffff"
        fontFamily="var(--font-nunito), sans-serif"
        fontWeight="900"
        fontSize="12"
      >
        2025-2026
      </text>
    </svg>
  );
}

/** Placeholder Newsweek World's Best Hospitals badge */
export function NewsweekBestBadge({ className }: BadgeProps) {
  return (
    <svg
      viewBox="0 0 110 150"
      role="img"
      aria-label="Newsweek World's Best Specialized Hospitals 2026"
      className={cn("h-[88px] w-auto drop-shadow-md", className)}
    >
      <path
        d="M4 4h94c4 0 8 4 8 8v118c0 2-1 4-3 5l-10 7H12c-4 0-8-4-8-8V12c0-4 4-8 8-8z"
        fill="#ffffff"
        stroke="#d0d4db"
        strokeWidth="2"
      />
      <rect x="4" y="4" width="102" height="24" fill="#e30000" />
      <text
        x="55"
        y="21"
        textAnchor="middle"
        fill="#ffffff"
        fontSize="12"
        letterSpacing="0.12em"
      >
        ★ ★ ★ ★ ★
      </text>
      <text
        x="55"
        y="50"
        textAnchor="middle"
        fill="#1a1d2e"
        fontFamily="var(--font-nunito), sans-serif"
        fontWeight="900"
        fontSize="13"
      >
        WORLD&apos;S
      </text>
      <text
        x="55"
        y="66"
        textAnchor="middle"
        fill="#1a1d2e"
        fontFamily="var(--font-nunito), sans-serif"
        fontWeight="900"
        fontSize="13"
      >
        BEST
      </text>
      <text
        x="55"
        y="82"
        textAnchor="middle"
        fill="#1a1d2e"
        fontFamily="var(--font-nunito), sans-serif"
        fontWeight="900"
        fontSize="12"
      >
        HOSPITALS
      </text>
      <rect x="4" y="92" width="102" height="24" fill="#e30000" />
      <text
        x="55"
        y="108"
        textAnchor="middle"
        fill="#ffffff"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontWeight="700"
        fontSize="14"
      >
        Newsweek
      </text>
      <text
        x="55"
        y="128"
        textAnchor="middle"
        fill="#1a1d2e"
        fontFamily="var(--font-nunito), sans-serif"
        fontWeight="600"
        fontSize="7"
        letterSpacing="0.08em"
      >
        POWERED BY
      </text>
      <text
        x="55"
        y="142"
        textAnchor="middle"
        fill="#1a1d2e"
        fontFamily="var(--font-nunito), sans-serif"
        fontWeight="800"
        fontSize="12"
      >
        statista
      </text>
    </svg>
  );
}

export function AwardBadgeRow({ className }: BadgeProps) {
  return (
    <div className={cn("flex flex-wrap items-end gap-s3", className)}>
      <UsNewsHonorRollBadge />
      <NewsweekBestBadge />
    </div>
  );
}
