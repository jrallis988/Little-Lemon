import { useEffect, useRef, useState } from 'react'

const TARGETS = ['🟢', '🟠', '🫧', '⭐', '🧽', '💥']

function loadHighScore(gameId) {
  try {
    return Number(localStorage.getItem(`nick-hi-${gameId}`)) || 0
  } catch {
    return 0
  }
}

function saveHighScore(gameId, score) {
  try {
    localStorage.setItem(`nick-hi-${gameId}`, String(score))
  } catch {
    /* ignore */
  }
}

export function ArcadePlay({ game, onClose }) {
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(15)
  const [running, setRunning] = useState(false)
  const [finished, setFinished] = useState(false)
  const [high, setHigh] = useState(() => loadHighScore(game.id))
  const [blob, setBlob] = useState(null)
  const boardRef = useRef(null)

  const spawn = () => {
    const board = boardRef.current
    if (!board) return
    const size = 56
    const maxX = Math.max(8, board.clientWidth - size - 8)
    const maxY = Math.max(8, board.clientHeight - size - 8)
    setBlob({
      id: `${Date.now()}-${Math.random()}`,
      emoji: TARGETS[Math.floor(Math.random() * TARGETS.length)],
      x: 8 + Math.random() * maxX,
      y: 8 + Math.random() * maxY,
    })
  }

  const start = () => {
    setScore(0)
    setTimeLeft(15)
    setFinished(false)
    setRunning(true)
    spawn()
  }

  useEffect(() => {
    if (!running) return undefined
    const tick = window.setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          window.clearInterval(tick)
          setRunning(false)
          setFinished(true)
          setBlob(null)
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => window.clearInterval(tick)
  }, [running])

  useEffect(() => {
    if (!finished) return
    setHigh((prev) => {
      const next = Math.max(prev, score)
      if (next > prev) saveHighScore(game.id, next)
      return next
    })
  }, [finished, score, game.id])

  const splat = () => {
    if (!running) return
    setScore((s) => s + 10)
    spawn()
  }

  return (
    <div className="arcade-modal" role="dialog" aria-modal="true" aria-label={game.title}>
      <div className="arcade-modal__panel no-splat" style={{ '--accent': game.accent }}>
        <header className="arcade-modal__head">
          <div>
            <p className="arcade-modal__show">{game.show}</p>
            <h2>{game.title}</h2>
          </div>
          <button type="button" className="arcade-modal__close" onClick={onClose} aria-label="Close game">
            ✕
          </button>
        </header>

        <p className="arcade-modal__blurb">{game.blurb} Smash the blobs before time runs out.</p>

        <div className="arcade-modal__hud">
          <span>Score: {score}</span>
          <span>Time: {timeLeft}s</span>
          <span>Best: {high}</span>
        </div>

        <div
          ref={boardRef}
          className={`arcade-board${running ? ' is-live' : ''}`}
          aria-live="polite"
        >
          {!running && !finished ? (
            <button type="button" className="btn-nick btn-nick--big" onClick={start}>
              Start Round
            </button>
          ) : null}

          {finished ? (
            <div className="arcade-board__end">
              <strong>{score >= high && score > 0 ? 'New high score!' : 'Round over!'}</strong>
              <p>You scored {score} splat points.</p>
              <button type="button" className="btn-nick" onClick={start}>
                Play Again
              </button>
            </div>
          ) : null}

          {blob && running ? (
            <button
              type="button"
              className="arcade-blob"
              style={{ left: blob.x, top: blob.y }}
              onClick={splat}
              aria-label="Splat target"
            >
              {blob.emoji}
            </button>
          ) : null}
        </div>
      </div>
    </div>
  )
}
