import { EndScreenPreview } from "../components/EndScreenPreview";

export function EndScreens() {
  return (
    <section className="section section--dark" id="endscreens">
      <div className="wrap">
        <p className="section__eyebrow">15 · YouTube End Screens</p>
        <h2 className="section__title">Designed Around the UI</h2>
        <p className="section__lede">
          Subscribe, next, recommended, and playlist templates leave clear room for
          YouTube’s interactive elements.
        </p>
        <div className="grid-2">
          <EndScreenPreview layout="subscribe" />
          <EndScreenPreview layout="next" />
          <EndScreenPreview layout="recommended" />
          <EndScreenPreview layout="playlist" playlistName="FILM ROOM" />
        </div>
      </div>
    </section>
  );
}
