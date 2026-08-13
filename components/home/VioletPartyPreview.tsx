import Link from "next/link";
import { violetParty } from "@/lib/violet";
import { Reveal } from "@/components/motion/Reveal";

/** Landing-page Violet Party band — mirrors nav destination. */
export function VioletPartyPreview() {
  const principles = violetParty.principles.slice(0, 3);

  return (
    <section
      className="violet-party-preview section-padding-140"
      aria-labelledby="violet-preview-heading"
      id="violet-party"
    >
      <div className="container">
        <Reveal>
          <div className="section-heading">
            <h6>{violetParty.overline}</h6>
            <h2 id="violet-preview-heading">{violetParty.headline}</h2>
            <p>{violetParty.tagline}</p>
          </div>
        </Reveal>

        <div className="row justify-content-center">
          <Reveal className="col-lg-8 text-center" delayMs={80}>
            <p className="violet-party-preview__lead">{violetParty.subhead}</p>
          </Reveal>
        </div>

        <div className="section-wrapper row justify-content-center violet-party-preview__principles">
          {principles.map((principle, i) => (
            <Reveal
              className="col-lg-4 col-md-6"
              key={principle.number}
              delayMs={100 + i * 100}
              variant="up"
            >
              <div className="violet-principle-card">
                <p className="violet-principle-card__num" aria-hidden>
                  {principle.number}
                </p>
                <h3 className="violet-principle-card__title">{principle.title}</h3>
                <p className="violet-principle-card__body">{principle.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="text-center" delayMs={320}>
          <Link href="/violet-party" className="custom-btn varga-btn-motion">
            Learn More
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
