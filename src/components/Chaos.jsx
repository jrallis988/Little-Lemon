import { useEffect, useState } from 'react'

const REACTIONS = ['🟢', '🟠', '💥', '⭐', '🫧', '🧽']

export function SlimeCursor() {
  const [splats, setSplats] = useState([])

  useEffect(() => {
    const onClick = (event) => {
      const target = event.target
      if (
        target.closest(
          'input, textarea, button, a, label, .sticker-wall, .no-splat, .arcade-modal',
        )
      ) {
        return
      }

      const id = `${Date.now()}-${Math.random()}`
      const emoji = REACTIONS[Math.floor(Math.random() * REACTIONS.length)]
      setSplats((prev) => [
        ...prev.slice(-18),
        {
          id,
          emoji,
          x: event.clientX,
          y: event.clientY,
          rot: Math.random() * 60 - 30,
        },
      ])

      window.setTimeout(() => {
        setSplats((prev) => prev.filter((s) => s.id !== id))
      }, 900)
    }

    window.addEventListener('click', onClick)
    return () => window.removeEventListener('click', onClick)
  }, [])

  return (
    <div className="slime-layer" aria-hidden="true">
      {splats.map((splat) => (
        <span
          key={splat.id}
          className="slime-layer__splat"
          style={{
            left: splat.x,
            top: splat.y,
            transform: `translate(-50%, -50%) rotate(${splat.rot}deg)`,
          }}
        >
          {splat.emoji}
        </span>
      ))}
    </div>
  )
}

export function BoredomBuster() {
  const [smashed, setSmashed] = useState(0)
  const loud = smashed >= 3

  return (
    <section className={`boredom bleed${loud ? ' is-loud' : ''}`}>
      <div className="boredom__copy">
        <p className="boredom__eyebrow">Design note from the slime pit</p>
        <h2>
          {loud
            ? 'YES. Louder. Weirder. More buttons.'
            : 'Nick is for kids — not a beige boardroom.'}
        </h2>
        <p>
          Streaming and the web both forgot the assignment. Clean is fine for
          taxes. Kids need mess, motion, and stuff you can mash.
        </p>
      </div>
      <button
        type="button"
        className="boredom__smash"
        onClick={() => setSmashed((n) => n + 1)}
      >
        {loud ? 'Keep smashing!' : 'Too basic? Smash this'}
        <span aria-hidden="true"> ×{smashed}</span>
      </button>
    </section>
  )
}

export function NicktaneBox() {
  const [code, setCode] = useState('')
  const [unlocked, setUnlocked] = useState(false)
  const [message, setMessage] = useState('Enter a Nicktane code')

  const tryCode = (event) => {
    event.preventDefault()
    const normalized = code.trim().toUpperCase()
    if (['SLIME', 'NICK2004', 'GOO', 'ORBITZ'].includes(normalized)) {
      setUnlocked(true)
      setMessage(`Code ${normalized} accepted — bonus room open!`)
    } else {
      setUnlocked(false)
      setMessage('Nope. Try SLIME or NICK2004')
    }
  }

  return (
    <section className={`nicktane${unlocked ? ' is-open' : ''}`}>
      <h2 className="panel-title panel-title--sm">Nicktane Codes</h2>
      <p>Secret codes used to unlock weird rooms. Still should.</p>
      <form className="nicktane__form" onSubmit={tryCode}>
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Type SLIME…"
          aria-label="Nicktane code"
          autoComplete="off"
        />
        <button type="submit" className="btn-nick btn-nick--small">
          Unlock
        </button>
      </form>
      <p className="nicktane__msg">{message}</p>
      {unlocked ? (
        <div className="nicktane__room">
          <strong>Bonus room:</strong> rainbow goo fountain, secret game stub, and
          a button that does nothing useful on purpose.
          <button type="button" className="btn-nick" style={{ marginTop: 8 }}>
            Useless awesome button
          </button>
        </div>
      ) : null}
    </section>
  )
}
