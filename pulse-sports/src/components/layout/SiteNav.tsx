import { caseNav } from '../../data/content'

export function SiteNav() {
  return (
    <header className="site-nav">
      <a className="site-nav__brand" href="#top">
        <span>PULSE</span>
        <span>SPORTS</span>
      </a>
      <nav className="site-nav__links" aria-label="Case study">
        {caseNav.map((item) => (
          <a key={item.id} href={`#${item.id}`}>
            {item.label}
          </a>
        ))}
      </nav>
      <a className="site-nav__back" href="../../index.html">
        ← Portfolio
      </a>
    </header>
  )
}
