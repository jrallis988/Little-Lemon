import type { ReactNode } from 'react'

type Props = {
  id: string
  kicker?: string
  title: string
  lead?: string
  children: ReactNode
  tight?: boolean
  wide?: boolean
}

export function Section({ id, kicker, title, lead, children, tight, wide }: Props) {
  return (
    <section className={`section${tight ? ' section--tight' : ''}`} id={id}>
      <div className={wide ? 'wrap wrap--wide' : 'wrap'}>
        <header className="section-head">
          {kicker ? <p className="kicker">{kicker}</p> : null}
          <h2 className="section-title">{title}</h2>
          {lead ? <p className="section-lead">{lead}</p> : null}
        </header>
        {children}
      </div>
    </section>
  )
}
