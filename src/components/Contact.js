import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import profile from "../data/profile";

const schema = Yup.object({
  name: Yup.string().trim().required("Name is required"),
  email: Yup.string().trim().email("Enter a valid email").required("Email is required"),
  message: Yup.string().trim().min(12, "A bit more detail helps").required("Message is required"),
});

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-ink-soft py-24 md:py-32">
      <div className="absolute inset-0 hero-wash opacity-60" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
      <div className="container relative grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <div className="stagger max-w-xl">
          <p className="reveal mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-foam">
            Contact
          </p>
          <h2 className="reveal font-display text-3xl font-bold text-chalk md:text-5xl">
            Let&apos;s build something people enjoy using.
          </h2>
          <p className="reveal mt-5 text-base leading-relaxed text-sand/85 md:text-lg">
            Tell me about your product, site, or team. I&apos;m especially interested in
            front-end engineering roles focused on accessible UI and design systems.
          </p>
          <div className="reveal mt-8 flex flex-wrap gap-3">
            <a href={`mailto:${profile.email}`} className="btn-primary">
              Email James
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="btn-ghost">
              LinkedIn
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer" className="btn-ghost">
              GitHub
            </a>
            <a href={`${process.env.PUBLIC_URL}/resume.html`} className="btn-ghost">
              Resume
            </a>
          </div>
        </div>

        <div className="reveal">
          <Formik
            initialValues={{ name: "", email: "", message: "" }}
            validationSchema={schema}
            onSubmit={(values, { setSubmitting, resetForm, setStatus }) => {
              const subject = encodeURIComponent(`Portfolio inquiry from ${values.name}`);
              const body = encodeURIComponent(
                `${values.message}\n\n— ${values.name}\n${values.email}`
              );
              window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
              setStatus("Opening your email client…");
              resetForm();
              setSubmitting(false);
            }}
          >
            {({ isSubmitting, status }) => (
              <Form className="space-y-5" noValidate>
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-semibold text-sand">
                    Name
                  </label>
                  <Field
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    className="field-input"
                  />
                  <ErrorMessage name="name" component="p" className="field-error" />
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-semibold text-sand">
                    Email
                  </label>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="field-input"
                  />
                  <ErrorMessage name="email" component="p" className="field-error" />
                </div>
                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-semibold text-sand">
                    Message
                  </label>
                  <Field
                    id="message"
                    name="message"
                    as="textarea"
                    rows={5}
                    className="field-input min-h-[140px] resize-y"
                  />
                  <ErrorMessage name="message" component="p" className="field-error" />
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  <button type="submit" className="btn-primary" disabled={isSubmitting}>
                    Send message
                  </button>
                  {status ? <p className="text-sm text-foam-soft">{status}</p> : null}
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </section>
  );
}
