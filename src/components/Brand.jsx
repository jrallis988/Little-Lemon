export function NickSplat({ className = '', title = 'NICK' }) {
  return (
    <div className={`nick-splat ${className}`} aria-hidden={title ? undefined : true}>
      <svg viewBox="0 0 160 110" className="nick-splat__shape">
        <path
          fill="currentColor"
          d="M22 48c-8-18 6-42 28-46 14-3 24 6 38 3 16-3 34 10 40 28 7 20-4 42-24 50-12 5-22-1-34 4-18 7-38-8-48-39z"
        />
      </svg>
      <span className="nick-splat__text">{title}</span>
    </div>
  )
}

export function SlimeDrip({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 80 40" aria-hidden="true">
      <path
        fill="currentColor"
        d="M0 0h80v8c-6 0-8 10-14 10S56 4 48 4 40 18 32 18 24 6 16 6 8 20 0 18V0z"
      />
    </svg>
  )
}
