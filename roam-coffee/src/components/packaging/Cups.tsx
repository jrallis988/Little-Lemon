export function HotCup({ width = 140 }: { width?: number }) {
  const h = width * 1.55;
  return (
    <svg width={width} height={h} viewBox="0 0 200 310" role="img" aria-label="Hot cup">
      <path d="M35 50 L165 50 L150 290 L50 290 Z" fill="#F3EFE8" stroke="#162029" strokeWidth="1.5" />
      <path d="M30 50 Q100 35 170 50" fill="#E6E0D6" stroke="#162029" strokeWidth="1.5" />
      <ellipse cx="100" cy="50" rx="70" ry="12" fill="#1A232C" opacity="0.15" />
      {/* Brand low, not centered logo dump */}
      <text
        x="100"
        y="200"
        textAnchor="middle"
        fill="#162029"
        fontFamily="Syne, sans-serif"
        fontWeight="700"
        fontSize="22"
        letterSpacing="0.28em"
      >
        ROAM
      </text>
      <path d="M55 230 Q100 245 145 230" fill="none" stroke="#B85A32" strokeWidth="1.5" />
      <text
        x="100"
        y="260"
        textAnchor="middle"
        fill="#3D7A78"
        fontFamily="IBM Plex Mono, monospace"
        fontSize="8"
        letterSpacing="0.12em"
      >
        GO SOMEWHERE
      </text>
    </svg>
  );
}

export function ColdCup({ width = 140 }: { width?: number }) {
  const h = width * 1.7;
  return (
    <svg width={width} height={h} viewBox="0 0 200 340" role="img" aria-label="Cold cup">
      <path d="M40 40 L160 40 L155 300 L45 300 Z" fill="#162029" />
      <rect x="40" y="40" width="120" height="20" fill="#2A3640" />
      <rect x="48" y="70" width="3" height="200" fill="#B85A32" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <line key={i} x1="60" y1={100 + i * 14} x2="150" y2={100 + i * 14} stroke="#F3EFE8" opacity="0.12" />
      ))}
      <text
        x="105"
        y="180"
        textAnchor="middle"
        fill="#F3EFE8"
        fontFamily="Syne, sans-serif"
        fontWeight="700"
        fontSize="16"
        letterSpacing="0.2em"
        transform="rotate(-90 105 180)"
      >
        COLD BREW
      </text>
      <circle cx="130" cy="260" r="16" fill="none" stroke="#3D7A78" strokeWidth="1.2" />
      <path d="M130 248 L132 258 L142 260 L132 262 L130 272 L128 262 L118 260 L128 258 Z" fill="#B85A32" />
    </svg>
  );
}

export function CupSleeve({ width = 180 }: { width?: number }) {
  return (
    <svg width={width} height={width * 0.45} viewBox="0 0 280 126" role="img" aria-label="Cup sleeve">
      <path d="M10 20 L270 20 L250 106 L30 106 Z" fill="#E6E0D6" stroke="#162029" strokeWidth="1.2" />
      <text
        x="140"
        y="58"
        textAnchor="middle"
        fill="#162029"
        fontFamily="Syne, sans-serif"
        fontWeight="700"
        fontSize="20"
        letterSpacing="0.24em"
      >
        ROAM
      </text>
      <text
        x="140"
        y="82"
        textAnchor="middle"
        fill="#B85A32"
        fontFamily="Figtree, sans-serif"
        fontSize="11"
      >
        Coffee for wherever you’re going.
      </text>
      {/* Texture lines */}
      {Array.from({ length: 12 }).map((_, i) => (
        <line key={i} x1={40 + i * 18} y1="96" x2={45 + i * 18} y2="104" stroke="#162029" opacity="0.15" />
      ))}
    </svg>
  );
}

export function TakeawayBag({ width = 160 }: { width?: number }) {
  return (
    <svg width={width} height={width * 1.2} viewBox="0 0 200 240" role="img" aria-label="Takeaway bag">
      <rect x="30" y="40" width="140" height="180" fill="#162029" />
      <rect x="30" y="40" width="140" height="8" fill="#2A3640" />
      <path d="M70 40 Q70 10 100 10 Q130 10 130 40" fill="none" stroke="#8FA3A8" strokeWidth="3" />
      <text
        x="100"
        y="130"
        textAnchor="middle"
        fill="#F3EFE8"
        fontFamily="Syne, sans-serif"
        fontWeight="700"
        fontSize="22"
        letterSpacing="0.2em"
      >
        ROAM
      </text>
      <rect x="70" y="150" width="60" height="3" fill="#B85A32" />
      <text
        x="100"
        y="180"
        textAnchor="middle"
        fill="#5A9A97"
        fontFamily="IBM Plex Mono, monospace"
        fontSize="8"
        letterSpacing="0.16em"
      >
        TAKE IT WITH YOU
      </text>
    </svg>
  );
}
