import type { CoffeeVariety } from '../../data/brand';

type Face = 'front' | 'back';

function Pattern({ variety }: { variety: CoffeeVariety }) {
  const c = variety.color;
  switch (variety.pattern) {
    case 'aurora':
      return (
        <g opacity="0.9">
          {[0, 1, 2, 3, 4].map((i) => (
            <path
              key={i}
              d={`M0 ${40 + i * 28} Q 80 ${20 + i * 18}, 160 ${45 + i * 26} T 320 ${38 + i * 24}`}
              stroke={c}
              strokeWidth="1.2"
              fill="none"
              opacity={0.35 + i * 0.08}
            />
          ))}
          <circle cx="240" cy="70" r="18" fill="none" stroke={c} strokeWidth="1" opacity="0.4" />
          <circle cx="240" cy="70" r="6" fill={c} opacity="0.5" />
        </g>
      );
    case 'dawn':
      return (
        <g>
          <path d="M20 160 Q160 40 300 160" fill="none" stroke={c} strokeWidth="1.4" opacity="0.45" />
          <path d="M40 170 Q160 70 280 170" fill="none" stroke={c} strokeWidth="1" opacity="0.3" />
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <line
              key={i}
              x1={50 + i * 35}
              y1="175"
              x2={70 + i * 35}
              y2="40"
              stroke={c}
              strokeWidth="0.8"
              opacity="0.22"
            />
          ))}
          <circle cx="160" cy="55" r="22" fill={c} opacity="0.18" />
        </g>
      );
    case 'ember':
      return (
        <g>
          {[0, 1, 2, 3, 4, 5].map((row) =>
            Array.from({ length: 5 }).map((_, col) => (
              <rect
                key={`${row}-${col}`}
                x={30 + col * 55 + (row % 2) * 18}
                y={30 + row * 28}
                width="28"
                height="10"
                rx="1"
                fill={c}
                opacity={0.12 + ((row + col) % 3) * 0.06}
              />
            )),
          )}
          <path
            d="M40 200 L160 50 L280 200"
            fill="none"
            stroke={c}
            strokeWidth="1.5"
            opacity="0.35"
          />
        </g>
      );
    case 'horizon':
      return (
        <g>
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <line
              key={i}
              x1="20"
              y1={50 + i * 18}
              x2="300"
              y2={50 + i * 18}
              stroke={c}
              strokeWidth={i === 3 ? 2 : 0.8}
              opacity={i === 3 ? 0.55 : 0.18}
            />
          ))}
          <circle cx="250" cy="104" r="28" fill="none" stroke={c} strokeWidth="1.2" opacity="0.45" />
          <path d="M40 180 Q100 120 160 160 T 280 140" fill="none" stroke={c} strokeWidth="1.4" opacity="0.4" />
        </g>
      );
    default:
      return null;
  }
}

function CardinalGlyph({ variety }: { variety: CoffeeVariety }) {
  const labels = { north: 'N', east: 'E', south: 'S', west: 'W' } as const;
  return (
    <g>
      <circle cx="160" cy="118" r="42" fill="none" stroke={variety.color} strokeWidth="1.5" opacity="0.7" />
      <circle cx="160" cy="118" r="28" fill="none" stroke={variety.ink} strokeWidth="0.8" opacity="0.35" />
      <text
        x="160"
        y="128"
        textAnchor="middle"
        fill={variety.ink}
        fontFamily="Syne, system-ui, sans-serif"
        fontWeight="700"
        fontSize="36"
        letterSpacing="0.06em"
      >
        {labels[variety.id]}
      </text>
      <text x="160" y="78" textAnchor="middle" fill={variety.color} fontSize="9" fontFamily="IBM Plex Mono, monospace" letterSpacing="0.2em">
        N
      </text>
      <text x="198" y="122" textAnchor="middle" fill={variety.color} fontSize="9" fontFamily="IBM Plex Mono, monospace">
        E
      </text>
      <text x="160" y="168" textAnchor="middle" fill={variety.color} fontSize="9" fontFamily="IBM Plex Mono, monospace">
        S
      </text>
      <text x="122" y="122" textAnchor="middle" fill={variety.color} fontSize="9" fontFamily="IBM Plex Mono, monospace">
        W
      </text>
    </g>
  );
}

export function CoffeeBag({
  variety,
  face = 'front',
  width = 280,
}: {
  variety: CoffeeVariety;
  face?: Face;
  width?: number;
}) {
  const height = width * 1.55;
  const ink = variety.ink;

  if (face === 'back') {
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 320 496"
        role="img"
        aria-label={`${variety.name} coffee bag back`}
      >
        <rect width="320" height="496" fill={variety.colorSoft} />
        <rect x="0" y="0" width="320" height="8" fill={variety.color} />
        <rect x="0" y="488" width="320" height="8" fill={variety.color} />

        <text
          x="28"
          y="48"
          fill={ink}
          fontFamily="Syne, system-ui, sans-serif"
          fontWeight="700"
          fontSize="18"
          letterSpacing="0.2em"
        >
          ROAM
        </text>
        <text
          x="28"
          y="72"
          fill={variety.color}
          fontFamily="IBM Plex Mono, monospace"
          fontSize="10"
          letterSpacing="0.18em"
        >
          {variety.name} · {variety.roast.toUpperCase()}
        </text>

        <text x="28" y="110" fill={ink} fontFamily="Syne, sans-serif" fontWeight="700" fontSize="14" letterSpacing="0.12em">
          ORIGIN
        </text>
        <text x="28" y="132" fill={ink} fontFamily="Figtree, sans-serif" fontSize="15">
          {variety.origin}
        </text>
        <text x="28" y="152" fill={ink} opacity="0.7" fontFamily="Figtree, sans-serif" fontSize="12">
          {variety.altitude} · {variety.process}
        </text>

        <text x="28" y="190" fill={ink} fontFamily="Syne, sans-serif" fontWeight="700" fontSize="14" letterSpacing="0.12em">
          FLAVOR
        </text>
        <text x="28" y="212" fill={ink} fontFamily="Figtree, sans-serif" fontSize="15">
          {variety.notes.join('  ·  ')}
        </text>

        <text x="28" y="250" fill={ink} fontFamily="Syne, sans-serif" fontWeight="700" fontSize="14" letterSpacing="0.12em">
          BREW
        </text>
        <text x="28" y="272" fill={ink} fontFamily="Figtree, sans-serif" fontSize="14">
          {variety.brew}
        </text>

        <foreignObject x="28" y="295" width="264" height="70">
          <div
            style={{
              fontFamily: 'Figtree, sans-serif',
              fontSize: '12px',
              lineHeight: 1.45,
              color: ink,
              opacity: 0.85,
            }}
          >
            {variety.story}
          </div>
        </foreignObject>

        <rect x="28" y="380" width="120" height="48" fill="#fff" stroke={ink} strokeWidth="1" />
        <g fill={ink}>
          {Array.from({ length: 18 }).map((_, i) => (
            <rect key={i} x={34 + i * 6} y="388" width={i % 3 === 0 ? 3 : 2} height="32" />
          ))}
        </g>
        <text x="28" y="450" fill={ink} opacity="0.55" fontFamily="IBM Plex Mono, monospace" fontSize="9">
          UPC PLACEHOLDER · NET WT {variety.weight}
        </text>
        <text x="28" y="470" fill={ink} opacity="0.45" fontFamily="Figtree, sans-serif" fontSize="9">
          Roasted & packed by ROAM Coffee · Fictional portfolio
        </text>
      </svg>
    );
  }

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 320 496"
      role="img"
      aria-label={`${variety.name} coffee bag front`}
    >
      <defs>
        <linearGradient id={`bag-${variety.id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FBF8F3" />
          <stop offset="55%" stopColor={variety.colorSoft} />
          <stop offset="100%" stopColor={variety.colorSoft} />
        </linearGradient>
        <clipPath id={`bag-clip-${variety.id}`}>
          <rect x="0" y="0" width="320" height="496" rx="4" />
        </clipPath>
      </defs>

      <g clipPath={`url(#bag-clip-${variety.id})`}>
        <rect width="320" height="496" fill={`url(#bag-${variety.id})`} />

        {/* Seal strip */}
        <rect x="0" y="0" width="320" height="36" fill={variety.color} />
        <text
          x="160"
          y="23"
          textAnchor="middle"
          fill="#F3EFE8"
          fontFamily="IBM Plex Mono, monospace"
          fontSize="9"
          letterSpacing="0.28em"
        >
          WHOLE BEAN · SPECIALTY
        </text>

        {/* Brand */}
        <g transform="translate(24, 58)">
          <circle cx="14" cy="14" r="13" stroke={ink} strokeWidth="1.4" fill="none" />
          <path d="M14 3 L16 12 L25 14 L16 16 L14 25 L12 16 L3 14 L12 12 Z" fill={variety.color} />
          <text
            x="38"
            y="12"
            fill={ink}
            fontFamily="Syne, sans-serif"
            fontWeight="700"
            fontSize="16"
            letterSpacing="0.22em"
          >
            ROAM
          </text>
          <text
            x="38"
            y="26"
            fill={ink}
            opacity="0.55"
            fontFamily="Figtree, sans-serif"
            fontSize="8"
            letterSpacing="0.3em"
          >
            COFFEE
          </text>
        </g>

        <g transform="translate(0, 95)">
          <Pattern variety={variety} />
        </g>

        <CardinalGlyph variety={variety} />

        <text
          x="160"
          y="290"
          textAnchor="middle"
          fill={ink}
          fontFamily="Syne, sans-serif"
          fontWeight="700"
          fontSize="52"
          letterSpacing="0.14em"
        >
          {variety.name}
        </text>
        <text
          x="160"
          y="318"
          textAnchor="middle"
          fill={variety.color}
          fontFamily="IBM Plex Mono, monospace"
          fontSize="12"
          letterSpacing="0.22em"
        >
          {variety.roast.toUpperCase()}
        </text>

        <line x1="90" y1="340" x2="230" y2="340" stroke={ink} strokeWidth="0.8" opacity="0.25" />

        <text
          x="160"
          y="368"
          textAnchor="middle"
          fill={ink}
          fontFamily="Figtree, sans-serif"
          fontSize="14"
          letterSpacing="0.06em"
        >
          {variety.notes.join('  ·  ')}
        </text>

        <text
          x="160"
          y="400"
          textAnchor="middle"
          fill={ink}
          opacity="0.65"
          fontFamily="Figtree, sans-serif"
          fontSize="12"
        >
          {variety.origin}
        </text>

        <rect x="0" y="430" width="320" height="66" fill={ink} />
        <text
          x="28"
          y="458"
          fill="#F3EFE8"
          fontFamily="Syne, sans-serif"
          fontWeight="600"
          fontSize="11"
          letterSpacing="0.08em"
        >
          COFFEE FOR WHEREVER
        </text>
        <text
          x="28"
          y="476"
          fill="#F3EFE8"
          fontFamily="Syne, sans-serif"
          fontWeight="600"
          fontSize="11"
          letterSpacing="0.08em"
        >
          YOU’RE GOING.
        </text>
        <text
          x="292"
          y="468"
          textAnchor="end"
          fill="#F3EFE8"
          fontFamily="IBM Plex Mono, monospace"
          fontSize="11"
          letterSpacing="0.06em"
        >
          {variety.weight}
        </text>
      </g>
    </svg>
  );
}
