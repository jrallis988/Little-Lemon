import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";

const resources = [
  "Reading guides & discussion questions",
  "Classroom activities & worksheets",
  "Age & grade recommendations",
  "Printable promotional materials",
];

export function EducatorTeaser() {
  return (
    <section className="py-16 md:py-24" aria-labelledby="educators-heading">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <SectionHeader
            eyebrow="For Adults"
            title="For Educators & Librarians"
            description="Resources designed for teachers, school librarians, and public librarians supporting young readers this fall."
          />

          <div>
            <ul className="space-y-3">
              {resources.map((resource) => (
                <li
                  key={resource}
                  className="flex items-start gap-3 border-b border-line pb-3 text-sm text-ink-muted"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-forest" aria-hidden="true" />
                  {resource}
                </li>
              ))}
            </ul>
            <Button href="/educators" variant="primary" size="md" className="mt-8">
              Visit the Resource Hub
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
