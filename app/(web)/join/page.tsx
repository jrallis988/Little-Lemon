import type { Metadata } from "next";
import { JoinFunnel } from "@/components/join-funnel";

export const metadata: Metadata = {
  title: "Join",
  description:
    "Start a Planet Fitness membership in a few steps. Local club pricing stays visible the whole way.",
};

type JoinPageProps = {
  searchParams: Promise<{ club?: string; plan?: string }>;
};

export default async function JoinPage({ searchParams }: JoinPageProps) {
  const params = await searchParams;
  return (
    <JoinFunnel initialClubId={params.club} initialPlan={params.plan} />
  );
}
