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
          alt="Young people focused on learning and growth together"
          className="h-full w-full object-cover object-center animate-drift"
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-hero-wash" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-violet-deep/50 to-violet-field/35" />

      <div className="container relative pb-16 pt-32 md:pb-24 md:pt-40">
        <p className="eyebrow opacity-0 animate-rise">
          Community youth support networks
        </p>
        <h1 className="display mt-4 max-w-4xl text-4xl leading-[1.05] opacity-0 animate-rise-delay sm:text-5xl md:text-6xl lg:text-7xl">
          Civic <span className="text-chartreuse">Bound</span>
        </h1>
        <div className="mt-5 h-px w-24 origin-left scale-x-0 bg-chartreuse animate-draw" />
        <p className="mt-6 max-w-xl font-body text-lg text-violet-mist opacity-0 animate-rise-delay-2 md:text-xl">
          A youth-centered network for life direction, stability, and positive
          community re-entry—built around young people, not adult bureaucracy.
        </p>
        <div className="mt-10 flex flex-wrap gap-4 opacity-0 animate-rise-delay-3">
          <a href="#join" className="btn-primary">
            Get Support
          </a>
          <a href="#mission" className="btn-ghost">
            Our Approach
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
