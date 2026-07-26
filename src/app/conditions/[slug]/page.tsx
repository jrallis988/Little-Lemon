import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ConditionDetail } from "@/components/conditions/ConditionDetail";
import { conditions, getCondition } from "@/lib/data/conditions";

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
    title: condition.name,
    description: condition.lead,
  };
}

export default function ConditionPage({
  params,
}: {
  params: { slug: string };
}) {
  const condition = getCondition(params.slug);
  if (!condition) notFound();
  return <ConditionDetail condition={condition} />;
}
