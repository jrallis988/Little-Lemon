import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import { focusAreas, programs } from "../data/programs";

const siteSections = [
  {
    title: "Main",
    links: [
      { label: "Home", to: "/" },
      { label: "News", to: "/news" },
      { label: "Contact / Hours & Directions", to: "/contact" },
    ],
  },
  {
    title: "Academics",
    links: [
      { label: "Our Programs", to: "/academics" },
      ...focusAreas.map((area) => ({
        label: area.title,
        to: `/academics?focus=${area.id}`,
      })),
    ],
  },
  {
    title: "Admissions & Aid",
    links: [
      { label: "Admissions Overview", to: "/admissions" },
      { label: "How to Apply", to: "/admissions/how-to-apply" },
      { label: "Visit Campus", to: "/admissions/visit" },
      { label: "Tuition & Fees", to: "/admissions/tuition" },
      { label: "Financial Aid", to: "/admissions/financial-aid" },
    ],
  },
  {
    title: "Student Experience",
    links: [{ label: "Campus Life & Support", to: "/student-experience" }],
  },
  {
    title: "Workforce Development",
    links: [{ label: "Business & Community Training", to: "/workforce" }],
  },
  {
    title: "About",
    links: [{ label: "Mission, Vision & Values", to: "/about" }],
  },
];

function Sitemap() {
  const sortedPrograms = [...programs].sort((a, b) =>
    a.title.localeCompare(b.title)
  );

  return (
    <>
      <PageHero
        brand="Sitemap"
        title="Find your way around WMCC."
        copy="A full list of pages and programs on this White Mountains Community College site."
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
            <h2>Programs</h2>
            <p className="fine-print">
              All {sortedPrograms.length} degree and certificate programs
            </p>
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
