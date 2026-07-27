import { Link } from "react-router-dom";
import { shows } from "../data/content";
import { AcademyStageArt, HeroStageArt, ShowPoster } from "../components/Illustrations";

export default function Home() {
  return (
    <>
      <section className="hero" aria-label="Disney Jr welcome">
        <div className="hero-media">
          <HeroStageArt />
        </div>
        <div className="hero-scrim" />
        <div className="hero-content">
          <h1 className="hero-brand brand-mark">
            Disney<span className="jr">Jr</span>
          </h1>
          <p className="hero-title">Songs, stories, and smiles—streamed for little learners.</p>
          <p className="hero-lede">
            Dive into joyful shows made for curious kids, starting with the beat of Academy Rock.
          </p>
          <div className="hero-ctas">
            <Link to="/academy-rock" className="btn btn-primary">
              Watch Academy Rock
            </Link>
            <a href="#shows" className="btn btn-secondary">
              Browse shows
            </a>
          </div>
        </div>
      </section>

      <section className="academy-spotlight" aria-labelledby="academy-spotlight-title">
        <div className="academy-spotlight-media">
          <AcademyStageArt compact />
        </div>
        <div className="academy-spotlight-scrim" />
        <div className="academy-spotlight-body">
          <p className="section-kicker" style={{ color: "var(--rock-neon)" }}>
            Featured show
          </p>
          <h2 id="academy-spotlight-title">Academy Rock</h2>
          <p>
            Meet Mia, Theo, and Lila as they learn friendship, kindness, and courage—one catchy
            chorus at a time.
          </p>
          <Link to="/academy-rock" className="btn btn-rock">
            Enter the academy
          </Link>
        </div>
      </section>

      <section className="section" id="shows" aria-labelledby="shows-title">
        <div className="section-head">
          <p className="section-kicker">Now streaming</p>
          <h2 className="section-title" id="shows-title">
            Pick a show
          </h2>
          <p className="section-copy">
            Bright adventures and gentle lessons, ready whenever playtime needs a pause.
          </p>
        </div>
        <div className="show-row" role="list">
          {shows.map((show) => (
            <Link
              key={show.id}
              to={show.to}
              className={`show-tile${show.featured ? " featured" : ""}`}
              role="listitem"
            >
              <div className="show-tile-art">
                <ShowPoster id={show.id} colors={show.palette} title={show.title} />
              </div>
              <span className="show-tile-name">{show.title}</span>
              <span className="show-tile-meta">{show.meta}</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
