import Link from "next/link";
import { volunteerRoles } from "@/lib/volunteers";
import { Reveal } from "@/components/motion/Reveal";

const PREVIEW = volunteerRoles.slice(0, 3);

/** Landing-page Volunteer band. */
export function VolunteerPreview() {
  return (
    <section
      className="volunteer-preview section-padding-140"
      aria-labelledby="volunteer-preview-heading"
      id="volunteer"
    >
      <div className="container">
        <Reveal>
          <div className="section-heading">
            <h6>Take Action</h6>
            <h2 id="volunteer-preview-heading">Volunteer</h2>
            <p>Phone banks, canvassing, events, and ops — pick a role and we’ll put you to work.</p>
          </div>
        </Reveal>

        <div className="section-wrapper row justify-content-center">
          {PREVIEW.map((role, i) => (
            <Reveal
              className="col-lg-4 col-md-6"
              key={role.id}
              delayMs={i * 110}
              variant="up"
            >
              <div className="volunteer-preview-card">
                <h3 className="volunteer-preview-card__title">{role.title}</h3>
                <p className="volunteer-preview-card__meta">{role.location}</p>
                <p className="volunteer-preview-card__body">{role.summary}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="text-center" delayMs={280}>
          <Link href="/volunteer" className="custom-btn varga-btn-motion">
            Sign Up to Volunteer
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
