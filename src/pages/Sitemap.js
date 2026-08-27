import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import { programs } from "../data/programs";
import { flattenNavLinks, primaryNav, campusNav } from "../data/navigation";

function Sitemap() {
  const sortedPrograms = [...programs].sort((a, b) => a.title.localeCompare(b.title));
  const allLinks = flattenNavLinks();

  const siteSections = [
    ...primaryNav.map((section) => ({
      title: section.label,
      links: [
        { label: `${section.label} overview`, to: section.to },
        ...section.groups.flatMap((group) => group.links),
      ],
    })),
    {
      title: "Campus & Utilities",
      links: campusNav,
    },
    {
      title: "All registered routes",
      links: allLinks,
    },
  ];

  return (
    <>
      <PageHero
        brand="Sitemap"
        title="Find your way around Great Bay."
        copy="Full master route list for Academics, Admissions & Aid, Student Experience, Workforce, About, and campus utilities."
        image="/images/campus-exterior.jpg"
        compact
      />

      <section className="section">
        <div className="container sitemap-layout">
          {siteSections.map((section) => (
            <div key={section.title} className="sitemap-group">
              <h2>{section.title}</h2>
              <ul>
                {section.links.map((link) => (
                  <li key={link.to + link.label}>
                    <Link to={link.to}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="sitemap-group sitemap-programs">
            <h2>Programs A–Z</h2>
            <p className="fine-print">All {sortedPrograms.length} degree and certificate programs</p>
            <ul className="sitemap-program-list">
              {sortedPrograms.map((program) => (
                <li key={program.id}>
                  <Link to={`/academics/programs/${program.id}`}>
                    {program.title}
                    <span> · {program.credential}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

export default Sitemap;
