import { Logo } from "../components/Logo";
import { photos, seriesList } from "../data/brand";
import "./ChannelIdentity.css";

export function ChannelIdentity() {
  return (
    <section className="section" id="channel">
      <div className="wrap">
        <p className="section__eyebrow">02 · YouTube Channel</p>
        <h2 className="section__title">Channel Identity</h2>
        <p className="section__lede">
          Banner, avatar, playlists, community, and end screens share one system
          without becoming identical assets.
        </p>

        <div className="channel-banner" role="img" aria-label="COURTSIDE YouTube channel banner">
          <img src={photos.gamedayArena} alt="" />
          <div className="channel-banner__grade" />
          <div className="channel-banner__safe">
            <Logo inverted />
            <p>EVERY POSSESSION HAS A STORY.</p>
          </div>
          <span className="channel-banner__note">TV / desktop safe zone</span>
        </div>

        <div className="channel-row">
          <div className="channel-avatar-block">
            <h3>Profile / Avatar</h3>
            <div className="channel-avatar">
              <img src={photos.avatar} alt="" />
              <span className="brand-mark">CS</span>
            </div>
            <p className="asset-note">1:1 · high-contrast mark over athlete crop</p>
          </div>
          <div className="channel-community">
            <h3>Community Graphic</h3>
            <div className="community-card">
              <img src={photos.handsBall} alt="" />
              <div>
                <span>POLL</span>
                <strong>Which series should drop next?</strong>
                <p>THE LAB · GEAR · CULTURE</p>
              </div>
            </div>
          </div>
        </div>

        <div className="channel-series-strip">
          {seriesList.map((s) => (
            <span key={s.id} style={{ borderColor: s.accent as string }}>
              {s.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
