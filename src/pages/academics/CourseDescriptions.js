import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import PageHero from "../../components/PageHero";
import SectionNav from "../../components/SectionNav";
import { academicsSectionNav } from "../../data/navigation";
import { courses, courseSubjects } from "../../data/courses";

function CourseDescriptions() {
  const [query, setQuery] = useState("");
  const [subject, setSubject] = useState("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return courses.filter((course) => {
      const matchesSubject = subject === "all" || course.subject === subject;
      const matchesQuery =
        !q ||
        course.code.toLowerCase().includes(q) ||
        course.title.toLowerCase().includes(q) ||
        course.description.toLowerCase().includes(q);
      return matchesSubject && matchesQuery;
    });
  }, [query, subject]);

  return (
    <>
      <PageHero
        brand="Academics"
        title="Course descriptions"
        copy="Browse credit courses by subject and search by code or title as you plan your degree or certificate."
        image="/images/science-lab.jpg"
      />
      <SectionNav label="Academics" items={academicsSectionNav} />

      <section className="section">
        <div className="container">
          <form
            className="course-filters"
            onSubmit={(event) => event.preventDefault()}
          >
            <label>
              Search courses
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by code, title, or keyword"
              />
            </label>
            <label>
              Subject
              <select value={subject} onChange={(event) => setSubject(event.target.value)}>
                <option value="all">All subjects</option>
                {courseSubjects.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
            <p className="course-count">Showing {filtered.length} of {courses.length} courses</p>
          </form>

          <div className="course-list">
            {filtered.map((course) => (
              <article key={course.code} className="course-card">
                <div className="course-card-top">
                  <p className="course-code">{course.code}</p>
                  <p className="course-credits">{course.credits} credits</p>
                </div>
                <h2>{course.title}</h2>
                <p className="course-subject">{course.subject}</p>
                <p>{course.description}</p>
              </article>
            ))}
          </div>

          <div className="section-cta left">
            <Link className="btn btn-navy" to="/academics/course-schedule">
              View course schedule
            </Link>
            <Link className="btn btn-gold" to="/academics/catalog">
              College catalog
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default CourseDescriptions;
