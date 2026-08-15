import { Link } from "react-router-dom";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=2400&q=80";

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-paper pt-24 md:pt-28">
      <div className="container grid items-center gap-12 pb-16 md:pb-24 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <p className="eyebrow-accent opacity-0 animate-rise">
            A nonprofit youth support network
          </p>
          <h1 className="display mt-6 max-w-xl text-4xl leading-[1.1] opacity-0 animate-rise-delay sm:text-5xl md:text-6xl">
            Civic Bound
          </h1>
          <p className="lede mt-6 max-w-xl opacity-0 animate-rise-delay-2">
            A youth-centered network for life direction, stability, and positive
            community re-entry—built around young people, not adult bureaucracy.
          </p>
          <div className="mt-9 flex flex-wrap gap-3 opacity-0 animate-rise-delay-3">
            <Link to="/get-support" className="btn-primary">
              Get Support
            </Link>
            <a href="#approach" className="btn-ghost">
              Our Approach
            </a>
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="overflow-hidden border border-paper-line bg-paper-soft shadow-card">
            <img
              src={HERO_IMAGE}
              alt="Young people focused on learning and growth together"
              className="h-[420px] w-full object-cover md:h-[520px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
