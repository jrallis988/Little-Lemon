import type { ThumbnailConcept, SeriesId } from "../data/brand";
import { seriesList } from "../data/brand";
import "./YouTubeThumbnail.css";

const seriesAccent = (id: SeriesId) =>
  seriesList.find((s) => s.id === id)?.accent ?? "var(--cs-orange)";

const seriesName = (id: SeriesId) =>
  seriesList.find((s) => s.id === id)?.name ?? "COURTSIDE";

interface Props {
  concept: ThumbnailConcept;
  className?: string;
  showCategory?: boolean;
}

/** Reusable YouTube thumbnail — swap `concept.photo` for Photoshop exports. */
export function YouTubeThumbnail({
  concept,
  className = "",
  showCategory = false,
}: Props) {
  const align = concept.textAlign ?? "left";
  return (
    <figure className={`yt-thumb ${className}`}>
      {showCategory && (
        <figcaption className="yt-thumb__cat">{concept.category}</figcaption>
      )}
      <div
        className={`yt-thumb__frame yt-thumb__frame--${concept.layout} yt-thumb__frame--${align}`}
        style={{ ["--thumb-accent" as string]: seriesAccent(concept.series) }}
        role="img"
        aria-label={`${concept.category}: ${concept.title}`}
      >
        <img
          src={concept.photo}
          alt=""
          className="yt-thumb__photo"
          loading="lazy"
        />
        <div className="yt-thumb__grade" aria-hidden="true" />
        <div className="yt-thumb__bar" aria-hidden="true" />
        <div className="yt-thumb__copy">
          <span className="yt-thumb__series">{seriesName(concept.series)}</span>
          {concept.subtitle && (
            <span className="yt-thumb__sub">{concept.subtitle}</span>
          )}
          <strong className="yt-thumb__title">{concept.title}</strong>
        </div>
        <span className="yt-thumb__mark brand-mark" aria-hidden="true">
          CS
        </span>
      </div>
    </figure>
  );
}
