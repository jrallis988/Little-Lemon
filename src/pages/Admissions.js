import { useState } from "react";
import useReveal from "../hooks/useReveal";

const steps = [
  {
    title: "Explore your path",
    copy: "Browse programs, compare campuses, and decide whether you want in-person, online, or hybrid classes.",
  },
  {
    title: "Apply online",
    copy: "Complete the RVCC application and share your goals so we can connect you with the right advisors.",
  },
  {
    title: "Secure your funding",
    copy: "Nearly 89% of students receive grants, scholarships, or loans. Start with the FAFSA and RVCC aid options.",
  },
  {
    title: "Get ready to start",
    copy: "Attend orientation, meet your support team, and register for courses that fit your schedule.",
  },
];

const initialForm = {
  name: "",
  email: "",
  interest: "Health Sciences",
  campus: "Claremont",
  message: "",
};

export default function Admissions() {
  const revealRef = useReveal();
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
    setForm(initialForm);
  }

  return (
    <div ref={revealRef}>
      <section className="relative overflow-hidden bg-river-deep pt-28 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_0%,rgba(212,160,23,0.2),transparent_40%)]" />
        <div className="relative section-shell pb-16 pt-8">
          <p className="eyebrow !text-sunrise">Admissions</p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            Your next step starts here
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
            Whether you are returning to school, changing careers, or starting
            fresh, admissions will help you map a clear, affordable path.
          </p>
        </div>
      </section>

      <section className="section-shell grid gap-14 py-16 sm:py-20 lg:grid-cols-[1fr_1fr]">
        <div>
          <div className="reveal" data-reveal>
            <p className="eyebrow">How it works</p>
            <h2 className="display-title mt-3">Four simple moves</h2>
          </div>
          <ol className="mt-10 space-y-8">
            {steps.map((step, index) => (
              <li key={step.title} className="reveal flex gap-4" data-reveal>
                <span className="font-display text-sm font-semibold text-sunrise">
                  0{index + 1}
                </span>
                <div>
                  <h3 className="font-display text-xl font-semibold text-river-deep">
                    {step.title}
                  </h3>
                  <p className="mt-2 leading-relaxed text-granite-muted">
                    {step.copy}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="reveal" data-reveal>
          <form
            onSubmit={handleSubmit}
            className="border border-river/15 bg-white/80 p-6 shadow-sm backdrop-blur sm:p-8"
          >
            <h2 className="font-display text-2xl font-semibold text-river-deep">
              Request information
            </h2>
            <p className="mt-2 text-granite-muted">
              Tell us a little about yourself and we will follow up with next
              steps.
            </p>

            <div className="mt-8 space-y-5">
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-river-deep">
                  Full name
                </span>
                <input
                  required
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full rounded-md border border-river/20 bg-white px-3 py-2.5 outline-none ring-sunrise/40 focus:ring-2"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-river-deep">
                  Email
                </span>
                <input
                  required
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full rounded-md border border-river/20 bg-white px-3 py-2.5 outline-none ring-sunrise/40 focus:ring-2"
                />
              </label>

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-river-deep">
                    Area of interest
                  </span>
                  <select
                    name="interest"
                    value={form.interest}
                    onChange={handleChange}
                    className="w-full rounded-md border border-river/20 bg-white px-3 py-2.5 outline-none ring-sunrise/40 focus:ring-2"
                  >
                    <option>Health Sciences</option>
                    <option>STEM & Technology</option>
                    <option>Business & Accounting</option>
                    <option>Education & Human Services</option>
                    <option>Not sure yet</option>
                  </select>
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-river-deep">
                    Preferred campus
                  </span>
                  <select
                    name="campus"
                    value={form.campus}
                    onChange={handleChange}
                    className="w-full rounded-md border border-river/20 bg-white px-3 py-2.5 outline-none ring-sunrise/40 focus:ring-2"
                  >
                    <option>Claremont</option>
                    <option>Keene</option>
                    <option>Lebanon</option>
                    <option>Online / flexible</option>
                  </select>
                </label>
              </div>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-river-deep">
                  Anything else we should know?
                </span>
                <textarea
                  name="message"
                  rows="4"
                  value={form.message}
                  onChange={handleChange}
                  className="w-full rounded-md border border-river/20 bg-white px-3 py-2.5 outline-none ring-sunrise/40 focus:ring-2"
                />
              </label>
            </div>

            <button type="submit" className="btn-primary mt-7 w-full sm:w-auto">
              Send request
            </button>

            {submitted ? (
              <p className="mt-4 text-sm font-medium text-valley" role="status">
                Thanks — your request is ready. In a live site, this would reach
                the admissions team.
              </p>
            ) : null}
          </form>
        </div>
      </section>
    </div>
  );
}
