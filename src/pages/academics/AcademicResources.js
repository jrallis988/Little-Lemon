import { Link } from "react-router-dom";
import PageHero from "../../components/PageHero";
import SectionNav from "../../components/SectionNav";
import {
  academicResources,
  academicSupportServices,
  academicsNav,
} from "../../data/academicsContent";

function AcademicResources() {
  return (
    <>
      <PageHero
        brand="Academics"
        title="Academic resources"
        copy="The catalog, advising, tutoring, transfer support, and student success services that help you move from your first class to graduation."
        image="/images/science-lab.jpg"
      />
      <SectionNav label="Academics section" items={academicsNav} />

      <section className="section">
        <div className="container">
          <div className="section-intro">
            <p className="eyebrow">Plan your path</p>
            <h2>Academic tools that make the next step easier.</h2>
          </div>
          <div className="area-grid">
            {academicResources.map((resource) => (
              <article key={resource.title} className="area-item">
                <h3>{resource.title}</h3>
                <p>{resource.copy}</p>
                {resource.to ? (
                  <Link className="text-link" to={resource.to}>
                    {resource.linkLabel}
                  </Link>
                ) : (
                  <a
                    className="text-link"
                    href={resource.href}
                    target={resource.href?.startsWith("http") ? "_blank" : undefined}
                    rel={resource.href?.startsWith("http") ? "noreferrer" : undefined}
                  >
                    {resource.linkLabel}
                  </a>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-tint">
        <div className="container support-grid">
          <div>
            <p className="eyebrow">CAPS & support</p>
            <h2>One-on-one help throughout the semester.</h2>
            <p>
              Great Bay&apos;s Center for Academic Planning and Support helps
              students with planning, persistence, tutoring, accommodations, and
              transfer preparation.
            </p>
          </div>
          <ul className="support-list">
            {academicSupportServices.map((service) => (
              <li key={service.title}>
                <strong>{service.title}</strong>
                <span>{service.copy}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

export default AcademicResources;
