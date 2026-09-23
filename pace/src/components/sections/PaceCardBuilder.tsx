import { useMemo, useState } from 'react'

const personalities = [
  { id: 'pacer', label: 'THE PACER', accent: '#1DB954', sound: 'Alt · Electronic · Indie' },
  { id: 'starter', label: 'THE STARTER', accent: '#2F6BFF', sound: 'Indie · Ambient' },
  { id: 'pusher', label: 'THE PUSHER', accent: '#C5FF3D', sound: 'Electronic · Dance' },
  { id: 'finisher', label: 'THE FINISHER', accent: '#FF5A36', sound: 'Hip-Hop · Anthem' },
]

const states = [
  { id: 'Start', bpm: '128' },
  { id: 'Flow', bpm: '152' },
  { id: 'Push', bpm: '168' },
  { id: 'Beat', bpm: '174' },
  { id: 'Recover', bpm: '110' },
]

const tracks = [
  { title: 'Blinding Lights', artist: 'The Weeknd' },
  { title: 'Losing It', artist: 'Fisher' },
  { title: 'Go', artist: 'The Chemical Brothers' },
  { title: 'Lose Yourself', artist: 'Eminem' },
  { title: 'Intro', artist: 'The xx' },
  { title: 'Starboy', artist: 'The Weeknd' },
]

export function PaceCardBuilder() {
  const [name, setName] = useState('Alex Rivera')
  const [personality, setPersonality] = useState(personalities[0])
  const [state, setState] = useState(states[1])
  const [track, setTrack] = useState(tracks[0])

  const playlist = useMemo(() => `PACE: ${state.id}`, [state.id])

  return (
    <section className="section" id="card-builder">
      <div className="shell">
        <p className="section-kicker">08c — Interactive payoff</p>
        <h2 className="section-title">Build a PACE Card.</h2>
        <p className="section-lede">
          A lightweight prototype of the shareable soundtrack identity—music
          first, always labeled as simulated.
        </p>

        <div className="builder-layout">
          <div className="builder-controls">
            <label className="builder-field">
              <span>Runner name</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={28}
                aria-label="Runner name"
              />
            </label>

            <div className="builder-field">
              <span>Running personality</span>
              <div className="chip-row">
                {personalities.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    className={`chip${personality.id === p.id ? ' chip-active' : ''}`}
                    onClick={() => setPersonality(p)}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="builder-field">
              <span>Pace state</span>
              <div className="chip-row">
                {states.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    className={`chip${state.id === s.id ? ' chip-active' : ''}`}
                    onClick={() => setState(s)}
                  >
                    {s.id}
                  </button>
                ))}
              </div>
            </div>

            <div className="builder-field">
              <span>Power track</span>
              <div className="chip-row">
                {tracks.map((t) => (
                  <button
                    key={t.title}
                    type="button"
                    className={`chip${track.title === t.title ? ' chip-active' : ''}`}
                    onClick={() => setTrack(t)}
                  >
                    {t.title}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <article
            className="pace-card-visual builder-preview"
            style={{ ['--card-accent' as string]: personality.accent }}
            aria-live="polite"
          >
            <div className="pace-card-top">
              <span className="sim-badge">Simulated prototype</span>
              <span className="pace-card-brand">PACE</span>
            </div>
            <p className="pace-card-eyebrow">Your Pace · {state.id}</p>
            <h3 className="pace-card-name">{name || 'Your Name'}</h3>
            <p className="pace-card-personality" style={{ color: personality.accent }}>
              {personality.label}
            </p>
            <div className="pace-card-stats">
              <div>
                <span>Avg music BPM</span>
                <strong>{state.bpm}</strong>
              </div>
              <div>
                <span>Running sound</span>
                <strong style={{ fontSize: '0.82rem' }}>{personality.sound}</strong>
              </div>
              <div>
                <span>Playlist</span>
                <strong style={{ fontSize: '0.82rem' }}>{playlist}</strong>
              </div>
            </div>
            <div className="pace-card-tracks">
              <p>
                <span>Power track</span>
                {track.title} — {track.artist}
              </p>
              <p>
                <span>Hero</span>
                Your running soundtrack
              </p>
            </div>
            <div className="pace-card-artrow" aria-hidden>
              <span /><span /><span /><span />
            </div>
            <p className="pace-card-footer" style={{ color: personality.accent }}>
              FIND YOUR PACE.
            </p>
          </article>
        </div>
      </div>
    </section>
  )
}
