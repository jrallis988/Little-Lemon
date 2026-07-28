import { POLICIES, SITE } from "../data";

export default function Footer() {
  return (
    <footer className="footer" id="policies">
      <div className="footer__inner">
        <div className="footer__top">
          <div>
            <div className="footer__brand">{SITE.name}</div>
            <p className="footer__lede">{SITE.tagline}</p>
            <div className="footer__meta">
              <span>{SITE.addressShort}</span>
              <a href={SITE.phoneHref}>{SITE.phone}</a>
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </div>
            <div className="footer__social">
              <a href={SITE.social.facebook} target="_blank" rel="noreferrer">
                Facebook
              </a>
              <a href={SITE.website} target="_blank" rel="noreferrer">
                Official website
              </a>
              <a href={SITE.tripadvisorUrl} target="_blank" rel="noreferrer">
                TripAdvisor
              </a>
              <a href={SITE.bookingUrl} target="_blank" rel="noreferrer">
                Book online
              </a>
            </div>
          </div>

          <nav className="footer__nav" aria-label="Footer">
            <a href="#about">About</a>
            <a href="#rooms">Rooms</a>
            <a href="#rates">Rates</a>
            <a href="#shore">Plaice Cove</a>
            <a href="#reviews">Guest notes</a>
            <a href="#location">Find us</a>
            <a href="#explore">Things to do</a>
            <a href="#booking">Book</a>
            <a href="#policies">Policies</a>
          </nav>
        </div>

        <div className="footer__policies">
          {POLICIES.map((policy) => (
            <article key={policy.id}>
              <h3>{policy.title}</h3>
              <p>{policy.body}</p>
            </article>
          ))}
        </div>

        <div className="footer__bottom">
          <p className="footer__copy">
            © {new Date().getFullYear()} {SITE.name}. Family inn since around{" "}
            {SITE.founded}. All rights reserved.
          </p>
          <p className="footer__credit">Powered by Artistic Fountain</p>
        </div>
      </div>
    </footer>
  );
}
