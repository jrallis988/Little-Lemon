import Link from "next/link";
import { candidate } from "@/lib/candidate";

/** Replaces Neta “quick donation” band with write-in voting CTA. */
export function HowToVoteBand() {
  return (
    <section className="quick-donation-section" aria-labelledby="vote-band-heading">
      <div className="section-overlay section-padding-140">
        <div className="container">
          <div className="section-heading">
            <h2 id="vote-band-heading">Write In Nick Varga</h2>
            <p>
              On {candidate.electionLabel}, write <strong>{candidate.fullName}</strong> on your
              ballot for {candidate.office}. Independent. Unbought. New Hampshire first.
            </p>
          </div>
          <div className="section-wrapper">
            <div className="donation-area">
              <div className="donation">
                <span className="custom-btn amount select-amount">
                  <strong>Write-In</strong>
                </span>
                <span className="custom-btn amount">
                  <strong>Nov 3</strong>
                </span>
                <span className="custom-btn amount">
                  <strong>U.S. Senate</strong>
                </span>
                <span className="custom-btn amount">
                  <strong>NH</strong>
                </span>
              </div>
              <div className="col-md-12 text-center">
                <Link href="/how-to-vote" className="custom-btn donate">
                  How to Vote Write-In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
