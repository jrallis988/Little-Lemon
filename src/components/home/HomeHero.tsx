import { Button } from "@/components/ui/Button";

export function HomeHero() {
  return (
    <section
      className="relative flex min-h-[560px] overflow-hidden max-md:min-h-[460px]"
      aria-labelledby="hero-heading"
    >
      <div className="hero-photo absolute inset-0" aria-hidden="true" />
      <div className="hero-photo-veil pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="wrap relative z-[2] flex min-h-[560px] w-full items-center py-s10 max-md:min-h-[460px] max-md:py-s8">
        <div className="max-w-[560px]">
          <div className="mb-s3 flex items-center gap-s3 text-xs font-extrabold uppercase tracking-[0.12em] text-white/85">
            <span
              className="block h-0.5 w-5 rounded-sm bg-sky"
              aria-hidden="true"
            />
            Boston Children&apos;s Hospital
          </div>
          <h1
            id="hero-heading"
            className="mb-s4 text-[clamp(30px,4.5vw,52px)] font-medium leading-[1.1] tracking-[-0.025em] text-white"
          >
            Here for every{" "}
            <em className="not-italic text-sky">child</em>.
          </h1>
          <p className="mb-s6 max-w-[460px] text-[clamp(15px,1.6vw,18px)] font-light leading-[1.75] text-white/90">
            We combine compassion, innovation, and world-leading expertise to
            care for children of all ages and conditions — from the rarest
            diseases to the most common injuries.
          </p>
          <div className="flex flex-wrap gap-s3">
            <Button href="/find-a-doctor" variant="ocean" size="lg">
              Find a Doctor
            </Button>
            <Button href="/about" variant="ghost-white" size="lg">
              About Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
