import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import useReveal from "../hooks/useReveal";
import { aidSteps, images, outcomes } from "../data/content";

export default function FinancialAid() {
  const revealRef = useReveal();

  return (
    <div ref={revealRef}>
      <PageHero
        eyebrow="Financial Aid"
        title="Make college affordable — then finish"
        summary="Nearly 89% of RVCC students receive grants, scholarships, or loans. Start early, ask questions, and stack every dollar that fits."
        image={images.library}
        imageAlt="Students and staff gathered for a panel discussion at RVCC"
      />

      <section className="section-shell py-16 sm:py-20">
        <div className="reveal max-w-3xl" data-reveal>
          <p className="eyebrow">How aid works</p>
          <h2 className="display-title mt-3">Four moves that unlock funding</h2>
        </div>

        <ol className="mt-12 grid gap-8 md:grid-cols-2">
          {aidSteps.map((step, index) => (
            <li
              key={step.title}
              className="reveal border-l border-river/20 pl-5"
              data-reveal
            >
              <span className="font-display text-sm font-semibold text-sunrise">
                0{index + 1}
              </span>
              <h3 className="mt-3 font-display text-2xl font-semibold text-river-deep">
                {step.title}
              </h3>
              <p className="mt-3 leading-relaxed text-granite-muted">
                {step.copy}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-[linear-gradient(180deg,rgba(231,242,245,0.9),rgba(246,251,252,0.3))] py-16 sm:py-20">
        <div className="section-shell grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="reveal" data-reveal>
            <p className="eyebrow">Tuition snapshot</p>
            <h2 className="display-title mt-3">
              Full-time tuition near $6,940 a year
            </h2>
            <p className="body-copy mt-5">
              Costs vary by load and program, but RVCC is built to keep the door
              open. Aid counselors help you compare grants, scholarships, and
              responsible loan options before you enroll.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/admissions" className="btn-primary">
                Ask admissions about aid
              </Link>
              <a
                href="https://studentaid.gov/h/apply-for-aid/fafsa"
                target="_blank"
                rel="noreferrer"
                className="btn-ghost"
              >
                Start the FAFSA
              </a>
            </div>
          </div>

          <dl className="reveal grid grid-cols-2 gap-6" data-reveal>
            {outcomes.map((item) => (
              <div key={item.label}>
                <dt className="font-display text-3xl font-semibold text-river">
                  {item.value}
                </dt>
                <dd className="mt-2 text-sm text-granite-muted">{item.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </div>
  );
}
