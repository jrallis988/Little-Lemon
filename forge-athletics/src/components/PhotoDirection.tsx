import { CropFrame } from '../brand/graphicSystem'

const fits = [
  {
    id: 'training',
    title: 'Training',
    rule: 'Authentic effort mid-rep. Crop tight on action. High contrast. No staged smiles.',
    gradient: 'linear-gradient(145deg, #2A2A2A 0%, #121212 55%, #3a2a24 100%)',
    caption: 'ZONE B · STRENGTH',
  },
  {
    id: 'portrait',
    title: 'Portraits',
    rule: 'Confident, natural. Neutral expression. Eye-level or slight below. Bone or graphite field.',
    gradient: 'linear-gradient(180deg, #3a3a3a 0%, #1a1a1a 100%)',
    caption: 'ATHLETE 07',
  },
  {
    id: 'detail',
    title: 'Detail',
    rule: 'Hands, chalk, shoes, knurling, floor texture. Shallow depth. Documentary clarity.',
    gradient: 'linear-gradient(120deg, #4a4038 0%, #1e1e1e 70%)',
    caption: 'DETAIL · CHALK',
  },
  {
    id: 'environment',
    title: 'Environment',
    rule: 'Real training spaces. Horizontal lines, rack geometry, natural window light when available.',
    gradient: 'linear-gradient(200deg, #2c3034 0%, #121212 60%, #252018 100%)',
    caption: 'FACILITY · EAST',
  },
]

const unfit = [
  'Flames, smoke machines, or neon gym lighting',
  'Bodybuilding flex poses and trophy shots',
  'Heavy Instagram filters / teal-orange grade',
  'Crowded collage layouts with stickers and badges',
  'Esports-style HUD overlays and glitch effects',
]

export function PhotoDirection() {
  return (
    <div className="photo-direction">
      <div className="photo-grid">
        {fits.map((p) => (
          <CropFrame key={p.id} label={p.caption} className="photo-card">
            <div className="photo-plate" style={{ background: p.gradient }}>
              <span className="photo-plate-title">{p.title}</span>
            </div>
            <p className="photo-rule">{p.rule}</p>
          </CropFrame>
        ))}
      </div>

      <div className="photo-standards">
        <h3 className="subhead">Standards</h3>
        <ul>
          <li>
            <strong>Lighting:</strong> Hard directional or clean window light. Avoid flat
            on-camera flash and rainbow gels.
          </li>
          <li>
            <strong>Cropping:</strong> Decisive crops. Prefer edge bleed. Leave room for
            crop-frame graphic overlays.
          </li>
          <li>
            <strong>Contrast:</strong> Mid-to-high. Shadows hold detail; highlights don’t blow.
          </li>
          <li>
            <strong>Color treatment:</strong> Near-neutral grade. Slight cool steel in shadows
            optional. No heavy teal/orange.
          </li>
          <li>
            <strong>Subject placement:</strong> Off-center allowed; align to brand grid. Face
            or effort toward open space when type will sit opposite.
          </li>
        </ul>
      </div>

      <div className="photo-compare">
        <h3 className="subhead">Does not fit the brand</h3>
        <div className="photo-unfit">
          {unfit.map((u) => (
            <div key={u} className="photo-unfit-item">
              <span className="x-mark" aria-hidden>
                ✕
              </span>
              <span>{u}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
