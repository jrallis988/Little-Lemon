import { useEffect, useState } from "react";
import { COOKIE_POLICY, POLICIES, PRIVACY_POLICY, SITE, asset } from "../data";

const PANELS = {
  policies: {
    title: "Stay policies",
    render: () => (
      <div className="footer__policies">
        {POLICIES.map((policy) => (
          <article key={policy.id}>
            <h4>{policy.title}</h4>
            <p>{policy.body}</p>
          </article>
        ))}
      </div>
    ),
  },
  cookies: {
    title: COOKIE_POLICY.title,
    updated: COOKIE_POLICY.updated,
    render: () => (
      <>
        <p className="footer__legal-intro">{COOKIE_POLICY.intro}</p>
        <div className="footer__legal-sections">
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
      </>
    ),
  },
  privacy: {
    title: PRIVACY_POLICY.title,
    updated: PRIVACY_POLICY.updated,
    render: () => (
      <>
        <p className="footer__legal-intro">{PRIVACY_POLICY.intro}</p>
        <div className="footer__legal-sections">
          {PRIVACY_POLICY.sections.map((section) => (
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
      </>
    ),
  },
};

export default function Footer() {
  const [active, setActive] = useState(null);

  useEffect(() => {
    const syncFromHash = () => {
      const id = window.location.hash.replace("#", "");
      setActive(PANELS[id] ? id : null);
    };
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  useEffect(() => {
    if (!active) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") {
        setActive(null);
        if (["policies", "cookies", "privacy"].includes(window.location.hash.slice(1))) {
          window.history.replaceState(null, "", window.location.pathname + window.location.search);
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  function openPanel(id) {
    setActive(id);
  }

  function closePanel() {
    setActive(null);
    if (["policies", "cookies", "privacy"].includes(window.location.hash.slice(1))) {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  }

  const panel = active ? PANELS[active] : null;

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
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copy">
            © {new Date().getFullYear()} {SITE.name}. Est. around {SITE.founded}.{" "}
            <a
              href="#policies"
              onClick={(event) => {
                event.preventDefault();
                openPanel("policies");
                window.history.replaceState(null, "", "#policies");
              }}
            >
              Policies
            </a>
            {" · "}
            <a
              href="#cookies"
              onClick={(event) => {
                event.preventDefault();
                openPanel("cookies");
                window.history.replaceState(null, "", "#cookies");
              }}
            >
              Cookies
            </a>
            {" · "}
            <a
              href="#privacy"
              onClick={(event) => {
                event.preventDefault();
                openPanel("privacy");
                window.history.replaceState(null, "", "#privacy");
              }}
            >
              Privacy
            </a>
          </p>
          <p className="footer__credit">Powered by Artistic Fountain</p>
        </div>
      </div>

      {panel ? (
        <div className="footer__legal-modal" role="dialog" aria-modal="true" aria-labelledby="footer-legal-title">
          <div className="footer__legal-modal-backdrop" onClick={closePanel} aria-hidden="true" />
          <div className="footer__legal-modal-card">
            <div className="footer__legal-modal-head">
              <h2 id="footer-legal-title" className="footer__legal-title">
                {panel.title}
                {panel.updated ? (
                  <span className="footer__legal-updated">{panel.updated}</span>
                ) : null}
              </h2>
              <button type="button" className="footer__legal-close" onClick={closePanel} aria-label="Close">
                Close
              </button>
            </div>
            <div className="footer__legal-modal-body">{panel.render()}</div>
          </div>
        </div>
      ) : null}
    </footer>
  );
}
