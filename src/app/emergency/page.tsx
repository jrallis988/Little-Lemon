import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Callout, CalloutEmergency, Notice } from "@/components/ui/Callout";
import { IconPhone } from "@/components/ui/Icons";
import { LiveWaitTime } from "@/components/emergency/LiveWaitTime";

export const metadata: Metadata = {
  title: "Emergency Department",
  description:
    "Our ED is open 24 hours a day, 7 days a week. We are a Level 1 pediatric trauma center.",
};

export default function EmergencyPage() {
  return (
    <>
      <div
        className="border-b-4 border-emergency bg-blue py-s7"
        aria-labelledby="ed-page-heading"
      >
        <div className="wrap">
          <div className="max-w-[700px]">
            <span className="eyebrow text-white/50">Emergency Care</span>
            <h1
              id="ed-page-heading"
              className="mb-s2 mt-s2 text-[clamp(24px,4vw,40px)] font-medium text-white"
            >
              Emergency Department
            </h1>
            <p className="mb-s5 text-md font-light text-white/[0.68]">
              Our ED is open 24 hours a day, 7 days a week. We are a Level 1
              pediatric trauma center.
            </p>
          </div>

          <div
            className="mt-s5 rounded-md bg-white px-s6 py-s5"
            role="region"
            aria-label="Critical emergency department information"
          >
            <div className="grid grid-cols-1 gap-s4 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <div className="mb-[5px] text-xs font-extrabold uppercase tracking-[0.08em] text-text-meta">
                  Address
                </div>
                <div className="text-md font-bold text-text">
                  300 Longwood Ave
                  <br />
                  Boston, MA 02115
                </div>
                <div className="mt-[3px] text-xs font-light text-text-meta">
                  Main campus entrance
                </div>
              </div>
              <LiveWaitTime />
              <div>
                <div className="mb-[5px] text-xs font-extrabold uppercase tracking-[0.08em] text-text-meta">
                  Hours
                </div>
                <div className="text-md font-bold text-text">Open 24 hours</div>
                <div className="mt-[3px]">
                  <a
                    href="tel:16173556611"
                    className="text-md font-bold text-blue no-underline hover:text-ocean"
                  >
                    (617) 355-6611
                  </a>
                </div>
              </div>
              <div>
                <div className="mb-[5px] text-xs font-extrabold uppercase tracking-[0.08em] text-text-meta">
                  If it can&apos;t wait
                </div>
                <div className="text-base font-bold text-text">
                  Call 911 or go to your nearest ER
                </div>
                <div className="mt-[3px] text-xs font-light text-text-meta">
                  Do not wait for transport if a situation is life-threatening
                </div>
              </div>
            </div>
            <div className="mt-s4 flex flex-wrap gap-s2 border-t border-border pt-s4">
              <Button
                href="https://www.google.com/maps/dir/?api=1&destination=300+Longwood+Avenue+Boston+MA+02115"
                variant="primary"
                size="sm"
              >
                Get Directions
              </Button>
              <Button href="tel:16173556611" variant="outline-ocean" size="sm">
                Call the ED
              </Button>
              <Button href="/locations/waltham" variant="outline" size="sm">
                Urgent Care — Shorter Waits
              </Button>
            </div>
            <p className="mt-s3 text-xs font-light text-text-meta">
              Wait estimates can change quickly. Children are seen by medical
              priority, not arrival order; the sickest children are always seen first.
            </p>
          </div>
        </div>
      </div>

      <div className="wrap py-s7 pb-s10">
        <div className="grid grid-cols-1 items-start gap-s7 lg:grid-cols-[2fr_1fr]">
          <div>
            <h2 className="mb-s5 text-2xl font-bold text-ocean">
              Know before you come
            </h2>

            <CalloutEmergency title="Call 911 immediately for these situations">
              <p>
                Difficulty breathing or turning blue · Unresponsiveness or
                unconsciousness · Seizure lasting more than 5 minutes · Severe
                allergic reaction · Major trauma, fall, or injury · Suspected
                poisoning
              </p>
            </CalloutEmergency>

            <div className="mt-s5">
              <h3 className="mb-s4 text-lg font-bold text-text">
                Come to the ED for
              </h3>
              <ul className="ml-s5 flex flex-col gap-1.5">
                {[
                  "High fever in a child under 3 months, or any fever above 104°F (40°C)",
                  "Severe abdominal pain",
                  "Deep cuts that may need stitches",
                  "Possible broken bones",
                  "Severe vomiting or dehydration",
                  "Head injury with confusion, vomiting, or loss of consciousness",
                  "Worsening symptoms your doctor cannot see today",
                ].map((item) => (
                  <li
                    key={item}
                    className="relative pl-s3 text-base font-light text-text-body before:absolute before:left-0 before:top-2.5 before:h-[1.5px] before:w-[5px] before:bg-ocean"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-s5">
              <h3 className="mb-s4 text-lg font-bold text-text">
                What to expect
              </h3>
              <p className="text-md font-light leading-[1.75] text-text-body">
                When you arrive, your child will be seen by a triage nurse who
                will check their condition and assign a priority. More urgent
                cases are seen first, regardless of when they arrived.
              </p>
              <Callout title="What to bring" className="mt-s4">
                <p>
                  Insurance card · List of current medications and dosages · Your
                  child&apos;s primary care doctor&apos;s name and phone number ·
                  Any relevant medical records or imaging
                </p>
              </Callout>
            </div>

            <div className="mt-s7">
              <h3 className="mb-s4 text-lg font-bold text-text">
                Consider urgent care for non-emergencies
              </h3>
              <p className="mb-s4 text-md font-light leading-[1.75] text-text-body">
                For conditions that are not life-threatening — like mild ear
                pain, a minor cut, or cold and flu symptoms — our urgent care
                centers often have shorter waits.
              </p>
              <Button href="/locations" variant="outline-ocean">
                View Urgent Care Locations
              </Button>
            </div>
          </div>

          <aside aria-label="Emergency Department information">
            <div className="mb-s4 rounded-md bg-blue p-s5">
              <h4 className="mb-s2 text-base font-bold text-white">
                Trauma & Critical Care
              </h4>
              <p className="mb-s4 text-sm font-light text-white/60">
                For critical transfers and trauma consultations, contact our
                Transfer Center directly.
              </p>
              <Button href="/professionals/refer" variant="ocean" fullWidth>
                Physician Access Line
              </Button>
              <div className="mt-s3 flex items-center gap-1.5">
                <IconPhone className="text-white/50" />
                <a
                  href="tel:16173556000"
                  className="text-sm font-semibold text-white/75 no-underline hover:text-white"
                >
                  (617) 355-6000
                </a>
              </div>
            </div>

            <div className="rounded-md border border-border bg-white p-s4">
              <h5 className="mb-s3 text-[10px] font-extrabold uppercase tracking-[0.1em] text-text-meta">
                ED locations
              </h5>
              <ul className="flex flex-col gap-1.5">
                {[
                  ["Main ED · 300 Longwood Ave", "/locations/longwood"],
                  ["Urgent Care — Waltham", "/locations/waltham"],
                  ["Urgent Care — Peabody", "/locations/peabody"],
                ].map(([label, href]) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-sm font-semibold text-ocean no-underline hover:text-blue"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <Notice className="mt-s4">
              <p>
                Interpreter services are available 24 hours. Tell the triage team
                what language your family speaks.
              </p>
            </Notice>
          </aside>
        </div>
      </div>
    </>
  );
}
