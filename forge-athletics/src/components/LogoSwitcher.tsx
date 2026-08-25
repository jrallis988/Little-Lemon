import { useState } from 'react'
import { ForgeLogo, type LogoVariant } from '../brand/logo'

const variants: { id: LogoVariant; label: string }[] = [
  { id: 'horizontal', label: 'Primary / Horizontal' },
  { id: 'vertical', label: 'Vertical' },
  { id: 'secondary', label: 'Secondary' },
  { id: 'wordmark', label: 'Wordmark' },
  { id: 'symbol', label: 'Symbol' },
  { id: 'oneColor', label: 'One-color' },
  { id: 'reversed', label: 'Reversed' },
  { id: 'small', label: 'Small-size' },
]

export function LogoSwitcher() {
  const [active, setActive] = useState<LogoVariant>('horizontal')

  return (
    <div className="logo-switcher">
      <div className="logo-switcher-tabs" role="tablist" aria-label="Logo variants">
        {variants.map((v) => (
          <button
            key={v.id}
            role="tab"
            aria-selected={active === v.id}
            className={active === v.id ? 'is-active' : ''}
            onClick={() => setActive(v.id)}
            type="button"
          >
            {v.label}
          </button>
        ))}
      </div>
      <div
        className={`logo-switcher-stage ${active === 'reversed' ? 'is-dark' : ''}`}
        role="tabpanel"
      >
        <ForgeLogo variant={active} className="logo-switcher-mark" />
      </div>
    </div>
  )
}
