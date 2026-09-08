import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import PageHero from "../../components/PageHero";
import SectionNav from "../../components/SectionNav";
import { academicsSectionNav } from "../../data/navigation";
import { courseOfferings, getCourseByCode } from "../../data/courses";

function CourseSchedule() {
  const [modality, setModality] = useState("all");

  const rows = useMemo(() => {
    return courseOfferings
      .filter((row) => modality === "all" || row.modality.toLowerCase().includes(modality))
      .map((row) => ({
        ...row,
        course: getCourseByCode(row.code),
      }));
  }, [modality]);

  return (
    <>
      <PageHero
        brand="Academics"
        title="Course schedule & offerings"
        copy="Sample Fall 2026 offerings across in-person, evening, online, hyflex, and clinical formats."
        image="/images/campus-lobby.jpg"
      />
      <SectionNav label="Academics" items={academicsSectionNav} />

      <section className="section">
        <div className="container">
          <div className="schedule-toolbar">
            <label>
              Modality
              <select value={modality} onChange={(event) => setModality(event.target.value)}>
                <option value="all">All formats</option>
                <option value="in person">In person</option>
                <option value="online">Online</option>
                <option value="hyflex">Hyflex</option>
                <option value="evening">Evening</option>
                <option value="clinical">Clinical / lab</option>
              </select>
            </label>
            <p className="fine-print">Showing {rows.length} sections for Fall 2026 (sample data).</p>
          </div>

          <div className="schedule-table-wrap">
            <table className="schedule-table">
              <thead>
                <tr>
                  <th>Course</th>
                  <th>Section</th>
                  <th>Modality</th>
                  <th>Days / Time</th>
                  <th>Seats</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id}>
                    <td>
                      <strong>{row.code}</strong>
                      <span>{row.course?.title}</span>
                    </td>
                    <td>{row.section}</td>
                    <td>{row.modality}</td>
                    <td>
                      {row.days}
                      <span>{row.time}</span>
                    </td>
                    <td>{row.seats}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="section-cta left">
            <Link className="btn btn-navy" to="/academics/registration">
              Registration steps
            </Link>
            <Link className="btn btn-gold" to="/academics/support/advising">
              Meet with advising
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default CourseSchedule;
