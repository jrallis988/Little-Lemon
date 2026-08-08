function Join() {
  return (
    <section id="join" className="section-pad relative overflow-hidden bg-ink">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(91,43,179,0.45),transparent_45%),radial-gradient(circle_at_80%_70%,rgba(200,245,66,0.12),transparent_40%)]" />
      <div className="container relative">
        <div className="mx-auto max-w-4xl border-y border-violet-bright/30 py-14 text-center md:py-20">
          <p className="eyebrow">Take part</p>
          <h2 className="display mt-4 text-4xl md:text-6xl">
            Build the next chapter.{" "}
            <span className="text-chartreuse">Together.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl font-body text-lg text-violet-mist">
            Whether you join a program, mentor, or partner with a campus, you
            help create places where young people can grow with dignity and
            direction.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a href="#mission" className="btn-primary">
              Join a Program
            </a>
            <a href="#approach" className="btn-ghost">
              Partner With Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Join;
