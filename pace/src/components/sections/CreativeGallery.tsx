import { deviceMocks, paceCardVariants, playlistCovers } from '../../data/content'

export function CreativeGallery() {
  return (
    <section className="section" id="gallery">
      <div className="shell">
        <p className="section-kicker">08b — Creative gallery</p>
        <h2 className="section-title">Campaign assets, not explanations.</h2>
        <p className="section-lede">
          Card variants, playlist covers, and platform frames—so the viewer
          experiences PACE before reading another metric.
        </p>

        <h3 className="gallery-label">PACE Card variants</h3>
        <div className="card-variant-grid">
          {paceCardVariants.map((card) => (
            <article
              className={`mini-card mini-card--${card.state.toLowerCase()}`}
              key={card.id}
              style={{ ['--card-accent' as string]: card.accent }}
            >
              <div className="mini-card-top">
                <span>PACE</span>
                <span className="mini-state">{card.state}</span>
              </div>
              <p className="mini-personality">{card.personality}</p>
              <h4>{card.name}</h4>
              <div className="mini-bpm">
                <span>Avg music BPM</span>
                <strong>{card.bpm}</strong>
              </div>
              <p className="mini-track">
                <span>Power track</span>
                {card.powerTrack}
                <em>{card.artist}</em>
              </p>
              <p className="mini-sound">{card.sound}</p>
              <div className="mini-art" aria-hidden />
              <p className="mini-footer">FIND YOUR PACE.</p>
            </article>
          ))}
        </div>

        <h3 className="gallery-label">Playlist cover system</h3>
        <div className="playlist-grid">
          {playlistCovers.map((pl) => (
            <article
              className={`playlist-cover playlist--${pl.state.toLowerCase()}`}
              key={pl.id}
            >
              <div className="playlist-art" aria-hidden>
                <span className="playlist-wave" />
                <span className="playlist-state-tag">{pl.state}</span>
              </div>
              <h4>{pl.title}</h4>
              <p>{pl.subtitle}</p>
              <div className="playlist-meta">
                <span>{pl.tracks} tracks</span>
                <span>{pl.mood}</span>
              </div>
            </article>
          ))}
        </div>

        <h3 className="gallery-label">Platform frames</h3>
        <div className="device-grid">
          {deviceMocks.map((mock) => (
            <article
              className={`device-frame device--${mock.platform.toLowerCase().replace(/\s+/g, '-')}`}
              key={mock.id}
            >
              <div className="device-chrome">
                <span>{mock.platform}</span>
                <span>{mock.format}</span>
              </div>
              <div className={`device-stage device-stage--${mock.state.toLowerCase()}`}>
                <div className="device-album" aria-hidden />
                <div className="device-wave-row" aria-hidden>
                  <i /><i /><i /><i /><i /><i />
                </div>
                <p className="device-headline">{mock.headline}</p>
                <p className="device-track">{mock.track}</p>
                <span className="device-cta">{mock.cta}</span>
              </div>
            </article>
          ))}
        </div>

        <p className="gallery-note">
          Presentation comps for the case study. Final photography, licensed
          artwork, and motion would be produced in Figma, Photoshop, Illustrator,
          Premiere, and After Effects.
        </p>
      </div>
    </section>
  )
}
