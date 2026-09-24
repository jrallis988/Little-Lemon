import type { CoffeeVariety } from '../../data/brand';

export function ColorSystem() {
  const tokens = [
    { name: 'Ink', hex: '#162029', role: 'Primary brand' },
    { name: 'Paper', hex: '#F3EFE8', role: 'Substrate / field' },
    { name: 'Ember', hex: '#B85A32', role: 'Accent / CTA' },
    { name: 'Teal', hex: '#3D7A78', role: 'Wayfinding' },
    { name: 'North', hex: '#4A7C8C', role: 'Light roast' },
    { name: 'East', hex: '#C45B5B', role: 'Medium roast' },
    { name: 'South', hex: '#6B3A4A', role: 'Dark roast' },
    { name: 'West', hex: '#C4893A', role: 'Espresso' },
  ];

  return (
    <div className="color-system">
      {tokens.map((t) => (
        <figure key={t.name} className="swatch">
          <div className="swatch-chip" style={{ background: t.hex }} />
          <figcaption>
            <strong>{t.name}</strong>
            <code>{t.hex}</code>
            <span>{t.role}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

export function TypeSpecimen() {
  return (
    <div className="type-specimen panel panel-pad">
      <div className="type-row">
        <p className="kicker">Display · Syne</p>
        <p className="type-display">ROAM</p>
        <p className="type-display-sub">Coffee for wherever you’re going.</p>
      </div>
      <div className="type-row">
        <p className="kicker">Body · Figtree</p>
        <p className="type-body">
          High-elevation lots with bergamot lift and jasmine finish — coffee for clear mornings and open roads.
          Hierarchy stays legible at arm’s length and at three meters on a menu board.
        </p>
      </div>
      <div className="type-row">
        <p className="kicker">Meta · IBM Plex Mono</p>
        <p className="type-mono">NORTH · LIGHT ROAST · 12 OZ · YIRGACHEFFE</p>
      </div>
    </div>
  );
}

export function SpecSheet({ variety }: { variety: CoffeeVariety }) {
  const rows = [
    ['Format', 'Side-gusset stand-up pouch'],
    ['Net weight', variety.weight],
    ['Substrate', 'Matte kraft / barrier liner'],
    ['Print', 'CMYK + spot ember accent'],
    ['Bleed', '0.125" all sides'],
    ['Barcode', 'UPC-A quiet zone cleared'],
    ['Finish', 'Matte laminate, heat-seal top'],
  ];

  return (
    <div className="spec-sheet panel panel-pad">
      <div className="spec-head">
        <p className="kicker">Production spec</p>
        <h3>
          {variety.name} — {variety.roast}
        </h3>
      </div>
      <dl className="spec-grid">
        {rows.map(([k, v]) => (
          <div key={k} className="spec-row">
            <dt>{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function InsightStrip({ items }: { items: { label: string; value: string }[] }) {
  return (
    <ul className="insight-strip">
      {items.map((item) => (
        <li key={item.label}>
          <span>{item.label}</span>
          <strong>{item.value}</strong>
        </li>
      ))}
    </ul>
  );
}
