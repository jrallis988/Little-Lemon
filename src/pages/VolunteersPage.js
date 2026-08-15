import { Link } from "react-router-dom";
import {
  volunteerNotList,
  volunteerRoles,
  volunteerSafeguards,
} from "../data/volunteers";

function VolunteersPage() {
  return (
    <>
      <section className="border-b border-paper-line bg-paper pb-14 pt-28 md:pb-16 md:pt-32">
        <div className="container">
          <p className="eyebrow-accent">Volunteer boundary & responsibility</p>
          <h1 className="display mt-5 max-w-4xl text-4xl md:text-6xl">
            Show up because you want to—not because a system ordered it
          </h1>
          <p className="lede mt-5 max-w-2xl">
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

      <section className="section-pad bg-paper-soft">
        <div className="container grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow-accent">The core objective</p>
            <h2 className="display mt-5 text-3xl md:text-4xl">
              Escaping the court-ordered trap
            </h2>
          </div>
          <div className="lg:col-span-7 space-y-6 font-body text-lg leading-relaxed text-charcoal">
            <p>
              Traditional systems often push young people into rigid, clinical
              environments with burned-out caseworkers, court-ordered
              supervision, and heavy institutional oversight.
            </p>
            <p className="font-semibold text-charcoal-deep">
              Civic Bound is different: a place youth choose because they want
              to be here—free from the stigma of justice or welfare machinery.
            </p>
          </div>
        </div>
      </section>

      <section className="section-pad border-y border-paper-line bg-paper">
        <div className="container">
          <div className="max-w-3xl">
            <p className="eyebrow-accent">Clear misconceptions</p>
            <h2 className="display mt-5 text-3xl md:text-5xl">
              What volunteers are not
            </h2>
            <p className="lede mt-5">
              To avoid “Big Brother” awkwardness or over-regulation, volunteers
              operate under strict anti-chaperone definitions.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {volunteerNotList.map((item) => (
              <article key={item.title} className="surface-card p-6">
                <h3 className="font-display text-xl font-semibold text-charcoal-deep">
                  {item.title}
                </h3>
                <p className="mt-3 font-body leading-relaxed text-charcoal">
                  {item.copy}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-paper-soft">
        <div className="container">
          <div className="max-w-3xl">
            <p className="eyebrow-accent">Hub-centered model</p>
            <h2 className="display mt-5 text-3xl md:text-5xl">
              What volunteers actually do
            </h2>
            <p className="lede mt-5">
              Mentorship happens through shared space and practical activities—not
              forced personal oversight.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {volunteerRoles.map((role, index) => (
              <article key={role.id} className="surface-card p-7">
                <span className="micro-label text-chartreuse">0{index + 1}</span>
                <h3 className="mt-3 font-display text-2xl font-semibold text-charcoal-deep">
                  {role.title}
                </h3>
                <p className="mt-1 font-body text-sm font-semibold uppercase tracking-[0.14em] text-charcoal-soft">
                  {role.subtitle}
                </p>
                <p className="mt-4 font-body leading-relaxed text-charcoal">
                  {role.copy}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-paper">
        <div className="container">
          <div className="max-w-3xl">
            <p className="eyebrow-accent">Liability & boundary safeguards</p>
            <h2 className="display mt-5 text-3xl md:text-5xl">
              The hub-bound perimeter
            </h2>
            <p className="lede mt-5">
              Clear boundaries protect both volunteers and participants from
              legal gray areas and over-extension.
            </p>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {volunteerSafeguards.map((item) => (
              <article
                key={item.title}
                className="border-t border-chartreuse pt-6"
              >
                <h3 className="font-display text-xl font-semibold text-charcoal-deep">
                  {item.title}
                </h3>
                <p className="mt-3 font-body leading-relaxed text-charcoal">
                  {item.copy}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-14 surface-card p-8 text-center md:p-12">
            <h3 className="display text-3xl">
              Ready to volunteer the Civic Bound way?
            </h3>
            <p className="mx-auto mt-4 max-w-2xl font-body leading-relaxed text-charcoal">
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
