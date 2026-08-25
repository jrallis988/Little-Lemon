const links = [
  { href: '#challenge', label: 'Challenge' },
  { href: '#strategy', label: 'Strategy' },
  { href: '#creative', label: 'Creative' },
  { href: '#performance', label: 'Performance' },
  { href: '#testing', label: 'A/B Tests' },
  { href: '#explorer', label: 'Explorer' },
  { href: '#optimize', label: 'Next' },
]

export function CaseNav() {
  return (
    <header className="case-nav">
      <div className="case-nav-inner">
        <a className="case-nav-brand" href="#top">
          PACE <span>×</span> Case Study
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
