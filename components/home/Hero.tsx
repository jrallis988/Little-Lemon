import { candidate } from "@/lib/candidate";

export function Hero() {
  return (
    <section className="banner banner-1 varga-hero" id="home-hero" aria-label="Campaign hero">
      <div className="banner-content">
        <div className="container">
          <div className="banner-content-text">
            <h1 className="text-capitalize hero-tagline varga-hero-title">
              <span className="d-sm-block">People Over</span> Politics.
            </h1>
            <h6 className="varga-hero-sub">
              Independent write-in for {candidate.office} — {candidate.state} ·{" "}
              {candidate.electionLabel}
            </h6>
          </div>
        </div>
      </div>
    </section>
  );
}
