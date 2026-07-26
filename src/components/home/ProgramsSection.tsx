import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { IconArrowRight } from "@/components/ui/Icons";
import { programs } from "@/lib/data/programs";

export function ProgramsSection() {
  return (
    <section className="bg-surface py-s9" aria-labelledby="prog-heading">
      <div className="wrap">
        <div className="section-header">
          <span className="eyebrow">Clinical programs</span>
          <h2 id="prog-heading">Specialized programs for complex conditions</h2>
          <p>
            Each program brings together the right specialists, researchers, and
            support services under one roof.
          </p>
        </div>
        <div className="mt-s6 grid grid-cols-1 gap-s4 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((prog) => (
            <Link
              key={prog.slug}
              href={`/programs/${prog.slug}`}
              className="group block overflow-hidden rounded-md border border-border bg-white no-underline transition-all duration-ease hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className={`relative h-[155px] overflow-hidden ${prog.photoClass}`}>
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,15,40,.55)] to-transparent" />
              </div>
              <div className="p-s4">
                <div className="mb-1 text-base font-bold text-text">
                  {prog.name}
                </div>
                <div className="text-sm font-light leading-[1.6] text-text-body">
                  {prog.description}
                </div>
                <div className="mt-s3 flex items-center gap-[5px] text-sm font-bold text-ocean">
                  Explore program
                  <IconArrowRight />
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-s6">
          <Button href="/programs/epilepsy-program" variant="outline">
            View all programs & specialties
          </Button>
        </div>
      </div>
    </section>
  );
}
