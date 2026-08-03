import { cn } from "@/lib/cn";

type BadgeProps = {
  className?: string;
};

/**
 * U.S. News & World Report Best Children's Hospitals Honor Roll 2025–2026.
 * Brand-faithful SVG recreation for layout use pending authorized artwork.
 */
export function UsNewsHonorRollBadge({ className }: BadgeProps) {
  return (
    <svg
      viewBox="0 0 140 180"
      role="img"
      aria-label="U.S. News Best Children's Hospitals Honor Roll 2025-2026"
      className={cn("h-[88px] w-auto drop-shadow-md", className)}
    >
      <defs>
        <linearGradient id="usn-gold" x1="0.15" y1="0" x2="0.85" y2="1">
          <stop offset="0%" stopColor="#f6e7b2" />
          <stop offset="38%" stopColor="#e2c56a" />
          <stop offset="72%" stopColor="#c9a43a" />
          <stop offset="100%" stopColor="#b48b24" />
        </linearGradient>
        <linearGradient id="usn-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a4fa0" />
          <stop offset="100%" stopColor="#0f3a7a" />
        </linearGradient>
      </defs>

      {/* Shield */}
      <path
        d="M12 6h116c3.2 0 6 2.6 6 6v118c0 22-28 36-64 42C34 166 6 152 6 130V12c0-3.4 2.8-6 6-6z"
        fill="url(#usn-gold)"
        stroke="#ffffff"
        strokeWidth="3.5"
      />

      <text
        x="70"
        y="36"
        textAnchor="middle"
        fill="#2b2f38"
        fontFamily="var(--font-nunito), Arial, sans-serif"
        fontWeight="900"
        fontSize="22"
        letterSpacing="0.04em"
      >
        BEST
      </text>
      <text
        x="70"
        y="54"
        textAnchor="middle"
        fill="#2b2f38"
        fontFamily="var(--font-nunito), Arial, sans-serif"
        fontWeight="800"
        fontSize="13"
        letterSpacing="0.02em"
      >
        CHILDREN&apos;S
      </text>
      <text
        x="70"
        y="70"
        textAnchor="middle"
        fill="#2b2f38"
        fontFamily="var(--font-nunito), Arial, sans-serif"
        fontWeight="800"
        fontSize="13"
        letterSpacing="0.02em"
      >
        HOSPITALS
      </text>

      {/* Blue ribbon extending past shield edges */}
      <path
        d="M0 78h140v34H0z"
        fill="url(#usn-blue)"
      />
      <text
        x="70"
        y="93"
        textAnchor="middle"
        fill="#ffffff"
        fontFamily="var(--font-nunito), Arial, sans-serif"
        fontWeight="800"
        fontSize="11"
        letterSpacing="0.01em"
      >
        U.S. NEWS
      </text>
      <line
        x1="38"
        y1="98"
        x2="102"
        y2="98"
        stroke="#e30000"
        strokeWidth="2"
      />
      <text
        x="70"
        y="108"
        textAnchor="middle"
        fill="#ffffff"
        fontFamily="var(--font-nunito), Arial, sans-serif"
        fontWeight="600"
        fontSize="7"
        letterSpacing="0.08em"
      >
        &amp; WORLD REPORT
      </text>

      <text
        x="70"
        y="138"
        textAnchor="middle"
        fill="#2b2f38"
        fontFamily="var(--font-nunito), Arial, sans-serif"
        fontWeight="800"
        fontSize="12"
        letterSpacing="0.06em"
      >
        HONOR ROLL
      </text>
      <text
        x="70"
        y="158"
        textAnchor="middle"
        fill="#ffffff"
        fontFamily="var(--font-nunito), Arial, sans-serif"
        fontWeight="900"
        fontSize="14"
        letterSpacing="0.04em"
      >
        2025-2026
      </text>
    </svg>
  );
}

/**
 * Newsweek / Statista World's Best Specialized Hospitals 2026.
 * Brand-faithful SVG recreation for layout use pending authorized artwork.
 */
export function NewsweekBestBadge({ className }: BadgeProps) {
  return (
    <svg
      viewBox="0 0 130 180"
      role="img"
      aria-label="Newsweek World's Best Specialized Hospitals 2026"
      className={cn("h-[88px] w-auto drop-shadow-md", className)}
    >
      {/* Card with clipped bottom-right corner */}
      <path
        d="M6 6h118c3 0 6 3 6 6v128l-22 28H12c-3.3 0-6-2.7-6-6V12c0-3.3 2.7-6 6-6z"
        fill="#ffffff"
        stroke="#cfd3da"
        strokeWidth="2"
      />

      {/* Red star header */}
      <rect x="6" y="6" width="118" height="26" fill="#e10600" />
      <text
        x="65"
        y="24"
        textAnchor="middle"
        fill="#ffffff"
        fontSize="14"
        letterSpacing="0.22em"
      >
        ★ ★ ★ ★ ★
      </text>

      <text
        x="65"
        y="52"
        textAnchor="middle"
        fill="#111111"
        fontFamily="var(--font-nunito), Arial, sans-serif"
        fontWeight="900"
        fontSize="15"
        letterSpacing="0.02em"
      >
        WORLD&apos;S BEST
      </text>
      <text
        x="65"
        y="70"
        textAnchor="middle"
        fill="#111111"
        fontFamily="var(--font-nunito), Arial, sans-serif"
        fontWeight="900"
        fontSize="14"
        letterSpacing="0.04em"
      >
        SPECIALIZED
      </text>
      <text
        x="65"
        y="88"
        textAnchor="middle"
        fill="#111111"
        fontFamily="var(--font-nunito), Arial, sans-serif"
        fontWeight="900"
        fontSize="14"
        letterSpacing="0.04em"
      >
        HOSPITALS
      </text>
      <text
        x="65"
        y="106"
        textAnchor="middle"
        fill="#222222"
        fontFamily="var(--font-nunito), Arial, sans-serif"
        fontWeight="600"
        fontSize="13"
      >
        2026
      </text>

      <rect x="6" y="116" width="118" height="28" fill="#e10600" />
      <text
        x="65"
        y="135"
        textAnchor="middle"
        fill="#ffffff"
        fontFamily="Georgia, 'Times New Roman', Times, serif"
        fontWeight="700"
        fontSize="16"
      >
        Newsweek
      </text>
      <text
        x="102"
        y="128"
        fill="#ffffff"
        fontSize="7"
      >
        ®
      </text>

      <text
        x="65"
        y="158"
        textAnchor="middle"
        fill="#222222"
        fontFamily="var(--font-nunito), Arial, sans-serif"
        fontWeight="600"
        fontSize="7"
        letterSpacing="0.1em"
      >
        POWERED BY
      </text>
      <text
        x="54"
        y="172"
        textAnchor="middle"
        fill="#111111"
        fontFamily="var(--font-nunito), Arial, sans-serif"
        fontWeight="800"
        fontSize="12"
      >
        statista
      </text>
      {/* Statista mark */}
      <rect x="88" y="161" width="14" height="14" rx="1.5" fill="#111111" />
      <path
        d="M91 171c3-4 6-6 9-7"
        fill="none"
        stroke="#ffffff"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
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
