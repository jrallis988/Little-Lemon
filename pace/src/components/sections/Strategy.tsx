import { pillars, platformRoles } from '../../data/content'

export function Strategy() {
  return (
    <>
      <section className="section" id="strategy">
        <div className="shell">
          <p className="section-kicker">04 — Content pillars</p>
          <h2 className="section-title">Five pillars that keep the calendar balanced.</h2>
          <p className="section-lede">
            Product alone cannot carry a running brand. Training utility, human
            stories, culture, and community give FIND YOUR PACE room to breathe.
          </p>
          <div className="grid-5">
            {pillars.map((p) => (
              <article className="panel" key={p.id}>
                <h3>{p.name}</h3>
                <p>{p.description}</p>
                <ul className="pillar-examples">
                  {p.examples.map((ex) => (
                    <li key={ex}>{ex}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="platforms">
        <div className="shell">
          <p className="section-kicker">05 — Platform roles</p>
          <h2 className="section-title">Same strategy. Not the same content.</h2>
          <p className="section-lede">
            Copy-pasting one cut across Instagram, TikTok, and YouTube wastes the
            strengths of each surface.
          </p>
          <div className="grid-3">
            {platformRoles.map((p) => (
              <article className="panel" key={p.platform}>
                <h3>{p.platform}</h3>
                <p style={{ fontWeight: 700, marginBottom: '0.65rem' }}>
                  {p.purpose}
                </p>
                <p style={{ marginBottom: '0.75rem' }}>{p.role}</p>
                <div className="tag-row">
                  {p.formats.map((f) => (
                    <span className="tag" key={f}>
                      {f}
                    </span>
                  ))}
                </div>
                <p
                  style={{
                    marginTop: '0.9rem',
                    fontSize: '0.88rem',
                    color: 'var(--coral)',
                  }}
                >
                  {p.notFor}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
