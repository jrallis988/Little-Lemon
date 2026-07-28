import { Button } from "@/components/ui/Button";

export function HomeHero() {
  return (
    <section className="relative flex min-h-[560px] overflow-hidden max-md:min-h-[460px]" aria-labelledby="hero-heading">
      <div
        className="absolute inset-0 saturate-[.88] brightness-[.92]"
        aria-hidden="true"
        style={{
          background: `
            radial-gradient(ellipse 55% 70% at 75% 15%, rgba(200,190,160,.18) 0%, transparent 60%),
            linear-gradient(105deg, rgba(0,20,60,.92) 0%, rgba(0,36,100,.78) 38%, rgba(0,55,130,.55) 58%, rgba(10,50,90,.35) 100%),
            linear-gradient(160deg, #1c3a5e 0%, #2a5080 40%, #3a6898 65%, #2d5a80 100%)
          `,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background: `
            linear-gradient(to right, rgba(0,15,50,.6) 0%, transparent 35%),
            linear-gradient(to top, rgba(0,10,35,.4) 0%, transparent 30%)
          `,
        }}
      />
      <div className="relative z-[2] mx-auto flex min-h-[560px] w-full max-w-content items-center max-md:min-h-[460px] max-md:py-s8" style={{ paddingLeft: "var(--px)", paddingRight: "var(--px)", paddingTop: "var(--s10)", paddingBottom: "var(--s10)" }}>
        <div className="max-w-[560px]">
          <div className="mb-s3 flex items-center gap-s3 text-xs font-extrabold uppercase tracking-[0.12em] text-white/45">
            <span className="block h-0.5 w-5 rounded-sm bg-sky" aria-hidden="true" />
            Boston Children&apos;s Hospital
          </div>
          <h1
            id="hero-heading"
            className="mb-s4 text-[clamp(30px,4.5vw,52px)] font-medium leading-[1.1] tracking-[-0.025em] text-white"
          >
            Answers for the children
            <br />
            who need them <em className="not-italic text-sky">most</em>.
          </h1>
          <p className="mb-s6 max-w-[460px] text-[clamp(15px,1.6vw,18px)] font-light leading-[1.75] text-white/70">
            When a child&apos;s condition is rare, complex, or not responding to
            treatment, families come to Boston Children&apos;s for answers.
          </p>
          <div className="flex flex-wrap gap-s3">
            <Button href="/find-a-doctor" variant="ocean" size="lg">
              Find a Doctor
            </Button>
            <Button href="/conditions/epilepsy-in-children" variant="ghost-white" size="lg">
              Explore conditions
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
