import { craftSkills, moments } from '../data/posters'

export function Concept() {
  return (
    <section className="section" id="concept">
      <div className="section__inner">
        <p className="section__eyebrow">01 — Concept</p>
        <div className="concept-grid">
          <div>
            <p className="concept-manifesto">Motion defines the moment.</p>
            <p className="section__lead" style={{ marginBottom: '1rem' }}>
              Every sport contains a fraction of a second that defines the action. VELOCITY is not a
              mood board of athletic imagery — it is a visual system where the type of movement
              determines how composition, typography, photography, and graphics behave.
            </p>
            <p className="section__lead" style={{ marginBottom: 0 }}>
              Photography and typography do the heavy lifting. Controlled imperfection — grain,
              flash, hard crops, coaching marks — appears only where intensity is required.
            </p>
            <div className="pillars" aria-label="Design pillars">
              {['Speed', 'Power', 'Precision', 'Movement', 'Competition', 'Performance'].map((p) => (
                <span key={p}>{p}</span>
              ))}
            </div>
          </div>
          <ol className="moment-list">
            {moments.map((m, i) => (
              <li key={m}>
                <span>0{i + 1}</span>
                {m}
              </li>
            ))}
          </ol>
        </div>
        <div className="craft-tags" aria-label="Craft focus">
          {craftSkills.map((s) => (
            <span key={s}>{s}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
