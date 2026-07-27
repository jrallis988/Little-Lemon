import PageHero from "../components/PageHero";
import { directoryDepartments } from "../data/academicsContent";

function Directory() {
  return (
    <>
      <PageHero
        brand="Directory"
        title="Faculty & staff directory"
        copy="Connect with admissions, advising, faculty groups, financial aid, athletics, and student support offices."
        image="/images/students.jpg"
        compact
      />

      <section className="section">
        <div className="container directory-grid">
          {directoryDepartments.map((department) => (
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
      </section>
    </>
  );
}

export default Directory;
