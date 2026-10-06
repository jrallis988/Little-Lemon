"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { MemberCard, MemberScreen } from "@/components/member/member-ui";
import { PERKS } from "@/lib/perks";

export default function PerkDetailPage() {
  const params = useParams<{ id: string }>();
  const perk = useMemo(
    () => PERKS.find((item) => item.id === params.id) ?? null,
    [params.id]
  );
  const [redeemed, setRedeemed] = useState(false);

  if (!perk) {
    return (
      <MemberScreen title="Perk not found">
        <Button asChild variant="outline">
          <Link href="/app/perks">Back</Link>
        </Button>
      </MemberScreen>
    );
  }

  return (
    <MemberScreen
      eyebrow="Screens 61–62 · Perk"
      title={perk.title}
      subtitle={perk.partner}
    >
      <MemberCard className="space-y-3">
        <p className="text-sm text-pf-ink/70">{perk.summary}</p>
        <p className="rounded-2xl bg-pf-mist px-3 py-2 font-mono text-sm text-pf-purple">
          {perk.code}
        </p>
        {redeemed ? (
          <p className="text-sm font-semibold text-emerald-700">
            Code copied / marked redeemed on this device.
          </p>
        ) : null}
        <div className="flex gap-2">
          <Button
            type="button"
            variant="purple"
            className="flex-1"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(perk.code);
              } catch {
                /* ignore */
              }
              setRedeemed(true);
            }}
          >
            Redeem / copy code
          </Button>
          <Button asChild variant="outline" className="flex-1">
            <a href={perk.href} target="_blank" rel="noreferrer">
              Partner site
            </a>
          </Button>
        </div>
      </MemberCard>
    </MemberScreen>
  );
}
