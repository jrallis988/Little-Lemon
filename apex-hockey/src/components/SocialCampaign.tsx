import { brand, carouselSlides, igPosts, stories, youtubeThumbs } from "../data/content";

export function SocialCampaign() {
  return (
    <section className="section social" id="social" aria-labelledby="social-title">
      <div className="section__inner">
        <p className="section__eyebrow">Social Media Campaign</p>
        <h2 id="social-title" className="section__title">
          Platform-native executions.
        </h2>
        <p className="section__lead">
          Each treatment is designed for its format — not one graphic resized repeatedly.
        </p>

        <div className="social__block">
          <h3 className="headline">Instagram Feed</h3>
          <p className="social__note">1080 × 1080 and 1080 × 1350</p>
          <ul className="social__ig-grid">
            {igPosts.map((post) => (
              <li key={post.id}>
                <article className="social-card replace-slot" style={{ aspectRatio: post.ratio }}>
                  <p className="social-card__kicker">{post.title}</p>
                  <p className="social-card__line">
                    {post.id === "quote" ? "0.18s" : brand.line}
                  </p>
                  <p className="social-card__sub">
                    {post.id === "announce"
                      ? brand.product
                      : post.id === "athlete"
                        ? "Athlete crop"
                        : post.id === "feature"
                          ? "Blade response tech"
                          : "Simulated release metric"}
                  </p>
                  <span className="replace-slot__label">{post.size}</span>
                </article>
              </li>
            ))}
          </ul>
        </div>

        <div className="social__block">
          <h3 className="headline">Instagram Carousel — 6 Slides</h3>
          <ol className="carousel">
            {carouselSlides.map((slide) => (
              <li key={slide.n} className="carousel__slide replace-slot">
                <span className="carousel__num">{String(slide.n).padStart(2, "0")}</span>
                <h4>{slide.title}</h4>
                <p>{slide.copy}</p>
                <span className="replace-slot__label">1080 × 1080</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="social__block">
          <h3 className="headline">Stories &amp; Reels · 1080 × 1920</h3>
          <ul className="stories">
            {stories.map((story) => (
              <li key={story.id} className="story-frame replace-slot">
                <div className="story-frame__safe" aria-hidden="true" />
                <p className="story-frame__title">{story.title}</p>
                <p className="story-frame__line">{brand.line}</p>
                <span className="replace-slot__label">Story / Reel</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="social__block">
          <h3 className="headline">TikTok Vertical System</h3>
          <p className="social__note">
            Safe areas account for TikTok UI — username, captions, and right-rail actions. Not a
            duplicated Instagram Story.
          </p>
          <div className="tiktok-stage">
            <article className="tiktok-frame replace-slot">
              <div className="tiktok-frame__safe">
                <p className="tiktok-frame__hook">Don&apos;t hesitate.</p>
                <p className="tiktok-frame__product">{brand.product}</p>
                <p className="tiktok-frame__line">{brand.line}</p>
              </div>
              <div className="tiktok-ui" aria-hidden="true">
                <div className="tiktok-ui__rail" />
                <div className="tiktok-ui__caption" />
              </div>
              <span className="replace-slot__label">TikTok safe-area system</span>
            </article>
            <ul className="tiktok-notes">
              <li>Top reserved for system / sounds</li>
              <li>Right rail kept clear of critical type</li>
              <li>Lower third avoids caption collision</li>
              <li>Hook-first composition for silent autoplay</li>
            </ul>
          </div>
        </div>

        <div className="social__block">
          <h3 className="headline">YouTube Thumbnails · 16:9</h3>
          <ul className="yt-grid">
            {youtubeThumbs.map((thumb) => (
              <li key={thumb.id} className="yt-thumb replace-slot">
                <div className="yt-thumb__art" aria-hidden="true" />
                <div className="yt-thumb__type">
                  <p className="yt-thumb__title">{thumb.title}</p>
                  <p className="yt-thumb__sub">{thumb.sub}</p>
                </div>
                <span className="replace-slot__label">Readable at thumbnail size</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
