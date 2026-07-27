import { Link } from "react-router-dom";
import { getShowsByIds, homeRows } from "../data/content";
import { HeroStageArt, PlayIcon } from "../components/Illustrations";
import BrandRow from "../components/BrandRow";
import ContentRow from "../components/ContentRow";

export default function Home() {
  return (
    <>
      <section className="hero" aria-label="Featured: Academy Rock">
        <div className="hero-media">
          <HeroStageArt />
        </div>
        <div className="hero-scrim" />
        <div className="hero-content">
          <p className="hero-eyebrow">Disney Jr · Original Series</p>
          <h1 className="hero-title-logo">Academy Rock</h1>
          <p className="hero-meta">2024 · 1 Season · Ages 2–5 · Music</p>
          <p className="hero-lede">
            Kids find their voice, share the spotlight, and turn every oops into an encore.
          </p>
          <div className="hero-ctas">
            <Link to="/academy-rock" className="btn btn-play">
              <PlayIcon /> Play
            </Link>
            <Link to="/disney-jr" className="btn btn-details">
              Explore Disney Jr.
            </Link>
          </div>
        </div>
      </section>

      <div className="catalog">
        <BrandRow />

        {homeRows.map((row) => (
          <ContentRow
            key={row.id}
            id={row.id}
            title={row.title}
            shows={getShowsByIds(row.showIds)}
          />
        ))}
      </div>
    </>
  );
}
