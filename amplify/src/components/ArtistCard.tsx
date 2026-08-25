import type { Artist } from '../data/campaign'
import { brand } from '../data/campaign'

interface ArtistCardProps {
  artist: Artist
  showCta?: boolean
}

export function ArtistCard({ artist, showCta = true }: ArtistCardProps) {
  return (
    <article
      className={`artist-card artist-card--${artist.tier}`}
      aria-label={`${artist.tier} announcement: ${artist.name}`}
    >
      <div
        className="artist-card__photo"
        data-label={`Replace: assets/photography/${artist.photoSlot}.jpg`}
      />
      <div className="artist-card__overlay" aria-hidden="true" />
      <div className="artist-card__body">
        <span className="artist-card__tier">{tierLabel(artist.tier)}</span>
        <span className="artist-card__brand">{brand.name}</span>
        <h3 className="artist-card__name">{artist.name}</h3>
        <p className="artist-card__meta">
          {artist.day.slice(0, 3).toUpperCase()} · {artist.stage.toUpperCase()} · {artist.time}
        </p>
        {showCta && (
          <p className="artist-card__meta" style={{ marginTop: '0.75rem', opacity: 0.9 }}>
            {artist.tier === 'headliner'
              ? 'Get tickets →'
              : artist.tier === 'featured'
                ? 'Save the set'
                : 'Discover'}
          </p>
        )}
      </div>
    </article>
  )
}

function tierLabel(tier: Artist['tier']) {
  if (tier === 'headliner') return 'Headliner'
  if (tier === 'featured') return 'Featured Artist'
  return 'Emerging Artist'
}
