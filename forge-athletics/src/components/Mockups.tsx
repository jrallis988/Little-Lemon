import { ForgeLogo, ForgeSymbol } from '../brand/logo'
import { MeasureRule, TrainingNotation, LargeNumber, CropFrame } from '../brand/graphicSystem'

export function IncorrectUsage() {
  const items = [
    { id: 'stretch', label: 'Do not stretch', style: { transform: 'scaleX(1.45)' } },
    { id: 'rotate', label: 'Do not rotate', style: { transform: 'rotate(-18deg)' } },
    { id: 'proportion', label: 'Do not change proportions', style: { transform: 'scaleY(0.65)' } },
    { id: 'color', label: 'Do not use unauthorized colors', className: 'bad-fill-purple' },
    { id: 'effects', label: 'Do not add effects', className: 'bad-glow' },
    { id: 'bg', label: 'Do not place over illegible backgrounds', className: 'bad-bg' },
    { id: 'type', label: 'Do not alter typography', className: 'bad-type' },
  ]

  return (
    <div className="incorrect-grid">
      {items.map((item) => (
        <figure key={item.id} className={`incorrect-card ${item.className ?? ''}`}>
          <div className="incorrect-stage" style={item.style}>
            {item.id === 'type' ? (
              <span className="bad-wordmark">FoRgE Athletics</span>
            ) : item.id === 'color' ? (
              <ForgeSymbol fill="#7c3aed" />
            ) : (
              <ForgeLogo variant="horizontal" />
            )}
          </div>
          <figcaption>
            <span className="x-mark">✕</span> {item.label}
          </figcaption>
        </figure>
      ))}
    </div>
  )
}

export function ClearSpaceDemo() {
  return (
    <div className="clearspace-demo">
      <div className="clearspace-board">
        <div className="clearspace-pad">
          <ForgeLogo variant="horizontal" className="clearspace-logo" />
          <span className="cs-guide cs-top" />
          <span className="cs-guide cs-right" />
          <span className="cs-guide cs-bottom" />
          <span className="cs-guide cs-left" />
          <span className="cs-label">1× STEM</span>
        </div>
      </div>
      <div className="size-rules">
        <div>
          <h4>Minimum Print</h4>
          <ul>
            <li>Symbol — 12 mm</li>
            <li>Wordmark — 28 mm wide</li>
            <li>Primary horizontal — 40 mm wide</li>
          </ul>
        </div>
        <div>
          <h4>Minimum Digital</h4>
          <ul>
            <li>Symbol — 24 px</li>
            <li>Wordmark — 96 px wide</li>
            <li>Primary horizontal — 140 px wide</li>
          </ul>
        </div>
        <div>
          <h4>Placement</h4>
          <ul>
            <li>Prefer top-left or bottom edge alignment</li>
            <li>Keep clear of photography faces</li>
            <li>Pair with measure rules, not decorative flourishes</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export function PrintCollateral() {
  return (
    <div className="mock-grid print-grid">
      <article className="mock-card">
        <p className="mock-label">Business Card · 3.5 × 2 in</p>
        <div className="biz-card">
          <div className="biz-card-front">
            <ForgeSymbol className="biz-symbol" />
            <span className="biz-word">FORGE</span>
          </div>
          <div className="biz-card-back">
            <p className="biz-name">ALEX RIVERA</p>
            <p className="biz-role">PERFORMANCE COACH</p>
            <MeasureRule label="01" />
            <p className="biz-contact">alex@forgeathletics.co</p>
            <p className="biz-contact">+1 603 555 0142</p>
          </div>
        </div>
      </article>

      <article className="mock-card">
        <p className="mock-label">Letterhead · US Letter</p>
        <div className="letterhead">
          <header>
            <ForgeLogo variant="small" />
            <TrainingNotation />
          </header>
          <div className="letter-body">
            <p>Training Program Confirmation</p>
            <p className="letter-muted">
              Athlete onboarding packet — strength block A, weeks 1–4. Review attached
              schedule before facility orientation.
            </p>
          </div>
          <footer>FORGE ATHLETICS · BUILT THROUGH WORK.</footer>
        </div>
      </article>

      <article className="mock-card">
        <p className="mock-label">Envelope · #10</p>
        <div className="envelope">
          <ForgeSymbol className="env-symbol" />
          <div className="env-return">
            <span>FORGE ATHLETICS</span>
            <span>180 INDUSTRIAL WAY</span>
            <span>MANCHESTER, NH 03101</span>
          </div>
        </div>
      </article>

      <article className="mock-card">
        <p className="mock-label">Presentation Cover</p>
        <div className="deck-cover">
          <p className="deck-kicker">PERFORMANCE BRIEF 01</p>
          <h3>BUILT THROUGH WORK.</h3>
          <MeasureRule label="Q3" />
          <ForgeLogo variant="wordmark" className="deck-logo" />
        </div>
      </article>

      <article className="mock-card mock-span">
        <p className="mock-label">Training Document</p>
        <div className="training-doc">
          <header>
            <ForgeLogo variant="small" />
            <span>BLOCK A · WEEK 02</span>
          </header>
          <table>
            <thead>
              <tr>
                <th>EXERCISE</th>
                <th>SET</th>
                <th>REP</th>
                <th>LOAD</th>
                <th>REST</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Back Squat</td>
                <td>05</td>
                <td>05</td>
                <td>85%</td>
                <td>180s</td>
              </tr>
              <tr>
                <td>Bench Press</td>
                <td>04</td>
                <td>06</td>
                <td>80%</td>
                <td>150s</td>
              </tr>
              <tr>
                <td>Romanian DL</td>
                <td>03</td>
                <td>08</td>
                <td>70%</td>
                <td>120s</td>
              </tr>
            </tbody>
          </table>
          <footer>
            <TrainingNotation set="SET —" rep="REP —" load="RPE 8" />
            <span>PROGRESS IS EARNED.</span>
          </footer>
        </div>
      </article>
    </div>
  )
}

export function ApparelMockups() {
  return (
    <div className="mock-grid apparel-grid">
      <article className="mock-card">
        <p className="mock-label">T-Shirt — left chest + rear measure</p>
        <div className="apparel tee">
          <div className="apparel-body">
            <ForgeSymbol className="apparel-mark-sm" />
            <div className="apparel-back-type">
              <span>WORK</span>
              <MeasureRule label="01" />
            </div>
          </div>
        </div>
      </article>
      <article className="mock-card">
        <p className="mock-label">Hoodie — tonal wordmark</p>
        <div className="apparel hoodie">
          <div className="apparel-body dark">
            <span className="hoodie-word">FORGE</span>
            <span className="hoodie-sub">ATHLETICS</span>
          </div>
        </div>
      </article>
      <article className="mock-card">
        <p className="mock-label">Training Shirt — notation sleeve</p>
        <div className="apparel training-shirt">
          <div className="apparel-body">
            <LargeNumber value="03" caption="ZONE" />
            <span className="sleeve-tag">SET / REP</span>
          </div>
        </div>
      </article>
      <article className="mock-card">
        <p className="mock-label">Hat — symbol only</p>
        <div className="apparel hat">
          <div className="hat-crown">
            <ForgeSymbol className="hat-mark" fill="#F0EDE6" />
          </div>
          <div className="hat-brim" />
        </div>
      </article>
      <article className="mock-card">
        <p className="mock-label">Athletic Bag — side panel system</p>
        <div className="apparel bag">
          <div className="bag-panel">
            <span className="bag-word">FORGE</span>
            <MeasureRule label="BAG" />
            <span className="bag-meta">TRAINING DEPT.</span>
          </div>
        </div>
      </article>
    </div>
  )
}

export function EnvironmentMockups() {
  return (
    <div className="mock-grid env-grid">
      <article className="mock-card mock-span">
        <p className="mock-label">Exterior Signage</p>
        <div className="env-exterior">
          <div className="env-facade">
            <ForgeLogo variant="horizontal" className="env-sign" />
            <p className="env-tag">BUILT THROUGH WORK.</p>
          </div>
        </div>
      </article>
      <article className="mock-card">
        <p className="mock-label">Interior Wall Graphic</p>
        <div className="env-wall">
          <h3>ONE MORE.</h3>
          <MeasureRule label="WALL" />
        </div>
      </article>
      <article className="mock-card">
        <p className="mock-label">Directional</p>
        <div className="env-wayfinding">
          <span className="wf-arrow">→</span>
          <div>
            <p>STRENGTH FLOOR</p>
            <p className="wf-sub">ZONE A–C</p>
          </div>
        </div>
      </article>
      <article className="mock-card">
        <p className="mock-label">Training Zone</p>
        <div className="env-zone">
          <LargeNumber value="B" caption="ZONE" />
          <p>OLYMPIC LIFTING</p>
        </div>
      </article>
      <article className="mock-card">
        <p className="mock-label">Locker Room</p>
        <div className="env-locker">
          <p className="locker-line">SHOW UP.</p>
          <p className="locker-line">TRAIN.</p>
          <p className="locker-line">REPEAT.</p>
          <ForgeSymbol className="locker-mark" />
        </div>
      </article>
    </div>
  )
}

export function CampaignPosters() {
  const posters = [
    { line: 'BUILT THROUGH WORK.', zone: '01', tone: 'poster-a' },
    { line: 'ONE MORE.', zone: '02', tone: 'poster-b' },
    { line: 'PROGRESS IS EARNED.', zone: '03', tone: 'poster-c' },
  ]
  return (
    <div className="poster-grid">
      {posters.map((p) => (
        <CropFrame key={p.zone} label={`CAMPAIGN · ${p.zone}`} className={`poster ${p.tone}`}>
          <div className="poster-inner">
            <TrainingNotation />
            <h3>{p.line}</h3>
            <div className="poster-foot">
              <ForgeLogo variant="wordmark" />
              <MeasureRule label={p.zone} />
            </div>
          </div>
        </CropFrame>
      ))}
    </div>
  )
}

export function DigitalApps() {
  return (
    <div className="mock-grid digital-grid">
      <article className="mock-card mock-span">
        <p className="mock-label">Website Hero</p>
        <div className="web-hero">
          <header>
            <ForgeLogo variant="small" />
            <nav>
              <span>Programs</span>
              <span>Facility</span>
              <span>Contact</span>
            </nav>
          </header>
          <div className="web-hero-body">
            <p className="wh-kicker">PERFORMANCE TRAINING</p>
            <h3>BUILT THROUGH WORK.</h3>
            <p className="wh-sub">Strength. Conditioning. Recovery. Programs for competitive athletes.</p>
            <button type="button">Start Training</button>
          </div>
        </div>
      </article>
      <article className="mock-card">
        <p className="mock-label">Email Header</p>
        <div className="email-header">
          <ForgeLogo variant="small" />
          <span>WEEKLY BLOCK · 14</span>
        </div>
      </article>
      <article className="mock-card">
        <p className="mock-label">Digital Ad · 300×250</p>
        <div className="dig-ad">
          <p>ONE MORE.</p>
          <ForgeSymbol className="dig-ad-mark" />
          <span>FORGE ATHLETICS</span>
        </div>
      </article>
      <article className="mock-card">
        <p className="mock-label">Mobile Promo</p>
        <div className="mobile-promo">
          <MeasureRule label="APP" />
          <h3>PROGRESS IS EARNED.</h3>
          <span className="mp-cta">Book a Session</span>
        </div>
      </article>
      <article className="mock-card">
        <p className="mock-label">Social Graphic · 1:1</p>
        <div className="social-graphic">
          <LargeNumber value="05" caption="AM SESSION" />
          <p>SHOW UP.</p>
          <ForgeLogo variant="wordmark" />
        </div>
      </article>
    </div>
  )
}

export function ConsistencyChallenge() {
  return (
    <div className="consistency">
      <p className="note">
        Same identity across formats. Fixed: symbol geometry, wordmark spacing, Forge Black /
        Bone, measure-rule language, utility type. Adaptive: scale, crop, application substrate,
        amount of Iron Oxide accent, photography presence.
      </p>
      <div className="consistency-strip">
        <div className="con-item">
          <span className="con-label">Business Card</span>
          <div className="con-biz">
            <ForgeSymbol />
          </div>
        </div>
        <div className="con-item">
          <span className="con-label">Poster</span>
          <div className="con-poster">
            <span>WORK.</span>
          </div>
        </div>
        <div className="con-item">
          <span className="con-label">Apparel</span>
          <div className="con-apparel">
            <ForgeSymbol fill="#F0EDE6" />
          </div>
        </div>
        <div className="con-item">
          <span className="con-label">Social</span>
          <div className="con-social">
            <span>01</span>
          </div>
        </div>
        <div className="con-item">
          <span className="con-label">Signage</span>
          <div className="con-sign">
            <span>FORGE</span>
          </div>
        </div>
        <div className="con-item">
          <span className="con-label">Web</span>
          <div className="con-web">
            <ForgeLogo variant="small" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function GuidelinesOverview() {
  const pages = [
    '01 Introduction',
    '02 Brand Idea',
    '03 Logo',
    '04 Logo Variations',
    '05 Clear Space',
    '06 Minimum Size',
    '07 Incorrect Usage',
    '08 Typography',
    '09 Color',
    '10 Graphic System',
    '11 Photography',
    '12 Voice',
    '13 Print Applications',
    '14 Digital Applications',
    '15 Environmental',
    '16 Examples',
  ]
  return (
    <div className="guidelines-viewer">
      <p className="note">
        Brand guidelines are produced as a 20–30 page InDesign document — the portfolio
        artifact for production standards. This viewer mirrors the chapter structure.
      </p>
      <div className="guidelines-spread">
        <div className="g-page g-cover">
          <p>BRAND STANDARDS</p>
          <h3>FORGE</h3>
          <p>ATHLETICS</p>
          <MeasureRule label="STD" />
        </div>
        <div className="g-page g-toc">
          <p className="g-toc-title">Contents</p>
          <ol>
            {pages.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ol>
        </div>
      </div>
      <div className="guidelines-chapters">
        {pages.map((p) => (
          <div key={p} className="g-chapter">
            {p}
          </div>
        ))}
      </div>
    </div>
  )
}

export function GraphicLanguageDemo() {
  return (
    <div className="graphic-lang">
      <div className="gl-row">
        <div className="gl-item">
          <p className="mock-label">Crop Frames</p>
          <CropFrame label="FRAME 01" className="gl-frame-demo">
            <div className="gl-fill" />
          </CropFrame>
        </div>
        <div className="gl-item">
          <p className="mock-label">Measure Rules</p>
          <MeasureRule label="120" />
          <MeasureRule label="240" />
          <MeasureRule label="360" />
        </div>
        <div className="gl-item">
          <p className="mock-label">Training Notation</p>
          <TrainingNotation />
          <TrainingNotation set="SET 01" rep="REP 12" load="BW" />
        </div>
        <div className="gl-item">
          <p className="mock-label">Large Numbers</p>
          <LargeNumber value="12" caption="WEEK BLOCK" />
        </div>
      </div>
      <p className="note">
        The graphic system should remain recognizable when the logo is small or absent —
        measurement ticks, crop corners, notation, and condensed display type carry the brand.
      </p>
    </div>
  )
}
