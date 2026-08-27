import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function ComingSoonPage({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <section className="py-20 md:py-32">
      <div className="mx-auto max-w-2xl px-5 text-center md:px-8">
        <SectionHeader
          eyebrow="Coming Soon"
          title={title}
          description={description}
          align="center"
        />
        <Button href="/" variant="primary" size="md" className="mt-10">
          Back to Home
        </Button>
      </div>
    </section>
  );
}
