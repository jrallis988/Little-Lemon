import { useState } from 'react'
import { poll } from '../data/content'

export function Fan() {
  const [stickers, setStickers] = useState(0)
  const [vote, setVote] = useState(poll.options[2])

  return (
    <div className="section-page">
      <header className="section-hero section-hero--world">
        <p className="section-hero__eyebrow">Your World</p>
        <h1>Fan Zone</h1>
        <p>
          Polls, sticker walls, and &ldquo;See My Nick&rdquo; energy — the interactive
          stuff that made kids stay on the site for hours.
        </p>
      </header>

      <div className="fan-grid">
        <section className="fan-panel">
          <h2>Sticker Lab</h2>
          <p>Click to slap slime stickers on the wall.</p>
          <button
            type="button"
            className="sticker-wall"
            onClick={() => setStickers((n) => n + 1)}
            aria-label="Add a sticker"
          >
            {Array.from({ length: Math.min(stickers, 24) }).map((_, i) => (
              <span
                key={i}
                className="sticker"
                style={{
                  left: `${8 + ((i * 17) % 80)}%`,
                  top: `${10 + ((i * 29) % 70)}%`,
                  transform: `rotate(${(i % 5) * 12 - 20}deg)`,
                }}
              >
                {['🟢', '🟠', '⭐', '🐱', '🧽'][i % 5]}
              </span>
            ))}
            <span className="sticker-wall__hint">
              {stickers === 0 ? 'Click me!' : `${stickers} stickers stuck`}
            </span>
          </button>
        </section>

        <section className="fan-panel">
          <h2>Daily Poll</h2>
          <p>{poll.question}</p>
          {poll.options.map((opt) => (
            <label key={opt} className="poll-box__opt">
              <input
                type="radio"
                name="fan-poll"
                checked={vote === opt}
                onChange={() => setVote(opt)}
              />
              {opt}
            </label>
          ))}
          <p className="poll-box__result">Current pick: {vote}</p>
        </section>

        <section className="fan-panel fan-panel--wide">
          <h2>Web Lab toys</h2>
          <div className="toy-row">
            {['Build-a-Splat', 'Messy Mixer', 'Code Cracker', 'Avatar Doodle'].map(
              (toy) => (
                <button key={toy} type="button" className="toy">
                  {toy}
                </button>
              ),
            )}
          </div>
        </section>
      </div>
    </div>
  )
}
