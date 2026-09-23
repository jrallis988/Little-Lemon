const links = [
  { href: '#gallery', label: 'Creative' },
  { href: '#chapter-performance', label: 'Performance' },
  { href: '#chapter-reflection', label: 'Reflection' },
  { href: '#explorer', label: 'Explorer' },
]

export function CaseNav() {
  return (
    <header className="case-nav">
      <div className="case-nav-inner">
        <a className="case-nav-brand" href="#top">
          PACE <span>×</span> Spotify
        </a>
        <nav aria-label="Case study">
          <ul className="case-nav-links">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <a className="back-link" href="../index.html">
          ← Artistic Fountain
        </a>
      </div>
    </header>
  )
}
