import { CircleLink } from "@/components/home/CircleLink";

export function EspanolBanner() {
  return (
    <section
      className="bg-pink py-s6"
      aria-label="Recursos en español"
      lang="es"
    >
      <div className="wrap flex flex-col items-start justify-between gap-s4 sm:flex-row sm:items-center">
        <h2 className="text-2xl font-bold text-white sm:text-3xl">
          Atendemos en español
        </h2>
        <CircleLink href="/patients-families" light>
          Explora nuestros recursos en español
        </CircleLink>
      </div>
    </section>
  );
}
