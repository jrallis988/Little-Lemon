import Image from "next/image";

export function Hero() {
  return (
    <section className="relative min-h-[min(92svh,52rem)] overflow-hidden pt-[6.5rem]">
      <div className="absolute inset-0">
        <Image
          src="/images/hero-learning.jpg"
          alt="Students and an educator collaborating in a bright classroom"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/75 to-navy/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/50 via-transparent to-navy/20" />
      </div>

      <div className="relative mx-auto flex min-h-[min(calc(92svh-6.5rem),45.5rem)] max-w-site flex-col justify-center px-5 py-16 sm:px-8 sm:py-24">
        <div className="max-w-2xl text-white">
          <p className="animate-fade-up text-sm font-bold uppercase tracking-[0.14em] text-white">
            Classroom intervention program
          </p>
          <h1
            className="mt-4 animate-fade-up text-4xl font-bold leading-[1.1] tracking-tight text-balance sm:text-5xl md:text-6xl"
            style={{ animationDelay: "0.08s" }}
          >
            Order a learning program built for students who need another way in.
          </h1>
          <p
            className="mt-5 max-w-xl animate-fade-up text-lg leading-relaxed text-white/90 sm:text-xl"
            style={{ animationDelay: "0.16s" }}
          >
            Morgan Bright gives teachers and school leaders a structured system:
            diagnostics, printed and digital lesson modules, and guided support
            for students who are not thriving with one-size-fits-all instruction.
          </p>
          <div
            className="mt-8 flex animate-fade-up flex-wrap gap-3"
            style={{ animationDelay: "0.24s" }}
          >
            <a href="#start" className="btn-primary">
              Request a quote
            </a>
            <a href="#curriculum" className="btn-secondary">
              View program components
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
