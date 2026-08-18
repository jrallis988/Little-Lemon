import Link from "next/link";
import { candidate, hasIntroVideo } from "@/lib/candidate";
import { WatchVideoButton } from "@/components/home/WatchVideoButton";

export function Hero() {
  return (
    <section className="banner banner-1 varga-hero" id="home-hero" aria-label="Campaign hero">
      <div className="banner-content">
        <div className="container">
          <div className="banner-content-text varga-hero-copy">
            <h1 className="text-capitalize hero-tagline varga-hero-title">
              <span className="d-sm-block">People Over</span> Politics.
            </h1>
            <h6 className="varga-hero-sub">
              Independent write-in for {candidate.office} — {candidate.state} ·{" "}
              {candidate.electionLabel}
            </h6>
            <div className="varga-hero-actions varga-hero-cta">
              <Link href="/how-to-vote" className="custom-btn varga-btn-motion">
                How to Vote Write-In
              </Link>
              {hasIntroVideo() ? <WatchVideoButton /> : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
