import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import Seo from "../components/Seo";
import useReveal from "../hooks/useReveal";
import {
  aidSteps,
  estimateTuition,
  images,
  outcomes,
  tuition,
} from "../data/content";

export default function FinancialAid() {
  const revealRef = useReveal();
  const [rateIndex, setRateIndex] = useState(0);
  const [credits, setCredits] = useState(30);

  const estimate = useMemo(
    () =>
      estimateTuition({
        ratePerCredit: tuition.rates[rateIndex].amount,
        credits: Number(credits) || 0,
      }),
    [rateIndex, credits]
  );

  return (
    <div ref={revealRef}>
      <Seo
        title="Financial Aid"
        description="FAFSA school code 007560, tuition rates, and a quick estimate calculator for River Valley Community College."
        path="/financial-aid"
      />
      <PageHero
        eyebrow="Financial Aid"
        title="Make college affordable — then finish"
        summary="Nearly 89% of RVCC students receive grants, scholarships, or loans. Start early, ask questions, and stack every dollar that fits."
        image={images.library}
        imageAlt="Students and staff gathered for a panel discussion at RVCC"
      />

      <section className="section-shell py-14 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <p className="eyebrow">FAFSA first</p>
            <h2 className="display-title mt-3">School code {tuition.fafsaCode}</h2>
            <p className="body-copy mt-4">
              Complete the FAFSA each aid year and list River Valley Community
              College with code <strong>{tuition.fafsaCode}</strong>. The
              preferred filing date is April 1 for the upcoming year.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://studentaid.gov/h/apply-for-aid/fafsa"
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
            >
              Start the FAFSA
            </a>
            <a
              href="https://www.ccsnh.edu/online-resources/"
              target="_blank"
              rel="noreferrer"
              className="btn-ghost"
            >
              Accept aid in SIS
            </a>
          </div>
        </div>
      </section>

      <section className="border-y border-river/10 bg-white/70 py-14 sm:py-16">
        <div className="section-shell">
          <div className="max-w-3xl">
            <p className="eyebrow">How aid works</p>
            <h2 className="display-title mt-3">Four moves that unlock funding</h2>
          </div>
          <ol className="mt-10 grid gap-8 md:grid-cols-2">
            {aidSteps.map((step, index) => (
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
      </section>

      <section className="section-shell py-14 sm:py-16">
        <div className="max-w-3xl">
          <p className="eyebrow">Tuition snapshot · {tuition.yearLabel}</p>
          <h2 className="display-title mt-3">Know the per-credit rates</h2>
        </div>

        <div className="mt-8 overflow-x-auto border border-river/10 bg-white/80">
          <table className="min-w-full text-left text-sm">
            <caption className="sr-only">
              Published per-credit tuition rates for {tuition.yearLabel}
            </caption>
            <thead className="bg-river-mist/80 text-xs uppercase tracking-[0.14em] text-valley">
              <tr>
                <th scope="col" className="px-4 py-3 font-semibold">
                  Residency
                </th>
                <th scope="col" className="px-4 py-3 font-semibold">
                  Rate
                </th>
              </tr>
            </thead>
            <tbody>
              {tuition.rates.map((rate) => (
                <tr key={rate.label} className="border-t border-river/10">
                  <td className="px-4 py-3 text-granite">{rate.label}</td>
                  <td className="px-4 py-3 font-semibold text-river-deep">
                    ${rate.amount}/{rate.unit.replace("per ", "")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <ul className="mt-6 space-y-2 text-sm text-granite-muted">
          {tuition.notes.map((note) => (
            <li key={note}>• {note}</li>
          ))}
        </ul>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {tuition.enrollment.map((item) => (
            <div key={item.label} className="border-t border-river/15 pt-4">
              <p className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-valley">
                {item.label}
              </p>
              <p className="mt-2 text-sm text-granite">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[linear-gradient(180deg,rgba(231,242,245,0.9),rgba(246,251,252,0.3))] py-14 sm:py-16">
        <div className="section-shell grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div>
            <p className="eyebrow">Quick estimate</p>
            <h2 className="display-title mt-3 !text-3xl sm:!text-4xl">
              Rough annual tuition calculator
            </h2>
            <p className="body-copy mt-4">
              This estimate uses published per-credit tuition plus the
              comprehensive student services fee. Lab and program fees may add
              more — talk with Financial Aid for your exact package.
            </p>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-river-deep">
                  Residency rate
                </span>
                <select
                  value={rateIndex}
                  onChange={(event) => setRateIndex(Number(event.target.value))}
                  className="w-full rounded-md border border-river/20 bg-white px-3 py-2.5 outline-none ring-sunrise/40 focus:ring-2"
                >
                  {tuition.rates.map((rate, index) => (
                    <option key={rate.label} value={index}>
                      {rate.label} (${rate.amount}/credit)
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-river-deep">
                  Credits this year
                </span>
                <input
                  type="number"
                  min="1"
                  max="40"
                  value={credits}
                  onChange={(event) => setCredits(event.target.value)}
                  className="w-full rounded-md border border-river/20 bg-white px-3 py-2.5 outline-none ring-sunrise/40 focus:ring-2"
                />
              </label>
            </div>
          </div>

          <div
            className="border border-river/15 bg-white/85 p-6 sm:p-8"
            aria-live="polite"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-valley">
              Estimated total
            </p>
            <p className="mt-3 font-display text-4xl font-semibold text-river-deep">
              ${estimate.estimatedTotal.toLocaleString()}
            </p>
            <dl className="mt-6 space-y-3 text-sm text-granite">
              <div className="flex justify-between gap-4">
                <dt>Tuition ({estimate.credits} credits)</dt>
                <dd className="font-semibold">
                  ${estimate.tuitionTotal.toLocaleString()}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt>Student services fee</dt>
                <dd className="font-semibold">
                  ${estimate.servicesFee.toLocaleString()}
                </dd>
              </div>
            </dl>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/admissions" className="btn-primary">
                Ask about aid
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
        </div>
      </section>

      <section className="section-shell py-14 sm:py-16">
        <div className="max-w-3xl">
          <p className="eyebrow">Common fees</p>
          <h2 className="display-title mt-3 !text-3xl sm:!text-4xl">
            Other costs to plan for
          </h2>
        </div>
        <ul className="mt-8 grid gap-4 md:grid-cols-3">
          {tuition.fees.map((fee) => (
            <li key={fee.label} className="border border-river/10 bg-white/70 p-5">
              <p className="font-display text-lg font-semibold text-river-deep">
                ${fee.amount}
              </p>
              <p className="mt-2 text-sm text-granite-muted">
                {fee.label} · {fee.unit}
              </p>
            </li>
          ))}
        </ul>

        <dl className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {outcomes.map((item) => (
            <div key={item.label}>
              <dt className="font-display text-3xl font-semibold text-river">
                {item.value}
              </dt>
              <dd className="mt-2 text-sm text-granite-muted">{item.label}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
