import { Link } from "react-router-dom";
import skillGroups from "../data/skills";
import SkillGroup from "./SkillGroup";

export default function Skills() {
  return (
    <section id="skills" className="relative overflow-hidden bg-ink py-24 md:py-32">
      <div
        className="pointer-events-none absolute -left-16 top-20 h-64 w-64 rounded-full bg-foam/10 blur-3xl"
        aria-hidden="true"
      />
      <div className="container relative">
        <div className="mb-12 max-w-2xl stagger">
          <p className="reveal mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-foam">
            Skills
          </p>
          <h2 className="reveal font-display text-3xl font-bold text-chalk md:text-5xl">
            Core front-end toolkit.
          </h2>
          <p className="reveal mt-4 text-base leading-relaxed text-sand/85 md:text-lg">
            What I work with day to day—organized for quick scanning. For how I use these
            tools in practice, see Engineering.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 stagger">
          {skillGroups.map((group) => (
            <SkillGroup key={group.id} title={group.title} items={group.items} />
          ))}
        </div>

        <div className="reveal mt-12">
          <Link to="/engineering" className="btn-ghost">
            How I build →
          </Link>
        </div>
      </div>
    </section>
  );
}
