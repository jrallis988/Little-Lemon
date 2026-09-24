export function TravelMug({ width = 120 }: { width?: number }) {
  return (
    <svg width={width} height={width * 1.8} viewBox="0 0 160 290" role="img" aria-label="Travel mug">
      <rect x="40" y="20" width="80" height="18" rx="4" fill="#2A3640" />
      <rect x="35" y="38" width="90" height="220" rx="12" fill="#162029" />
      <rect x="35" y="38" width="90" height="40" fill="#1F2A34" />
      <text
        x="80"
        y="160"
        textAnchor="middle"
        fill="#F3EFE8"
        fontFamily="Syne, sans-serif"
        fontWeight="700"
        fontSize="14"
        letterSpacing="0.3em"
        transform="rotate(-90 80 160)"
      >
        ROAM
      </text>
      <circle cx="80" cy="230" r="10" fill="none" stroke="#B85A32" strokeWidth="1.2" />
    </svg>
  );
}

export function CeramicMug({ width = 160 }: { width?: number }) {
  return (
    <svg width={width} height={width * 0.85} viewBox="0 0 220 186" role="img" aria-label="Ceramic mug">
      <path d="M40 40 L160 40 L150 160 L50 160 Z" fill="#F3EFE8" stroke="#162029" strokeWidth="1.5" />
      <path d="M160 60 Q200 60 200 100 Q200 140 160 140" fill="none" stroke="#162029" strokeWidth="8" />
      <text
        x="100"
        y="110"
        textAnchor="middle"
        fill="#162029"
        fontFamily="Syne, sans-serif"
        fontWeight="700"
        fontSize="20"
        letterSpacing="0.18em"
      >
        ROAM
      </text>
      <text
        x="100"
        y="130"
        textAnchor="middle"
        fill="#3D7A78"
        fontFamily="Figtree, sans-serif"
        fontSize="9"
      >
        wherever you’re going
      </text>
    </svg>
  );
}

export function ToteBag({ width = 180 }: { width?: number }) {
  return (
    <svg width={width} height={width * 1.15} viewBox="0 0 220 250" role="img" aria-label="Tote bag">
      <path d="M40 70 L180 70 L190 230 L30 230 Z" fill="#E6E0D6" stroke="#162029" strokeWidth="1.5" />
      <path d="M70 70 Q70 20 110 20 Q150 20 150 70" fill="none" stroke="#162029" strokeWidth="4" />
      <circle cx="110" cy="130" r="28" fill="none" stroke="#162029" strokeWidth="1.5" />
      <path d="M110 108 L113 128 L132 130 L113 132 L110 152 L107 132 L88 130 L107 128 Z" fill="#B85A32" />
      <text
        x="110"
        y="190"
        textAnchor="middle"
        fill="#162029"
        fontFamily="Syne, sans-serif"
        fontWeight="700"
        fontSize="16"
        letterSpacing="0.24em"
      >
        ROAM
      </text>
    </svg>
  );
}

export function TShirt({ width = 180 }: { width?: number }) {
  return (
    <svg width={width} height={width * 1.1} viewBox="0 0 220 240" role="img" aria-label="T-shirt">
      <path
        d="M70 50 L50 70 L20 90 L40 110 L55 100 L55 220 L165 220 L165 100 L180 110 L200 90 L170 70 L150 50 Q110 70 70 50"
        fill="#1A232C"
        stroke="#2A3640"
        strokeWidth="1"
      />
      <text
        x="110"
        y="130"
        textAnchor="middle"
        fill="#F3EFE8"
        fontFamily="Syne, sans-serif"
        fontWeight="700"
        fontSize="18"
        letterSpacing="0.2em"
      >
        ROAM
      </text>
      <text
        x="110"
        y="152"
        textAnchor="middle"
        fill="#B85A32"
        fontFamily="IBM Plex Mono, monospace"
        fontSize="8"
        letterSpacing="0.1em"
      >
        START SOMEWHERE
      </text>
    </svg>
  );
}

export function Hat({ width = 180 }: { width?: number }) {
  return (
    <svg width={width} height={width * 0.7} viewBox="0 0 240 168" role="img" aria-label="Hat">
      <ellipse cx="120" cy="130" rx="100" ry="18" fill="#2A3640" />
      <path d="M50 120 Q50 40 120 40 Q190 40 190 120" fill="#162029" />
      <rect x="50" y="110" width="140" height="18" fill="#1F2A34" />
      <text
        x="120"
        y="100"
        textAnchor="middle"
        fill="#F3EFE8"
        fontFamily="Syne, sans-serif"
        fontWeight="700"
        fontSize="14"
        letterSpacing="0.28em"
      >
        ROAM
      </text>
      <rect x="100" y="108" width="40" height="3" fill="#B85A32" />
    </svg>
  );
}
