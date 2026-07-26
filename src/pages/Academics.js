import { useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { focusAreas } from "../data/content";

function Academics() {
  const location = useLocation();
  const listRef = useRef(null);

  useEffect(() => {
    const focus = location.state?.focus;
    if (!focus || !listRef.current) return;
    const target = listRef.current.querySelector(`#focus-${focus}`);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [location.state]);

  return (
    <>
      <section className="page-hero">
        <p className="eyebrow">Academics</p>
        <h1>80+ programs built for work and transfer</h1>
        <p className="page-hero__lede">
          Associate degrees and certificates across healthcare, engineering,
          business, education, public service, and the liberal arts — with
          daytime, evening, hybrid, and online options.
        </p>
      </section>

      <section className="section" ref={listRef}>
        <div className="focus-stack">
          {focusAreas.map((area) => (
            <article
              key={area.id}
              id={`focus-${area.id}`}
              className="focus-block"
            >
              <div className="focus-block__intro">
                <h2>{area.title}</h2>
                <p>{area.summary}</p>
              </div>
              <ul className="program-chips">
                {area.programs.map((program) => (
                  <li key={program}>{program}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section section--muted">
        <div className="support-panel">
          <h2>Academic support that stays with you</h2>
          <p>
            Advising, tutoring, and the Academic Center for Excellence help you
            map credits, stay on pace, and transfer confidently to four-year
            partners across New Hampshire.
          </p>
          <Link to="/admissions" className="btn btn--solid">
            Talk with Admissions
          </Link>
        </div>
      </section>
    </>
  );
}

export default Academics;
