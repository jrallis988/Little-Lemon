import { varieties } from '../../data/brand';
import { CoffeeBag } from './CoffeeBag';

export function ShelfSystem() {
  return (
    <div className="shelf-system">
      <div className="shelf-promo panel-dark panel-pad" style={{ marginBottom: '1rem', maxWidth: 280 }}>
        <p className="kicker" style={{ color: '#B85A32' }}>
          This week
        </p>
        <p style={{ margin: 0, fontFamily: 'Syne, sans-serif', fontWeight: 700 }}>Buy 2 bags, save $4</p>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
          flexWrap: 'wrap',
          alignItems: 'flex-end',
          padding: '1.5rem 1rem 0.5rem',
          background: 'linear-gradient(180deg, #3A454D 0%, #2A343C 100%)',
          borderRadius: '2px 2px 0 0',
        }}
      >
        {varieties.map((v) => (
          <div key={v.id} style={{ textAlign: 'center' }}>
            <CoffeeBag variety={v} width={130} />
            <div
              style={{
                marginTop: '0.75rem',
                background: '#F3EFE8',
                color: '#162029',
                padding: '0.4rem 0.6rem',
                fontSize: '0.8rem',
                display: 'flex',
                justifyContent: 'space-between',
                gap: '1rem',
                fontFamily: 'IBM Plex Mono, monospace',
              }}
            >
              <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700 }}>{v.name}</span>
              <span>$18</span>
            </div>
            <p style={{ color: '#C8D0D4', fontSize: '0.75rem', margin: '0.4rem 0 0' }}>{v.notes[0]} · {v.roast}</p>
          </div>
        ))}
      </div>
      <div
        style={{
          background: '#C4B8A8',
          height: '14px',
          borderRadius: '0 0 2px 2px',
        }}
      />
      <p
        style={{
          marginTop: '0.75rem',
          fontFamily: 'IBM Plex Mono, monospace',
          fontSize: '0.72rem',
          letterSpacing: '0.14em',
          color: '#9AA6AE',
        }}
      >
        SPECIALTY · WHOLE BEAN · 12 OZ
      </p>
    </div>
  );
}

export function PosCounterCard() {
  return (
    <svg width="240" height="160" viewBox="0 0 240 160" role="img" aria-label="Counter card">
      <rect width="240" height="160" fill="#162029" />
      <rect x="0" y="0" width="8" height="160" fill="#B85A32" />
      <text x="24" y="40" fill="#5A9A97" fontFamily="IBM Plex Mono, monospace" fontSize="9" letterSpacing="0.2em">
        WINTER COLLECTION
      </text>
      <text x="24" y="78" fill="#F3EFE8" fontFamily="Syne, sans-serif" fontWeight="700" fontSize="22">
        GO SOMEWHERE
      </text>
      <text x="24" y="106" fill="#B85A32" fontFamily="Syne, sans-serif" fontWeight="700" fontSize="22">
        WARM.
      </text>
      <text x="24" y="136" fill="#9AA6AE" fontFamily="Figtree, sans-serif" fontSize="11">
        South · West · limited blends
      </text>
    </svg>
  );
}

export function PosWindowPoster() {
  return (
    <svg width="220" height="320" viewBox="0 0 220 320" role="img" aria-label="Window poster">
      <rect width="220" height="320" fill="#F3EFE8" />
      <rect y="0" width="220" height="90" fill="#6B3A4A" />
      <text x="20" y="40" fill="#F3EFE8" fontFamily="Syne, sans-serif" fontWeight="700" fontSize="18">
        GO SOMEWHERE
      </text>
      <text x="20" y="68" fill="#F3EFE8" fontFamily="Syne, sans-serif" fontWeight="700" fontSize="18">
        WARM.
      </text>
      <text x="20" y="140" fill="#162029" fontFamily="Figtree, sans-serif" fontSize="13">
        Winter coffee collection —
      </text>
      <text x="20" y="160" fill="#162029" fontFamily="Figtree, sans-serif" fontSize="13">
        darker roasts, richer cups,
      </text>
      <text x="20" y="180" fill="#162029" fontFamily="Figtree, sans-serif" fontSize="13">
        longer evenings.
      </text>
      <circle cx="170" cy="240" r="28" fill="none" stroke="#B85A32" strokeWidth="1.5" />
      <path d="M170 220 L173 238 L190 240 L173 242 L170 260 L167 242 L150 240 L167 238 Z" fill="#162029" />
      <text x="20" y="300" fill="#3D7A78" fontFamily="IBM Plex Mono, monospace" fontSize="10" letterSpacing="0.16em">
        ROAM COFFEE
      </text>
    </svg>
  );
}

export function PosMenuInsert() {
  return (
    <svg width="200" height="120" viewBox="0 0 200 120" role="img" aria-label="Menu insert">
      <rect width="200" height="120" fill="#F3EFE8" stroke="#162029" strokeWidth="1" />
      <text x="14" y="28" fill="#B85A32" fontFamily="IBM Plex Mono, monospace" fontSize="8" letterSpacing="0.18em">
        SEASONAL
      </text>
      <text x="14" y="54" fill="#162029" fontFamily="Syne, sans-serif" fontWeight="700" fontSize="14">
        Somewhere Warm Latte
      </text>
      <text x="14" y="76" fill="#162029" opacity="0.65" fontFamily="Figtree, sans-serif" fontSize="11">
        West espresso · oat · cinnamon
      </text>
      <text x="186" y="100" textAnchor="end" fill="#162029" fontFamily="IBM Plex Mono, monospace" fontSize="14">
        5.75
      </text>
    </svg>
  );
}

export function PosShelfSign() {
  return (
    <svg width="160" height="80" viewBox="0 0 160 80" role="img" aria-label="Shelf signage">
      <rect width="160" height="80" fill="#6B3A4A" />
      <text x="12" y="32" fill="#F3EFE8" fontFamily="Syne, sans-serif" fontWeight="700" fontSize="13">
        WINTER PICK
      </text>
      <text x="12" y="54" fill="#F3EFE8" opacity="0.8" fontFamily="Figtree, sans-serif" fontSize="11">
        South Dark Roast
      </text>
    </svg>
  );
}

export function PosTakeawayCard() {
  return (
    <svg width="180" height="110" viewBox="0 0 180 110" role="img" aria-label="Takeaway card">
      <rect width="180" height="110" fill="#162029" />
      <text x="14" y="30" fill="#5A9A97" fontFamily="IBM Plex Mono, monospace" fontSize="8" letterSpacing="0.16em">
        ROAM
      </text>
      <text x="14" y="56" fill="#F3EFE8" fontFamily="Syne, sans-serif" fontWeight="700" fontSize="15">
        Go somewhere warm.
      </text>
      <text x="14" y="82" fill="#9AA6AE" fontFamily="Figtree, sans-serif" fontSize="10">
        Show this card for 10% off a bag.
      </text>
    </svg>
  );
}

export function PosLargePoster() {
  return (
    <svg width="280" height="400" viewBox="0 0 280 400" role="img" aria-label="Large format poster">
      <defs>
        <linearGradient id="warmGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6B3A4A" />
          <stop offset="55%" stopColor="#162029" />
          <stop offset="100%" stopColor="#0F161C" />
        </linearGradient>
      </defs>
      <rect width="280" height="400" fill="url(#warmGrad)" />
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <line key={i} x1="0" y1={60 + i * 22} x2="280" y2={40 + i * 22} stroke="#B85A32" opacity={0.12 + i * 0.02} />
      ))}
      <text x="24" y="80" fill="#5A9A97" fontFamily="IBM Plex Mono, monospace" fontSize="10" letterSpacing="0.22em">
        WINTER 2026
      </text>
      <text x="24" y="160" fill="#F3EFE8" fontFamily="Syne, sans-serif" fontWeight="700" fontSize="36">
        GO
      </text>
      <text x="24" y="205" fill="#F3EFE8" fontFamily="Syne, sans-serif" fontWeight="700" fontSize="36">
        SOMEWHERE
      </text>
      <text x="24" y="250" fill="#B85A32" fontFamily="Syne, sans-serif" fontWeight="700" fontSize="36">
        WARM.
      </text>
      <text x="24" y="310" fill="#E8E4DC" opacity="0.75" fontFamily="Figtree, sans-serif" fontSize="13">
        A darker season of ROAM —
      </text>
      <text x="24" y="330" fill="#E8E4DC" opacity="0.75" fontFamily="Figtree, sans-serif" fontSize="13">
        South, West, and limited blends.
      </text>
      <text x="24" y="375" fill="#F3EFE8" fontFamily="Syne, sans-serif" fontWeight="700" fontSize="12" letterSpacing="0.24em">
        ROAM
      </text>
    </svg>
  );
}

export function RetailPoster({
  line,
  sub,
  tone = 'ink',
}: {
  line: string;
  sub: string;
  tone?: 'ink' | 'ember' | 'teal';
}) {
  const bg = tone === 'ember' ? '#B85A32' : tone === 'teal' ? '#3D7A78' : '#162029';
  return (
    <svg width="240" height="340" viewBox="0 0 240 340" role="img" aria-label={`Poster: ${line}`}>
      <rect width="240" height="340" fill={bg} />
      <rect x="16" y="16" width="208" height="308" fill="none" stroke="#F3EFE8" strokeWidth="1" opacity="0.35" />
      <text x="32" y="60" fill="#F3EFE8" opacity="0.6" fontFamily="IBM Plex Mono, monospace" fontSize="9" letterSpacing="0.2em">
        ROAM COFFEE
      </text>
      {line.split('\n').map((part, i) => (
        <text
          key={part}
          x="32"
          y={140 + i * 36}
          fill="#F3EFE8"
          fontFamily="Syne, sans-serif"
          fontWeight="700"
          fontSize="26"
        >
          {part}
        </text>
      ))}
      <text x="32" y="280" fill="#F3EFE8" opacity="0.75" fontFamily="Figtree, sans-serif" fontSize="12">
        {sub}
      </text>
      <circle cx="190" cy="290" r="16" fill="none" stroke="#F3EFE8" strokeWidth="1" opacity="0.5" />
      <path d="M190 278 L192 288 L202 290 L192 292 L190 302 L188 292 L178 290 L188 288 Z" fill="#F3EFE8" opacity="0.85" />
    </svg>
  );
}
