import { menuCategories } from '../../data/brand';

export function WallMenu({ width = 520 }: { width?: number }) {
  const h = width * 0.75;
  return (
    <svg width={width} height={h} viewBox="0 0 640 480" role="img" aria-label="Wall menu board">
      <rect width="640" height="480" fill="#162029" />
      <rect x="16" y="16" width="608" height="448" fill="none" stroke="#3D7A78" strokeWidth="1" />
      <text
        x="320"
        y="52"
        textAnchor="middle"
        fill="#F3EFE8"
        fontFamily="Syne, sans-serif"
        fontWeight="700"
        fontSize="22"
        letterSpacing="0.28em"
      >
        ROAM
      </text>
      <text
        x="320"
        y="74"
        textAnchor="middle"
        fill="#B85A32"
        fontFamily="IBM Plex Mono, monospace"
        fontSize="9"
        letterSpacing="0.2em"
      >
        MENU
      </text>

      {menuCategories.map((cat, ci) => {
        const col = ci % 3;
        const row = Math.floor(ci / 3);
        const x = 40 + col * 200;
        const y = 100 + row * 180;
        return (
          <g key={cat.id} transform={`translate(${x}, ${y})`}>
            <text fill="#5A9A97" fontFamily="IBM Plex Mono, monospace" fontSize="11" letterSpacing="0.2em">
              {cat.title}
            </text>
            {cat.items.slice(0, 4).map((item, ii) => (
              <g key={item.name}>
                <text y={28 + ii * 28} fill="#F3EFE8" fontFamily="Figtree, sans-serif" fontSize="14">
                  {item.name}
                </text>
                <text y={28 + ii * 28} x="150" textAnchor="end" fill="#F3EFE8" fontFamily="IBM Plex Mono, monospace" fontSize="13">
                  {item.price}
                </text>
              </g>
            ))}
          </g>
        );
      })}
    </svg>
  );
}

export function PrintedMenu() {
  return (
    <div
      className="panel panel-pad"
      style={{
        maxWidth: 420,
        margin: '0 auto',
        fontFamily: 'Figtree, system-ui, sans-serif',
        color: '#162029',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, letterSpacing: '0.28em', fontSize: '1.4rem' }}>
          ROAM
        </div>
        <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.7rem', letterSpacing: '0.18em', color: '#3D7A78', marginTop: '0.35rem' }}>
          COFFEE FOR WHEREVER YOU’RE GOING.
        </div>
      </div>
      {menuCategories.map((cat) => (
        <div key={cat.id} style={{ marginBottom: '1.35rem' }}>
          <div
            style={{
              fontFamily: 'IBM Plex Mono, monospace',
              fontSize: '0.72rem',
              letterSpacing: '0.2em',
              color: '#B85A32',
              marginBottom: '0.55rem',
              borderBottom: '1px solid rgba(22,32,41,0.12)',
              paddingBottom: '0.35rem',
            }}
          >
            {cat.title}
          </div>
          {cat.items.map((item) => (
            <div
              key={item.name}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr auto',
                gap: '0.5rem',
                marginBottom: '0.45rem',
                alignItems: 'baseline',
              }}
            >
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{item.name}</div>
                {item.detail ? (
                  <div style={{ fontSize: '0.8rem', opacity: 0.55 }}>{item.detail}</div>
                ) : null}
              </div>
              <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.9rem' }}>{item.price}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export function Storefront({ width = 640 }: { width?: number }) {
  return (
    <svg width={width} height={width * 0.55} viewBox="0 0 720 400" role="img" aria-label="ROAM storefront">
      <rect width="720" height="400" fill="#8FA3A8" />
      <rect y="280" width="720" height="120" fill="#5A656C" />
      {/* Building */}
      <rect x="80" y="60" width="560" height="240" fill="#E6E0D6" />
      <rect x="80" y="40" width="560" height="40" fill="#162029" />
      {/* Primary sign */}
      <rect x="200" y="48" width="320" height="28" fill="#162029" />
      <text
        x="360"
        y="68"
        textAnchor="middle"
        fill="#F3EFE8"
        fontFamily="Syne, sans-serif"
        fontWeight="700"
        fontSize="18"
        letterSpacing="0.32em"
      >
        ROAM
      </text>
      {/* Windows */}
      <rect x="110" y="110" width="200" height="160" fill="#1A2A32" />
      <rect x="410" y="110" width="200" height="160" fill="#1A2A32" />
      <text
        x="210"
        y="180"
        textAnchor="middle"
        fill="#F3EFE8"
        fontFamily="Syne, sans-serif"
        fontSize="14"
        letterSpacing="0.08em"
        opacity="0.85"
      >
        COFFEE FOR
      </text>
      <text
        x="210"
        y="202"
        textAnchor="middle"
        fill="#B85A32"
        fontFamily="Syne, sans-serif"
        fontSize="14"
        letterSpacing="0.08em"
      >
        WHEREVER
      </text>
      <text
        x="510"
        y="175"
        textAnchor="middle"
        fill="#5A9A97"
        fontFamily="IBM Plex Mono, monospace"
        fontSize="10"
        letterSpacing="0.12em"
      >
        OPEN DAILY
      </text>
      <text
        x="510"
        y="198"
        textAnchor="middle"
        fill="#F3EFE8"
        fontFamily="Figtree, sans-serif"
        fontSize="13"
      >
        7am — 6pm
      </text>
      {/* Door */}
      <rect x="330" y="140" width="60" height="130" fill="#2A3640" />
      <circle cx="375" cy="210" r="3" fill="#B85A32" />
      <text
        x="360"
        y="125"
        textAnchor="middle"
        fill="#162029"
        fontFamily="IBM Plex Mono, monospace"
        fontSize="8"
        letterSpacing="0.1em"
      >
        PULL
      </text>
      {/* Exterior menu board */}
      <rect x="600" y="160" width="70" height="100" fill="#162029" />
      <text x="635" y="185" textAnchor="middle" fill="#5A9A97" fontFamily="IBM Plex Mono, monospace" fontSize="7" letterSpacing="0.1em">
        TODAY
      </text>
      <text x="635" y="210" textAnchor="middle" fill="#F3EFE8" fontFamily="Figtree, sans-serif" fontSize="8">
        East
      </text>
      <text x="635" y="228" textAnchor="middle" fill="#F3EFE8" fontFamily="Figtree, sans-serif" fontSize="8">
        Batch
      </text>
      <text x="635" y="246" textAnchor="middle" fill="#B85A32" fontFamily="Figtree, sans-serif" fontSize="8">
        Warm
      </text>
    </svg>
  );
}

export function InteriorGraphics({ width = 640 }: { width?: number }) {
  return (
    <svg width={width} height={width * 0.5} viewBox="0 0 720 360" role="img" aria-label="Retail interior graphics">
      <rect width="720" height="360" fill="#2A3640" />
      {/* Wall */}
      <rect x="0" y="0" width="720" height="260" fill="#E6E0D6" />
      {/* Wall graphic */}
      <text
        x="40"
        y="80"
        fill="#162029"
        fontFamily="Syne, sans-serif"
        fontWeight="700"
        fontSize="28"
        letterSpacing="0.06em"
      >
        TAKE THE
      </text>
      <text
        x="40"
        y="118"
        fill="#B85A32"
        fontFamily="Syne, sans-serif"
        fontWeight="700"
        fontSize="28"
        letterSpacing="0.06em"
      >
        LONG WAY.
      </text>
      {/* Wayfinding */}
      <rect x="400" y="40" width="120" height="36" fill="#162029" />
      <text x="460" y="63" textAnchor="middle" fill="#F3EFE8" fontFamily="IBM Plex Mono, monospace" fontSize="11" letterSpacing="0.14em">
        ORDER →
      </text>
      <rect x="540" y="40" width="140" height="36" fill="#3D7A78" />
      <text x="610" y="63" textAnchor="middle" fill="#F3EFE8" fontFamily="IBM Plex Mono, monospace" fontSize="11" letterSpacing="0.14em">
        PICKUP →
      </text>
      {/* Shelf strip */}
      <rect x="40" y="180" width="640" height="60" fill="#162029" />
      <text x="60" y="215" fill="#F3EFE8" fontFamily="Syne, sans-serif" fontWeight="700" fontSize="14" letterSpacing="0.16em">
        WHOLE BEAN
      </text>
      <text x="220" y="215" fill="#5A9A97" fontFamily="Figtree, sans-serif" fontSize="12">
        North · East · South · West
      </text>
      {/* Counter */}
      <rect y="260" width="720" height="100" fill="#1A232C" />
      <rect x="280" y="280" width="160" height="50" fill="#F3EFE8" />
      <text x="360" y="310" textAnchor="middle" fill="#162029" fontFamily="Syne, sans-serif" fontWeight="700" fontSize="12" letterSpacing="0.2em">
        PICKUP
      </text>
    </svg>
  );
}
