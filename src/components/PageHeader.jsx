import { SlimeBlob } from './Icons'

export function PageHeader({ title, eyebrow = 'NICKELODEON', showSlime = true }) {
  return (
    <header className="page-header">
      <div className="page-header__inner">
        <p className="page-header__eyebrow">{eyebrow}</p>
        <h1 className="page-header__title">{title}</h1>
      </div>
      {showSlime ? <SlimeBlob className="page-header__slime" /> : null}
    </header>
  )
}
