import { useMemo, useState } from "react";
import PageHero from "../components/PageHero";
import { directoryDepartments } from "../data/academicsContent";

function Directory() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return directoryDepartments;

    return directoryDepartments
      .map((department) => ({
        ...department,
        contacts: department.contacts.filter((contact) => {
          const haystack = [
            department.title,
            contact.name,
            contact.role,
            contact.email,
            contact.office,
            contact.phone,
          ]
            .join(" ")
            .toLowerCase();
          return haystack.includes(q);
        }),
      }))
      .filter((department) => department.contacts.length > 0);
  }, [query]);

  const total = filtered.reduce((sum, department) => sum + department.contacts.length, 0);

  return (
    <>
      <PageHero
        brand="Directory"
        title="Faculty & staff directory"
        copy="Search admissions, advising, faculty groups, financial aid, athletics, and student support offices."
        image="/images/students.jpg"
        compact
      />

      <section className="section">
        <div className="container">
          <form className="directory-search" onSubmit={(event) => event.preventDefault()}>
            <label>
              Search directory
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by name, office, email, or department"
              />
            </label>
            <p className="fine-print">Showing {total} contacts</p>
          </form>

          <div className="directory-grid">
            {filtered.map((department) => (
              <section key={department.title} className="directory-section">
                <h2>{department.title}</h2>
                <div className="directory-cards">
                  {department.contacts.map((contact) => (
                    <article key={contact.name + contact.role} className="directory-card">
                      <h3>{contact.name}</h3>
                      <p className="directory-role">{contact.role}</p>
                      <ul>
                        <li>
                          <a href={`mailto:${contact.email}`}>{contact.email}</a>
                        </li>
                        <li>
                          <a href={`tel:${contact.phone.replace(/[^\d]/g, "")}`}>{contact.phone}</a>
                        </li>
                        <li>{contact.office}</li>
                      </ul>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Directory;
