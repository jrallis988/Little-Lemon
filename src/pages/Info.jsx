import { Link, Navigate } from 'react-router-dom'
import { infoPages } from '../data/content'

export function Info({ slug }) {
  const page = infoPages[slug]
  if (!page) return <Navigate to="/" replace />

  return (
    <div className="section-page">
      <header className="section-hero section-hero--more">
        <p className="section-hero__eyebrow">{page.eyebrow}</p>
        <h1>{page.title}</h1>
        <p>{page.body}</p>
      </header>

      <div className="info-body">
        {(page.sections || []).map((section) => (
          <section key={section.heading} className="info-block">
            <h2>{section.heading}</h2>
            {section.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </section>
        ))}

        {page.links?.length ? (
          <nav className="info-links" aria-label="Related destinations">
            {page.links.map((link) => (
              <Link key={link.to} className="btn-nick" to={link.to}>
                {link.label}
              </Link>
            ))}
          </nav>
        ) : null}

        <p className="info-disclaimer">
          Unofficial fan redesign — not affiliated with Paramount or Nickelodeon.
        </p>
      </div>
    </div>
  )
}
