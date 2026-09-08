import { pillars, platformRoles } from '../../data/content'

export function PlatformRoles() {
  return (
    <section className="section" id="platforms">
      <div className="shell">
        <p className="section-kicker">07 — Platform roles</p>
        <h2 className="section-title">Each platform contributes something different to the same ecosystem.</h2>
        <p className="section-lede">
          TikTok challenges. Instagram identities. YouTube stories. Spotify is
          where runners actually Find Their Pace.
        </p>
        <div className="grid-4 platform-grid">
          {platformRoles.map((p) => (
            <article className="panel" key={p.platform}>
              <p className="platform-purpose">{p.purpose}</p>
              <h3>{p.platform}</h3>
              <p style={{ marginBottom: '0.75rem' }}>{p.role}</p>
              <ul className="pillar-examples">
                {p.examples.map((ex) => (
                  <li key={ex}>{ex}</li>
                ))}
              </ul>
              <p className="platform-not">{p.notFor}</p>
            </article>
          ))}
        </div>

        <div style={{ marginTop: '2.5rem' }}>
          <h3 className="section-title" style={{ fontSize: '1.6rem' }}>
            Content pillars that keep the calendar balanced
          </h3>
          <div className="grid-5" style={{ marginTop: '1rem' }}>
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
      </div>
    </section>
  )
}
