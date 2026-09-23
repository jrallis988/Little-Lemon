const links = [
  { href: '#motion-language', label: 'Motion' },
  { href: '#posters', label: 'Posters' },
  { href: '#rule-breakers', label: 'Intensity' },
  { href: '#gallery', label: 'Gallery' },
]

export function CaseNav() {
  return (
    <nav className="case-nav" aria-label="Case study">
      <a className="case-nav__brand" href="#top">
        VELOCITY
      </a>
      <ul className="case-nav__links">
        {links.map((l) => (
          <li key={l.href}>
            <a href={l.href}>{l.label}</a>
          </li>
        ))}
      </ul>
      <a className="case-nav__back" href="/index.html">
        Artistic Fountain
      </a>
    </nav>
  )
}
