import Link from "next/link";
import { candidate } from "@/lib/candidate";
import { Reveal } from "@/components/motion/Reveal";

/** Replaces Neta “quick donation” band with write-in voting CTA. */
export function HowToVoteBand() {
  return (
    <section className="quick-donation-section" aria-labelledby="vote-band-heading">
      <div className="section-overlay section-padding-140">
        <div className="container">
          <Reveal>
            <div className="section-heading">
              <h2 id="vote-band-heading">Write In Nick Varga</h2>
              <p>
                On {candidate.electionLabel}, write <strong>{candidate.fullName}</strong> on your
                ballot for {candidate.office}. Independent. Unbought. New Hampshire first.
              </p>
            </div>
          </Reveal>
          <div className="section-wrapper">
            <Reveal className="donation-area" delayMs={120}>
              <div className="donation">
                <span className="custom-btn amount select-amount varga-chip-pop">
                  <strong>Write-In</strong>
                </span>
                <span className="custom-btn amount varga-chip-pop" style={{ transitionDelay: "60ms" }}>
                  <strong>Nov 3</strong>
                </span>
                <span className="custom-btn amount varga-chip-pop" style={{ transitionDelay: "120ms" }}>
                  <strong>U.S. Senate</strong>
                </span>
                <span className="custom-btn amount varga-chip-pop" style={{ transitionDelay: "180ms" }}>
                  <strong>NH</strong>
                </span>
              </div>
              <div className="col-md-12 text-center">
                <Link href="/how-to-vote" className="custom-btn donate varga-btn-motion">
                  How to Vote Write-In
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
