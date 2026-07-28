import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ConditionDetail } from "@/components/conditions/ConditionDetail";
import { conditions, getCondition } from "@/lib/data/conditions";
import {
  buildBreadcrumbList,
  buildMedicalCondition,
  jsonLdScript,
} from "@/lib/seo";

export function generateStaticParams() {
  return conditions.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const condition = getCondition(params.slug);
  if (!condition) return { title: "Condition" };
  return {
    title: `${condition.name} — Symptoms and Treatment`,
    description: condition.lead,
    alternates: { canonical: `/conditions/${condition.slug}` },
  };
}

export default function ConditionPage({
  params,
}: {
  params: { slug: string };
}) {
  const condition = getCondition(params.slug);
  if (!condition) notFound();
  const structuredData = [
    buildMedicalCondition({
      name: condition.name,
      description: condition.lead,
      path: `/conditions/${condition.slug}`,
      medicalSpecialty: condition.specialty,
    }),
    buildBreadcrumbList([
      { name: "Home", path: "/" },
      { name: "Conditions A–Z", path: "/conditions" },
      { name: condition.name, path: `/conditions/${condition.slug}` },
    ]),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(structuredData) }}
      />
      <ConditionDetail condition={condition} />
    </>
  );
}
