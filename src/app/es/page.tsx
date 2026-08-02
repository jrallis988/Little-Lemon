import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Recursos en español",
  description:
    "Encuentre médicos, programe citas y prepare su visita en Boston Children's Hospital.",
};

const recursos = [
  {
    title: "Encontrar un médico",
    body: "Busque especialistas por nombre, especialidad o idioma.",
    href: "/find-a-doctor",
  },
  {
    title: "Solicitar una cita",
    body: "Envíe una solicitud de cita para comenzar el proceso de atención.",
    href: "/appointments/request",
  },
  {
    title: "Preparar su visita",
    body: "Qué traer, cómo llegar y cómo ayudar a su hijo a sentirse listo.",
    href: "/patients-families/prepare-for-your-visit",
  },
  {
    title: "Portal MyChildren's",
    body: "Vista previa del portal para resultados, mensajes y citas.",
    href: "/portal",
  },
  {
    title: "Ubicaciones",
    body: "Campus principal y centros comunitarios en el área de Boston.",
    href: "/locations",
  },
  {
    title: "Emergencias",
    body: "Información sobre el Departamento de Emergencias y tiempos de espera.",
    href: "/emergency",
  },
];

export default function EspanolPage() {
  return (
    <>
      <PageHero
        id="es-heading"
        eyebrow="Español"
        title="Atendemos en español"
        lead="Explore recursos para encontrar atención, preparar su visita y conectarse con el equipo de cuidado."
        actions={
          <>
            <Button href="/appointments/request" variant="ocean">
              Solicitar una cita
            </Button>
            <Button href="/find-a-doctor" variant="ghost-white">
              Encontrar un médico
            </Button>
          </>
        }
      />
      <div className="wrap py-s7 pb-s10" lang="es">
        <div className="mb-s7 grid grid-cols-1 gap-s4 md:grid-cols-2 lg:grid-cols-3">
          {recursos.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="block rounded-md border border-border bg-white p-s5 no-underline transition-all hover:border-ocean hover:shadow-sm"
            >
              <h2 className="mb-s2 text-lg font-bold text-ocean">{item.title}</h2>
              <p className="text-sm font-light text-text-body">{item.body}</p>
            </Link>
          ))}
        </div>
        <p className="text-sm font-light text-text-meta">
          ¿Viaja desde fuera de EE. UU.?{" "}
          <Link href="/international" className="font-bold text-ocean">
            International patients
          </Link>
        </p>
      </div>
    </>
  );
}
