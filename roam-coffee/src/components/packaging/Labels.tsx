/** Variable data labels — roast, origin, batch, date, flavor */

const labelBase = {
  fontFamily: 'Figtree, system-ui, sans-serif',
  ink: '#162029',
  paper: '#F3EFE8',
  accent: '#3D7A78',
};

export function LabelRoast({ roast = 'Medium Roast', color = '#C45B5B' }: { roast?: string; color?: string }) {
  return (
    <svg width="180" height="64" viewBox="0 0 180 64" role="img" aria-label="Roast label">
      <rect width="180" height="64" rx="2" fill={labelBase.paper} stroke={labelBase.ink} strokeWidth="1.2" />
      <rect x="0" y="0" width="8" height="64" fill={color} />
      <text x="20" y="24" fill={labelBase.accent} fontFamily="IBM Plex Mono, monospace" fontSize="9" letterSpacing="0.2em">
        ROAST
      </text>
      <text x="20" y="46" fill={labelBase.ink} fontFamily="Syne, sans-serif" fontWeight="700" fontSize="16">
        {roast}
      </text>
    </svg>
  );
}

export function LabelOrigin({ origin = 'Huila, Colombia' }: { origin?: string }) {
  return (
    <svg width="200" height="64" viewBox="0 0 200 64" role="img" aria-label="Origin label">
      <rect width="200" height="64" rx="2" fill={labelBase.paper} stroke={labelBase.ink} strokeWidth="1.2" />
      <circle cx="28" cy="32" r="12" fill="none" stroke="#B85A32" strokeWidth="1.5" />
      <path d="M28 22 L30 30 L38 32 L30 34 L28 42 L26 34 L18 32 L26 30 Z" fill="#B85A32" />
      <text x="52" y="24" fill={labelBase.accent} fontFamily="IBM Plex Mono, monospace" fontSize="9" letterSpacing="0.2em">
        ORIGIN
      </text>
      <text x="52" y="46" fill={labelBase.ink} fontFamily="Figtree, sans-serif" fontSize="14">
        {origin}
      </text>
    </svg>
  );
}

export function LabelBatch({ batch = 'RC-4821' }: { batch?: string }) {
  return (
    <svg width="140" height="64" viewBox="0 0 140 64" role="img" aria-label="Batch label">
      <rect width="140" height="64" rx="2" fill="#162029" />
      <text x="16" y="24" fill="#5A9A97" fontFamily="IBM Plex Mono, monospace" fontSize="9" letterSpacing="0.2em">
        BATCH
      </text>
      <text x="16" y="46" fill="#F3EFE8" fontFamily="IBM Plex Mono, monospace" fontSize="16" letterSpacing="0.08em">
        {batch}
      </text>
    </svg>
  );
}

export function LabelRoastDate({ date = '08.18.26' }: { date?: string }) {
  return (
    <svg width="140" height="64" viewBox="0 0 140 64" role="img" aria-label="Roast date label">
      <rect width="140" height="64" rx="2" fill={labelBase.paper} stroke={labelBase.ink} strokeWidth="1.2" />
      <text x="16" y="24" fill={labelBase.accent} fontFamily="IBM Plex Mono, monospace" fontSize="9" letterSpacing="0.16em">
        ROAST DATE
      </text>
      <text x="16" y="46" fill={labelBase.ink} fontFamily="Syne, sans-serif" fontWeight="700" fontSize="18">
        {date}
      </text>
    </svg>
  );
}

export function LabelFlavor({ notes = ['Caramel', 'Berry', 'Balanced'] }: { notes?: string[] }) {
  return (
    <svg width="220" height="64" viewBox="0 0 220 64" role="img" aria-label="Flavor notes label">
      <rect width="220" height="64" rx="2" fill={labelBase.paper} stroke={labelBase.ink} strokeWidth="1.2" />
      <text x="16" y="22" fill={labelBase.accent} fontFamily="IBM Plex Mono, monospace" fontSize="9" letterSpacing="0.2em">
        FLAVOR NOTES
      </text>
      <text x="16" y="46" fill={labelBase.ink} fontFamily="Figtree, sans-serif" fontSize="13">
        {notes.join('  ·  ')}
      </text>
    </svg>
  );
}

export function LabelSystemDemo() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'flex-start' }}>
      <LabelRoast roast="Light Roast" color="#4A7C8C" />
      <LabelRoast roast="Dark Roast" color="#6B3A4A" />
      <LabelOrigin origin="Yirgacheffe, Ethiopia" />
      <LabelOrigin origin="Antigua, Guatemala" />
      <LabelBatch batch="RC-1902" />
      <LabelBatch batch="RC-7740" />
      <LabelRoastDate date="08.02.26" />
      <LabelRoastDate date="08.21.26" />
      <LabelFlavor notes={['Bright', 'Citrus', 'Floral']} />
      <LabelFlavor notes={['Cocoa', 'Nutty', 'Rich']} />
    </div>
  );
}
