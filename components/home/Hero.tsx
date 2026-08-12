import Link from "next/link";
import { candidate } from "@/lib/candidate";

export function Hero() {
  return (
    <section className="banner banner-1 varga-hero" id="home-hero" aria-label="Campaign hero">
      <div className="banner-content">
        <div className="container">
          <div className="banner-content-text varga-hero-copy">
            <h1 className="hero-tagline varga-hero-title">
              <span className="varga-hero-line">People Over</span>
              <span className="varga-hero-line">Politics.</span>
            </h1>
            <h6 className="varga-hero-sub">
              Independent write-in for {candidate.office} — {candidate.state} ·{" "}
              {candidate.electionLabel}
            </h6>
            <Link href="/how-to-vote" className="custom-btn varga-hero-cta varga-btn-motion">
              How to Vote Write-In
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
