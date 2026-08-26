import { useState } from 'react'
import { CaseNav } from './components/CaseNav'
import { SocialPost } from './components/SocialPost'
import { ArtistCard } from './components/ArtistCard'
import { Carousel } from './components/Carousel'
import { Story } from './components/Story'
import { Reel } from './components/Reel'
import { MotionTypography } from './components/MotionTypography'
import { InstagramGrid } from './components/InstagramGrid'
import { SocialPreviewer } from './components/SocialPreviewer'
import { CampaignAsset } from './components/CampaignAsset'
import {
  artists,
  assetLibrary,
  brand,
  calendar,
  engagement,
  feedPosts,
  infoCarousel,
  lineupCarousel,
  palette,
  performanceMetrics,
  stories,
  typography,
} from './data/campaign'

export default function App() {
  const [reelPlaying, setReelPlaying] = useState(false)
  const [typePlaying, setTypePlaying] = useState(false)

  const headliner = artists.find((a) => a.tier === 'headliner')!
  const featured = artists.find((a) => a.tier === 'featured')!
  const emerging = artists.find((a) => a.tier === 'emerging')!

  return (
    <div className="case" id="top">
      <CaseNav />

      {/* Hero */}
      <header className="hero">
        <div className="hero__noise" aria-hidden="true" />
        <div className="hero__inner">
          <p className="hero__meta">Instagram Campaign System · Fictional Portfolio Project</p>
          <h1 className="hero__brand">{brand.name}</h1>
          <p className="hero__campaign">{brand.campaign}</p>
          <p className="hero__offer">
            A contemporary three-day music festival campaign built as an Instagram-native visual and
            content system — not a stack of disconnected graphics.
          </p>
          <div className="hero__tags">
            <span className="hero__tag">Social design</span>
            <span className="hero__tag">Typography</span>
            <span className="hero__tag">Art direction</span>
            <span className="hero__tag">Motion</span>
            <span className="hero__tag">Content strategy</span>
          </div>
        </div>
      </header>

      <main id="main">
        {/* Challenge */}
        <section className="section" id="challenge">
          <div className="section__inner">
            <p className="section__kicker">01 — Challenge</p>
            <h2 className="section__title">MAKE THE FEED FEEL LIKE A FESTIVAL</h2>
            <div className="grid-2">
              <div className="prose">
                <p>
                  Independent festivals compete for attention inside Instagram’s scroll — where
                  generic EDM glow, nightclub neon, and startup-template aesthetics all blur together.
                </p>
                <p>
                  The challenge: build a campaign system for <strong>{brand.name}</strong> that feels
                  energetic, editorial, and culturally aware for audiences 18–34, while staying
                  unmistakably Instagram-native across feed, Stories, Reels, and carousels.
                </p>
              </div>
              <ul className="list-ruled">
                <li>
                  <span className="num">01</span>
                  Design for the platform, not just for the poster.
                </li>
                <li>
                  <span className="num">02</span>
                  Create hierarchy across headliners, featured, and emerging artists.
                </li>
                <li>
                  <span className="num">03</span>
                  Balance spectacle with practical festival information.
                </li>
                <li>
                  <span className="num">04</span>
                  Leave final art replaceable for Photoshop / Illustrator / AE.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Audience + Insight */}
        <section className="section section--ink">
          <div className="section__inner grid-2">
            <div>
              <p className="section__kicker">02 — Audience</p>
              <h2 className="section__title">18–34. CULTURE-FORWARD.</h2>
              <p className="section__lede">
                Playlist-native listeners who discover artists through short video, follow festival
                accounts for lineup drops, and expect content that respects their visual literacy.
              </p>
              <div className="chips">
                <span className="chip">Alt / indie / pop / electronic</span>
                <span className="chip">Emerging-artist curious</span>
                <span className="chip">UGC fluent</span>
                <span className="chip">Ticket-price sensitive</span>
              </div>
            </div>
            <div>
              <p className="section__kicker">03 — Insight</p>
              <h2 className="section__title">VOLUME IS A VERB</h2>
              <p className="section__lede">
                Festival audiences don’t just want louder graphics — they want content that{' '}
                <em className="pull">turns up</em> anticipation, discovery, and belonging in the same
                scroll.
              </p>
              <p style={{ color: 'rgba(234,232,227,0.72)' }}>
                The campaign treats Instagram as a sequenced experience: awareness → artist
                discovery → education → conversion — with a single verbal hook holding every format
                together.
              </p>
            </div>
          </div>
        </section>

        {/* Strategy + Concept */}
        <section className="section" id="concept">
          <div className="section__inner">
            <p className="section__kicker">04 — Strategy</p>
            <h2 className="section__title">ONE LINE. MANY FORMATS.</h2>
            <p className="section__lede">
              <em>{brand.campaign}</em> is the campaign concept — a call to raise volume, presence,
              and commitment. Every asset either announces, explains, or invites interaction without
              abandoning that line.
            </p>
            <div className="grid-3">
              <article className="engage-card">
                <p className="engage-card__format">Announce</p>
                <h3 className="engage-card__prompt">Signal drops</h3>
                <p className="engage-card__why">
                  Festival reveal, headliners, tickets, and countdown graphics that punch in the
                  grid.
                </p>
              </article>
              <article className="engage-card">
                <p className="engage-card__format">Orient</p>
                <h3 className="engage-card__prompt">Useful clarity</h3>
                <p className="engage-card__why">
                  Info carousels and Stories that make the weekend feel navigable before gates open.
                </p>
              </article>
              <article className="engage-card">
                <p className="engage-card__format">Activate</p>
                <h3 className="engage-card__prompt">Two-way volume</h3>
                <p className="engage-card__why">
                  Polls, questions, UGC prompts, and Reels that turn spectators into participants.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* Visual Direction / Identity */}
        <section className="section section--steel" id="identity">
          <div className="section__inner">
            <p className="section__kicker">05 — Visual Direction</p>
            <h2 className="section__title">EDITORIAL ENERGY</h2>
            <p className="section__lede">
              Expressive type, decisive crops, paper texture, and controlled experimentation — no
              glow gradients, no nightclub chrome, no SaaS purple.
            </p>

            <div className="identity-board">
              <div className="id-panel id-panel--logo">
                <span className="cap">Festival logo / wordmark</span>
                <p className="mark">{brand.name}</p>
                <p>Replace with final Illustrator lockup</p>
              </div>
              <div className="id-panel id-panel--campaign">
                <span className="cap">Campaign wordmark</span>
                <p className="mark">{brand.campaign}</p>
              </div>
              <div className="id-panel id-panel--motion">
                <span className="cap">Motion principles</span>
                <p>Rhythmic cuts · typographic hits · minimal effects · musical timing</p>
              </div>
              <div className="id-panel id-panel--photo">
                <span className="cap">Photography</span>
                <p>High-contrast performance crops · crowd atmosphere · daylight + night duality</p>
              </div>
              <div className="id-panel id-panel--pattern">
                <span className="cap">Patterns / textures</span>
                <p>Hatch · paper grain · frequency bars · hard editorial frames</p>
              </div>
            </div>

            <div className="palette-row">
              {palette.map((c) => (
                <div
                  key={c.hex}
                  className="swatch"
                  style={{
                    background: c.hex,
                    color: c.hex === '#EAE8E3' || c.hex === '#D4FF00' ? '#111' : '#EAE8E3',
                  }}
                >
                  <span className="swatch__name">{c.name}</span>
                  <span className="swatch__hex">{c.hex}</span>
                  <span className="swatch__role">{c.role}</span>
                </div>
              ))}
            </div>

            <div className="type-spec">
              {typography.map((t) => (
                <article key={t.name}>
                  <p className="meta">
                    {t.name} — {t.role}
                  </p>
                  <p
                    className={
                      t.name.includes('Bebas')
                        ? 'sample-display'
                        : t.name.includes('Instrument')
                          ? 'sample-serif'
                          : t.name.includes('Mono')
                            ? 'sample-mono'
                            : 'sample-sans'
                    }
                  >
                    {t.sample}
                  </p>
                  <p style={{ color: 'rgba(234,232,227,0.55)', marginTop: '0.5rem', fontSize: '0.9rem' }}>
                    {t.usage}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Feed */}
        <section className="section" id="feed">
          <div className="section__inner">
            <p className="section__kicker">06 — Instagram Feed</p>
            <h2 className="section__title">A COORDINATED GRID</h2>
            <p className="section__lede">
              Nine campaign posts designed as a system: shared language, varied hierarchy, readable
              at thumbnail size and full-bleed.
            </p>
            <InstagramGrid posts={feedPosts} />
          </div>
        </section>

        {/* Artist system */}
        <section className="section section--ink" id="artists">
          <div className="section__inner">
            <p className="section__kicker">07 — Artist Announcement System</p>
            <h2 className="section__title">SAME LANGUAGE. DIFFERENT VOLUME.</h2>
            <p className="section__lede">
              Three reusable tiers — Headliner, Featured, Emerging — so dozens of assets can ship
              without cloning the same layout.
            </p>
            <div className="grid-3">
              <div>
                <ArtistCard artist={headliner} />
                <p className="story__label">Maximum scale · signal frame · ticket CTA</p>
              </div>
              <div>
                <ArtistCard artist={featured} />
                <p className="story__label">Angled crop · strong name · save CTA</p>
              </div>
              <div>
                <ArtistCard artist={emerging} />
                <p className="story__label">Square discovery · quieter tier mark</p>
              </div>
            </div>
            <div className="feed-strip" style={{ marginTop: '2.5rem' }}>
              {artists.slice(0, 6).map((artist) => (
                <ArtistCard key={artist.id} artist={artist} showCta={false} />
              ))}
            </div>
          </div>
        </section>

        {/* Carousels */}
        <section className="section" id="carousels">
          <div className="section__inner">
            <p className="section__kicker">08 — Carousels</p>
            <h2 className="section__title">SWIPE WITH INTENT</h2>
            <p className="section__lede">
              Lineup storytelling and practical festival information — each slide works alone, and
              still pulls the next swipe.
            </p>
            <div className="carousel-pair">
              <div className="carousel-block">
                <h3>Lineup carousel</h3>
                <p>Eight slides from reveal to ticket CTA — paced like a setlist.</p>
                <Carousel slides={lineupCarousel} label="Lineup carousel" />
              </div>
              <div className="carousel-block">
                <h3>Festival information</h3>
                <p>Accessibility-minded guide: when, where, map, packing, transit.</p>
                <Carousel slides={infoCarousel} label="Festival information carousel" />
              </div>
            </div>
          </div>
        </section>

        {/* Stories */}
        <section className="section section--steel" id="stories">
          <div className="section__inner">
            <p className="section__kicker">09 — Instagram Stories</p>
            <h2 className="section__title">SAFE-AREA AWARE</h2>
            <p className="section__lede">
              Eight Story concepts composed for 1080 × 1920 with critical type kept clear of
              Instagram’s interface chrome.
            </p>
            <div className="stories-row">
              {stories.map((story) => (
                <Story key={story.id} story={story} showSafeAreas={false} />
              ))}
            </div>
          </div>
        </section>

        {/* Reels + Motion type */}
        <section className="section section--ink" id="motion">
          <div className="section__inner">
            <p className="section__kicker">10 — Reels & Motion Typography</p>
            <h2 className="section__title">MUSICAL TIMING</h2>
            <p className="section__lede">
              Web prototypes for pacing — structured so final motion can be rebuilt in After Effects
              or Premiere.
            </p>

            <div className="motion-grid">
              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', marginBottom: '1rem' }}>
                  15-second Reel
                </h3>
                <Reel playing={reelPlaying} />
                <div className="motion-controls">
                  <button type="button" onClick={() => setReelPlaying((p) => !p)}>
                    {reelPlaying ? 'Pause' : 'Play prototype'}
                  </button>
                </div>
                <ul className="timeline">
                  <li>
                    <span className="t">0–2s</span>
                    <span>Strong visual hook — VOLUME UP</span>
                  </li>
                  <li>
                    <span className="t">2–5s</span>
                    <span>AMPLIFY reveal</span>
                  </li>
                  <li>
                    <span className="t">5–9s</span>
                    <span>Rapid artist / festival cuts</span>
                  </li>
                  <li>
                    <span className="t">9–12s</span>
                    <span>Dates + location</span>
                  </li>
                  <li>
                    <span className="t">12–15s</span>
                    <span>AMPLIFY · TURN IT UP. · CTA</span>
                  </li>
                </ul>
                <p className="motion-note">
                  Prototype only — recreate with photography and sound design in AE / Premiere.
                </p>
              </div>

              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', marginBottom: '1rem' }}>
                  Motion typography
                </h3>
                <MotionTypography playing={typePlaying} />
                <div className="motion-controls">
                  <button type="button" onClick={() => setTypePlaying((p) => !p)}>
                    {typePlaying ? 'Pause' : 'Play type'}
                  </button>
                </div>
                <p className="motion-note">
                  LOUD → LIVE → TOGETHER → AMPLIFY → TURN IT UP. Typography carries the rhythm;
                  effects stay minimal.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Engagement */}
        <section className="section" id="engagement">
          <div className="section__inner">
            <p className="section__kicker">11 — Engagement Content</p>
            <h2 className="section__title">NOT ONLY ADS</h2>
            <p className="section__lede">
              Interaction formats that invite the audience into the campaign — and explain why each
              prompt works.
            </p>
            <div className="engage-grid">
              {engagement.map((item) => (
                <article key={item.id} className="engage-card">
                  <p className="engage-card__format">{item.format}</p>
                  <h3 className="engage-card__prompt">{item.prompt}</h3>
                  <p className="engage-card__why">{item.why}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Calendar */}
        <section className="section" id="calendar">
          <div className="section__inner">
            <p className="section__kicker">12 — Content Calendar</p>
            <h2 className="section__title">FOUR WEEKS TO DOORS</h2>
            <p className="section__lede">
              A campaign plan that mixes feed, carousels, Stories, and Reels — presented as editorial
              campaign material, not project-management UI.
            </p>
            <div className="calendar">
              {calendar.map((week) => (
                <article key={week.week} className="cal-week">
                  <p className="cal-week__week">{week.week}</p>
                  <h3 className="cal-week__focus">{week.focus}</h3>
                  <p className="cal-week__intent">{week.intent}</p>
                  <ul className="cal-week__items">
                    {week.items.map((item) => (
                      <li key={`${week.week}-${item.day}-${item.title}`}>
                        <span className="day">{item.day}</span>
                        <span className="type">{item.type}</span>
                        <span className="title">{item.title}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Previewer */}
        <section className="section section--ink" id="previewer">
          <div className="section__inner">
            <p className="section__kicker">13 — Interactive Previewer</p>
            <h2 className="section__title">PLATFORM SPECS</h2>
            <p className="section__lede">
              Switch formats and toggle Instagram safe areas to demonstrate production literacy.
            </p>
            <SocialPreviewer />
          </div>
        </section>

        {/* Asset library */}
        <section className="section" id="assets">
          <div className="section__inner">
            <p className="section__kicker">14 — Campaign Asset Library</p>
            <h2 className="section__title">A SYSTEM, NOT A PILE</h2>
            <p className="section__lede">
              Reusable elements with clear replacement paths for final Photoshop, Illustrator, Figma,
              and After Effects artwork.
            </p>
            <div className="asset-grid">
              {assetLibrary.map((asset) => (
                <CampaignAsset key={asset.id} asset={asset} />
              ))}
            </div>
            <div className="feed-strip" style={{ marginTop: '2rem' }}>
              {feedPosts.slice(0, 3).map((post) => (
                <SocialPost key={`lib-${post.id}`} post={post} ratio="4:5" />
              ))}
            </div>
          </div>
        </section>

        {/* Performance */}
        <section className="section section--steel" id="performance">
          <div className="section__inner">
            <p className="section__kicker">15 — Performance Thinking</p>
            <h2 className="section__title">SIMULATED CAMPAIGN PERFORMANCE</h2>
            <div className="sim-banner" role="status">
              Simulated data — not actual campaign results
            </div>
            <p className="section__lede">
              Example metrics a social designer might review to guide the next creative decision.
            </p>
            <div className="metrics">
              {performanceMetrics.map((m) => (
                <div key={m.label} className="metric">
                  <p className="metric__value">{m.value}</p>
                  <p className="metric__label">{m.label}</p>
                  <p className="metric__note">{m.note}</p>
                </div>
              ))}
            </div>
            <div className="insight-box">
              <p>
                <strong>Creative implication:</strong> If artist-focused Reels generate stronger
                shares and watch time than static announcement graphics, the next phase increases
                artist-led short-form video — and uses static posts primarily for grid rhythm and
                ticket reminders.
              </p>
            </div>
          </div>
        </section>

        {/* Final */}
        <section className="section" id="final">
          <div className="section__inner">
            <p className="section__kicker">16 — Final Campaign</p>
            <div className="final-lockup">
              <p className="final-lockup__brand">{brand.name}</p>
              <p className="final-lockup__campaign">{brand.campaign}</p>
              <p className="final-lockup__disclaimer">
                AMPLIFY is a self-initiated fictional portfolio project created to demonstrate
                social-media campaign design and strategy.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="case-footer">
        <span>AMPLIFY · Instagram Campaign Case Study</span>
        <a href="../../index.html">Return to portfolio</a>
      </footer>
    </div>
  )
}
