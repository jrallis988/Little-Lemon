import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import useReveal from "../hooks/useReveal";
import { campuses, images, lifeSupports } from "../data/content";

export default function StudentLife() {
  const revealRef = useReveal();

  return (
    <div ref={revealRef}>
      <PageHero
        eyebrow="Student Life"
        title="Support that shows up when life gets busy"
        summary="Food access, free bus passes, library help, and campuses designed for real schedules — not just the ideal semester."
        image={images.community}
        imageAlt="Students gathering outdoors at River Valley Community College"
      />

      <section className="section-shell grid gap-10 py-16 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="reveal" data-reveal>
          <p className="eyebrow">Everyday support</p>
          <h2 className="display-title mt-3">
            Built for working students and caregivers
          </h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            {lifeSupports.map((item) => (
              <article key={item.title}>
                <h3 className="font-display text-xl font-semibold text-river-deep">
                  {item.title}
                </h3>
                <p className="mt-3 leading-relaxed text-granite-muted">
                  {item.copy}
                </p>
              </article>
            ))}
          </div>
        </div>
        <div className="reveal overflow-hidden" data-reveal>
          <img
            src={images.foodPantry}
            alt="Food pantry shelves stocked for RVCC students"
            className="h-full min-h-[18rem] w-full object-cover"
          />
        </div>
      </section>

      <section className="relative overflow-hidden py-16 sm:py-20">
        <img
          src={images.campus}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-river-deep/88" />
        <div className="relative section-shell text-white">
          <div className="reveal max-w-2xl" data-reveal>
            <p className="eyebrow !text-sunrise">Campuses</p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Belong in Claremont, Keene, or Lebanon
            </h2>
          </div>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {campuses.map((campus) => (
              <article key={campus.name} className="reveal" data-reveal>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sunrise">
                  {campus.role}
                </p>
                <h3 className="mt-3 font-display text-2xl font-semibold">
                  {campus.name}
                </h3>
                <p className="mt-3 text-white/75">{campus.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell py-16 sm:py-20">
        <div
          className="reveal flex flex-col gap-6 md:flex-row md:items-center md:justify-between"
          data-reveal
        >
          <div className="max-w-2xl">
            <h2 className="display-title">Need a hand getting started?</h2>
            <p className="body-copy mt-4">
              Admissions can connect you with advising, orientation, and campus
              resources before your first class.
            </p>
          </div>
          <Link to="/admissions" className="btn-primary w-fit">
            Reach admissions
          </Link>
        </div>
      </section>
    </div>
  );
}
