import { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { admissionsSteps, programs } from "../data/content";

const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  interest: "",
  startTerm: "Fall 2026",
  message: "",
};

function validate(values) {
  const errors = {};
  if (!values.firstName.trim()) errors.firstName = "First name is required.";
  if (!values.lastName.trim()) errors.lastName = "Last name is required.";
  if (!values.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Enter a valid email address.";
  }
  if (!values.interest) errors.interest = "Choose a program interest.";
  return errors;
}

function Admissions() {
  const location = useLocation();
  const [values, setValues] = useState({
    ...initialForm,
    interest: location.state?.program || "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const programOptions = useMemo(
    () => [...programs].sort((a, b) => a.name.localeCompare(b.name)),
    []
  );

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    setSubmitted(true);
  }

  return (
    <>
      <section className="page-hero">
        <p className="eyebrow">Admissions</p>
        <h1>A clear path from curious to enrolled</h1>
        <p className="page-hero__lede">
          Whether you know your major or you&apos;re still deciding, NHTI makes
          getting started simple — with no application fee and schedules that fit
          real life.
        </p>
        <div className="hero__actions">
          <a className="btn btn--solid" href="#inquiry-form">
            Start an inquiry
          </a>
          <Link to="/academics" className="btn btn--ghost-dark">
            Find a program
          </Link>
        </div>
      </section>

      <section className="section">
        <ol className="steps">
          {admissionsSteps.map((item) => (
            <li key={item.step} className="step">
              <span className="step__num">{item.step}</span>
              <div>
                <h2>{item.title}</h2>
                <p>{item.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="section section--muted" id="inquiry-form">
        <div className="form-layout">
          <div>
            <h2>Tell us you&apos;re interested</h2>
            <p>
              This demo inquiry form collects your details so an admissions
              counselor can follow up. For the official application, you can also
              continue on NHTI.edu.
            </p>
            <ul className="plain-list">
              <li>$0 application fee</li>
              <li>Day, evening, hybrid, and online options</li>
              <li>Financial aid and advising support</li>
            </ul>
            <a
              className="text-link"
              href="https://www.nhti.edu/admissions/"
              target="_blank"
              rel="noreferrer"
            >
              Official NHTI application
            </a>
          </div>

          {submitted ? (
            <div className="form-success" role="status">
              <h3>Inquiry received</h3>
              <p>
                Thanks, {values.firstName}. An admissions counselor would follow
                up about <strong>{values.interest}</strong> and the{" "}
                {values.startTerm} term.
              </p>
              <button
                type="button"
                className="btn btn--solid"
                onClick={() => {
                  setSubmitted(false);
                  setValues(initialForm);
                  setErrors({});
                }}
              >
                Submit another inquiry
              </button>
            </div>
          ) : (
            <form className="inquiry-form" onSubmit={handleSubmit} noValidate>
              <div className="form-row">
                <label>
                  <span>First name</span>
                  <input
                    name="firstName"
                    value={values.firstName}
                    onChange={handleChange}
                    autoComplete="given-name"
                    aria-invalid={Boolean(errors.firstName)}
                  />
                  {errors.firstName ? <em>{errors.firstName}</em> : null}
                </label>
                <label>
                  <span>Last name</span>
                  <input
                    name="lastName"
                    value={values.lastName}
                    onChange={handleChange}
                    autoComplete="family-name"
                    aria-invalid={Boolean(errors.lastName)}
                  />
                  {errors.lastName ? <em>{errors.lastName}</em> : null}
                </label>
              </div>

              <div className="form-row">
                <label>
                  <span>Email</span>
                  <input
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    autoComplete="email"
                    aria-invalid={Boolean(errors.email)}
                  />
                  {errors.email ? <em>{errors.email}</em> : null}
                </label>
                <label>
                  <span>Phone (optional)</span>
                  <input
                    type="tel"
                    name="phone"
                    value={values.phone}
                    onChange={handleChange}
                    autoComplete="tel"
                  />
                </label>
              </div>

              <div className="form-row">
                <label>
                  <span>Program interest</span>
                  <select
                    name="interest"
                    value={values.interest}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.interest)}
                  >
                    <option value="">Select a program</option>
                    {programOptions.map((program) => (
                      <option key={program.id} value={program.name}>
                        {program.name}
                      </option>
                    ))}
                  </select>
                  {errors.interest ? <em>{errors.interest}</em> : null}
                </label>
                <label>
                  <span>Preferred start</span>
                  <select
                    name="startTerm"
                    value={values.startTerm}
                    onChange={handleChange}
                  >
                    <option>Fall 2026</option>
                    <option>Spring 2027</option>
                    <option>Summer 2027</option>
                  </select>
                </label>
              </div>

              <label>
                <span>Questions for Admissions</span>
                <textarea
                  name="message"
                  rows="4"
                  value={values.message}
                  onChange={handleChange}
                  placeholder="Housing, financial aid, transfer credits, visit days..."
                />
              </label>

              <button type="submit" className="btn btn--solid">
                Submit inquiry
              </button>
            </form>
          )}
        </div>
      </section>

      <section className="section">
        <div className="info-columns">
          <article>
            <h2>Financial aid</h2>
            <p>
              Grants, scholarships, and aid counseling help lower the already
              affordable cost of a CCSNH education. Start with FAFSA and an
              Admissions conversation.
            </p>
          </article>
          <article>
            <h2>Transfer-friendly credits</h2>
            <p>
              Degree-specific agreements with UNH, SNHU, Plymouth State, Keene
              State, Colby-Sawyer, and others help you save thousands while
              staying on track.
            </p>
          </article>
          <article>
            <h2>Visit &amp; connect</h2>
            <p>
              Tour the Concord campus, meet faculty, and ask about housing,
              athletics, and online options. Call{" "}
              <a href="tel:6032304001">603-230-4001</a> to schedule.
            </p>
          </article>
        </div>
      </section>
    </>
  );
}

export default Admissions;
