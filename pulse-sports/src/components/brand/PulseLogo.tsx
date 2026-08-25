type Props = {
  className?: string
  showWordmark?: boolean
  showTagline?: boolean
}

/** Placeholder identity mark — replace with final Illustrator exports. */
export function PulseMark({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 48" fill="none" aria-hidden="true">
      <path
        className="pulse-wave"
        d="M4 24 H28 L36 8 L48 40 L60 16 L68 24 H116"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
      <circle className="pulse-core" cx="48" cy="40" r="4" fill="var(--pulse-signal)" />
    </svg>
  )
}

export function PulseLogo({ className = '', showWordmark = true, showTagline = false }: Props) {
  return (
    <div className={`pulse-logo ${className}`.trim()}>
      <PulseMark className="pulse-logo__mark" />
      {showWordmark ? (
        <div className="pulse-logo__type">
          <span className="pulse-logo__word">PULSE</span>
          <span className="pulse-logo__sports">SPORTS</span>
        </div>
      ) : null}
      {showTagline ? <p className="pulse-logo__tag">FEEL EVERY SECOND.</p> : null}
    </div>
  )
}
