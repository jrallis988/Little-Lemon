import { COOKIE_POLICY, POLICIES, SITE } from "../data";

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
            <a href="#faq">FAQ</a>
            <a href="#booking">Book</a>
            <a href="#policies">Policies</a>
            <a href="#cookies">Cookie policy</a>
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

        <section
          className="footer__cookies"
          id="cookies"
          aria-labelledby="cookies-title"
        >
          <div className="footer__cookies-head">
            <h3 id="cookies-title">{COOKIE_POLICY.title}</h3>
            <p className="footer__cookies-updated">
              Last updated: {COOKIE_POLICY.updated}
            </p>
          </div>
          <p className="footer__cookies-intro">{COOKIE_POLICY.intro}</p>
          <div className="footer__cookies-sections">
            {COOKIE_POLICY.sections.map((section) => (
              <article key={section.title}>
                <h4>{section.title}</h4>
                <p>{section.body}</p>
                {section.bullets ? (
                  <ul>
                    {section.bullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </article>
            ))}
          </div>
        </section>

        <div className="footer__bottom">
          <p className="footer__copy">
            © {new Date().getFullYear()} {SITE.name}. Family inn since around{" "}
            {SITE.founded}. All rights reserved.{" "}
            <a href="#cookies">Cookie policy</a>
          </p>
          <p className="footer__credit">Powered by Artistic Fountain</p>
        </div>
      </div>
    </footer>
  );
}
