import { Link } from "react-router-dom";
import { disneyJrHubRows, getShowsByIds } from "../data/content";
import { HeroStageArt, PlayIcon } from "../components/Illustrations";
import BrandRow from "../components/BrandRow";
import ContentRow from "../components/ContentRow";

/**
 * Standalone Disney Jr hub — preschool-first carousels,
 * reached directly from the top-level Disney Jr brand tile.
 */
export default function DisneyJrHub() {
  return (
    <>
      <section className="hero hub-hero" aria-label="Disney Jr hub">
        <div className="hero-media">
          <HeroStageArt />
        </div>
        <div className="hero-scrim" />
        <div className="hero-content">
          <p className="hero-eyebrow hub-eyebrow">Disney+ · Brand Hub</p>
          <h1 className="hero-title-logo hub-title">
            <span className="hub-title-disney">Disney</span>
            <span className="hub-title-jr">Jr.</span>
          </h1>
          <p className="hero-meta">Preschool series · Music · Learning · Playlists</p>
          <p className="hero-lede">
            A dedicated home for little learners — character favorites, continuous play, and
            shows made for ages 2–5.
          </p>
          <div className="hero-ctas">
            <Link to="/academy-rock" className="btn btn-play">
              <PlayIcon /> Play Academy Rock
            </Link>
            <a href="#jr-continue" className="btn btn-details">
              Browse shows
            </a>
          </div>
        </div>
      </section>

      <div className="catalog">
        <BrandRow activeId="disney-jr" />

        {disneyJrHubRows.map((row) => (
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
