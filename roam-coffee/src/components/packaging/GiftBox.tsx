import { varieties } from '../../data/brand';
import { CoffeeBag } from './CoffeeBag';

export function GiftBox({ view = 'exterior' }: { view?: 'exterior' | 'interior' | 'card' }) {
  if (view === 'card') {
    return (
      <svg width="320" height="200" viewBox="0 0 320 200" role="img" aria-label="Collection information card">
        <rect width="320" height="200" fill="#F3EFE8" stroke="#162029" strokeWidth="1.5" />
        <text x="24" y="40" fill="#162029" fontFamily="Syne, sans-serif" fontWeight="700" fontSize="18" letterSpacing="0.12em">
          THE ROAM COLLECTION
        </text>
        <text x="24" y="68" fill="#3D7A78" fontFamily="IBM Plex Mono, monospace" fontSize="10" letterSpacing="0.16em">
          FOUR COFFEES · FOUR REGIONS · ONE BOX
        </text>
        <line x1="24" y1="84" x2="296" y2="84" stroke="#162029" opacity="0.15" />
        {varieties.map((v, i) => (
          <g key={v.id}>
            <rect x={24 + i * 72} y="100" width="8" height="48" fill={v.color} />
            <text x={38 + i * 72} y="118" fill="#162029" fontFamily="Syne, sans-serif" fontWeight="700" fontSize="12">
              {v.name}
            </text>
            <text x={38 + i * 72} y="136" fill="#162029" opacity="0.6" fontFamily="Figtree, sans-serif" fontSize="9">
              {v.roast.split(' ')[0]}
            </text>
          </g>
        ))}
        <text x="24" y="180" fill="#162029" opacity="0.5" fontFamily="Figtree, sans-serif" fontSize="10">
          Coffee for wherever you’re going.
        </text>
      </svg>
    );
  }

  if (view === 'interior') {
    return (
      <svg width="480" height="320" viewBox="0 0 480 320" role="img" aria-label="Gift box interior">
        <rect width="480" height="320" fill="#2A3640" />
        <rect x="20" y="20" width="440" height="280" fill="#1A232C" stroke="#3D7A78" strokeWidth="1" />
        <text
          x="240"
          y="48"
          textAnchor="middle"
          fill="#F3EFE8"
          fontFamily="Syne, sans-serif"
          fontWeight="700"
          fontSize="14"
          letterSpacing="0.2em"
        >
          THE ROAM COLLECTION
        </text>
        {varieties.map((v, i) => (
          <g key={v.id} transform={`translate(${40 + i * 105}, 70)`}>
            <rect width="90" height="200" rx="4" fill={v.colorSoft} stroke={v.color} strokeWidth="2" />
            <rect y="0" width="90" height="16" fill={v.color} />
            <text
              x="45"
              y="110"
              textAnchor="middle"
              fill={v.ink}
              fontFamily="Syne, sans-serif"
              fontWeight="700"
              fontSize="16"
              letterSpacing="0.1em"
              transform="rotate(-90 45 110)"
            >
              {v.name}
            </text>
            <text x="45" y="185" textAnchor="middle" fill={v.ink} opacity="0.6" fontFamily="IBM Plex Mono, monospace" fontSize="8">
              4 oz
            </text>
          </g>
        ))}
      </svg>
    );
  }

  return (
    <svg width="420" height="300" viewBox="0 0 420 300" role="img" aria-label="Gift box exterior">
      <defs>
        <linearGradient id="boxFace" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1F2A34" />
          <stop offset="100%" stopColor="#162029" />
        </linearGradient>
      </defs>
      {/* Lid top */}
      <path d="M60 70 L210 20 L360 70 L210 120 Z" fill="#2A3640" stroke="#3D7A78" strokeWidth="1" />
      {/* Front */}
      <path d="M60 70 L210 120 L210 260 L60 210 Z" fill="url(#boxFace)" />
      {/* Side */}
      <path d="M210 120 L360 70 L360 210 L210 260 Z" fill="#0F161C" />

      <text
        x="135"
        y="160"
        textAnchor="middle"
        fill="#F3EFE8"
        fontFamily="Syne, sans-serif"
        fontWeight="700"
        fontSize="16"
        letterSpacing="0.18em"
        transform="skewY(18) translate(0,-40)"
      >
        ROAM
      </text>
      <text
        x="135"
        y="190"
        textAnchor="middle"
        fill="#B85A32"
        fontFamily="IBM Plex Mono, monospace"
        fontSize="8"
        letterSpacing="0.14em"
        transform="skewY(18) translate(0,-40)"
      >
        THE COLLECTION
      </text>

      {/* Color ticks on side */}
      {varieties.map((v, i) => (
        <rect key={v.id} x={280} y={130 + i * 18} width="40" height="8" fill={v.color} transform="skewY(-18) translate(40,40)" />
      ))}

      <text
        x="210"
        y="290"
        textAnchor="middle"
        fill="#9AA6AE"
        fontFamily="Figtree, sans-serif"
        fontSize="12"
      >
        Four coffees. Four regions. One box.
      </text>
    </svg>
  );
}

export function FamilyPresentation({ width = 900 }: { width?: number }) {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1.25rem',
        justifyContent: 'center',
        alignItems: 'flex-end',
        padding: '1rem 0',
      }}
    >
      {varieties.map((v, i) => (
        <div
          key={v.id}
          style={{
            transform: `translateY(${i % 2 === 0 ? 0 : 12}px)`,
            transition: 'transform 0.4s ease',
          }}
        >
          <CoffeeBag variety={v} width={Math.min(200, width / 5)} />
        </div>
      ))}
    </div>
  );
}
