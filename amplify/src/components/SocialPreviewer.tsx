import { useMemo, useState } from 'react'
import { feedPosts, stories } from '../data/campaign'
import { SocialPost } from './SocialPost'
import { Story } from './Story'
import { Reel } from './Reel'

type PreviewMode = 'square' | 'portrait' | 'story' | 'reel'

export function SocialPreviewer() {
  const [mode, setMode] = useState<PreviewMode>('square')
  const [safe, setSafe] = useState(false)
  const [reelPlaying, setReelPlaying] = useState(false)

  const ratioAttr = useMemo(() => {
    if (mode === 'square') return '1:1'
    if (mode === 'portrait') return '4:5'
    return '9:16'
  }, [mode])

  return (
    <div className="previewer">
      <div className="previewer__controls">
        <fieldset>
          <legend>Format</legend>
          {(
            [
              ['square', 'Square Post — 1:1'],
              ['portrait', 'Portrait Post — 4:5'],
              ['story', 'Story — 9:16'],
              ['reel', 'Reel — 9:16'],
            ] as const
          ).map(([value, label]) => (
            <label key={value}>
              <input
                type="radio"
                name="preview-mode"
                checked={mode === value}
                onChange={() => {
                  setMode(value)
                  if (value !== 'reel') setReelPlaying(false)
                }}
              />
              {label}
            </label>
          ))}
        </fieldset>
        <fieldset>
          <legend>Guides</legend>
          <label>
            <input
              type="checkbox"
              checked={safe}
              onChange={(e) => setSafe(e.target.checked)}
            />
            Show Safe Areas
          </label>
        </fieldset>
        {mode === 'reel' && (
          <button
            type="button"
            className="cta-inline"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.68rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              padding: '0.65rem 1rem',
              border: 'none',
              background: 'var(--signal)',
              color: 'var(--ink)',
              cursor: 'pointer',
            }}
            onClick={() => setReelPlaying((p) => !p)}
          >
            {reelPlaying ? 'Pause Reel' : 'Play Reel'}
          </button>
        )}
      </div>

      <div className="previewer__stage">
        <div className="previewer__frame-wrap" data-ratio={ratioAttr}>
          {mode === 'square' && (
            <SocialPost post={feedPosts[1]} ratio="1:1" showSafeAreas={safe} />
          )}
          {mode === 'portrait' && (
            <SocialPost post={feedPosts[3]} ratio="4:5" showSafeAreas={safe} />
          )}
          {mode === 'story' && (
            <Story story={stories[3]} showSafeAreas={safe} showCaption={false} />
          )}
          {mode === 'reel' && <Reel playing={reelPlaying} showSafeAreas={safe} />}
        </div>
      </div>
    </div>
  )
}
