import type { Poster as PosterData } from '../data/posters'

interface PosterProps {
  poster: PosterData
  onOpen?: (id: PosterData['id']) => void
  className?: string
  compact?: boolean
}

function Graphics({ id }: { id: PosterData['id'] }) {
  switch (id) {
    case 'hockey':
      return (
        <svg className="poster__graphics" viewBox="0 0 400 600" preserveAspectRatio="none" aria-hidden>
          <line x1="40" y1="520" x2="340" y2="160" stroke="rgba(126,184,201,0.55)" strokeWidth="1.5" />
          <line x1="60" y1="540" x2="360" y2="180" stroke="rgba(126,184,201,0.25)" strokeWidth="1" />
          <circle cx="320" cy="170" r="5" fill="#f7f6f3" />
          <path d="M20 480 H380" stroke="rgba(247,246,243,0.12)" strokeWidth="1" strokeDasharray="6 10" />
          <path d="M20 500 H380" stroke="rgba(247,246,243,0.08)" strokeWidth="1" />
        </svg>
      )
    case 'basketball':
      return (
        <svg className="poster__graphics" viewBox="0 0 400 600" preserveAspectRatio="none" aria-hidden>
          <rect x="70" y="40" width="260" height="520" fill="none" stroke="rgba(232,119,34,0.35)" strokeWidth="1" />
          <line x1="200" y1="40" x2="200" y2="560" stroke="rgba(232,119,34,0.25)" strokeWidth="1" />
          <path d="M70 300 H330" stroke="rgba(232,119,34,0.3)" strokeWidth="1" />
          <circle cx="200" cy="180" r="48" fill="none" stroke="rgba(247,246,243,0.2)" strokeWidth="1.5" />
        </svg>
      )
    case 'running':
      return (
        <svg className="poster__graphics" viewBox="0 0 400 600" preserveAspectRatio="none" aria-hidden>
          <line x1="0" y1="420" x2="400" y2="420" stroke="rgba(200,16,46,0.7)" strokeWidth="2" />
          <line x1="0" y1="450" x2="400" y2="450" stroke="rgba(247,246,243,0.25)" strokeWidth="1" />
          <line x1="0" y1="480" x2="400" y2="480" stroke="rgba(247,246,243,0.18)" strokeWidth="1" />
          <line x1="0" y1="510" x2="400" y2="510" stroke="rgba(247,246,243,0.12)" strokeWidth="1" />
          {[80, 160, 240, 320].map((x) => (
            <line key={x} x1={x} y1="410" x2={x} y2="430" stroke="rgba(247,246,243,0.5)" strokeWidth="2" />
          ))}
        </svg>
      )
    case 'soccer':
      return (
        <svg className="poster__graphics" viewBox="0 0 400 600" preserveAspectRatio="none" aria-hidden>
          <path
            d="M80 420 Q 200 280 340 140"
            fill="none"
            stroke="rgba(143,191,154,0.55)"
            strokeWidth="1.5"
            strokeDasharray="4 8"
          />
          <circle cx="340" cy="140" r="7" fill="none" stroke="#f7f6f3" strokeWidth="1.5" />
          <rect x="40" y="80" width="320" height="440" fill="none" stroke="rgba(247,246,243,0.12)" strokeWidth="1" />
          <line x1="40" y1="300" x2="360" y2="300" stroke="rgba(247,246,243,0.1)" strokeWidth="1" />
        </svg>
      )
    case 'tennis':
      return (
        <svg className="poster__graphics" viewBox="0 0 400 600" preserveAspectRatio="none" aria-hidden>
          <rect x="55" y="70" width="290" height="460" fill="none" stroke="rgba(212,225,87,0.35)" strokeWidth="1" />
          <line x1="200" y1="70" x2="200" y2="530" stroke="rgba(212,225,87,0.25)" strokeWidth="1" />
          <line x1="55" y1="300" x2="345" y2="300" stroke="rgba(247,246,243,0.2)" strokeWidth="1" />
          <circle cx="250" cy="220" r="6" fill="#f7f6f3" />
        </svg>
      )
    case 'snowboard':
      return (
        <svg className="poster__graphics" viewBox="0 0 400 600" preserveAspectRatio="none" aria-hidden>
          <line x1="40" y1="520" x2="200" y2="200" stroke="rgba(155,181,200,0.35)" strokeWidth="1" />
          <line x1="360" y1="520" x2="210" y2="200" stroke="rgba(155,181,200,0.2)" strokeWidth="1" />
          <path d="M30 540 Q 200 480 370 540" fill="none" stroke="rgba(247,246,243,0.15)" strokeWidth="1" />
        </svg>
      )
  }
}

export function Poster({ poster, onOpen, className = '' }: PosterProps) {
  return (
    <article
      className={`poster poster--${poster.id} ${className}`}
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
      <Graphics id={poster.id} />
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
    </article>
  )
}
