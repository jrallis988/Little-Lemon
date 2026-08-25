import type { ReactNode } from 'react'
import { brand } from '../brand/tokens'

const links = [
  { id: 'challenge', label: 'Challenge' },
  { id: 'strategy', label: 'Strategy' },
  { id: 'logo', label: 'Logo' },
  { id: 'type', label: 'Type' },
  { id: 'color', label: 'Color' },
  { id: 'system', label: 'System' },
  { id: 'photo', label: 'Photo' },
  { id: 'standards', label: 'Standards' },
  { id: 'campaign', label: 'Campaign' },
  { id: 'applications', label: 'Apply' },
  { id: 'consistency', label: 'Consistency' },
]

export function CaseNav() {
  return (
    <nav className="case-nav" aria-label="Case study sections">
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
