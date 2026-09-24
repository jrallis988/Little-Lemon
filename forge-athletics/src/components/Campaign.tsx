import { useState, type ReactNode } from 'react'
import { ForgeLogo, ForgeSymbol } from '../brand/logo'
import { photos } from '../brand/photos'
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
  image,
  children,
  className,
  label,
  position = 'center',
}: {
  tone?: string
  image?: string
  children?: ReactNode
  className?: string
  label?: string
  position?: string
}) {
  return (
    <div
      className={`photo-plate ${tone} ${image ? 'has-photo' : ''} ${className ?? ''}`}
      style={
        image
          ? {
              backgroundImage: `linear-gradient(180deg, rgba(18,18,18,0.15) 0%, rgba(18,18,18,0.55) 45%, rgba(18,18,18,0.92) 100%), url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: position,
            }
          : undefined
      }
    >
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
      <PhotoPlate
        tone="tone-maya"
        image={photos.mayaTrack}
        className="camp-hero-plate"
        label="SESSION 184"
        position="center 30%"
      >
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
      <PhotoPlate
        tone="tone-empty"
        image={photos.emptyTrack}
        className="insight-plate"
        label="05:12 AM · EMPTY TRACK"
        position="center"
      >
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
        <PhotoPlate
          tone="tone-maya"
          image={photos.mayaTrack}
          className="athlete-plate"
          label="TRAINING · NOT POSING"
          position="center 25%"
        >
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

      <div className="athlete-secondary">
        <p className="mock-label">Also in the campaign</p>
        <div className="athlete-secondary-card">
          <PhotoPlate
            tone="tone-jordan"
            image={photos.jordanGym}
            className="athlete-secondary-photo"
            label={`${jordan.name} · ${jordan.sport}`}
          />
          <div>
            <h3 className="camp-headline" style={{ fontSize: '1.75rem' }}>
              {jordan.name} / {jordan.age} / {jordan.sport}
            </h3>
            <AthleteStatGrid athlete={jordan} />
            <p className="camp-lead">{jordan.story}</p>
          </div>
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
  const examples = [
    { t: 'CHALK', image: photos.chalk, tone: 'tone-detail' },
    { t: 'EMPTY TRACK', image: photos.emptyTrack, tone: 'tone-empty' },
    { t: 'AFTER EFFORT', image: photos.mayaAfter, tone: 'tone-maya' },
    { t: 'ARRIVAL', image: photos.mayaArrival, tone: 'tone-recover' },
  ]
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
        {examples.map((ex) => (
          <PhotoPlate
            key={ex.t}
            tone={ex.tone}
            image={ex.image}
            className="photo-ex"
            label={ex.t}
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
  image,
  position,
}: {
  id: string
  kicker: string
  athlete: Athlete
  line2: string
  tone: string
  protocol?: string
  image?: string
  position?: string
}) {
  return (
    <section id={id} className="camp-section camp-section--flush">
      <ScreenKicker n={kicker} label={`Campaign Ad · ${athlete.name}`} />
      <PhotoPlate
        tone={tone}
        image={image}
        className="ad-plate"
        label={athlete.session}
        position={position}
      >
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
      image={photos.mayaTrack}
      position="center 28%"
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
      image={photos.mayaStrength}
      position="center 40%"
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
      image={photos.jordanGym}
      position="center 35%"
    />
  )
}

/* ——— 15 OOH ——— */

function OohAdPanel({
  line,
  image,
  code,
}: {
  line: string
  image: string
  code: string
}) {
  return (
    <div
      className="ooh-ad-panel"
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(18,18,18,0.2), rgba(18,18,18,0.88)), url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <span className="ooh-ad-code">{code}</span>
      <BuiltThrough line2={line} size="sm" />
      <span className="ooh-mark">FORGE</span>
    </div>
  )
}

export function OohScreen() {
  const placements = [
    {
      where: 'Bus Shelter',
      line: '5:12 A.M.',
      adImage: photos.mayaTrack,
      scene: photos.oohShelter,
      env: 'ooh-scene--shelter',
      code: 'MAYA · SESSION 184',
    },
    {
      where: 'Billboard',
      line: '327 REPS.',
      adImage: photos.mayaStrength,
      scene: photos.oohBillboard,
      env: 'ooh-scene--billboard',
      code: 'REP 327 · STRENGTH',
    },
    {
      where: 'Gym Poster',
      line: 'ONE MORE.',
      adImage: photos.chalk,
      scene: photos.oohGym,
      env: 'ooh-scene--gym',
      code: 'TRACK · EAST',
    },
    {
      where: 'Street Poster',
      line: 'FAILURE.',
      adImage: photos.emptyTrack,
      scene: photos.oohStreet,
      env: 'ooh-scene--street',
      code: 'BUILT THROUGH',
    },
  ]
  return (
    <section id="ooh" className="camp-section">
      <ScreenKicker n="15" label="OOH / Print" />
      <h2 className="camp-headline">THE ADS IN THE WORLD.</h2>
      <p className="camp-lead">
        Campaign language placed into photographed environments — bus shelter, billboard,
        facility poster, street hoarding.
      </p>
      <div className="ooh-grid ooh-grid--scenes">
        {placements.map((p) => (
          <article key={p.where} className="ooh-card">
            <p className="mock-label">{p.where}</p>
            <div
              className={`ooh-scene ${p.env}`}
              style={{
                backgroundImage: `url(${p.scene})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <OohAdPanel line={p.line} image={p.adImage} code={p.code} />
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

/* ——— 16 Social ——— */

const socialImages = [
  photos.emptyTrack,
  photos.mayaArrival,
  photos.mayaTrack,
  photos.mayaStrength,
  photos.chalk,
  photos.mayaAfter,
  photos.mayaTrack,
]

export function SocialScreen() {
  return (
    <section id="social" className="camp-section">
      <ScreenKicker n="16" label="Social Campaign" />
      <h2 className="camp-headline">DOCUMENT THE PROCESS.</h2>
      <p className="camp-lead">
        Stories follow the work — not resized print ads. Seven frames. One session. Maya.
      </p>
      <div className="social-sequence">
        {socialSequence.map((f, i) => (
          <article
            key={f.frame}
            className="social-frame social-frame--photo"
            style={{
              backgroundImage: `linear-gradient(180deg, rgba(18,18,18,0.25) 0%, rgba(18,18,18,0.88) 100%), url(${socialImages[i]})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <span className="sf-n">{f.frame}</span>
            <div>
              <h3>{f.title}</h3>
              <p>{f.detail}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

/* ——— 17 Digital ——— */

export function DigitalScreen() {
  const [active, setActive] = useState<Athlete>(maya)
  const image = active.id === 'maya' ? photos.mayaTrack : photos.jordanGym

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
          {[maya, jordan].map((a) => (
            <button
              key={a.id}
              type="button"
              className={`de-athlete ${active.id === a.id ? 'is-active' : ''}`}
              onClick={() => setActive(a)}
            >
              {a.name}
              <span>{a.sport}</span>
            </button>
          ))}
        </aside>
        <div className="de-main">
          <WorkCode
            compact={`${active.day}  ·  ${active.session}  ·  TOTAL REPS ${active.totalReps}`}
          />
          <PhotoPlate
            tone={active.tone}
            image={image}
            className="de-photo"
            label={`${active.name} · PROFILE`}
          />
          <div className="de-stats">
            <div>
              <span className="as-k">DAY</span>
              <span className="as-v">{active.day.replace('DAY ', '')}</span>
            </div>
            <div>
              <span className="as-k">SESSION</span>
              <span className="as-v">{active.session.replace('SESSION ', '')}</span>
            </div>
            <div>
              <span className="as-k">TOTAL REPS</span>
              <span className="as-v">{active.totalReps}</span>
            </div>
          </div>
          <p className="de-story">{active.story}</p>
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
        Campaign language on product and architecture — numbers, timestamps, Work Code —
        not a centered logo on every surface.
      </p>
      <div className="physical-grid physical-grid--photo">
        <article className="phys-card">
          <p className="mock-label">Training Shirt · Front 327</p>
          <div
            className="apparel-photo apparel-photo--tee"
            style={{ backgroundImage: `url(${photos.apparelTee})` }}
          >
            <span className="apparel-print apparel-print--num">327</span>
          </div>
        </article>
        <article className="phys-card">
          <p className="mock-label">Hoodie · 5:12 AM</p>
          <div
            className="apparel-photo apparel-photo--hoodie"
            style={{ backgroundImage: `url(${photos.apparelHoodie})` }}
          >
            <span className="apparel-print apparel-print--time">
              5:12
              <small>AM</small>
            </span>
          </div>
        </article>
        <article className="phys-card">
          <p className="mock-label">Athletic Bag · Session</p>
          <div
            className="apparel-photo apparel-photo--bag"
            style={{ backgroundImage: `url(${photos.apparelBag})` }}
          >
            <span className="apparel-print apparel-print--bag">SESSION 184</span>
          </div>
        </article>
        <article className="phys-card phys-span">
          <p className="mock-label">Facility Hallway Mural</p>
          <div
            className="phys-wall phys-wall--photo"
            style={{
              backgroundImage: `linear-gradient(90deg, rgba(18,18,18,0.82), rgba(18,18,18,0.35)), url(${photos.facilityHall})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
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
      <PhotoPlate
        tone="tone-after"
        image={photos.mayaAfter}
        className="finale-plate"
        label="AFTER · NOT PODIUM"
        position="center 40%"
      >
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

/* ——— System proof / results ——— */

export function ResultsScreen() {
  const metrics = [
    { value: '07', label: 'Expandable lines', detail: 'BUILT THROUGH ____ system' },
    { value: '02', label: 'Athletes', detail: 'Maya + Jordan continuity' },
    { value: '04', label: 'OOH formats', detail: 'Shelter · board · gym · street' },
    { value: '07', label: 'Social frames', detail: 'One session, documented' },
    { value: '01', label: 'Work Code', detail: 'Proprietary info system' },
    { value: '20', label: 'Case screens', detail: 'Problem → execution' },
  ]
  return (
    <section id="system" className="camp-section">
      <ScreenKicker n="20" label="System Proof" />
      <h2 className="camp-headline">ONE SYSTEM. MANY FORMATS.</h2>
      <p className="camp-lead">
        Fixed: geometry, Work Code, Forge Orange, campaign language, photography rule.
        Adaptive: crop, scale, substrate, amount of photography.
      </p>
      <div className="metrics-grid">
        {metrics.map((m) => (
          <article key={m.label} className="metric-card">
            <span className="metric-value">{m.value}</span>
            <span className="metric-label">{m.label}</span>
            <span className="metric-detail">{m.detail}</span>
          </article>
        ))}
      </div>
    </section>
  )
}

/* ——— Production deliverables ——— */

export function DeliverablesScreen() {
  const files = [
    { tool: 'Illustrator', items: 'Logo lockups · symbol · clear-space · one-color / reverse' },
    { tool: 'InDesign', items: 'Campaign book PDF · letter / presentation collateral' },
    { tool: 'Photoshop', items: 'Campaign ads · OOH comps · apparel · facility murals' },
    { tool: 'Presentation', items: 'React case study · digital athlete experience' },
  ]
  return (
    <section id="deliverables" className="camp-section">
      <ScreenKicker n="21" label="Production Deliverables" />
      <h2 className="camp-headline">WHAT SHIPS WITH THE SYSTEM.</h2>
      <div className="deliverables-grid">
        {files.map((f) => (
          <article key={f.tool} className="deliverable-card">
            <p className="mock-label">{f.tool}</p>
            <p>{f.items}</p>
          </article>
        ))}
      </div>
      <p className="note">
        Interactive case study + print campaign book PDF included in this presentation
        package.
      </p>
      <p className="book-cta-row">
        <a className="book-cta" href="./book/FORGE-Campaign-Book.pdf" target="_blank" rel="noreferrer">
          Open Campaign Book PDF →
        </a>
        <a className="book-cta book-cta--ghost" href="./book/" target="_blank" rel="noreferrer">
          View print layout →
        </a>
      </p>
    </section>
  )
}

/* ——— Campaign book ——— */

export function CampaignBookScreen() {
  const pages = [
    { n: '01', title: 'Cover', line: 'BUILT THROUGH WORK.' },
    { n: '02', title: 'Challenge', line: 'Athletic brands show the result.' },
    { n: '03', title: 'Insight', line: 'No one sees the 5:12 A.M. alarm.' },
    { n: '04', title: 'Strategy', line: 'Document the work.' },
    { n: '05', title: 'Platform', line: 'BUILT THROUGH ____' },
    { n: '06', title: 'Maya', line: 'Session 184 · 8 × 200M' },
    { n: '07', title: 'Work Code', line: '05:12 / SESSION 184 / TRACK' },
    { n: '08', title: 'Ads', line: '5:12 · 327 · 1,000 misses' },
    { n: '09', title: 'OOH', line: 'Shelter · billboard · gym · street' },
    { n: '10', title: 'Physical', line: 'Apparel · facility · floor' },
    { n: '11', title: 'Digital', line: 'Work behind the athlete' },
    { n: '12', title: 'Finale', line: 'After — not podium' },
  ]
  return (
    <section id="book" className="camp-section">
      <ScreenKicker n="22" label="Campaign Book" />
      <h2 className="camp-headline">PRINT CAMPAIGN BOOK</h2>
      <p className="camp-lead">
        A 12-page print layout packaged with the case study — cover, narrative, Work Code,
        ads, OOH, and finale — suitable as an InDesign-style portfolio artifact.
      </p>
      <div className="book-spread">
        <div
          className="book-cover"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(18,18,18,0.35), rgba(18,18,18,0.92)), url(${photos.mayaTrack})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 30%',
          }}
        >
          <p className="mock-label" style={{ color: '#9a968e' }}>
            Cover
          </p>
          <span className="camp-hero-forge">FORGE</span>
          <BuiltThrough line2="WORK." size="md" />
          <p className="book-meta">CAMPAIGN BOOK · 12 PAGES</p>
        </div>
        <div className="book-toc">
          <p className="mock-label">Contents</p>
          <ol>
            {pages.map((p) => (
              <li key={p.n}>
                <span>{p.n}</span>
                <strong>{p.title}</strong>
                <em>{p.line}</em>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
