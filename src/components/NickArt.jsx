/** Loud SVG badges — custom art language without stock emoji dependence */

const SHAPES = {
  blob: 'M32 6c10 0 22 4 26 14 5 12-2 24-8 32-6 8-16 12-26 10S6 52 4 40C2 26 10 8 22 6c3-1 7 0 10 0z',
  star: 'M32 4l7 18h19l-15 12 6 19-17-11-17 11 6-19L6 22h19z',
  shield: 'M32 4c14 6 24 8 24 22 0 18-12 30-24 34C20 56 8 44 8 26 8 12 18 10 32 4z',
  wave: 'M4 28c8-16 20-24 36-22 12 2 20 12 20 22S48 50 32 52 4 44 4 28z',
}

export function CharBadge({ id, color = '#ff6600', emoji = '★', size = 58, className = '' }) {
  const shape = pickShape(id)
  return (
    <svg
      className={`char-badge ${className}`}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={`cg-${id}`} cx="30%" cy="28%" r="70%">
          <stop offset="0%" stopColor="#fff" />
          <stop offset="55%" stopColor={color} />
          <stop offset="100%" stopColor="#111" stopOpacity="0.35" />
        </radialGradient>
      </defs>
      <path d={shape} fill={`url(#cg-${id})`} stroke="#111" strokeWidth="3" />
      <circle cx="22" cy="24" r="3.2" fill="#111" />
      <circle cx="40" cy="24" r="3.2" fill="#111" />
      <path
        d="M24 38c3 5 13 5 16 0"
        fill="none"
        stroke="#111"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
      <text x="32" y="56" textAnchor="middle" fontSize="12">
        {emoji}
      </text>
    </svg>
  )
}

export function GameCabinetArt({ accent = '#7CFF4A', emoji = '🎮', title = '' }) {
  return (
    <svg className="cabinet-art" viewBox="0 0 200 120" aria-hidden="true">
      <defs>
        <linearGradient id="cab-screen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.35" />
          <stop offset="40%" stopColor={accent} />
          <stop offset="100%" stopColor="#0a0a0a" />
        </linearGradient>
      </defs>
      <rect x="8" y="10" width="184" height="100" rx="14" fill="#111" stroke="#000" strokeWidth="3" />
      <rect x="18" y="20" width="164" height="70" rx="10" fill="url(#cab-screen)" stroke="#000" strokeWidth="2" />
      <circle cx="50" cy="95" r="7" fill={accent} stroke="#000" strokeWidth="2" />
      <circle cx="74" cy="95" r="7" fill="#ffe566" stroke="#000" strokeWidth="2" />
      <rect x="120" y="88" width="50" height="14" rx="7" fill="#ff6600" stroke="#000" strokeWidth="2" />
      <text x="100" y="62" textAnchor="middle" fontSize="28">
        {emoji}
      </text>
      {title ? (
        <text
          x="100"
          y="48"
          textAnchor="middle"
          fill="#fff"
          fontFamily="Fredoka, sans-serif"
          fontSize="11"
          fontWeight="700"
          style={{ paintOrder: 'stroke', stroke: '#000', strokeWidth: 3 }}
        >
          {title.length > 18 ? `${title.slice(0, 16)}…` : title}
        </text>
      ) : null}
    </svg>
  )
}

export function HeroMascot({ kind = 'jimmy' }) {
  if (kind === 'slime') {
    return (
      <svg className="hero-mascot" viewBox="0 0 160 140" aria-hidden="true">
        <path
          fill="#7CFF4A"
          stroke="#111"
          strokeWidth="4"
          d="M30 70c0-34 22-58 50-58s50 24 50 58c0 20-10 40-30 48-12 5-28 5-40 0-20-8-30-28-30-48z"
        />
        <circle cx="65" cy="62" r="8" fill="#111" />
        <circle cx="95" cy="62" r="8" fill="#111" />
        <path d="M60 88c10 12 30 12 40 0" fill="none" stroke="#111" strokeWidth="4" strokeLinecap="round" />
        <ellipse cx="48" cy="50" rx="8" ry="4" fill="#fff" opacity="0.5" />
      </svg>
    )
  }

  return (
    <svg className="hero-mascot" viewBox="0 0 180 150" aria-hidden="true">
      <ellipse cx="90" cy="130" rx="50" ry="10" fill="#000" opacity="0.2" />
      <circle cx="90" cy="78" r="48" fill="#7EC8FF" stroke="#111" strokeWidth="4" />
      <path d="M55 55c10-28 60-28 70 0" fill="#FFE566" stroke="#111" strokeWidth="3" />
      <circle cx="72" cy="78" r="7" fill="#111" />
      <circle cx="108" cy="78" r="7" fill="#111" />
      <path d="M70 100c8 10 32 10 40 0" fill="none" stroke="#111" strokeWidth="4" strokeLinecap="round" />
      <rect x="118" y="40" width="28" height="18" rx="4" fill="#ff6600" stroke="#111" strokeWidth="3" />
      <text x="90" y="128" textAnchor="middle" fontSize="22">
        🧠
      </text>
    </svg>
  )
}

export function ShowPoster({ title, tone, emoji = '📺' }) {
  return (
    <div className="show-poster" style={{ background: tone }} aria-hidden="true">
      <span className="show-poster__emoji">{emoji}</span>
      <span className="show-poster__shine" />
      <strong className="show-poster__label">{title.split(' ')[0]}</strong>
    </div>
  )
}

function pickShape(id = '') {
  if (/(avatar|danny|invader)/.test(id)) return SHAPES.shield
  if (/(spongebob|jimmy|timmy|loud)/.test(id)) return SHAPES.star
  if (/(drake|icarly|arnold)/.test(id)) return SHAPES.wave
  return SHAPES.blob
}
