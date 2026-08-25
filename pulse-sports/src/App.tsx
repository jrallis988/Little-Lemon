import { SiteNav } from './components/layout/SiteNav'
import { Section } from './components/layout/Section'
import { LogoBuild, LogoImpact, LogoPulse } from './components/motion/LogoAnims'
import { NetworkIntro } from './components/motion/NetworkIntro'
import { TypeSequence } from './components/motion/TypeSequence'
import { AthleteIntro } from './components/motion/AthleteIntro'
import { StatsAnimations } from './components/motion/StatsAnimations'
import { MatchupGraphic } from './components/motion/MatchupGraphic'
import { ScoreGraphic } from './components/motion/ScoreGraphic'
import { LowerThirds } from './components/motion/LowerThirds'
import { BreakingNews } from './components/motion/BreakingNews'
import { HighlightPackage, ReplayTransitions } from './components/motion/HighlightReplay'
import { Countdown } from './components/motion/Countdown'
import { SocialEndCard, SocialPromo } from './components/motion/SocialMotion'
import { MotionPreviewer } from './components/tools/MotionPreviewer'
import { AspectRatioPreviewer } from './components/tools/AspectRatioPreviewer'
import { BeforeAfterCompare } from './components/tools/BeforeAfterCompare'
import {
  aeTechniques,
  assetLibrary,
  motionPrinciples,
  premiereUses,
  storyboardBeats,
  styleFrames,
} from './data/content'

function StyleFrameArt({ tone, title }: { tone: string; title: string }) {
  const photoClass =
    tone === 'marcus'
      ? 'athlete-photo--marcus'
      : tone === 'soccer'
        ? 'athlete-photo--soccer'
        : tone === 'court'
          ? 'athlete-photo--court'
          : tone === 'crowd'
            ? 'athlete-photo--crowd'
            : tone === 'logo'
              ? ''
              : 'athlete-photo--sprint'

  if (tone === 'logo') {
    return (
      <div className="frame-art frame-art--logo">
        <div className="frame-art__bar" />
        <span className="frame-art__label">
          PULSE <span className="signal">SPORTS</span>
        </span>
      </div>
    )
  }

  return (
    <div className="frame-art">
      <div className={`athlete-photo ${photoClass}`} />
      <div className="frame-art__bar" />
      <span className="frame-art__label">{title}</span>
    </div>
  )
}

export default function App() {
  return (
    <>
      <div className="pulse-grain" aria-hidden="true" />
      <SiteNav />

      <main id="top">
        <section className="hero">
          <div className="hero__bg" aria-hidden="true" />
          <div className="hero__scan" aria-hidden="true" />
          <div className="hero__clock" aria-hidden="true">
            00:<span>01</span>
          </div>
          <div className="hero__content">
            <p className="kicker">Motion Graphics · Broadcast · Social</p>
            <h1 className="hero__brand">
              PULSE
              <em>SPORTS</em>
            </h1>
            <p className="hero__line">FEEL EVERY SECOND.</p>
            <p className="hero__offer">
              A fictional live sports media brand — and a self-initiated portfolio project built to
              prove a static identity can move with purpose, timing, and restraint.
            </p>
            <div className="hero__actions">
              <a className="btn btn--signal" href="#previewer">
                Open Motion Previewer
              </a>
              <a className="btn btn--ghost" href="#challenge">
                Read the Case Study
              </a>
            </div>
            <div className="hero__meta">
              <span>After Effects · Premiere · Photoshop · Illustrator</span>
              <span>Web prototypes in React · GSAP</span>
            </div>
          </div>
        </section>

        <Section
          id="challenge"
          kicker="01 · Challenge"
          title="Challenge"
          lead="Create a flexible motion identity capable of supporting sports broadcasts, digital video, and social content."
        >
          <div className="prose-block">
            <div>
              <p>
                Sports are experienced through moments — a shot, a save, a goal, a finish, a record,
                a fraction of a second. PULSE SPORTS needed a motion language that makes every
                graphic feel like something important is about to happen.
              </p>
              <p style={{ marginTop: '1rem' }}>
                The system had to travel from a 16:9 broadcast open to a 9:16 social promo without
                losing hierarchy, timing, or brand clarity.
              </p>
            </div>
            <ul className="concept-list" aria-label="Concept pillars">
              <li>TIME</li>
              <li>MOMENTUM</li>
              <li>ENERGY</li>
              <li>SPEED</li>
              <li>ANTICIPATION</li>
              <li>IMPACT</li>
            </ul>
          </div>
          <div className="divider-line" />
          <p className="kicker" style={{ marginBottom: '0.5rem' }}>
            Concept
          </p>
          <h3 className="display" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
            FEEL EVERY SECOND.
          </h3>
        </Section>

        <Section
          id="identity"
          kicker="02 · Identity"
          title="PULSE Identity"
          lead="Placeholders for the primary mark, wordmark, type, color, photography, and motion principles. Final assets will be produced in Illustrator and Photoshop."
        >
          <div className="identity-grid">
            <article className="identity-card">
              <h3>Primary Logo</h3>
              <div className="type-sample">
                PULSE
                <small>Wordmark + signal bar</small>
              </div>
            </article>
            <article className="identity-card">
              <h3>Symbol</h3>
              <div className="type-sample">
                P<span className="signal">/</span>S
                <small>Pulse stroke · impact core</small>
              </div>
            </article>
            <article className="identity-card">
              <h3>Typography</h3>
              <div className="type-sample">
                BEBAS / OSWALD
                <small>Sora for interface & body</small>
              </div>
            </article>
            <article className="identity-card">
              <h3>Color System</h3>
              <div className="swatch-row" aria-label="Color swatches">
                <div className="swatch" style={{ background: '#08090b' }} title="Black" />
                <div className="swatch" style={{ background: '#f4f5f7' }} title="White" />
                <div className="swatch" style={{ background: '#e82020' }} title="Signal" />
                <div className="swatch" style={{ background: '#7a8290' }} title="Steel" />
                <div className="swatch" style={{ background: '#1aa34a' }} title="Live" />
              </div>
              <p>Signal red on near-black. Live green only for status.</p>
            </article>
            <article className="identity-card">
              <h3>Graphic Language</h3>
              <p>Hard frames, signal bars, cropped type, tabular numbers, sports geometry.</p>
            </article>
            <article className="identity-card">
              <h3>Photography</h3>
              <p>Athlete crops, decisive moments, high contrast. Atmosphere over decoration.</p>
            </article>
            <article className="identity-card">
              <h3>Motion Principles</h3>
              <p>Fast resolve. Sharp ease-out. Hold to read. Exit clean. Never animate for sport.</p>
            </article>
            <article className="identity-card">
              <h3>Brand Line</h3>
              <div className="type-sample" style={{ fontSize: '1.6rem', letterSpacing: '0.18em' }}>
                FEEL EVERY SECOND.
              </div>
            </article>
          </div>
        </Section>

        <Section
          id="principles"
          kicker="03 · Motion Principles"
          title="Motion is a system"
          lead="Purpose, timing, hierarchy, consistency, restraint — every animation earns its place."
        >
          <div className="principle-grid">
            {motionPrinciples.map((p) => (
              <article key={p.id} className="principle-card">
                <h3>{p.title}</h3>
                <p className="summary">{p.summary}</p>
                <p className="detail">{p.detail}</p>
              </article>
            ))}
          </div>
        </Section>

        <Section
          id="style-frames"
          kicker="04 · Style Frames"
          title="Style Frames"
          lead="Key moments designed as strong static compositions before animation — Graphic Design → Motion Design."
        >
          <div className="frame-grid">
            {styleFrames.map((frame) => (
              <article key={frame.id} className="frame-card">
                <div className="frame-card__art">
                  <StyleFrameArt tone={frame.tone} title={frame.title} />
                </div>
                <div className="frame-card__body">
                  <h3>{frame.title}</h3>
                  <p>{frame.caption}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="divider-line" />
          <h3 className="display" style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>
            Before / After
          </h3>
          <BeforeAfterCompare />
          <p className="placeholder-note">
            Replace these presentations with final Photoshop style frames when available.
          </p>
        </Section>

        <Section
          id="logo-motion"
          kicker="05 · Logo Motion"
          title="Logo Animation"
          lead="Three short concepts sized for contemporary sports media — never an unnecessarily long reveal."
        >
          <div className="motion-grid">
            <LogoImpact />
            <LogoBuild />
            <LogoPulse />
          </div>
        </Section>

        <Section
          id="intro"
          kicker="06 · Sports Intro"
          title="Network Intro"
          lead="A 5–7 second open that establishes the entire motion language."
        >
          <NetworkIntro />
        </Section>

        <Section
          id="typography"
          kicker="07 · Typography"
          title="Animated Typography"
          lead="SPEED · POWER · PRECISION · PRESSURE · MOMENT · PULSE — type interacting with athlete footage."
        >
          <TypeSequence />
        </Section>

        <Section
          id="athlete"
          kicker="08 · Athlete Graphics"
          title="Athlete Introduction"
          lead="Name, number, position, team, optional statistic — 3–5 seconds."
        >
          <div className="grid-2">
            <AthleteIntro />
            <div>
              <Countdown />
            </div>
          </div>
        </Section>

        <Section
          id="statistics"
          kicker="09 · Statistics"
          title="Player Statistics"
          lead="Numbers as a major visual component — single stat, player card, comparison, season performance."
        >
          <StatsAnimations />
        </Section>

        <Section
          id="score"
          kicker="10 · Score & Matchup"
          title="Score & Matchup"
          lead="Restrained systems that communicate instantly across pregame and live contexts."
        >
          <div className="grid-2">
            <ScoreGraphic />
            <MatchupGraphic />
          </div>
        </Section>

        <Section
          id="broadcast"
          kicker="11 · Broadcast Package"
          title="Broadcast Package"
          lead="Lower thirds, breaking news, highlights, and replay transitions — one identity across editorial beats."
        >
          <div className="lt-stack">
            <LowerThirds />
            <BreakingNews />
          </div>
          <div className="divider-line" />
          <div className="grid-2">
            <HighlightPackage />
            <ReplayTransitions />
          </div>
        </Section>

        <Section
          id="social"
          kicker="12 · Social Motion"
          title="Social Motion"
          lead="The same motion system adapted across 9:16, 1:1, 4:5, and 16:9 — rebuilt, not cropped."
        >
          <div className="grid-2">
            <SocialPromo ratio="9:16" />
            <SocialEndCard />
          </div>
          <div className="divider-line" />
          <h3 className="display" style={{ fontSize: '2rem', marginBottom: '1rem' }}>
            Aspect Ratio Previewer
          </h3>
          <AspectRatioPreviewer />
        </Section>

        <Section
          id="previewer"
          kicker="13 · Motion Previewer"
          title="Motion Previewer"
          lead="Select a package. Replay. Keep controls minimal."
        >
          <MotionPreviewer />
        </Section>

        <Section
          id="storyboard"
          kicker="14 · Storyboard"
          title="Storyboard"
          lead="Development path for one major motion piece — from concept through final."
        >
          <div className="story-flow">
            {storyboardBeats.map((beat) => (
              <article key={beat.step} className="story-beat">
                <div className="step">{beat.step}</div>
                <h3>{beat.title}</h3>
                <p>{beat.note}</p>
              </article>
            ))}
          </div>
          <div className="divider-line" />
          <div className="grid-2">
            <div className="video-slot">Storyboard sketches placeholder · drop PDF / frames here</div>
            <div className="video-slot">Animatic / AE export placeholder · replace with MP4</div>
          </div>
        </Section>

        <Section
          id="production"
          kicker="15 · Production"
          title="After Effects & Premiere"
          lead="Techniques used where appropriate — not claimed for their own sake. AE leads motion; Premiere leads edit and delivery."
        >
          <div className="prod-cols">
            <div className="panel panel--soft" style={{ padding: '1.25rem' }}>
              <p className="kicker">Adobe After Effects</p>
              <h3 className="display" style={{ fontSize: '2rem', marginBottom: '1rem' }}>
                Primary motion application
              </h3>
              <div className="tech-grid">
                {aeTechniques.map((t) => (
                  <span key={t} className="tech-pill">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="panel panel--soft" style={{ padding: '1.25rem' }}>
              <p className="kicker">Adobe Premiere Pro</p>
              <h3 className="display" style={{ fontSize: '2rem', marginBottom: '1rem' }}>
                Edit & assembly
              </h3>
              <ul className="concept-list">
                {premiereUses.map((u) => (
                  <li key={u} style={{ fontSize: '1.1rem' }}>
                    {u}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="placeholder-note" style={{ marginTop: '1rem' }}>
            Photoshop for athlete composites and style frames · Illustrator for logo and vector
            systems.
          </p>
        </Section>

        <Section
          id="library"
          kicker="16 · Asset Library"
          title="Motion Asset Library"
          lead="One motion identity — reusable components for broadcast, digital, and social."
        >
          <div className="library-grid">
            {assetLibrary.map((item) => (
              <a key={item.id} className="library-item" href="#previewer">
                <span>{item.group}</span>
                <strong>{item.label}</strong>
              </a>
            ))}
          </div>
        </Section>

        <Section
          id="system"
          kicker="17 · Final System"
          title="Final Motion System"
          lead="Can this designer take a static visual identity and make it move professionally? The system is built to answer yes."
        >
          <div className="prose-block">
            <div>
              <p>
                Every prototype here is structured for replacement with final After Effects and
                Premiere exports. Timing, hierarchy, and graphic language stay consistent whether
                the surface is a score bug, a social end card, or a network open.
              </p>
              <p style={{ marginTop: '1rem' }}>
                Motion stays intentional: purpose, timing, hierarchy, consistency, restraint.
              </p>
            </div>
            <div className="panel panel--soft" style={{ padding: '1.25rem' }}>
              <p className="kicker">Replaceable media slots</p>
              <div className="video-slot" style={{ marginTop: '0.75rem' }}>
                /public/media/*.mp4 — drop final AE/PR exports
              </div>
            </div>
          </div>
        </Section>

        <section className="closing" id="close">
          <div className="wrap">
            <h2>
              PULSE <span className="signal">SPORTS</span>
            </h2>
            <p className="tag">FEEL EVERY SECOND.</p>
            <p>
              PULSE SPORTS is a fictional self-initiated portfolio project created to demonstrate
              motion graphics, sports design, animated typography, broadcast graphics, video
              editing, and cross-platform motion systems.
            </p>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <span>PULSE SPORTS · Motion Portfolio Case Study</span>
        <a href="../../index.html">Artistic Fountain</a>
      </footer>
    </>
  )
}
