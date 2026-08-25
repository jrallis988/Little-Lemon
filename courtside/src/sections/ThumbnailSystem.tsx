import { YouTubeThumbnail } from "../components/YouTubeThumbnail";
import { thumbnails } from "../data/brand";

export function ThumbnailSystem() {
  return (
    <section className="section" id="thumbnails">
      <div className="wrap-wide">
        <p className="section__eyebrow">04 · Thumbnail System</p>
        <h2 className="section__title">Twelve Concepts</h2>
        <p className="section__lede">
          Strong subject, clear hierarchy, excellent cropping, limited text.
          Designed to read at small sizes — without arrows, circles, or shocked-face clichés.
        </p>
        <div className="grid-3">
          {thumbnails.map((t) => (
            <YouTubeThumbnail key={t.id} concept={t} showCategory />
          ))}
        </div>
        <p className="asset-note" style={{ marginTop: "1.5rem" }}>
          Photoshop exports drop into /public/assets/photos/ — update paths in data/brand.ts
        </p>
      </div>
    </section>
  );
}
