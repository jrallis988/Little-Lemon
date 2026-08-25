import { PlaylistIdentity } from "../components/PlaylistIdentity";
import { seriesList } from "../data/brand";

export function PlaylistSection() {
  return (
    <section className="section" id="playlists">
      <div className="wrap">
        <p className="section__eyebrow">16 · Playlist Identity</p>
        <h2 className="section__title">Distinguishable. Unified.</h2>
        <p className="section__lede">
          All six playlist covers together — accent and photography shift, brand structure holds.
        </p>
        <div className="grid-3">
          {seriesList.map((s) => (
            <PlaylistIdentity key={s.id} series={s} compact />
          ))}
        </div>
      </div>
    </section>
  );
}
