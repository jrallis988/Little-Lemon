import { musicTracks } from '../data/content'

export function Music() {
  return (
    <div className="section-page">
      <header className="section-hero section-hero--music">
        <p className="section-hero__eyebrow">Nick Radio</p>
        <h1>Music</h1>
        <p>Theme songs, remix packs, and sing-alongs on loop.</p>
      </header>

      <div className="track-list">
        {musicTracks.map((track, i) => (
          <article key={track.id} className="track-row">
            <button type="button" className="track-row__play" aria-label={`Play ${track.title}`}>
              ▶
            </button>
            <div>
              <h2>{track.title}</h2>
              <p>
                {track.artist} · {track.vibe}
              </p>
            </div>
            <span className="track-row__num">0{i + 1}</span>
          </article>
        ))}
      </div>
    </div>
  )
}
