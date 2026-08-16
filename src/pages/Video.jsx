import { videos } from '../data/content'

export function Video() {
  return (
    <div className="section-page">
      <header className="section-hero section-hero--video">
        <p className="section-hero__eyebrow">Press play</p>
        <h1>Video</h1>
        <p>Clips, trailers, and mini-episodes in a chunky player box.</p>
      </header>

      <div className="video-stage">
        <div className="video-stage__player" role="img" aria-label="Main video stage">
          <button type="button" className="video-box__play" aria-label="Play featured video">
            ▶
          </button>
          <p>Featured: SpongeBob Band Geeks</p>
        </div>
        <ul className="video-stage__rail">
          {videos.map((v) => (
            <li key={v.id}>
              <button type="button">
                <span className="thumb" aria-hidden="true" />
                <span>
                  <strong>{v.title}</strong>
                  <small>{v.length}</small>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
