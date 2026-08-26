import { SiteNav } from './components/layout/SiteNav'
import { Section } from './components/layout/Section'
import { HeroFilm, CutdownSelector } from './components/motion/HeroFilm'
import { AthleteIntro, PerformanceStat, ProductReveal } from './components/motion/AthleteProduct'
import { AthleteProductBridge, KineticType, TransitionWipe } from './components/motion/BridgeType'
import { EndCard, SocialPromo } from './components/motion/Social'
import { MotionPreviewer } from './components/tools/MotionPreviewer'
import { AspectRatioPreviewer } from './components/tools/AspectRatioPreviewer'
import { TemplateSystem } from './components/tools/TemplateSystem'
import {
  aeTechniques,
  applications,
  assetLibrary,
  cutdowns,
  heroBeats,
  motionModes,
  socialFamily,
  storyboardBeats,
} from './data/content'

export default function App() {
  return (
    <>
      <SiteNav />
      <main id="top">
        <section className="hero">
          <div className="hero__bg" aria-hidden="true" />
          <div className="hero__tag tech">HOCKEY PERFORMANCE CAMPAIGN</div>
          <div className="hero__content">
            <p className="kicker" style={{ color: 'var(--shift-volt)' }}>
              Motion Design · Product · Athlete Storytelling
            </p>
            <h1 className="hero__brand">
              BUILT FOR <em>THE SHIFT.</em>
            </h1>
            <p className="hero__offer">
              A hockey equipment performance campaign where every motion beat maps athlete action to
              product response — After Effects at the center of a scalable content system.
            </p>
            <div className="hero__actions">
              <a className="btn btn--volt" href="#hero-film">
                Watch Hero Film Prototype
              </a>
              <a className="btn btn--ghost" href="#challenge">
                Read the Case Study
              </a>
            </div>
            <div className="hero__meta">
              <span>After Effects · Premiere · Photoshop · Illustrator</span>
              <span>Web prototypes · React · GSAP</span>
            </div>
          </div>
        </section>

        <Section
          id="challenge"
          kicker="01 · Challenge"
          title="Challenge"
          lead="How do you communicate equipment performance through the actual experience of playing hockey?"
        >
          <div className="grid-2">
            <p style={{ color: 'var(--shift-slate)', fontSize: '1.05rem' }}>
              Sports motion often defaults to broadcast packaging — scores, lower thirds, network
              opens. A hockey equipment brand needs something different: proof that gear answers
              what happens during a shift.
            </p>
            <div className="flow-chain" aria-label="Campaign relationship">
              <span>ATHLETE</span>
              <i>→</i>
              <span>ACTION</span>
              <i>→</i>
              <span>PERFORMANCE</span>
              <i>→</i>
              <span>PRODUCT</span>
            </div>
          </div>
        </Section>

        <Section
          id="insight"
          kicker="02 · Insight"
          title="Every shift demands something different."
          lead="A shift is the period when the player is actually on the ice — and the equipment has to perform."
          dark
        >
          <ul className="insight-list" aria-label="Shift demands">
            <li>MOMENTUM SHIFTS</li>
            <li>DIRECTION SHIFTS</li>
            <li>SPEED SHIFTS</li>
            <li>POSSESSION SHIFTS</li>
            <li>PRESSURE SHIFTS</li>
            <li>THE GAME SHIFTS</li>
          </ul>
        </Section>

        <Section
          id="idea"
          kicker="03 · Campaign Idea"
          title="BUILT FOR THE SHIFT."
          lead="Connect on-ice moments directly to athlete performance and equipment — acceleration, control, contact, shooting, recovery, immediate reaction."
        >
          <div className="panel" style={{ padding: '1.25rem' }}>
            <p className="tech" style={{ color: 'var(--shift-iceblue)', marginBottom: '0.75rem' }}>
              CORE TRUTH
            </p>
            <p style={{ fontSize: '1.15rem', maxWidth: '40rem' }}>
              Every shift asks something different from the player. Their equipment has to answer
              every time.
            </p>
          </div>
        </Section>

        <Section
          id="art"
          kicker="04 · Art Direction"
          title="Art Direction"
          lead="Photography, color, typography, and composition tuned for hockey performance advertising — not a broadcast network."
        >
          <div className="art-grid">
            <article className="art-card">
              <h3>Color System</h3>
              <div className="swatch-row" aria-label="Palette">
                <div className="swatch" style={{ background: '#121820' }} title="Ink" />
                <div className="swatch" style={{ background: '#1b2533' }} title="Steel" />
                <div className="swatch" style={{ background: '#eef3f7' }} title="Ice" />
                <div className="swatch" style={{ background: '#1fa9e0' }} title="Ice Blue" />
                <div className="swatch" style={{ background: '#b8f000' }} title="Volt" />
                <div className="swatch" style={{ background: '#ff8a3d' }} title="Amber" />
              </div>
              <p>Deep technical neutral + ice environments. Ice blue = performance. Volt = data.</p>
            </article>
            <article className="art-card">
              <h3>Typography</h3>
              <div className="type-stack">
                <div className="display">ACCELERATE</div>
                <div className="info">Product information · athlete copy</div>
                <div className="tech">0.38s · 92 MPH · EDGE 27°</div>
              </div>
            </article>
            <article className="art-card">
              <h3>Photography</h3>
              <p>
                Ice atmosphere, decisive athlete moments, macro equipment detail. Crop for energy;
                keep product readable.
              </p>
            </article>
            <article className="art-card">
              <h3>Composition</h3>
              <p>
                Hard frames, tracking lines, product isolation zones. Light and dark environments
                both carry the campaign.
              </p>
            </article>
            <article className="art-card">
              <h3>Voice</h3>
              <p>
                Aggressive and athletic without defaulting to black-and-red broadcast chrome.
              </p>
            </article>
            <article className="art-card">
              <h3>Brand Line</h3>
              <div className="display" style={{ fontSize: '1.8rem' }}>
                BUILT FOR THE SHIFT.
              </div>
            </article>
          </div>
        </Section>

        <Section
          id="motion-lang"
          kicker="05 · Motion Language"
          title="Motion becomes part of the idea"
          lead="Animation style changes with what is happening on the ice — not one effect applied everywhere."
          dark
        >
          <div className="mode-grid">
            {motionModes.map((m) => (
              <article key={m.id} className="mode-card">
                <h3>{m.title}</h3>
                <p className="summary">{m.summary}</p>
                <p className="detail">{m.detail}</p>
              </article>
            ))}
          </div>
          <div className="divider-line" />
          <KineticType />
        </Section>

        <Section
          id="hero-film"
          kicker="06 · Hero Film"
          title=":30 Campaign Film"
          lead="The centerpiece follows the rhythm of a hockey shift — athlete performance cutting into equipment."
          panel
        >
          <div className="grid-2">
            <HeroFilm />
            <div>
              <ul className="beat-list">
                {heroBeats.map((b) => (
                  <li key={b.t}>
                    <span className="t">{b.t}</span>
                    <strong>{b.title}</strong>
                    <p>{b.note}</p>
                  </li>
                ))}
              </ul>
              <div className="divider-line" />
              <CutdownSelector />
              <div className="chip-row" style={{ marginTop: '1rem' }}>
                {cutdowns.map((c) => (
                  <span key={c.id} className="chip">
                    {c.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Section>

        <Section
          id="athlete"
          kicker="07 · Athlete"
          title="Athlete Storytelling"
          lead="Replaceable athlete templates — name, number, footage, shift story."
        >
          <AthleteIntro />
        </Section>

        <Section
          id="performance"
          kicker="08 · Performance"
          title="Performance Graphics"
          lead="Technical typography for measurements that connect play to product."
          dark
        >
          <PerformanceStat />
        </Section>

        <Section
          id="product"
          kicker="09 · Product"
          title="Product Motion"
          lead="Equipment as a campaign hero — rotation placeholders, macro detail, animated technical callouts."
        >
          <ProductReveal />
        </Section>

        <Section
          id="athlete-product"
          kicker="10 · Athlete × Product"
          title="Connect performance to equipment"
          lead="Do not separate athlete graphics and product graphics. Show the transition as one story."
          panel
        >
          <AthleteProductBridge />
          <div className="divider-line" />
          <TransitionWipe />
        </Section>

        <Section
          id="social"
          kicker="11 · Social"
          title="Social is a primary deliverable"
          lead="A complete content family from one footage set — organic, athlete, product, and paid."
        >
          <div className="social-chips" style={{ marginBottom: '1.25rem' }}>
            {socialFamily.map((s) => (
              <span key={s}>{s}</span>
            ))}
          </div>
          <div className="grid-2">
            <SocialPromo ratio="9:16" />
            <EndCard />
          </div>
          <div className="divider-line" />
          <h3 className="display" style={{ fontSize: '2rem', marginBottom: '1rem' }}>
            Format Adaptation
          </h3>
          <AspectRatioPreviewer />
        </Section>

        <Section
          id="applications"
          kicker="12 · Campaign Applications"
          title="Industry-standard deliverable system"
          lead="One creative idea expanded across a realistic media ecosystem."
          dark
        >
          <div className="app-grid">
            {applications.map((a) => (
              <article key={a.id} className="app-item">
                <span>CHANNEL</span>
                <strong>{a.title}</strong>
                <p>{a.note}</p>
              </article>
            ))}
          </div>
        </Section>

        <Section
          id="storyboard"
          kicker="13 · Storyboard"
          title="Storyboard"
          lead="Planning the athlete → product relationship before a single keyframe."
        >
          <div className="story-flow">
            {storyboardBeats.map((b) => (
              <article key={b.step} className="story-beat">
                <div className="step">{b.step}</div>
                <h3>{b.title}</h3>
                <p>{b.note}</p>
              </article>
            ))}
          </div>
          <div className="divider-line" />
          <div className="grid-2">
            <div className="video-slot">Storyboard / style-frame placeholder</div>
            <div className="video-slot">Animatic placeholder · temp audio hits</div>
          </div>
        </Section>

        <Section
          id="development"
          kicker="14 · Motion Development"
          title="After Effects Process"
          lead="Creative thinking proven with technical craft — used where appropriate, not claimed for sport."
          panel
        >
          <div className="tech-grid" style={{ marginBottom: '1.25rem' }}>
            {aeTechniques.map((t) => (
              <span key={t} className="tech-pill">
                {t}
              </span>
            ))}
          </div>
          <div className="grid-2">
            <div className="video-slot">Timeline / Graph Editor capture placeholder</div>
            <div className="video-slot">Tracking / mattes / pre-comp structure placeholder</div>
          </div>
          <p className="placeholder-note">
            Premiere for edit assembly, audio, and final social/OLV exports. AE remains the primary
            motion application.
          </p>
        </Section>

        <Section
          id="templates"
          kicker="15 · Template System"
          title="Reusable motion components"
          lead="Give me the athlete, footage, product, and performance story — the system builds around it."
        >
          <TemplateSystem />
          <div className="divider-line" />
          <MotionPreviewer />
        </Section>

        <Section
          id="library"
          kicker="16 · Asset Library"
          title="Production organization"
          lead="Campaign components that share one motion identity."
          dark
        >
          <div className="library-grid">
            {assetLibrary.map((item) => (
              <a key={item.id} className="library-item" href="#templates">
                <span>{item.group}</span>
                <strong>{item.label}</strong>
              </a>
            ))}
          </div>
        </Section>

        <Section
          id="system"
          kicker="17 · Full Campaign System"
          title="Everything originates from one line"
          lead="Hero film, social, athlete content, product video, paid, web, display, retail, arena, key art."
        >
          <h3 className="display" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '1rem' }}>
            BUILT FOR THE SHIFT.
          </h3>
          <p style={{ color: 'var(--shift-slate)', maxWidth: '40rem' }}>
            Prototypes here are structured for replacement with final After Effects and Premiere
            exports. Timing, hierarchy, and product storytelling stay consistent across every
            channel.
          </p>
        </Section>

        <section className="closing" id="close">
          <div className="wrap">
            <h2>
              BUILT FOR <em>THE SHIFT.</em>
            </h2>
            <p>
              A self-initiated hockey performance campaign created to demonstrate sports
              advertising, athlete storytelling, product marketing, After Effects craft, motion
              systems, and how one campaign idea scales into a family of content.
            </p>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <span>BUILT FOR THE SHIFT · Hockey Performance Campaign</span>
        <a href="../../index.html">Artistic Fountain</a>
      </footer>
    </>
  )
}
