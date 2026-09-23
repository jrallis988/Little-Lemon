import { photos, thumbnails } from "../data/brand";
import { YouTubeThumbnail } from "../components/YouTubeThumbnail";
import "./YouTubeContext.css";

/** Realistic YouTube UI shells — desktop + mobile. */
export function YouTubeContext() {
  return (
    <section className="section section--dark" id="channel">
      <div className="wrap">
        <p className="section__eyebrow">Platform context</p>
        <h2 className="section__title">Inside YouTube</h2>
        <p className="section__lede">
          COURTSIDE has to survive Home, Search, Watch, Shorts, Playlists, and
          Community — at desktop and phone scale.
        </p>

        <div className="yt-context">
          <article className="yt-phone">
            <header>YouTube Home · Mobile</header>
            <div className="yt-phone__feed">
              {[thumbnails[0], thumbnails[6], thumbnails[9]].map((t) => (
                <div key={t.id} className="yt-phone__row">
                  <YouTubeThumbnail concept={t} />
                  <div>
                    <strong>{t.title}</strong>
                    <span>COURTSIDE · 128K views</span>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="yt-desk">
            <header>Watch page · Desktop</header>
            <div className="yt-desk__layout">
              <div className="yt-desk__player">
                <img src={photos.athleteWoman} alt="" />
                <span className="yt-desk__title">IMANI VALE · The Work Nobody Sees</span>
              </div>
              <aside className="yt-desk__recs">
                <span>Recommended</span>
                {[thumbnails[3], thumbnails[4], thumbnails[10]].map((t) => (
                  <div key={t.id} className="yt-desk__rec">
                    <YouTubeThumbnail concept={t} />
                  </div>
                ))}
              </aside>
            </div>
          </article>
        </div>

        <div className="yt-row">
          <article className="yt-phone yt-phone--shorts">
            <header>Shorts feed</header>
            <div className="yt-short">
              <img src={photos.soccerAthlete} alt="" />
              <div className="yt-short__gfx">
                <span>THE PLAYER</span>
                <strong>SANTOS</strong>
                <em>caption safe</em>
              </div>
            </div>
          </article>
          <article className="yt-search">
            <header>Search results</header>
            <div className="yt-search__list">
              {[thumbnails[1], thumbnails[7], thumbnails[11]].map((t) => (
                <div key={t.id} className="yt-search__item">
                  <div className="yt-search__thumb">
                    <YouTubeThumbnail concept={t} />
                  </div>
                  <div>
                    <strong>{t.title}</strong>
                    <span>COURTSIDE · {t.category}</span>
                  </div>
                </div>
              ))}
            </div>
          </article>
          <article className="yt-community">
            <header>Community + Playlist</header>
            <div className="yt-community__card">
              <img src={photos.crowdFans} alt="" />
              <div>
                <span>POLL</span>
                <strong>Which series next?</strong>
                <p>FILM ROOM · GEAR · CULTURE</p>
              </div>
            </div>
            <div className="yt-playlist-strip">
              <span>PLAYLIST · THE PLAYER</span>
              <div className="yt-playlist-strip__thumbs">
                {[thumbnails[0], thumbnails[1], thumbnails[2]].map((t) => (
                  <YouTubeThumbnail key={t.id} concept={t} />
                ))}
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
