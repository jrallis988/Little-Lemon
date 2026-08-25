import { useEffect, useState } from 'react'
import { videos } from '../data/content'

export function Video() {
  const [active, setActive] = useState(videos[0])
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!playing) return undefined
    const id = window.setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          setPlaying(false)
          return 100
        }
        return Math.min(100, p + 4)
      })
    }, 220)
    return () => window.clearInterval(id)
  }, [playing])

  const play = (clip) => {
    setActive(clip)
    setPlaying(true)
    setProgress(0)
  }

  const toggle = () => {
    if (progress >= 100) {
      setProgress(0)
      setPlaying(true)
      return
    }
    setPlaying((on) => !on)
  }

  return (
    <div className="section-page">
      <header className="section-hero section-hero--video">
        <p className="section-hero__eyebrow">Press play</p>
        <h1>Video</h1>
        <p>Clips, trailers, and mini-episodes in a chunky player box.</p>
      </header>

      <div className="video-stage">
        <div
          className={`video-stage__player${playing ? ' is-playing' : ''}`}
          role="region"
          aria-label="Main video stage"
        >
          <button
            type="button"
            className="video-box__play"
            aria-label={playing ? 'Pause' : `Play ${active.title}`}
            onClick={toggle}
          >
            {playing ? '❚❚' : '▶'}
          </button>
          <p>{active.title}</p>
          <div className="video-stage__bar" aria-hidden="true">
            <span style={{ width: `${progress}%` }} />
          </div>
          <small className="video-stage__meta">
            {playing
              ? 'Playing…'
              : progress >= 100
                ? 'Ended — hit play again'
                : `Ready · ${active.length}`}
          </small>
        </div>
        <ul className="video-stage__rail">
          {videos.map((v) => (
            <li key={v.id}>
              <button
                type="button"
                className={active.id === v.id ? 'is-active' : undefined}
                onClick={() => play(v)}
              >
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
