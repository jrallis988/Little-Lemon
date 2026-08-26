import type { ReactNode } from 'react'

export function Chapter({
  id,
  tone,
  kicker,
  title,
  children,
}: {
  id: string
  tone: 'light' | 'dark' | 'finale'
  kicker: string
  title: string
  children: ReactNode
}) {
  return (
    <div className={`chapter chapter-${tone}`} id={id}>
      <div className="chapter-banner">
        <div className="shell">
          <p className="section-kicker">{kicker}</p>
          <h2 className="chapter-title">{title}</h2>
        </div>
      </div>
      {children}
    </div>
  )
}
