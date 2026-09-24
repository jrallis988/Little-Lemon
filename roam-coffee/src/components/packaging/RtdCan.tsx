import type { RtdProduct } from '../../data/brand';

export function RtdCan({
  product,
  face = 'front',
  width = 160,
}: {
  product: RtdProduct;
  face?: 'front' | 'back';
  width?: number;
}) {
  const height = width * 2.2;
  const ink = '#F3EFE8';

  if (face === 'back') {
    return (
      <svg width={width} height={height} viewBox="0 0 200 440" role="img" aria-label={`${product.name} can back`}>
        <defs>
          <linearGradient id={`can-back-${product.id}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#0E1418" />
            <stop offset="15%" stopColor={product.color} />
            <stop offset="85%" stopColor={product.color} />
            <stop offset="100%" stopColor="#0E1418" />
          </linearGradient>
        </defs>
        <rect x="20" y="10" width="160" height="420" rx="18" fill={`url(#can-back-${product.id})`} />
        <rect x="20" y="10" width="160" height="24" rx="12" fill="#2A3640" />
        <text x="100" y="70" textAnchor="middle" fill={ink} fontFamily="Syne, sans-serif" fontWeight="700" fontSize="14" letterSpacing="0.2em">
          ROAM
        </text>
        <text x="40" y="110" fill={ink} fontFamily="Syne, sans-serif" fontSize="11" letterSpacing="0.12em">
          NUTRITION
        </text>
        <text x="40" y="135" fill={ink} opacity="0.85" fontFamily="Figtree, sans-serif" fontSize="12">
          Serving size {product.size}
        </text>
        <text x="40" y="155" fill={ink} opacity="0.85" fontFamily="Figtree, sans-serif" fontSize="12">
          Calories {product.calories}
        </text>
        <text x="40" y="175" fill={ink} opacity="0.85" fontFamily="Figtree, sans-serif" fontSize="12">
          Caffeine {product.caffeine}
        </text>
        <line x1="40" y1="195" x2="160" y2="195" stroke={ink} opacity="0.25" />
        <text x="40" y="220" fill={ink} fontFamily="Syne, sans-serif" fontSize="11" letterSpacing="0.12em">
          INGREDIENTS
        </text>
        <foreignObject x="40" y="230" width="120" height="80">
          <div style={{ color: ink, fontFamily: 'Figtree, sans-serif', fontSize: '10px', lineHeight: 1.4, opacity: 0.8 }}>
            Cold brew coffee (water, coffee), {product.id === 'oat' ? 'oat milk,' : ''}{' '}
            {product.id === 'vanilla' ? 'natural vanilla flavor,' : ''} cane sugar (where applicable).
          </div>
        </foreignObject>
        <rect x="50" y="330" width="100" height="40" fill="#fff" />
        {Array.from({ length: 12 }).map((_, i) => (
          <rect key={i} x={56 + i * 7} y="336" width="3" height="28" fill="#162029" />
        ))}
        <text x="100" y="400" textAnchor="middle" fill={ink} opacity="0.5" fontFamily="IBM Plex Mono, monospace" fontSize="8">
          KEEP REFRIGERATED
        </text>
      </svg>
    );
  }

  return (
    <svg width={width} height={height} viewBox="0 0 200 440" role="img" aria-label={`${product.name} can front`}>
      <defs>
        <linearGradient id={`can-front-${product.id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#0E1418" />
          <stop offset="12%" stopColor={product.color} />
          <stop offset="88%" stopColor={product.color} />
          <stop offset="100%" stopColor="#0E1418" />
        </linearGradient>
      </defs>
      <rect x="20" y="10" width="160" height="420" rx="18" fill={`url(#can-front-${product.id})`} />
      <rect x="20" y="10" width="160" height="24" rx="12" fill="#2A3640" />
      <ellipse cx="100" cy="22" rx="40" ry="6" fill="#1A232C" opacity="0.5" />

      {/* Side stripe language — related to bags but distinct */}
      <rect x="28" y="50" width="4" height="340" fill="#B85A32" opacity="0.9" />
      {[0, 1, 2, 3, 4].map((i) => (
        <line
          key={i}
          x1="40"
          y1={80 + i * 16}
          x2="170"
          y2={80 + i * 16}
          stroke={ink}
          strokeWidth="0.6"
          opacity={0.15 + i * 0.03}
        />
      ))}

      <text
        x="100"
        y="160"
        textAnchor="middle"
        fill={ink}
        fontFamily="Syne, sans-serif"
        fontWeight="700"
        fontSize="18"
        letterSpacing="0.28em"
      >
        ROAM
      </text>
      <text
        x="100"
        y="185"
        textAnchor="middle"
        fill={ink}
        opacity="0.7"
        fontFamily="Figtree, sans-serif"
        fontSize="10"
        letterSpacing="0.2em"
      >
        COLD BREW
      </text>

      <text
        x="100"
        y="250"
        textAnchor="middle"
        fill={ink}
        fontFamily="Syne, sans-serif"
        fontWeight="700"
        fontSize="28"
        letterSpacing="0.08em"
      >
        {product.name}
      </text>
      <text
        x="100"
        y="278"
        textAnchor="middle"
        fill={ink}
        opacity="0.75"
        fontFamily="Figtree, sans-serif"
        fontSize="12"
      >
        {product.notes}
      </text>

      <circle cx="100" cy="330" r="22" fill="none" stroke={ink} strokeWidth="1.2" opacity="0.6" />
      <path d="M100 314 L102.5 328 L116 330 L102.5 332 L100 346 L97.5 332 L84 330 L97.5 328 Z" fill="#B85A32" />

      <text
        x="100"
        y="390"
        textAnchor="middle"
        fill={ink}
        opacity="0.55"
        fontFamily="IBM Plex Mono, monospace"
        fontSize="10"
        letterSpacing="0.1em"
      >
        {product.size}
      </text>
    </svg>
  );
}
