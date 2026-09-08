import type { ReactNode } from 'react'
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
]

export function CaseNav() {
  return (
    <nav className="case-nav" aria-label="Campaign case study sections">
      <a href="#top" className="case-nav-brand">
        <span className="case-nav-mark">F</span>
        <span className="case-nav-name">{brand.name}</span>
      </a>
      <ul className="case-nav-list">
        {links.map((l) => (
          <li key={l.id}>
            <a href={`#${l.id}`}>{l.label}</a>
          </li>
        ))}
      </ul>
      <a className="case-nav-back" href="../../index.html">
        ← Portfolio
      </a>
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
