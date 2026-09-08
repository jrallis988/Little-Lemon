import type { ReactNode } from 'react'
import { ForgeLogo, ForgeSymbol } from '../brand/logo'
import {
  brand,
  campaignStatements,
  forgeOrange,
  jordan,
  maya,
  photoRules,
  primaryPalette,
  socialSequence,
  workCodeFor,
  type Athlete,
} from '../brand/tokens'

/* ——— Shared primitives ——— */

export function WorkCode({
  entries,
  compact,
  className,
}: {
  entries?: { label: string; value: string }[]
  compact?: string
  className?: string
}) {
  if (compact) {
    return (
      <p className={`work-code work-code--compact ${className ?? ''}`}>
        {compact}
      </p>
    )
  }
  const list = entries ?? workCodeFor(maya)
  return (
    <dl className={`work-code ${className ?? ''}`}>
      {list.map((e) => (
        <div key={e.label} className="work-code-row">
          <dt>{e.label}</dt>
          <dd>{e.value}</dd>
        </div>
      ))}
    </dl>
  )
}

export function PhotoPlate({
  tone = 'tone-maya',
  children,
  className,
  label,
}: {
  tone?: string
  children?: ReactNode
  className?: string
  label?: string
}) {
  return (
    <div className={`photo-plate ${tone} ${className ?? ''}`}>
      {label && <span className="photo-plate-edge">{label}</span>}
      <div className="photo-plate-grain" aria-hidden />
      <div className="photo-plate-content">{children}</div>
    </div>
  )
}

export function BuiltThrough({
  line2,
  size = 'lg',
}: {
  line2: string
  size?: 'lg' | 'md' | 'sm'
}) {
  return (
    <h3 className={`built-through built-through--${size}`}>
      <span className="bt-line1">BUILT THROUGH</span>
      <span className="bt-line2">{line2}</span>
    </h3>
  )
}

export function ScreenKicker({ n, label }: { n: string; label: string }) {
  return (
    <header className="screen-kicker">
      <span className="sk-n">{n}</span>
      <span className="sk-label">{label}</span>
    </header>
  )
}

/* ——— 01 Hero ——— */

export function CampaignHero() {
  return (
    <section id="top" className="camp-hero">
      <PhotoPlate tone="tone-maya" className="camp-hero-plate" label="SESSION 184">
        <div className="camp-hero-inner">
          <WorkCode compact="05:12 AM / SESSION 184 / STRENGTH" />
          <div className="camp-hero-brand">
            <span className="camp-hero-forge">FORGE</span>
            <BuiltThrough line2="WORK." size="lg" />
          </div>
          <div className="camp-hero-foot">
            <ForgeLogo variant="wordmark" className="camp-hero-mark" />
            <span className="camp-hero-meta">CAMPAIGN AD · PRIMARY</span>
          </div>
        </div>
      </PhotoPlate>
    </section>
  )
}

/* ——— 02 Challenge ——— */

export function ChallengeScreen() {
  return (
    <section id="challenge" className="camp-section">
      <ScreenKicker n="02" label="The Challenge" />
      <h2 className="camp-headline">ATHLETIC BRANDS SHOW THE RESULT.</h2>
      <div className="result-grid">
        {['WINNING', 'PODIUM', 'CELEBRATION', 'DRAMATIC PORTRAIT'].map((t) => (
          <div key={t} className="result-card">
            <span className="result-x" aria-hidden>
              ✕
            </span>
            <p>{t}</p>
            <span className="result-sub">Familiar athletic advertising</span>
          </div>
        ))}
      </div>
      <p className="camp-lead">
        Forge needed a different part of the athlete’s story — not another victory frame.
        The product is performance training. The communication problem is that every brand
        already owns the finish line.
      </p>
    </section>
  )
}

/* ——— 03 Insight ——— */

export function InsightScreen() {
  return (
    <section id="insight" className="camp-section camp-section--flush">
      <ScreenKicker n="03" label="The Insight" />
      <PhotoPlate tone="tone-empty" className="insight-plate" label="05:12 AM · EMPTY TRACK">
        <div className="insight-copy">
          <p className="insight-line">EVERYONE SEES THE RESULT.</p>
          <p className="insight-line insight-line--accent">
            NO ONE SEES THE 5:12 A.M. ALARM.
          </p>
        </div>
      </PhotoPlate>
      <p className="camp-lead camp-lead--narrow">
        The human insight: performance is public. The work that builds it is almost
        invisible — early mornings, empty facilities, repetition no one films.
      </p>
    </section>
  )
}

/* ——— 04 Strategy ——— */

export function StrategyScreen() {
  const owns = [
    'Training',
    'Repetition',
    'Failure',
    'Recovery',
    'Discipline',
    'Progress',
  ]
  return (
    <section id="strategy" className="camp-section">
      <ScreenKicker n="04" label="The Strategy" />
      <h2 className="camp-headline">
        DON’T SELL THE RESULT.
        <br />
        <span className="accent">DOCUMENT THE WORK.</span>
      </h2>
      <p className="camp-lead">
        Forge owns the part of athletic performance people normally don’t see. Celebrate
        the process that creates performance — not only the finished result.
      </p>
      <ul className="own-row">
        {owns.map((o) => (
          <li key={o}>{o}</li>
        ))}
      </ul>
    </section>
  )
}

/* ——— 05 Big Idea ——— */

export function BigIdeaScreen() {
  return (
    <section id="idea" className="camp-section">
      <ScreenKicker n="05" label="The Big Idea" />
      <p className="platform-reveal">{brand.tagline}</p>
      <p className="camp-lead">
        Not a tagline — an expandable campaign system. Each line points to evidence: a
        time, a count, a miss, a moment.
      </p>
      <div className="statement-stack">
        {campaignStatements.map((s) => (
          <article key={s.line} className="statement-row">
            <h3>{s.line}</h3>
            <p>{s.evidence}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

/* ——— 06 Athlete ——— */

function AthleteStatGrid({ athlete }: { athlete: Athlete }) {
  const stats = [
    ['NAME', athlete.name],
    ['AGE', String(athlete.age)],
    ['SPORT', athlete.sport],
    ['SESSION', athlete.session.replace('SESSION ', '')],
    ['TIME', athlete.time],
    ['PROTOCOL', athlete.protocol],
    ['DURATION', athlete.duration],
    ['GOAL', athlete.goal],
  ]
  return (
    <div className="athlete-stats">
      {stats.map(([k, v]) => (
        <div key={k} className="athlete-stat">
          <span className="as-k">{k}</span>
          <span className="as-v">{v}</span>
        </div>
      ))}
    </div>
  )
}

export function AthleteScreen() {
  return (
    <section id="athlete" className="camp-section">
      <ScreenKicker n="06" label="The Athlete" />
      <h2 className="camp-headline">
        {maya.name} / {maya.age} / {maya.sport}
      </h2>
      <div className="athlete-layout">
        <PhotoPlate tone="tone-maya" className="athlete-plate" label="TRAINING · NOT POSING">
          <div className="athlete-plate-copy">
            <span>{maya.session}</span>
            <span>{maya.time}</span>
            <span>{maya.protocol}</span>
          </div>
        </PhotoPlate>
        <div>
          <AthleteStatGrid athlete={maya} />
          <p className="camp-lead">{maya.story}</p>
          <p className="note">
            Following one athlete across executions keeps the campaign continuous — not a
            pile of unrelated mockups.
          </p>
        </div>
      </div>
    </section>
  )
}

/* ——— 07 Logo ——— */

export function LogoScreen() {
  return (
    <section id="logo" className="camp-section">
      <ScreenKicker n="07" label="Logo System" />
      <h2 className="camp-headline">FORGE</h2>
      <p className="camp-lead">
        Condensed, industrial geometry — work, construction, repetition, athletic
        performance. The anvil-plate F mark reads as made, not decorated.
      </p>
      <div className="logo-campaign-row">
        <div className="logo-camp-card">
          <p className="mock-label">Wordmark</p>
          <ForgeLogo variant="wordmark" />
        </div>
        <div className="logo-camp-card">
          <p className="mock-label">Symbol</p>
          <ForgeSymbol className="logo-camp-symbol" />
        </div>
        <div className="logo-camp-card logo-camp-card--dark">
          <p className="mock-label">Horizontal</p>
          <ForgeLogo variant="horizontal" />
        </div>
      </div>
    </section>
  )
}

/* ——— 08 Color ——— */

export function ColorScreen() {
  return (
    <section id="color" className="camp-section camp-section--flush">
      <ScreenKicker n="08" label="Color System" />
      <h2 className="camp-headline">FORGE ORANGE LEADS.</h2>
      <div className="color-dominate">
        <div className="color-hero-block" style={{ background: forgeOrange }}>
          <span>FORGE ORANGE</span>
          <span className="color-hex">{forgeOrange}</span>
          <p>Energy · Work · Emphasis · Action</p>
        </div>
        <div className="color-side-stack">
          {primaryPalette
            .filter((c) => c.name !== 'Forge Orange')
            .map((c) => (
              <div key={c.hex} className="color-side" style={{ background: c.hex }}>
                <span style={{ color: c.hex === '#F0EDE6' ? '#121212' : '#F0EDE6' }}>
                  {c.name}
                </span>
                <span
                  className="color-hex"
                  style={{ color: c.hex === '#F0EDE6' ? '#6E7276' : '#9A968E' }}
                >
                  {c.hex}
                </span>
              </div>
            ))}
        </div>
      </div>
      <p className="camp-lead camp-lead--narrow">
        Orange is the strongest artificial color in the system. Black / charcoal hold
        structure. Bone is the editorial neutral. Steel stays technical and secondary.
      </p>
    </section>
  )
}

/* ——— 09 Typography ——— */

export function TypeScreen() {
  return (
    <section id="type" className="camp-section">
      <ScreenKicker n="09" label="Typography" />
      <h2 className="camp-headline">TYPE THAT WORKS LIKE DATA.</h2>
      <p className="camp-lead">
        Condensed display for oversized numbers, timestamps, training statistics, campaign
        headlines, and environmental graphics — functional, not decorative.
      </p>
      <div className="type-campaign-grid">
        <div className="type-camp-block">
          <span className="tc-num">327</span>
          <span className="tc-label">REPS</span>
        </div>
        <div className="type-camp-block">
          <span className="tc-num">05:12</span>
          <span className="tc-label">AM</span>
        </div>
        <div className="type-camp-block type-camp-block--stack">
          <span className="tc-stack">BUILT</span>
          <span className="tc-stack">THROUGH</span>
          <span className="tc-stack tc-stack--accent">FAILURE.</span>
        </div>
      </div>
      <p className="note">
        Barlow Condensed — display &amp; headlines · IBM Plex Sans — body · IBM Plex Mono —
        Work Code / utility
      </p>
    </section>
  )
}

/* ——— 10 Work Code ——— */

export function WorkCodeScreen() {
  const samples = [
    '05:12 / SESSION 184 / TRACK',
    '8 × 200M',
    '42:16',
    'REP 327',
    'DAY 064',
    'SESSION 184',
    'MAYA / SPRINTER',
    '1,000 MISSES',
  ]
  return (
    <section id="work-code" className="camp-section">
      <ScreenKicker n="10" label="The Work Code" />
      <h2 className="camp-headline">A PROPRIETARY INFORMATION SYSTEM.</h2>
      <p className="camp-lead">
        Times, sessions, protocols, and counts appear across photography, advertising,
        social, apparel, digital, and facility graphics. Recognizable beyond orange and
        condensed type.
      </p>
      <WorkCode entries={workCodeFor(maya)} className="work-code--panel" />
      <div className="work-code-samples">
        {samples.map((s) => (
          <span key={s} className="wcs-chip">
            {s}
          </span>
        ))}
      </div>
    </section>
  )
}

/* ——— 11 Photography ——— */

export function PhotoScreen() {
  return (
    <section id="photo" className="camp-section">
      <ScreenKicker n="11" label="Photography Direction" />
      <h2 className="camp-headline camp-headline--rule">{photoRules.rule}</h2>
      <div className="photo-dir-grid">
        <div>
          <h3 className="subhead">Photograph</h3>
          <ul className="photo-do">
            {photoRules.do.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="subhead">Never</h3>
          <ul className="photo-dont">
            {photoRules.dont.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="photo-examples">
        {['CHALK', 'EMPTY TRACK', 'AFTER EFFORT', 'RECOVERY'].map((t, i) => (
          <PhotoPlate
            key={t}
            tone={['tone-detail', 'tone-empty', 'tone-maya', 'tone-recover'][i]}
            className="photo-ex"
            label={t}
          />
        ))}
      </div>
    </section>
  )
}

/* ——— 12–14 Campaign Ads ——— */

export function CampaignAd({
  id,
  kicker,
  athlete,
  line2,
  tone,
  protocol,
}: {
  id: string
  kicker: string
  athlete: Athlete
  line2: string
  tone: string
  protocol?: string
}) {
  return (
    <section id={id} className="camp-section camp-section--flush">
      <ScreenKicker n={kicker} label={`Campaign Ad · ${athlete.name}`} />
      <PhotoPlate tone={tone} className="ad-plate" label={athlete.session}>
        <div className="ad-inner">
          <WorkCode
            compact={`${athlete.name} / ${athlete.sport}  ·  ${athlete.session}${protocol ? `  ·  ${protocol}` : ''}`}
          />
          <BuiltThrough line2={line2} size="lg" />
          <div className="ad-foot">
            <ForgeSymbol className="ad-symbol" fill="#F0EDE6" />
            <span>FORGE ATHLETICS</span>
          </div>
        </div>
      </PhotoPlate>
    </section>
  )
}

export function AdOne() {
  return (
    <CampaignAd
      id="ad-1"
      kicker="12"
      athlete={maya}
      line2="5:12 A.M."
      tone="tone-maya"
      protocol="8 × 200M"
    />
  )
}

export function AdTwo() {
  return (
    <CampaignAd
      id="ad-2"
      kicker="13"
      athlete={maya}
      line2="327 REPS."
      tone="tone-strength"
      protocol="REP 327"
    />
  )
}

export function AdThree() {
  return (
    <CampaignAd
      id="ad-3"
      kicker="14"
      athlete={jordan}
      line2="1,000 MISSES."
      tone="tone-jordan"
      protocol="EMPTY GYM"
    />
  )
}

/* ——— 15 OOH ——— */

export function OohScreen() {
  const placements = [
    { where: 'Bus Shelter', line: '5:12 A.M.', tone: 'tone-maya' },
    { where: 'Billboard', line: '327 REPS.', tone: 'tone-strength' },
    { where: 'Gym Poster', line: 'ONE MORE.', tone: 'tone-empty' },
    { where: 'Street Poster', line: 'FAILURE.', tone: 'tone-recover' },
  ]
  return (
    <section id="ooh" className="camp-section">
      <ScreenKicker n="15" label="OOH / Print" />
      <h2 className="camp-headline">THE ADS IN THE WORLD.</h2>
      <p className="camp-lead">
        Same campaign language in real environments — not logos dropped onto random
        mockups.
      </p>
      <div className="ooh-grid">
        {placements.map((p) => (
          <article key={p.where} className="ooh-card">
            <p className="mock-label">{p.where}</p>
            <div className={`ooh-frame ${p.tone}`}>
              <BuiltThrough line2={p.line} size="md" />
              <span className="ooh-mark">FORGE</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

/* ——— 16 Social ——— */

export function SocialScreen() {
  return (
    <section id="social" className="camp-section">
      <ScreenKicker n="16" label="Social Campaign" />
      <h2 className="camp-headline">DOCUMENT THE PROCESS.</h2>
      <p className="camp-lead">
        Stories follow the work — not resized print ads. Seven frames. One session. Maya.
      </p>
      <div className="social-sequence">
        {socialSequence.map((f) => (
          <article key={f.frame} className="social-frame">
            <span className="sf-n">{f.frame}</span>
            <h3>{f.title}</h3>
            <p>{f.detail}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

/* ——— 17 Digital ——— */

export function DigitalScreen() {
  return (
    <section id="digital" className="camp-section">
      <ScreenKicker n="17" label="Digital Experience" />
      <h2 className="camp-headline">THE WORK BEHIND THE ATHLETE</h2>
      <p className="camp-lead">
        Select an athlete. Explore the training story — stats, setbacks, sessions — not a
        generic Forge homepage.
      </p>
      <div className="digital-experience">
        <aside className="de-rail">
          <p className="mock-label">Athletes</p>
          <button type="button" className="de-athlete is-active">
            {maya.name}
            <span>{maya.sport}</span>
          </button>
          <button type="button" className="de-athlete">
            {jordan.name}
            <span>{jordan.sport}</span>
          </button>
        </aside>
        <div className="de-main">
          <WorkCode compact={`${maya.day}  ·  ${maya.session}  ·  TOTAL REPS ${maya.totalReps}`} />
          <PhotoPlate tone="tone-maya" className="de-photo" label="MAYA · PROFILE" />
          <div className="de-stats">
            <div>
              <span className="as-k">DAY</span>
              <span className="as-v">{maya.day.replace('DAY ', '')}</span>
            </div>
            <div>
              <span className="as-k">SESSION</span>
              <span className="as-v">184</span>
            </div>
            <div>
              <span className="as-k">TOTAL REPS</span>
              <span className="as-v">{maya.totalReps}</span>
            </div>
          </div>
          <p className="de-story">{maya.story}</p>
        </div>
      </div>
    </section>
  )
}

/* ——— 18 Physical ——— */

export function PhysicalScreen() {
  return (
    <section id="physical" className="camp-section">
      <ScreenKicker n="18" label="Physical World" />
      <h2 className="camp-headline">APPAREL · EQUIPMENT · FACILITY</h2>
      <p className="camp-lead">
        Every object carries campaign language or Work Code — not a centered logo on every
        surface.
      </p>
      <div className="physical-grid">
        <article className="phys-card">
          <p className="mock-label">Training Shirt</p>
          <div className="phys-tee">
            <span className="phys-num">327</span>
            <span className="phys-back">BUILT THROUGH WORK.</span>
          </div>
        </article>
        <article className="phys-card">
          <p className="mock-label">Hoodie</p>
          <div className="phys-hoodie">
            <span>5:12</span>
            <span className="phys-sub">AM</span>
          </div>
        </article>
        <article className="phys-card">
          <p className="mock-label">Bag</p>
          <div className="phys-bag">
            <span>SESSION 184</span>
            <ForgeSymbol fill="#F0EDE6" className="phys-bag-mark" />
          </div>
        </article>
        <article className="phys-card phys-span">
          <p className="mock-label">Facility Wall</p>
          <div className="phys-wall">
            <BuiltThrough line2="5:12 A.M." size="lg" />
            <WorkCode compact="TRACK · EAST HALL · FORGE" />
          </div>
        </article>
        <article className="phys-card">
          <p className="mock-label">Locker Room</p>
          <div className="phys-locker">
            <span>ONE MORE.</span>
            <span className="phys-sub">DAY 064</span>
          </div>
        </article>
        <article className="phys-card">
          <p className="mock-label">Floor Graphic</p>
          <div className="phys-floor">
            <span>REP</span>
            <span className="phys-num">327</span>
          </div>
        </article>
      </div>
    </section>
  )
}

/* ——— 19 Finale ——— */

export function FinaleScreen() {
  return (
    <section id="finale" className="camp-section camp-section--flush">
      <ScreenKicker n="19" label="Final Campaign System" />
      <PhotoPlate tone="tone-after" className="finale-plate" label="AFTER · NOT PODIUM">
        <div className="finale-inner">
          <WorkCode entries={workCodeFor(maya)} />
          <BuiltThrough line2="WORK." size="lg" />
          <div className="finale-brand">
            <ForgeLogo variant="wordmark" className="finale-mark" />
            <span>FORGE ATHLETICS</span>
          </div>
        </div>
      </PhotoPlate>
      <p className="finale-system">
        Athlete + Work Code + Photography + Typography + Forge Orange + Campaign Language +
        Identity — one system, one story.
      </p>
      <p className="final-disclaimer">
        FORGE ATHLETICS is a fictional self-initiated portfolio project created to
        demonstrate campaign strategy, art direction, identity, and real-world execution —
        not a mood board, and not a traditional brand-guidelines deck.
      </p>
    </section>
  )
}
