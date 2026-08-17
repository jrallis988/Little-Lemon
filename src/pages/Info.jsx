import { Navigate } from 'react-router-dom'
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
    </div>
  )
}
