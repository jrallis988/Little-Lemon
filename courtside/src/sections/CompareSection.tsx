import { ThumbnailComparison } from "../components/ThumbnailComparison";
import { thumbnails } from "../data/brand";

export function CompareSection() {
  return (
    <section className="section section--dark" id="compare">
      <div className="wrap">
        <p className="section__eyebrow">05 · Thumbnail Comparison Tool</p>
        <h2 className="section__title">Test at Real Size</h2>
        <p className="section__lede">
          Compare VERSION A and VERSION B across Large, Search, Recommended, and
          Mobile — optional actual-size viewing included.
        </p>
        <ThumbnailComparison
          versionA={thumbnails[0]}
          versionB={{
            ...thumbnails[9],
            category: "Action-focused alternate",
            title: "DRIVE",
            subtitle: "MARCUS",
          }}
          labelA="VERSION A · Athlete"
          labelB="VERSION B · Action"
        />
      </div>
    </section>
  );
}
