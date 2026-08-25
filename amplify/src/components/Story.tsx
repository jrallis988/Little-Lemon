import type { StoryConcept } from '../data/campaign'
import { brand } from '../data/campaign'

interface StoryProps {
  story: StoryConcept
  showSafeAreas?: boolean
  showCaption?: boolean
}

export function Story({ story, showSafeAreas = false, showCaption = true }: StoryProps) {
  const frame = (
    <article
      className={`social-frame social-frame--story story story--${story.tone}`}
      aria-label={`Story: ${story.title}`}
    >
      {showSafeAreas && <div className="social-frame__safe" aria-hidden="true" />}
      {story.photoSlot && (
        <div className="story__photo" data-label={story.photoSlot} aria-hidden="true" />
      )}
      <div className="story__inner">
        <span className="story__brand">{brand.name}</span>
        <p className="story__kicker">{story.kicker}</p>
        {story.body && <p className="story__body">{story.body}</p>}
        {story.cta && <span className="story__cta">{story.cta}</span>}
        {story.interactive && (
          <div className="story__interactive">{story.interactive}</div>
        )}
      </div>
    </article>
  )

  if (!showCaption) return frame

  return (
    <figure>
      {frame}
      <figcaption className="story__label">{story.title}</figcaption>
    </figure>
  )
}
