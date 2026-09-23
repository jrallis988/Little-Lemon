import { adobeWorkflow, exportManifest, preflightChecks, processSteps } from '../../data/production';

export function ProcessTimeline() {
  return (
    <ol className="process-timeline">
      {processSteps.map((step, i) => (
        <li key={step.title} className="process-step">
          <span className="process-num">{String(i + 1).padStart(2, '0')}</span>
          <div>
            <h3>{step.title}</h3>
            <p>{step.detail}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function AdobeWorkflow() {
  return (
    <div className="grid-3 tools-grid">
      {adobeWorkflow.map((tool) => (
        <article key={tool.app} className="panel panel-pad tool-card">
          <p className="kicker">{tool.role}</p>
          <h3 style={{ marginBottom: '0.75rem' }}>{tool.app}</h3>
          <ul className="tool-list">
            {tool.uses.map((use) => (
              <li key={use}>{use}</li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}

export function PreflightChecklist() {
  return (
    <div className="preflight panel-dark">
      <div className="preflight-head panel-pad">
        <p className="kicker" style={{ color: '#5A9A97' }}>
          Preflight
        </p>
        <h3 style={{ margin: 0, color: '#F3EFE8' }}>Before files leave for press</h3>
      </div>
      <ul className="preflight-list">
        {preflightChecks.map((check) => (
          <li key={check.id}>
            <span className="preflight-mark" aria-hidden>
              ✓
            </span>
            <div>
              <strong>{check.label}</strong>
              <span>{check.detail}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ExportManifest() {
  return (
    <div className="export-manifest panel panel-pad">
      <p className="kicker">Export map</p>
      <p style={{ marginBottom: '1rem', opacity: 0.75 }}>
        Final Adobe exports drop into <code>public/exports/</code> using this structure — then replace SVG
        scaffolds in the viewers.
      </p>
      <ul className="export-list">
        {exportManifest.map((row) => (
          <li key={row.path}>
            <code>{row.path}</code>
            <span>{row.items}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
