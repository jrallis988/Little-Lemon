import { audiences } from '../../data/content'

export function Audience() {
  return (
    <section className="section" id="audience">
      <div className="shell">
        <p className="section-kicker">02 — Audience</p>
        <h2 className="section-title">One brand. Three runner mindsets.</h2>
        <p className="section-lede">
          Messaging shifts by motivation — health, consistency, or competition —
          while the visual system and campaign line stay unmistakably PACE.
        </p>
        <div className="grid-3">
          {audiences.map((a) => (
            <article className="panel audience-card" key={a.id}>
              <h3 className="audience-name">{a.name}</h3>
              <p style={{ color: 'var(--muted)', marginBottom: '0.75rem' }}>
                {a.tagline}
              </p>
              <p>{a.description}</p>
              <div className="tag-row">
                {a.motivations.map((m) => (
                  <span className="tag" key={m}>
                    {m}
                  </span>
                ))}
              </div>
              <div className="msg-callout">
                <strong>Creative messaging</strong>
                {a.messaging}
              </div>
              <p style={{ marginTop: '0.85rem', fontSize: '0.9rem' }}>
                {a.creativeNote}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
