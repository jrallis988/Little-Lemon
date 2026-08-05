import { CircleLink } from "@/components/home/CircleLink";

export function EspanolBanner() {
  return (
    <section
      id="espanol"
      className="bg-white py-s6"
      aria-label="Recursos en español"
      lang="es"
    >
      <div className="wrap">
        <div className="flex flex-col items-start justify-between gap-s4 rounded-lg bg-bay px-s5 py-s5 shadow-sm sm:flex-row sm:items-center sm:px-s6 sm:py-s5">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Atendemos en español
          </h2>
          <CircleLink href="/es" light>
            Explora nuestros recursos en español
          </CircleLink>
        </div>
      </div>
    </section>
  );
}
