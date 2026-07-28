import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { Notice } from "@/components/ui/Callout";

export const metadata: Metadata = {
  title: "Prepare for Your Child's Visit",
  description:
    "A practical checklist for appointments at Boston Children's Hospital, including what to bring, arrival guidance, and how to prepare your child.",
};

const checklist = [
  "Photo ID for the accompanying parent or legal guardian",
  "Insurance card and any referral or authorization documents",
  "Medication list with names, doses, and times taken",
  "Relevant records, imaging discs, test results, and school reports",
  "Names and phone numbers for the child's primary care clinician and specialists",
  "Questions, symptom notes, and a timeline of recent changes",
  "Comfort item, snacks if permitted, and chargers for a longer visit",
];

export default function PrepareForVisitPage() {
  return (
    <>
      <PageHero
        id="prepare-heading"
        eyebrow="Patients & families"
        title="Prepare for your visit"
        lead="A little planning can make check-in easier and help your care team make the most of your time."
        actions={
          <>
            <Button href="/locations" variant="ocean">
              Check directions and parking
            </Button>
            <Button href="/portal" variant="ghost-white">
              Open the patient portal
            </Button>
          </>
        }
      />

      <div className="wrap py-s7 pb-s10">
        <Notice>
          <p>
            Follow any instructions from your care team about fasting, medicines,
            or arrival time. If you are unsure, call the clinic before changing
            what your child eats or takes.
          </p>
        </Notice>

        <div className="mt-s7 grid grid-cols-1 gap-s7 lg:grid-cols-[1.25fr_.75fr]">
          <section aria-labelledby="bring-heading">
            <h2 id="bring-heading" className="mb-s4 text-2xl font-bold text-ocean">
              What to bring
            </h2>
            <ul className="flex flex-col gap-s3">
              {checklist.map((item) => (
                <li
                  key={item}
                  className="rounded-sm border border-border bg-white px-s4 py-s3 text-base font-light text-text-body"
                >
                  <span aria-hidden="true" className="mr-s3 font-bold text-ocean">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <aside className="rounded-md bg-blue p-s6 text-white" aria-labelledby="arrival-heading">
            <h2 id="arrival-heading" className="mb-s3 text-xl font-bold text-white">
              On the day
            </h2>
            <ol className="ml-s5 flex list-decimal flex-col gap-s3 text-base font-light text-white/75">
              <li>Confirm the campus, building, floor, and clinic name.</li>
              <li>Allow time for traffic, parking, security, and check-in.</li>
              <li>Tell check-in staff if contact or insurance details changed.</li>
              <li>Ask for an interpreter or accessibility support at any point.</li>
            </ol>
          </aside>
        </div>

        <section className="mt-s8 border-t border-border pt-s7" aria-labelledby="child-heading">
          <h2 id="child-heading" className="mb-s5 text-2xl font-bold text-ocean">
            Help your child know what to expect
          </h2>
          <div className="grid grid-cols-1 gap-s4 md:grid-cols-3">
            {[
              ["Use clear language", "Explain where you are going and what may happen in words your child understands. Avoid promising that nothing will hurt."],
              ["Invite questions", "Write down your child's questions and let the care team know what usually helps them feel safe."],
              ["Plan for waiting", "Bring a familiar activity or comfort item. Ask the clinic about child life support for procedures."],
            ].map(([title, body]) => (
              <article key={title} className="rounded-md bg-surface p-s5">
                <h3 className="mb-s2 text-lg font-bold text-blue">{title}</h3>
                <p className="text-sm font-light text-text-body">{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-s7" aria-labelledby="change-heading">
          <h2 id="change-heading" className="mb-s3 text-xl font-bold text-ocean">
            Running late or need to reschedule?
          </h2>
          <p className="mb-s4 max-w-[760px] text-base font-light text-text-body">
            Call the number in your appointment confirmation as soon as possible.
            The clinic can tell you whether your child can still be seen or help
            arrange another time.
          </p>
          <Button href="/appointments/request" variant="outline-ocean">
            Appointment help
          </Button>
        </section>
      </div>
    </>
  );
}
