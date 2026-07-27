import { Link } from "react-router-dom";
import { brands } from "../data/content";
import { BrandTile } from "./Illustrations";

/**
 * Primary studio brand hub row.
 * Always renders 6 equal tiles (including first-class Disney Jr.) that
 * shrink together across web and TV widths — no horizontal overflow.
 */
export default function BrandRow({ activeId } = {}) {
  return (
    <section className="brands-row" id="brands" aria-label="Brand hubs">
      <div className="brands-grid" role="list">
        {brands.map((brand) => {
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
            >
              <BrandTile variant={brand.variant} featured={brand.featured || isActive} />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
