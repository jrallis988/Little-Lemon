import { Button } from "@/components/ui/Button";

export function TeachingHospital() {
  return (
    <section
      className="border-y border-border bg-surface py-s9"
      aria-labelledby="teaching-home-heading"
    >
      <div className="wrap grid grid-cols-1 items-center gap-s7 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <span className="eyebrow">Teaching hospital</span>
          <h2
            id="teaching-home-heading"
            className="mb-s4 mt-s2 text-2xl font-bold text-ocean"
          >
            Training tomorrow&apos;s pediatric leaders.
          </h2>
          <p className="mb-s4 max-w-[560px] text-md font-light leading-[1.75] text-text-body">
            Boston Children&apos;s is a teaching hospital of Harvard Medical
            School. Doctors, nurses, and other professionals in training may
            care for your child — always under the supervision of a qualified
            senior clinician.
          </p>
          <p className="mb-s5 max-w-[560px] text-md font-light leading-[1.75] text-text-body">
            We believe these teams strengthen care through continuous learning,
            deep supervision, and a culture built around every child&apos;s
            needs.
          </p>
          <div className="flex flex-wrap gap-s3">
            <Button href="/about/leadership" variant="outline">
              Meet our leadership
            </Button>
            <Button href="/about/community" variant="outline">
              Community health
            </Button>
          </div>
        </div>

        <aside className="rounded-md border border-border border-t-[3px] border-t-ocean bg-white p-s6">
          <h3 className="mb-s3 text-lg font-bold text-ocean">Get connected</h3>
          <ul className="mb-s5 flex flex-col gap-2 text-sm font-light text-text-body">
            <li>
              <strong className="font-bold text-text">Main phone:</strong>{" "}
              (617) 355-6000
            </li>
            <li>
              <strong className="font-bold text-text">Weekdays:</strong>{" "}
              Monday–Friday, 7:00 am – 8:00 pm
            </li>
            <li>
              <strong className="font-bold text-text">Saturday:</strong> 9:30 am –
              6:00 pm
            </li>
          </ul>
          <div className="flex flex-col gap-s2">
            <Button href="/appointments/request" variant="ocean" fullWidth>
              Request an Appointment
            </Button>
            <Button
              href="/professionals/second-opinion"
              variant="outline"
              fullWidth
            >
              Request a Second Opinion
            </Button>
          </div>
        </aside>
      </div>
    </section>
  );
}
