import { Link } from "react-router-dom";
import { brands } from "../data/content";
import { BrandTile } from "./Illustrations";

/**
 * Primary studio brand hub row.
 * DOM order matches visual order: Disney → Disney Jr. → Pixar → Marvel →
 * Star Wars → National Geographic, so keyboard/TV focus flows naturally
 * from Disney straight to Disney Jr. without custom tabindex.
 */
export default function BrandRow({ activeId } = {}) {
  return (
    <section className="brands-row" id="brands" aria-label="Brand hubs">
      <div className="brands-grid" role="list">
        {brands.map((brand, index) => {
          const isActive = activeId === brand.id;
          const className = [
            "brand-tile",
            brand.featured ? "featured" : "",
            isActive ? "active" : "",
          ]
            .filter(Boolean)
            .join(" ");

          return (
            <Link
              key={brand.id}
              to={brand.to}
              className={className}
              role="listitem"
              aria-label={`${brand.label} brand hub`}
              aria-current={isActive ? "page" : undefined}
              data-brand-index={index}
            >
              <BrandTile variant={brand.variant} featured={brand.featured || isActive} />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
