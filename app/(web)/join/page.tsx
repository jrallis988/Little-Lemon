import type { Metadata } from "next";
import { JoinFunnel } from "@/components/join-funnel";
import { HOME_CLUB } from "@/lib/home-club";

export const metadata: Metadata = {
  title: "Join Stratham",
  description:
    "Start a Planet Fitness Stratham membership in a few steps. Local club pricing stays visible the whole way.",
};

type JoinPageProps = {
  searchParams: Promise<{ club?: string; plan?: string }>;
};

export default async function JoinPage({ searchParams }: JoinPageProps) {
  const params = await searchParams;
  return (
    <JoinFunnel
      initialClubId={params.club ?? HOME_CLUB.id}
      initialPlan={params.plan}
    />
  );
}
