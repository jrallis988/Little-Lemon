import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import SectionNav from "../components/SectionNav";
import { iconMap } from "../components/Icons";
import { getPage } from "../data/pageContent";

function ContentPage({ path, sectionNav, sectionLabel = "Section" }) {
  const data = getPage(path);

  if (!data) {
    return (
      <section className="section">
        <div className="container">
          <h1>Page not found</h1>
          <p>This section is not available yet.</p>
          <Link className="btn btn-navy" to="/">
            Back home
          </Link>
        </div>
      </section>
    );
  }

  const Icon = iconMap[data.icon] || iconMap.book;

  return (
    <>
      <PageHero
        brand={data.brand}
        title={data.title}
        copy={data.copy}
        image={data.image}
      />
      {sectionNav ? <SectionNav label={sectionLabel} items={sectionNav} /> : null}

      <section className="section">
        <div className="container content-page-layout">
          <div className="content-page-main">
            {data.sections?.map((section) => (
              <article key={section.heading || section.body} className="content-block">
                {section.heading ? <h2>{section.heading}</h2> : null}
                {section.body ? <p>{section.body}</p> : null}
                {section.bullets?.length ? (
                  <ul className="check-list">
                    {section.bullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </article>
            ))}

            {data.links?.length ? (
              <div className="content-page-actions">
                {data.links.map((link) =>
                  link.external || link.href?.startsWith("http") || link.href?.startsWith("mailto:") ? (
                    <a
                      key={link.label}
                      className="btn btn-navy"
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noreferrer" : undefined}
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      key={link.label}
                      className="btn btn-gold"
                      to={link.to || link.href}
                    >
                      {link.label}
                    </Link>
                  )
                )}
              </div>
            ) : null}
          </div>

          <aside className="content-page-aside">
            <div className="content-page-card">
              <span className="content-page-icon">
                <Icon accent />
              </span>
              <h3>Need help?</h3>
              <p>
                Admissions and advising can help you choose a path, plan a visit,
                or register for the next term.
              </p>
              <Link className="text-link" to="/contact">
                Contact Great Bay
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

export default ContentPage;
