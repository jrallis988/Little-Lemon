import { Link } from "react-router-dom";
import { brands, getShowsByIds, rows, shows } from "../data/content";
import { BrandTile, HeroStageArt, PlayIcon } from "../components/Illustrations";
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
            <Link to="/academy-rock" className="btn btn-details">
              Details
            </Link>
          </div>
        </div>
      </section>

      <div className="catalog">
        <section className="brands-row" id="brands" aria-label="Brands">
          <div className="rail brands-rail" role="list">
            {brands.map((brand) => {
              const isJr = brand.id === "disney-jr";
              const className = `brand-tile${brand.featured ? " featured" : ""}`;
              if (isJr) {
                return (
                  <a
                    key={brand.id}
                    href="#originals"
                    className={className}
                    role="listitem"
                    aria-label={brand.label}
                  >
                    <BrandTile label={brand.label} gradient={brand.gradient} featured={brand.featured} />
                  </a>
                );
              }
              return (
                <button
                  key={brand.id}
                  type="button"
                  className={className}
                  role="listitem"
                  aria-label={brand.label}
                >
                  <BrandTile label={brand.label} gradient={brand.gradient} featured={brand.featured} />
                </button>
              );
            })}
          </div>
        </section>

        {rows.map((row) => (
          <ContentRow
            key={row.id}
            id={row.id === "disney-jr-originals" ? "originals" : row.id}
            title={row.title}
            shows={getShowsByIds(row.showIds)}
          />
        ))}

        <ContentRow id="shows" title="All Disney Jr Series" shows={shows} />
      </div>
    </>
  );
}
