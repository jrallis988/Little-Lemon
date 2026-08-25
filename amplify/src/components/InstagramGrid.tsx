import { useState } from 'react'
import type { FeedPost } from '../data/campaign'
import { SocialPost } from './SocialPost'

interface InstagramGridProps {
  posts: FeedPost[]
}

export function InstagramGrid({ posts }: InstagramGridProps) {
  const [ratio, setRatio] = useState<'1:1' | '4:5'>('1:1')

  return (
    <div>
      <div className="ratio-toggle" role="group" aria-label="Feed post aspect ratio">
        <button
          type="button"
          aria-pressed={ratio === '1:1'}
          onClick={() => setRatio('1:1')}
        >
          1080 × 1080
        </button>
        <button
          type="button"
          aria-pressed={ratio === '4:5'}
          onClick={() => setRatio('4:5')}
        >
          1080 × 1350
        </button>
      </div>

      <div className="ig-phone" aria-label="Instagram profile grid preview">
        <div className="ig-phone__chrome">
          <div className="ig-phone__avatar" aria-hidden="true" />
          <span>@amplifyfest</span>
          <span>Grid</span>
        </div>
        <div className="ig-phone__grid-wrap">
          <div className="ig-grid">
            {posts.slice(0, 9).map((post) => (
              <SocialPost key={post.id} post={post} ratio={ratio === '4:5' ? '1:1' : '1:1'} />
            ))}
          </div>
        </div>
      </div>
      <p
        style={{
          textAlign: 'center',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.65rem',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--mute)',
          marginTop: '-1rem',
          marginBottom: '2rem',
        }}
      >
        3 × 3 feed grid — evaluate rhythm, contrast, and campaign cohesion
      </p>

      <div className="feed-strip">
        {posts.map((post) => (
          <figure key={`strip-${post.id}`}>
            <SocialPost post={post} ratio={ratio} />
            <figcaption>
              {post.variant.replace('-', ' ')} · {ratio === '1:1' ? '1:1' : '4:5'}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  )
}
