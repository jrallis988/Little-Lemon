import { useEffect } from "react";
import { COOKIE_POLICY, POLICIES, PRIVACY_POLICY, SITE, asset } from "../data";

function LegalBlock({ id, policy }) {
  return (
    <details className="footer__legal" id={id}>
      <summary>
        <span>{policy.title}</span>
        <span className="footer__legal-updated">{policy.updated}</span>
      </summary>
      <p className="footer__legal-intro">{policy.intro}</p>
      <div className="footer__legal-sections">
        {policy.sections.map((section) => (
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
    </details>
  );
}

export default function Footer() {
  useEffect(() => {
    const openFromHash = () => {
      const id = window.location.hash.replace("#", "");
      if (!["cookies", "privacy", "policies"].includes(id)) return;
      const el = document.getElementById(id);
      if (el instanceof HTMLDetailsElement) {
        el.open = true;
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, []);

  return (
    <footer className="footer" id="site-footer">
      <div className="footer__inner">
        <div className="footer__top">
          <div className="footer__brand-block">
            <img
              className="footer__logo"
              src={asset("/seascape-inn-logo.png")}
              alt=""
              width="140"
              height="40"
            />
            <p className="footer__lede">{SITE.tagline}</p>
            <div className="footer__meta">
              <span>{SITE.addressShort}</span>
              <a href={SITE.phoneHref}>{SITE.phone}</a>
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </div>
          </div>

          <div className="footer__quick">
            <nav className="footer__nav" aria-label="Footer">
              <a href="#about">About</a>
              <a href="#rooms">Rooms</a>
              <a href="#rates">Rates</a>
              <a href="#reviews">Reviews</a>
              <a href="#location">Explore</a>
              <a href="#faq">FAQ</a>
              <a href={SITE.bookingUrl} target="_blank" rel="noreferrer">
                Book online
              </a>
            </nav>
            <div className="footer__social">
              <a href={SITE.social.facebook} target="_blank" rel="noreferrer">
                Facebook
              </a>
              <a href={SITE.tripadvisorUrl} target="_blank" rel="noreferrer">
                TripAdvisor
              </a>
              <a href={SITE.website} target="_blank" rel="noreferrer">
                Official site
              </a>
            </div>
          </div>
        </div>

        <details className="footer__policies-fold" id="policies">
          <summary>Stay policies</summary>
          <div className="footer__policies">
            {POLICIES.map((policy) => (
              <article key={policy.id}>
                <h3>{policy.title}</h3>
                <p>{policy.body}</p>
              </article>
            ))}
          </div>
        </details>

        <div className="footer__legal-stack">
          <LegalBlock id="cookies" policy={COOKIE_POLICY} />
          <LegalBlock id="privacy" policy={PRIVACY_POLICY} />
        </div>

        <div className="footer__bottom">
          <p className="footer__copy">
            © {new Date().getFullYear()} {SITE.name}. Est. around {SITE.founded}.{" "}
            <a href="#policies">Policies</a>
            {" · "}
            <a href="#cookies">Cookies</a>
            {" · "}
            <a href="#privacy">Privacy</a>
          </p>
          <p className="footer__credit">Powered by Artistic Fountain</p>
        </div>
      </div>
    </footer>
  );
}
