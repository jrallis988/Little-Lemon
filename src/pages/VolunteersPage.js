import { Link } from "react-router-dom";
import {
  volunteerNotList,
  volunteerRoles,
  volunteerSafeguards,
} from "../data/volunteers";

function VolunteersPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-violet-field pb-16 pt-28 md:pb-20 md:pt-36">
        <div className="pointer-events-none absolute inset-0 bg-section-glow" />
        <div className="container relative">
          <p className="eyebrow">Volunteer boundary & responsibility</p>
          <h1 className="display mt-4 max-w-4xl text-4xl md:text-6xl">
            Show up because you want to—not because a system ordered it
          </h1>
          <p className="mt-5 max-w-2xl font-body text-lg text-violet-mist">
            Civic Bound is a voluntary, dignity-first community network. Young
            people choose the hub. Volunteers support through shared space and
            practical activity—never court-ordered oversight or clinical
            control.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/partners" className="btn-ghost">
              Village Network
            </Link>
            <Link to="/hubs" className="btn-primary">
              See hub spaces
            </Link>
          </div>
        </div>
      </section>

      <section className="section-pad bg-ink">
        <div className="container grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow">The core objective</p>
            <h2 className="display mt-4 text-3xl md:text-4xl">
              Escaping the court-ordered trap
            </h2>
          </div>
          <div className="lg:col-span-7 space-y-6 font-body text-lg text-violet-mist">
            <p>
              Traditional systems often push young people into rigid, clinical
              environments with burned-out caseworkers, court-ordered
              supervision, and heavy institutional oversight.
            </p>
            <p className="text-white">
              Civic Bound is different: a place youth choose because they want
              to be here—free from the stigma of justice or welfare machinery.
            </p>
          </div>
        </div>
      </section>

      <section className="section-pad bg-ink-soft">
        <div className="container">
          <div className="max-w-3xl">
            <p className="eyebrow">Clear misconceptions</p>
            <h2 className="display mt-4 text-3xl md:text-5xl">
              What volunteers are not
            </h2>
            <p className="mt-5 font-body text-lg text-violet-mist">
              To avoid “Big Brother” awkwardness or over-regulation, volunteers
              operate under strict anti-chaperone definitions.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {volunteerNotList.map((item) => (
              <article
                key={item.title}
                className="border border-violet-bright/25 bg-ink/50 p-6"
              >
                <h3 className="font-display text-xl font-bold text-chartreuse">
                  {item.title}
                </h3>
                <p className="mt-3 font-body text-violet-mist">{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-violet-field">
        <div className="container">
          <div className="max-w-3xl">
            <p className="eyebrow">Hub-centered model</p>
            <h2 className="display mt-4 text-3xl md:text-5xl">
              What volunteers actually do
            </h2>
            <p className="mt-5 font-body text-lg text-violet-mist">
              Mentorship happens through shared space and practical activities—not
              forced personal oversight.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {volunteerRoles.map((role, index) => (
              <article
                key={role.id}
                className="border border-violet-bright/25 bg-ink/30 p-7"
              >
                <span className="font-display text-sm font-bold uppercase tracking-[0.2em] text-chartreuse">
                  0{index + 1}
                </span>
                <h3 className="mt-3 font-display text-2xl font-bold text-white">
                  {role.title}
                </h3>
                <p className="mt-1 font-body text-sm uppercase tracking-[0.14em] text-violet-mist">
                  {role.subtitle}
                </p>
                <p className="mt-4 font-body text-violet-mist">{role.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-ink">
        <div className="container">
          <div className="max-w-3xl">
            <p className="eyebrow">Liability & boundary safeguards</p>
            <h2 className="display mt-4 text-3xl md:text-5xl">
              The hub-bound perimeter
            </h2>
            <p className="mt-5 font-body text-lg text-violet-mist">
              Clear boundaries protect both volunteers and participants from
              legal gray areas and over-extension.
            </p>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {volunteerSafeguards.map((item) => (
              <article
                key={item.title}
                className="border-t border-chartreuse/50 pt-6"
              >
                <h3 className="font-display text-xl font-bold text-white">
                  {item.title}
                </h3>
                <p className="mt-3 font-body text-violet-mist">{item.copy}</p>
              </article>
            ))}
          </div>

          <div className="mt-14 border border-chartreuse/30 bg-violet-field/25 p-8 text-center md:p-12">
            <h3 className="display text-3xl">
              Ready to volunteer the Civic Bound way?
            </h3>
            <p className="mx-auto mt-4 max-w-2xl font-body text-violet-mist">
              Join as a Doer, Guide, or Anchor inside the hub—shared activities,
              open culture, and youth-first boundaries.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link to="/partners" className="btn-primary">
                Join the village
              </Link>
              <Link to="/get-support" className="btn-ghost">
                Looking for support instead?
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default VolunteersPage;
