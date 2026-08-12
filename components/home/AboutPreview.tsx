import Link from "next/link";
import { candidate } from "@/lib/candidate";
import { Reveal } from "@/components/motion/Reveal";

/** Clean Meet Nick preview — no red politician card, no media collage. */
export function AboutPreview() {
  return (
    <section
      className="about-section section-bg-color home-1 meet-nick-preview"
      aria-labelledby="about-heading"
    >
      <div className="about-section-content section-padding-140">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <Reveal>
                <div className="section-heading mb-4">
                  <h6>Meet Nick</h6>
                  <h2 id="about-heading">{candidate.fullName}</h2>
                </div>
                <p className="meet-nick-lead">
                  Independent write-in for {candidate.office} from {candidate.hometown},{" "}
                  {candidate.state}. {candidate.tagline}
                </p>
                <blockquote className="meet-nick-quote">
                  <p>
                    “I serve the people of New Hampshire — not party bosses, not donors.”
                  </p>
                </blockquote>
                <p className="meet-nick-body">{candidate.coreStatement}</p>
                <Link href="/meet-nick" className="custom-btn varga-btn-motion">
                  Learn More
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
