import type { FeedPost } from '../data/campaign'
import { brand } from '../data/campaign'
import { PhotoSlot } from './PhotoSlot'

interface SocialPostProps {
  post: FeedPost
  ratio?: '1:1' | '4:5'
  showSafeAreas?: boolean
  className?: string
}

export function SocialPost({
  post,
  ratio = '1:1',
  showSafeAreas = false,
  className = '',
}: SocialPostProps) {
  const ratioClass = ratio === '4:5' ? 'social-frame--portrait' : 'social-frame--square'

  return (
    <article
      className={`social-frame ${ratioClass} ${className}`}
      aria-label={`${post.variant} post: ${post.title}`}
    >
      {showSafeAreas && <div className="social-frame__safe" aria-hidden="true" />}
      <PostArtwork post={post} />
    </article>
  )
}

function PostArtwork({ post }: { post: FeedPost }) {
  const base = `post post--${post.tone} post--${post.variant}`

  if (post.variant === 'headliner') {
    return (
      <div className={base}>
        {post.photoSlot ? (
          <PhotoSlot slot={post.photoSlot} className="post__photo post__photo--filled" alt="" />
        ) : (
          <div className="post__photo" />
        )}
        <div className="post__content">
          <span className="post__meta">{post.meta}</span>
          <span className="post__brand">{brand.name}</span>
          <h3 className="post__title">{post.title}</h3>
          <p className="post__subtitle">{post.subtitle}</p>
          {post.cta && <span className="post__cta">{post.cta}</span>}
        </div>
      </div>
    )
  }

  if (post.variant === 'artist') {
    return (
      <div className={base}>
        {post.photoSlot ? (
          <PhotoSlot slot={post.photoSlot} className="post__photo post__photo--filled" alt="" />
        ) : (
          <div className="post__photo" aria-hidden="true" />
        )}
        <span className="post__brand">{brand.name}</span>
        <span className="post__meta">{post.meta}</span>
        <div className="post__rule" />
        <h3 className="post__title">{post.title}</h3>
        <p className="post__subtitle">{post.subtitle}</p>
        {post.cta && <span className="post__cta">{post.cta}</span>}
      </div>
    )
  }

  if (post.variant === 'announcement') {
    return (
      <div className={base}>
        {post.photoSlot && (
          <PhotoSlot slot={post.photoSlot} className="post__photo post__photo--bg" alt="" />
        )}
        <div className="post__scrim" aria-hidden="true" />
        <span className="post__brand">{brand.name}</span>
        <span className="post__meta">{post.meta}</span>
        <div className="post__bars" aria-hidden="true">
          {Array.from({ length: 7 }).map((_, i) => (
            <span key={i} />
          ))}
        </div>
        <h3 className="post__title">{post.title}</h3>
        {post.subtitle && <p className="post__subtitle">{post.subtitle}</p>}
      </div>
    )
  }

  if (post.variant === 'lineup') {
    return (
      <div className={base}>
        <span className="post__brand">{brand.name}</span>
        <span className="post__meta">{post.meta}</span>
        <div className="post__lineup-marks" aria-hidden="true">
          <span /><span /><span /><span />
        </div>
        <h3 className="post__title">{post.title}</h3>
        {post.subtitle && <p className="post__subtitle">{post.subtitle}</p>}
      </div>
    )
  }

  if (post.variant === 'tickets') {
    return (
      <div className={base}>
        <span className="post__brand">{brand.name}</span>
        <span className="post__meta">{post.meta}</span>
        <div className="post__ticket-stub" aria-hidden="true">
          <span className="post__ticket-perf" />
        </div>
        <h3 className="post__title">{post.title}</h3>
        {post.subtitle && <p className="post__subtitle">{post.subtitle}</p>}
        {post.cta && <span className="post__cta">{post.cta}</span>}
      </div>
    )
  }

  return (
    <div className={base}>
      <span className="post__brand">{brand.name}</span>
      <span className="post__meta">{post.meta}</span>
      {(post.variant === 'campaign' || post.variant === 'countdown' || post.variant === 'finale') && (
        <div className="post__bars" aria-hidden="true">
          {Array.from({ length: 7 }).map((_, i) => (
            <span key={i} />
          ))}
        </div>
      )}
      <h3 className="post__title">{post.title}</h3>
      {post.subtitle && <p className="post__subtitle">{post.subtitle}</p>}
      {post.cta && <span className="post__cta">{post.cta}</span>}
    </div>
  )
}
