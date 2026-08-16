"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { RequireAuth } from "@/components/auth/RequireAuth";
import { AppShell } from "@/components/layout/AppShell";
import { Avatar } from "@/components/ui/Avatar";
import { Input } from "@/components/ui/Input";
import { comics, venues } from "@/lib/mock/data";

export default function SearchPage() {
  const [q, setQ] = useState("");
  const query = q.trim().toLowerCase();

  const comicHits = useMemo(
    () =>
      comics.filter(
        (c) =>
          !query ||
          c.displayName.toLowerCase().includes(query) ||
          c.username.includes(query) ||
          c.city.toLowerCase().includes(query) ||
          c.styles.some((s) => s.includes(query)),
      ),
    [query],
  );

  const venueHits = useMemo(
    () =>
      venues.filter(
        (v) =>
          !query ||
          v.name.toLowerCase().includes(query) ||
          v.city.toLowerCase().includes(query) ||
          v.tags.some((t) => t.includes(query)),
      ),
    [query],
  );

  return (
    <RequireAuth>
      <AppShell title="Search">
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Comics, cities, styles, rooms…"
          autoFocus
        />

        <h2 className="mb-2 mt-6 font-display text-xl uppercase tracking-[0.06em]">
          Comics
        </h2>
        <ul className="space-y-2">
          {comicHits.map((c) => (
            <li key={c.id}>
              <Link
                href={`/u/${c.username}`}
                className="flex items-center gap-3 rounded-xl bg-velvet/70 p-3 hairline transition hover:bg-velvet"
              >
                <Avatar initials={c.avatarInitials} hue={c.avatarHue} />
                <div>
                  <p className="font-semibold">{c.displayName}</p>
                  <p className="text-xs text-smoke">
                    @{c.username} · {c.city}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <h2 className="mb-2 mt-6 font-display text-xl uppercase tracking-[0.06em]">
          Rooms
        </h2>
        <ul className="space-y-2">
          {venueHits.map((v) => (
            <li
              key={v.id}
              className="rounded-xl bg-velvet/70 p-3 hairline"
            >
              <p className="font-display text-lg uppercase tracking-[0.04em]">
                {v.name}
              </p>
              <p className="text-sm text-smoke">
                {v.neighborhood}, {v.city}
              </p>
              <p className="mt-1 text-sm text-mic">{v.vibe}</p>
            </li>
          ))}
        </ul>
      </AppShell>
    </RequireAuth>
  );
}
