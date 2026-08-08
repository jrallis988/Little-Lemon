const HERO_IMAGE =
  "https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=2400&q=80";

function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-violet-field"
    >
      <div className="absolute inset-0 -z-20 overflow-hidden opacity-0 animate-fade">
        <img
          src={HERO_IMAGE}
          alt="Young people collaborating in a community learning space"
          className="h-full w-full object-cover object-center animate-drift"
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-hero-wash" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-violet-deep/50 to-violet-field/35" />

      <div className="container relative pb-16 pt-32 md:pb-24 md:pt-40">
        <p className="eyebrow opacity-0 animate-rise">Community growth</p>
        <h1 className="display mt-4 max-w-4xl text-5xl leading-[0.95] opacity-0 animate-rise-delay sm:text-6xl md:text-7xl lg:text-8xl">
          Civic <span className="text-chartreuse">Bound</span>
        </h1>
        <div className="mt-5 h-px w-24 origin-left scale-x-0 bg-chartreuse animate-draw" />
        <p className="mt-6 max-w-xl font-body text-lg text-violet-mist opacity-0 animate-rise-delay-2 md:text-xl">
          A campus for transition, growth, and belonging—helping young people
          build skills, confidence, and community roots.
        </p>
        <div className="mt-10 flex flex-wrap gap-4 opacity-0 animate-rise-delay-3">
          <a href="#join" className="btn-primary">
            Start Your Path
          </a>
          <a href="#mission" className="btn-ghost">
            Explore Our Work
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
