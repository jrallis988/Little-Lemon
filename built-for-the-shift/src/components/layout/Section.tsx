import type { ReactNode } from 'react'

type Props = {
  id: string
  kicker?: string
  title: string
  lead?: string
  children: ReactNode
  dark?: boolean
  panel?: boolean
  tight?: boolean
  wide?: boolean
}

export function Section({ id, kicker, title, lead, children, dark, panel, tight, wide }: Props) {
  const tone = panel ? ' section--panel' : dark ? ' section--dark' : ''
  return (
    <section className={`section${tone}${tight ? ' section--tight' : ''}`} id={id}>
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
