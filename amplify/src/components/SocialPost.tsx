import type { FeedPost } from '../data/campaign'
import { brand } from '../data/campaign'

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
        <div className="post__photo" data-label={`Photo: ${post.photoSlot ?? 'headliner'}`} />
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
        <div
          className="post__photo"
          data-label={`Photo: ${post.photoSlot ?? 'artist'}`}
          aria-hidden="true"
        />
        <span className="post__brand">{brand.name}</span>
        <span className="post__meta">{post.meta}</span>
        <div className="post__rule" />
        <h3 className="post__title">{post.title}</h3>
        <p className="post__subtitle">{post.subtitle}</p>
        {post.cta && <span className="post__cta">{post.cta}</span>}
      </div>
    )
  }

  return (
    <div className={base}>
      <span className="post__brand">{brand.name}</span>
      <span className="post__meta">{post.meta}</span>
      {(post.variant === 'announcement' || post.variant === 'campaign' || post.variant === 'countdown') && (
        <div className="post__bars" aria-hidden="true">
          {Array.from({ length: 7 }).map((_, i) => (
            <span key={i} />
          ))}
        </div>
      )}
      <h3 className="post__title">{post.title}</h3>
      {post.subtitle && <p className="post__subtitle">{post.subtitle}</p>}
      {post.cta && <span className="post__cta">{post.cta}</span>}
      {post.photoSlot && post.variant === 'announcement' && (
        <span className="visually-slot" data-slot={post.photoSlot} hidden>
          {post.photoSlot}
        </span>
      )}
    </div>
  )
}
