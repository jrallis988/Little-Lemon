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
          A complete visual content system for a fictional basketball media
          brand — thumbnails, series packaging, motion graphics, and
          platform-specific YouTube identity.
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
