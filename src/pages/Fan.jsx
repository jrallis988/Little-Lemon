import { useState } from 'react'
import { poll } from '../data/content'

const TOYS = [
  {
    id: 'splat',
    label: 'Build-a-Splat',
    result: 'You mixed neon green + orange zest. Sticky masterpiece unlocked.',
  },
  {
    id: 'mixer',
    label: 'Messy Mixer',
    result: 'Beaker exploded (on purpose). +3 chaos points.',
  },
  {
    id: 'cracker',
    label: 'Code Cracker',
    result: 'Hint: try SLIME on the homepage Nicktane box.',
  },
  {
    id: 'doodle',
    label: 'Avatar Doodle',
    result: 'Air swirl doodle saved to Your World (locally, for now).',
  },
]

export function Fan() {
  const [stickers, setStickers] = useState(0)
  const [vote, setVote] = useState(poll.options[2])
  const [voted, setVoted] = useState(false)
  const [toyMsg, setToyMsg] = useState('Mash a toy to make a mess.')

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
          <fieldset disabled={voted}>
            <legend className="sr-only">Choose one</legend>
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
          </fieldset>
          <button
            type="button"
            className="btn-nick"
            disabled={voted}
            onClick={() => setVoted(true)}
          >
            {voted ? 'Locked in!' : 'Vote'}
          </button>
          {voted ? <p className="poll-box__result">You voted: {vote}</p> : null}
        </section>

        <section className="fan-panel fan-panel--wide">
          <h2>Web Lab toys</h2>
          <p className="fan-panel__status">{toyMsg}</p>
          <div className="toy-row">
            {TOYS.map((toy) => (
              <button
                key={toy.id}
                type="button"
                className="toy"
                onClick={() => setToyMsg(toy.result)}
              >
                {toy.label}
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
