import { templateFields } from '../../data/content'

export function TemplateSystem() {
  return (
    <div className="tool-shell">
      <p className="kicker" style={{ color: 'var(--shift-volt)' }}>
        Editable After Effects Template Fields
      </p>
      <div className="field-grid">
        {templateFields.map((f) => (
          <article key={f.field} className="field-card">
            <strong>{f.field}</strong>
            <p>{f.note}</p>
          </article>
        ))}
      </div>
      <div className="video-slot" style={{ marginTop: '1rem' }}>
        AE project placeholder · Master_Comp / Essential_Graphics / Format_Rigs
      </div>
    </div>
  )
}
