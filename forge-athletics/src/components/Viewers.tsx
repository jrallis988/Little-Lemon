import type { ColorSpec } from '../brand/tokens'
import { accessibilityPairs, primaryPalette, secondaryPalette } from '../brand/tokens'
import { typeScale } from '../brand/tokens'

export function ColorSwatch({ color }: { color: ColorSpec }) {
  return (
    <article className="color-swatch">
      <div className="color-chip" style={{ background: color.hex }} />
      <div className="color-meta">
        <h4>{color.name}</h4>
        <p className="color-role">{color.role}</p>
        <dl className="color-specs">
          <div>
            <dt>HEX</dt>
            <dd>{color.hex}</dd>
          </div>
          <div>
            <dt>RGB</dt>
            <dd>{color.rgb}</dd>
          </div>
          <div>
            <dt>CMYK</dt>
            <dd>{color.cmyk}</dd>
          </div>
        </dl>
        <p className="color-usage">{color.usage}</p>
      </div>
    </article>
  )
}

export function ColorViewer() {
  return (
    <div className="color-viewer">
      <h3 className="subhead">Primary Palette</h3>
      <div className="color-grid">
        {primaryPalette.map((c) => (
          <ColorSwatch key={c.hex} color={c} />
        ))}
      </div>
      <h3 className="subhead">Secondary Palette</h3>
      <p className="note">
        Secondary colors support hierarchy and campaign emphasis. They never replace
        Forge Black / Bone as the structural pair, and Iron Oxide is reserved for
        accents — never large fields or logo fills.
      </p>
      <div className="color-grid">
        {secondaryPalette.map((c) => (
          <ColorSwatch key={c.hex} color={c} />
        ))}
      </div>
      <h3 className="subhead">Accessibility</h3>
      <table className="a11y-table">
        <thead>
          <tr>
            <th>Foreground</th>
            <th>Background</th>
            <th>Contrast</th>
            <th>WCAG</th>
          </tr>
        </thead>
        <tbody>
          {accessibilityPairs.map((p) => (
            <tr key={`${p.fg}-${p.bg}`}>
              <td>{p.fg}</td>
              <td>{p.bg}</td>
              <td>{p.ratio}</td>
              <td>{p.pass}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function TypeViewer() {
  const levels = [
    { key: 'display', sample: 'BUILT THROUGH WORK.' },
    { key: 'headline', sample: 'PROGRESS IS EARNED' },
    { key: 'body', sample: 'FORGE trains competitive athletes through disciplined strength, conditioning, and recovery programs. Every session is measured. Every gain is earned.' },
    { key: 'utility', sample: 'SET 04  ·  REP 06  ·  REST 90S  ·  ZONE B' },
  ] as const

  return (
    <div className="type-viewer">
      {levels.map(({ key, sample }) => {
        const t = typeScale[key]
        return (
          <article key={key} className="type-specimen">
            <header className="type-specimen-head">
              <span className="type-level">{key}</span>
              <span className="type-meta">
                {t.family} · {t.weight} · tracking {t.tracking} · leading {t.leading}
              </span>
            </header>
            <p
              className={`type-sample type-${key}`}
              style={{
                fontFamily: `'${t.family}', ${key === 'utility' ? 'monospace' : 'sans-serif'}`,
                fontWeight: t.weight,
                letterSpacing: t.tracking,
                lineHeight: t.leading,
                textTransform: t.case === 'uppercase' ? 'uppercase' : 'none',
              }}
            >
              {sample}
            </p>
            <p className="type-use">{t.use}</p>
          </article>
        )
      })}
      <div className="type-rules">
        <h3 className="subhead">Rules</h3>
        <ul>
          <li>Display &amp; Headline: always uppercase; never sentence case.</li>
          <li>Body: sentence case; avoid all-caps for paragraphs longer than one line.</li>
          <li>Utility: uppercase with wide tracking; use for stats, labels, schedules only.</li>
          <li>Do not mix display faces with unauthorized display fonts.</li>
          <li>Minimum body size: 9 pt print / 16 px digital.</li>
        </ul>
      </div>
    </div>
  )
}
