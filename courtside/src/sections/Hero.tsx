import { Logo } from "../components/Logo";
import { brand, photos } from "../data/brand";
import "./Hero.css";

export function Hero() {
  return (
    <header className="hero">
      <div className="hero__media" aria-hidden="true">
        <img src={photos.actionDrive} alt="" className="hero__photo" />
        <div className="hero__grade" />
      </div>
      <div className="wrap hero__content">
        <p className="hero__kicker">YouTube Sports Design System</p>
        <Logo variant="wordmark" inverted className="hero__logo" />
        <p className="hero__tag">{brand.tagline}</p>
        <p className="hero__lede">
          A scalable visual content system for sports media — built to carry
          athlete stories, analysis, training, gear, live coverage, and culture
          without fragmenting the brand.
        </p>
        <div className="hero__meta">
          <span>Portfolio Case Study</span>
          <span>Fictional Brand</span>
          <span>Ages 15–34</span>
        </div>
      </div>
    </header>
  );
}
