export function SlimeBlob({ className = '' }) {
  return (
    <svg
      className={`slime-blob ${className}`}
      viewBox="0 0 120 90"
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        d="M18 48c-6-14 4-34 22-38 11-3 18 4 28 2 12-2 24 8 28 20 5 14-2 30-16 36-10 5-18 1-28 4-14 4-28-6-34-24z"
      />
      <circle cx="46" cy="40" r="5" fill="#1a0a3e" />
      <circle cx="68" cy="38" r="5" fill="#1a0a3e" />
      <circle cx="47.5" cy="39" r="1.6" fill="#fff" />
      <circle cx="69.5" cy="37" r="1.6" fill="#fff" />
      <path
        d="M50 52c4 5 12 5 16 0"
        stroke="#1a0a3e"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}

export function NavIcon({ name, active }) {
  const stroke = active ? 'currentColor' : 'currentColor'
  const common = {
    width: 24,
    height: 24,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke,
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  }

  switch (name) {
    case 'home':
      return (
        <svg {...common}>
          <path d="M3 10.5 12 3l9 7.5" />
          <path d="M5 9.5V21h14V9.5" />
          {active ? <path d="M10 21v-7h4v7" fill="currentColor" stroke="none" /> : null}
        </svg>
      )
    case 'schedule':
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M3 10h18M8 3v4M16 3v4" />
        </svg>
      )
    case 'shows':
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M8 21h8M12 19v2" />
        </svg>
      )
    case 'stream':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M10 8.5v7l6-3.5-6-3.5z" fill="currentColor" stroke="none" />
        </svg>
      )
    case 'arcade':
      return (
        <svg {...common}>
          <rect x="6" y="8" width="12" height="10" rx="2" />
          <path d="M9 8V6a3 3 0 0 1 6 0v2M9 13h.01M15 13h.01M12 15h.01" />
        </svg>
      )
    case 'vault':
      return (
        <svg {...common}>
          <rect x="4" y="7" width="16" height="13" rx="2" />
          <path d="M8 7V5a4 4 0 0 1 8 0v2M12 12v3" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" />
        </svg>
      )
    default:
      return null
  }
}
