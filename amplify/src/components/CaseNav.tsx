const LINKS = [
  { href: '#challenge', label: 'Challenge' },
  { href: '#identity', label: 'Identity' },
  { href: '#feed', label: 'Feed' },
  { href: '#artists', label: 'Artists' },
  { href: '#carousels', label: 'Carousels' },
  { href: '#stories', label: 'Stories' },
  { href: '#motion', label: 'Motion' },
  { href: '#engagement', label: 'Engage' },
  { href: '#calendar', label: 'Calendar' },
  { href: '#previewer', label: 'Previewer' },
  { href: '#performance', label: 'Performance' },
]

export function CaseNav() {
  return (
    <header className="case-nav">
      <a className="case-nav__brand" href="#top">
        AMPLIFY <span>×</span> Case Study
      </a>
      <nav className="case-nav__links" aria-label="Case study sections">
        {LINKS.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
      </nav>
      <a className="case-nav__back" href="../../index.html">
        ← Portfolio
      </a>
    </header>
  )
}
