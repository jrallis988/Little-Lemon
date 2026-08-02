import { Button } from "@/components/ui/Button";
import { CalloutEmergency, CalloutUrgent } from "@/components/ui/Callout";

export function EmergencyStrip() {
  return (
    <section
      className="border-y border-border bg-surface py-s6"
      aria-labelledby="ed-heading"
    >
      <div className="wrap">
        <div className="grid grid-cols-1 items-center gap-s7 md:grid-cols-2">
          <div className="flex flex-col gap-s4">
            <div className="mb-s1 flex items-center gap-s2">
              <span
                className="h-[18px] w-[18px] rounded-full bg-emergency"
                aria-hidden="true"
              />
              <h3 id="ed-heading" className="text-lg font-bold text-text">
                Emergency Department
              </h3>
            </div>
            <p className="text-base font-light text-text-body">
              300 Longwood Avenue · Boston, MA 02115
            </p>
            <div className="inline-flex items-center gap-s2 self-start rounded-sm border border-border bg-white px-3.5 py-2">
              <span className="h-2 w-2 animate-pulse-dot rounded-full bg-green" />
              <span className="text-sm font-light text-text-body">
                Current wait
              </span>
              <span
                className="text-sm font-extrabold text-text"
                role="status"
                aria-live="polite"
              >
                ~19 min
              </span>
            </div>
            <div className="flex flex-wrap gap-s3">
              <Button href="/emergency" variant="primary">
                ED information
              </Button>
              <Button href="tel:16173556611" variant="outline">
                Call the ED
              </Button>
            </div>
          </div>
          <div className="border-t border-border pt-s5 md:border-l md:border-t-0 md:pl-s5 md:pt-0">
            <h4 className="mb-s2 text-base font-bold text-text">
              Know when to come
            </h4>
            <p className="mb-s4 text-base font-light leading-[1.7] text-text-body">
              Our Emergency Department is a Level 1 pediatric trauma center. We
              see the most complex cases. For conditions that are not
              life-threatening, an urgent care visit may be faster for your
              child.
            </p>
            <CalloutUrgent title="Not sure if it's an emergency?">
              <p>
                When in doubt, call your pediatrician or the ED nurse line. For
                breathing trouble, seizure over 5 minutes, or loss of
                consciousness — call 911.
              </p>
            </CalloutUrgent>
            <CalloutEmergency
              title="Life-threatening emergencies"
              className="mt-s4"
            >
              <p>
                Breathing trouble, seizure over 5 minutes, loss of consciousness,
                or serious injury — call 911 or go to your nearest ER
                immediately.
              </p>
            </CalloutEmergency>
          </div>
        </div>
      </div>
    </section>
  );
}
