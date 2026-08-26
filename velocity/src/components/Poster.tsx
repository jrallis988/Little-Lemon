import type { Poster as PosterData } from '../data/posters'

interface PosterProps {
  poster: PosterData
  onOpen?: (id: PosterData['id']) => void
  className?: string
  variant?: 'default' | 'aggressive'
}

function Graphics({ poster }: { poster: PosterData }) {
  const { id, dataMarks } = poster
  switch (id) {
    case 'hockey':
      return (
        <svg className="poster__graphics" viewBox="0 0 400 600" preserveAspectRatio="none" aria-hidden>
          <line x1="48" y1="510" x2="335" y2="155" stroke="rgba(126,184,201,0.7)" strokeWidth="1.75" />
          <line x1="62" y1="525" x2="350" y2="170" stroke="rgba(126,184,201,0.28)" strokeWidth="1" />
          <circle cx="48" cy="510" r="4" fill="#c8102e" />
          <circle cx="335" cy="155" r="6" fill="#f7f6f3" />
          <text x="292" y="148" fill="#7eb8c9" fontFamily="Bebas Neue, sans-serif" fontSize="14">
            {dataMarks[0].value}
          </text>
          <text x="292" y="162" fill="rgba(247,246,243,0.55)" fontFamily="Barlow Condensed, sans-serif" fontSize="8" letterSpacing="1">
            {dataMarks[1].value} RELEASE
          </text>
          <path d="M20 470 H380" stroke="rgba(247,246,243,0.14)" strokeWidth="1" strokeDasharray="4 8" />
          {/* registration marks */}
          <path d="M18 18 H34 M26 10 V26" stroke="rgba(247,246,243,0.35)" strokeWidth="1" />
          <path d="M366 574 H382 M374 566 V582" stroke="rgba(247,246,243,0.35)" strokeWidth="1" />
        </svg>
      )
    case 'basketball':
      return (
        <svg className="poster__graphics" viewBox="0 0 400 600" preserveAspectRatio="none" aria-hidden>
          <rect x="78" y="36" width="244" height="528" fill="none" stroke="rgba(232,119,34,0.4)" strokeWidth="1" />
          <line x1="200" y1="36" x2="200" y2="564" stroke="rgba(232,119,34,0.28)" strokeWidth="1" />
          {/* height measure */}
          <line x1="340" y1="480" x2="340" y2="120" stroke="#e87722" strokeWidth="2" />
          <line x1="332" y1="120" x2="348" y2="120" stroke="#e87722" strokeWidth="2" />
          <line x1="332" y1="480" x2="348" y2="480" stroke="#e87722" strokeWidth="2" />
          <text
            x="352"
            y="300"
            fill="#e87722"
            fontFamily="Bebas Neue, sans-serif"
            fontSize="22"
            transform="rotate(90 352 300)"
          >
            {dataMarks[0].value} VERTICAL
          </text>
          <circle cx="200" cy="160" r="42" fill="none" stroke="rgba(247,246,243,0.22)" strokeWidth="1.5" />
          <text x="86" y="70" fill="rgba(247,246,243,0.5)" fontFamily="Barlow Condensed, sans-serif" fontSize="9" letterSpacing="1.5">
            APEX {dataMarks[1].value}
          </text>
        </svg>
      )
    case 'running':
      return (
        <svg className="poster__graphics" viewBox="0 0 400 600" preserveAspectRatio="none" aria-hidden>
          <line x1="0" y1="410" x2="400" y2="410" stroke="rgba(200,16,46,0.85)" strokeWidth="2.5" />
          <line x1="0" y1="440" x2="400" y2="440" stroke="rgba(247,246,243,0.28)" strokeWidth="1" />
          <line x1="0" y1="470" x2="400" y2="470" stroke="rgba(247,246,243,0.18)" strokeWidth="1" />
          <line x1="0" y1="500" x2="400" y2="500" stroke="rgba(247,246,243,0.12)" strokeWidth="1" />
          {[60, 120, 180, 240, 300, 360].map((x, i) => (
            <g key={x}>
              <line x1={x} y1="400" x2={x} y2="420" stroke="rgba(247,246,243,0.65)" strokeWidth="2" />
              <circle cx={x} cy="410" r="2.5" fill={i === 3 ? '#c8102e' : 'rgba(247,246,243,0.4)'} />
            </g>
          ))}
          <text x="14" y="392" fill="#c8102e" fontFamily="Bebas Neue, sans-serif" fontSize="18">
            {dataMarks[0].value}
          </text>
          <text x="14" y="545" fill="rgba(247,246,243,0.45)" fontFamily="Barlow Condensed, sans-serif" fontSize="9" letterSpacing="1.2">
            STRIDE {dataMarks[1].value} · CADENCE {dataMarks[2].value}
          </text>
        </svg>
      )
    case 'soccer':
      return (
        <svg className="poster__graphics" viewBox="0 0 400 600" preserveAspectRatio="none" aria-hidden>
          <path
            d="M70 450 Q 190 300 350 120"
            fill="none"
            stroke="rgba(143,191,154,0.65)"
            strokeWidth="1.75"
            strokeDasharray="5 7"
          />
          <circle cx="70" cy="450" r="5" fill="#c8102e" />
          <circle cx="350" cy="120" r="8" fill="none" stroke="#f7f6f3" strokeWidth="1.5" />
          {/* impact brackets */}
          <path d="M140 380 H170 V410" fill="none" stroke="#c8102e" strokeWidth="1.5" />
          <path d="M230 340 H200 V310" fill="none" stroke="#c8102e" strokeWidth="1.5" />
          <text x="250" y="145" fill="#8fbf9a" fontFamily="Bebas Neue, sans-serif" fontSize="16">
            {dataMarks[0].value}
          </text>
          <text x="250" y="160" fill="rgba(247,246,243,0.5)" fontFamily="Barlow Condensed, sans-serif" fontSize="8" letterSpacing="1">
            CONTACT {dataMarks[2].value}
          </text>
          <rect x="36" y="70" width="328" height="460" fill="none" stroke="rgba(247,246,243,0.1)" strokeWidth="1" />
        </svg>
      )
    case 'tennis':
      return (
        <svg className="poster__graphics" viewBox="0 0 400 600" preserveAspectRatio="none" aria-hidden>
          <rect x="50" y="64" width="300" height="472" fill="none" stroke="rgba(212,225,87,0.4)" strokeWidth="1" />
          <line x1="200" y1="64" x2="200" y2="536" stroke="rgba(212,225,87,0.25)" strokeWidth="1" />
          <line x1="50" y1="300" x2="350" y2="300" stroke="rgba(247,246,243,0.2)" strokeWidth="1" />
          {/* collision brackets */}
          <path d="M210 190 H250 V230" fill="none" stroke="#d4e157" strokeWidth="1.75" />
          <path d="M190 250 H150 V210" fill="none" stroke="#d4e157" strokeWidth="1.75" />
          <circle cx="220" cy="210" r="5" fill="#f7f6f3" />
          <text x="258" y="205" fill="#d4e157" fontFamily="Bebas Neue, sans-serif" fontSize="15">
            {dataMarks[0].value}
          </text>
          <text x="258" y="220" fill="rgba(247,246,243,0.5)" fontFamily="Barlow Condensed, sans-serif" fontSize="8" letterSpacing="1">
            ANGLE {dataMarks[1].value}
          </text>
        </svg>
      )
    case 'snowboard':
      return (
        <svg className="poster__graphics" viewBox="0 0 400 600" preserveAspectRatio="none" aria-hidden>
          <line x1="36" y1="530" x2="205" y2="170" stroke="rgba(155,181,200,0.4)" strokeWidth="1" />
          <line x1="364" y1="530" x2="215" y2="170" stroke="rgba(155,181,200,0.22)" strokeWidth="1" />
          {/* altitude measure */}
          <line x1="48" y1="500" x2="48" y2="180" stroke="rgba(155,181,200,0.55)" strokeWidth="1.5" strokeDasharray="3 5" />
          <text
            x="28"
            y="360"
            fill="#9bb5c8"
            fontFamily="Bebas Neue, sans-serif"
            fontSize="18"
            transform="rotate(-90 28 360)"
          >
            {dataMarks[0].value} AIR
          </text>
          <path d="M24 548 Q 200 490 376 548" fill="none" stroke="rgba(247,246,243,0.18)" strokeWidth="1" />
          <text x="260" y="90" fill="rgba(247,246,243,0.45)" fontFamily="Barlow Condensed, sans-serif" fontSize="9" letterSpacing="1.2">
            DROP {dataMarks[1].value} · GRADE {dataMarks[2].value}
          </text>
        </svg>
      )
  }
}

export function Poster({ poster, onOpen, className = '', variant = 'default' }: PosterProps) {
  return (
    <article
      className={`poster poster--${poster.id} poster--${variant} ${className}`}
      style={{ containerType: 'inline-size' }}
      role={onOpen ? 'button' : undefined}
      tabIndex={onOpen ? 0 : undefined}
      onClick={onOpen ? () => onOpen(poster.id) : undefined}
      onKeyDown={
        onOpen
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onOpen(poster.id)
              }
            }
          : undefined
      }
      aria-label={`${poster.sport} poster — ${poster.concept}`}
    >
      <img className="poster__photo" src={poster.image} alt="" />
      <div className="poster__veil" />
      <Graphics poster={poster} />
      <span className="poster__number" aria-hidden>
        {poster.number}
      </span>
      <div className="poster__type">
        <span className="poster__brand">VELOCITY</span>
        <h2 className="poster__concept">{poster.concept}</h2>
        <p className="poster__athlete">
          {poster.athlete} · {poster.location}
        </p>
        <div className="poster__stat-wrap">
          <p className="poster__stat">{poster.stat}</p>
          <p className="poster__stat-label">{poster.statLabel}</p>
        </div>
      </div>
      <div className="poster__grain" aria-hidden />
      {variant === 'aggressive' && <div className="poster__disrupt" aria-hidden />}
    </article>
  )
}
