"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { MemberCard, MemberScreen } from "@/components/member/member-ui";
import { EQUIPMENT_LIBRARY } from "@/lib/workouts";

type Phase = "permission" | "scan" | "tutorial";

export default function EquipmentPage() {
  const [phase, setPhase] = useState<Phase>("permission");
  const [selectedId, setSelectedId] = useState(EQUIPMENT_LIBRARY[0]?.id);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem("pf_equipment_favs");
    if (raw) setFavorites(JSON.parse(raw) as string[]);
    else {
      const defaults = EQUIPMENT_LIBRARY.filter((e) => e.favoriteDefault).map(
        (e) => e.id
      );
      setFavorites(defaults);
    }
  }, []);

  const selected =
    EQUIPMENT_LIBRARY.find((item) => item.id === selectedId) ??
    EQUIPMENT_LIBRARY[0];

  function toggleFavorite(id: string) {
    setFavorites((prev) => {
      const next = prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id];
      localStorage.setItem("pf_equipment_favs", JSON.stringify(next));
      return next;
    });
  }

  return (
    <MemberScreen
      eyebrow="Screen 49–52 · Equipment QR"
      title="Equipment scanner"
      subtitle="Scan machine QR codes for PF tutorials and proper form tips."
    >
      {phase === "permission" ? (
        <MemberCard className="space-y-3 text-center">
          <p className="font-semibold text-pf-ink">Camera permission</p>
          <p className="text-sm text-pf-ink/65">
            Allow camera access to scan equipment QR codes, or continue and
            pick a machine from the list.
          </p>
          <Button variant="purple" className="w-full" onClick={() => setPhase("scan")}>
            Allow camera
          </Button>
        </MemberCard>
      ) : null}

      {phase === "scan" ? (
        <MemberCard className="space-y-3 text-center">
          <div className="mx-auto grid h-40 w-40 place-items-center rounded-full border-4 border-pf-purple/30 bg-pf-mist font-display text-xl text-pf-purple">
            Scan
          </div>
          <p className="text-sm text-pf-ink/65">
            Pick a machine to simulate a QR hit.
          </p>
          <div className="grid gap-2">
            {EQUIPMENT_LIBRARY.map((item) => (
              <button
                key={item.id}
                type="button"
                className="rounded-2xl border border-pf-line px-3 py-2 text-left text-sm font-semibold hover:border-pf-purple"
                onClick={() => {
                  setSelectedId(item.id);
                  setPhase("tutorial");
                }}
              >
                {item.name}
              </button>
            ))}
          </div>
        </MemberCard>
      ) : null}

      {phase === "tutorial" && selected ? (
        <MemberCard className="space-y-3">
          <p className="text-[10px] font-bold uppercase tracking-wide text-pf-purple">
            Equipment tutorial
          </p>
          <p className="font-display text-2xl text-pf-ink">{selected.name}</p>
          <p className="text-sm text-pf-ink/70">{selected.tip}</p>
          <div className="flex gap-2">
            <Button
              type="button"
              variant={favorites.includes(selected.id) ? "purple" : "outline"}
              className="flex-1"
              onClick={() => toggleFavorite(selected.id)}
            >
              {favorites.includes(selected.id) ? "Favorited" : "Favorite"}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => setPhase("scan")}
            >
              Scan another
            </Button>
          </div>
        </MemberCard>
      ) : null}

      <MemberCard className="mt-3">
        <p className="text-xs font-bold uppercase tracking-wide text-pf-purple">
          Favorites
        </p>
        <ul className="mt-2 space-y-1 text-sm text-pf-ink/75">
          {favorites.map((id) => {
            const item = EQUIPMENT_LIBRARY.find((row) => row.id === id);
            return <li key={id}>{item?.name ?? id}</li>;
          })}
        </ul>
      </MemberCard>
    </MemberScreen>
  );
}
