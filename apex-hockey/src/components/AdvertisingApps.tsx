import { adFormats, brand } from "../data/content";

export function AdvertisingApps() {
  return (
    <section className="section ads" id="ads" aria-labelledby="ads-title">
      <div className="section__inner">
        <p className="section__eyebrow">Advertising Applications</p>
        <h2 id="ads-title" className="section__title">
          Inside the hockey environment.
        </h2>
        <p className="section__lead">
          Posters, rink boards, scoreboard graphics, arena signage, retail — hierarchy holds while
          artwork stays replaceable.
        </p>

        <ul className="ads__grid">
          {adFormats.map((format) => (
            <li key={format.id} className="ad-frame">
              <div className="ad-frame__art replace-slot" style={{ aspectRatio: format.ratio }}>
                <div className="ad-frame__comp">
                  <p className="ad-frame__product">{brand.product}</p>
                  <p className="ad-frame__line">{brand.ask}</p>
                  <p className="ad-frame__sub">{brand.line}</p>
                  <div className="ad-frame__figure" aria-hidden="true" />
                  <span className="ad-frame__rule" />
                </div>
                <span className="replace-slot__label">Drop final art</span>
              </div>
              <div className="ad-frame__caption">
                <h3>{format.title}</h3>
                <p>{format.focus}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
