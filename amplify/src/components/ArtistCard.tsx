import type { Artist } from '../data/campaign'
import { brand } from '../data/campaign'
import { PhotoSlot } from './PhotoSlot'

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
      <PhotoSlot
        slot={artist.photoSlot}
        className="artist-card__photo artist-card__photo--filled"
        alt=""
      />
      <div className="artist-card__overlay" aria-hidden="true" />
      <div className="artist-card__body">
        <span className="artist-card__tier">{tierLabel(artist.tier)}</span>
        <span className="artist-card__brand">{brand.name}</span>
        <p className="artist-card__genre">{artist.genre}</p>
        <h3 className="artist-card__name">{artist.name}</h3>
        <p className="artist-card__meta">
          {artist.day.slice(0, 3).toUpperCase()} · {artist.stage.toUpperCase()} · {artist.time}
        </p>
        {showCta && (
          <p className="artist-card__meta artist-card__cta">
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
