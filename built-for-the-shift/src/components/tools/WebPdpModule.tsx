import { useState } from 'react'

/** Web / PDP performance module — campaign applied to product page. */
export function WebPdpModule() {
  const [sku, setSku] = useState<'skate' | 'stick' | 'helmet'>('skate')

  const data = {
    skate: {
      name: 'VAPOR EDGE',
      kind: 'SKATE',
      stat: '0.38s',
      label: 'FIRST-STRIDE RESPONSE',
      benefit: 'BUILT FOR ACCELERATION.',
    },
    stick: {
      name: 'NEXUS PRO',
      kind: 'STICK',
      stat: '92 mph',
      label: 'SHOT RELEASE',
      benefit: 'BUILT FOR RELEASE.',
    },
    helmet: {
      name: 'RE-AKT',
      kind: 'HELMET',
      stat: '27°',
      label: 'IMPACT DISPERSION*',
      benefit: 'BUILT FOR CONTACT.',
    },
  }[sku]

  return (
    <div className="pdp">
      <div className="chip-row" style={{ marginBottom: '0.85rem' }}>
        {(
          [
            ['skate', 'Skate'],
            ['stick', 'Stick'],
            ['helmet', 'Helmet'],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            className={`chip${sku === id ? ' is-active' : ''}`}
            onClick={() => setSku(id)}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="pdp-shell">
        <div className="pdp-media">
          <div
            className={`hockey-photo ${
              sku === 'stick'
                ? 'hockey-photo--stick'
                : sku === 'helmet'
                  ? 'hockey-photo--gear'
                  : 'hockey-photo--skate'
            }`}
          />
          <div className="pdp-media__badge tech">CAMPAIGN MODULE</div>
        </div>
        <div className="pdp-copy">
          <span className="tech ice">{data.kind}</span>
          <h3 className="display">{data.name}</h3>
          <p className="pdp-benefit condensed">{data.benefit}</p>
          <div className="pdp-stat">
            <span className="num">{data.stat}</span>
            <span className="tech">{data.label}</span>
          </div>
          <p className="pdp-body">
            Performance story from the film lands on the PDP — same hierarchy, editable fields,
            ready for AE-exported loops in the media well.
          </p>
          <div className="pdp-actions">
            <span className="btn btn--primary btn--tiny">Add to Bag</span>
            <span className="btn btn--ghost btn--tiny">Watch Shift Film</span>
          </div>
        </div>
      </div>
    </div>
  )
}
