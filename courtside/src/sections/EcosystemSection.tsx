import { ContentEcosystem } from "../components/ContentEcosystem";

export function EcosystemSection() {
  return (
    <section className="section" id="ecosystem">
      <div className="wrap">
        <p className="section__eyebrow">18 · Content Ecosystem</p>
        <h2 className="section__title">One Feature. Many Assets.</h2>
        <p className="section__lede">
          Efficient production thinking: one athlete feature generates a full video,
          trailer, Shorts, thumbnail variations, community post, and social clips.
        </p>
        <ContentEcosystem />
      </div>
    </section>
  );
}
