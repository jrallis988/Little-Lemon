import { colorSystem, typeSystem } from '../../data/content'

export function VisualSystem() {
  const musicTokens = [
    ['Album artwork', 'Always visible music ownership'],
    ['Song + artist titles', 'Named tracks, not generic “workout”'],
    ['Playlist covers', 'Discovery objects people recognize'],
    ['BPM + waveforms', 'Energy as graphic language'],
    ['Playback UI', 'Reminds viewers this is Spotify'],
    ['Listening history', 'Personalization made visual'],
  ]

  return (
    <section className="section" id="visual-system">
      <div className="shell">
        <p className="section-kicker">09 — Visual language</p>
        <h2 className="section-title">Color responds to energy. Type moves with the rhythm.</h2>
        <p className="section-lede">
          A Spotify campaign about running—not a running app sponsored by Spotify.
          Music cues stay visually present at every turn.
        </p>

        <div className="color-row">
          {colorSystem.map((c) => (
            <div className="color-swatch" key={c.name}>
              <div className="swatch" style={{ background: c.swatch }} />
              <strong>{c.name}</strong>
              <span>{c.role}</span>
            </div>
          ))}
        </div>

        <div className="visual-demo" style={{ marginTop: '1.25rem' }}>
          <div className="visual-track" aria-hidden>
            <span className="mile">BPM 142</span>
            <span className="route" />
            <span className="bpm">POWER TRACK</span>
            <span className="route hot" />
            <span className="split">3:42</span>
            <span className="wave" />
          </div>
          <div className="state-strip">
            {typeSystem.map((t) => (
              <span
                key={t.state}
                className={`state-pill state-${t.state.toLowerCase()}`}
              >
                {t.state} · {t.feel}
              </span>
            ))}
          </div>
        </div>

        <div className="grid-3" style={{ marginTop: '1.25rem' }}>
          {musicTokens.map(([t, d]) => (
            <article className="panel" key={t}>
              <h3>{t}</h3>
              <p>{d}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
