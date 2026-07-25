export default function Hero() {
  return (
    <section className="hero" id="top" aria-label="Saltline Motel welcome">
      <div className="hero__media" aria-hidden="true">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=80"
          alt=""
        />
        <div className="hero__shade" />
      </div>

      <div className="hero__content">
        <p className="hero__brand">Saltline Motel</p>
        <h1 className="hero__headline">Sleep where the tide turns.</h1>
        <p className="hero__lede">
          A small beachfront motel with ocean-facing rooms, warm mornings, and
          sand still cool underfoot.
        </p>
        <div className="hero__actions">
          <a className="btn btn-primary" href="#booking">
            Book a stay
          </a>
          <a className="btn btn-secondary" href="#rooms">
            View rooms
          </a>
        </div>
      </div>
    </section>
  );
}
