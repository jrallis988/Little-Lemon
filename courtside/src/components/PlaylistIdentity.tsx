import type { SeriesDef } from "../data/brand";
import "./PlaylistIdentity.css";

interface Props {
  series: SeriesDef;
  compact?: boolean;
}

/** Playlist / series identity tile within COURTSIDE system. */
export function PlaylistIdentity({ series, compact = false }: Props) {
  return (
    <article
      className={`playlist-id ${compact ? "playlist-id--compact" : ""}`}
      style={{ ["--series-accent" as string]: series.accent }}
    >
      <div className="playlist-id__media">
        <img src={series.photo} alt="" loading="lazy" />
        <div className="playlist-id__shade" aria-hidden="true" />
        <span className="playlist-id__cs brand-mark">CS</span>
      </div>
      <div className="playlist-id__meta">
        <span className="playlist-id__brand">COURTSIDE</span>
        <h3 className="playlist-id__name">{series.name}</h3>
        <p className="playlist-id__short">{series.short}</p>
      </div>
    </article>
  );
}
