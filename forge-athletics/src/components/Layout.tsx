import { useEffect, useState, type ReactNode } from 'react'
import { brand } from '../brand/tokens'

const links = [
  { id: 'challenge', label: 'Challenge' },
  { id: 'insight', label: 'Insight' },
  { id: 'strategy', label: 'Strategy' },
  { id: 'idea', label: 'Idea' },
  { id: 'athlete', label: 'Athlete' },
  { id: 'logo', label: 'Logo' },
  { id: 'color', label: 'Color' },
  { id: 'type', label: 'Type' },
  { id: 'work-code', label: 'Work Code' },
  { id: 'photo', label: 'Photo' },
  { id: 'ad-1', label: 'Ads' },
  { id: 'ooh', label: 'OOH' },
  { id: 'social', label: 'Social' },
  { id: 'digital', label: 'Digital' },
  { id: 'physical', label: 'Physical' },
  { id: 'finale', label: 'Finale' },
  { id: 'system', label: 'System' },
  { id: 'deliverables', label: 'Files' },
  { id: 'book', label: 'Book' },
]

export function CaseNav() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 720) setOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <nav className={`case-nav ${open ? 'is-open' : ''}`} aria-label="Campaign case study sections">
      <a href="#top" className="case-nav-brand" onClick={() => setOpen(false)}>
        <span className="case-nav-mark">F</span>
        <span className="case-nav-name">{brand.name}</span>
      </a>
      <button
        type="button"
        className="case-nav-toggle"
        aria-expanded={open}
        aria-controls="case-nav-panel"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
        <span aria-hidden>{open ? '✕' : 'Menu'}</span>
      </button>
      <div id="case-nav-panel" className="case-nav-panel">
        <ul className="case-nav-list">
          {links.map((l) => (
            <li key={l.id}>
              <a href={`#${l.id}`} onClick={() => setOpen(false)}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a className="case-nav-back" href="../../index.html">
          ← Portfolio
        </a>
      </div>
    </nav>
  )
}

export function Section({
  id,
  kicker,
  title,
  children,
  className,
}: {
  id: string
  kicker?: string
  title: string
  children: ReactNode
  className?: string
}) {
  return (
    <section id={id} className={`case-section ${className ?? ''}`}>
      <header className="section-head">
        {kicker && <p className="section-kicker">{kicker}</p>}
        <h2 className="section-title">{title}</h2>
      </header>
      {children}
    </section>
  )
}

export function Prose({ children }: { children: ReactNode }) {
  return <div className="prose">{children}</div>
}
