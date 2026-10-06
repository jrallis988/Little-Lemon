import { readStore, updateStore, type OccupancySnapshot } from "@/lib/db";
import { getSeedClubRecords } from "@/lib/clubs";

function labelFor(level: number) {
  if (level < 30) return "Not busy";
  if (level < 55) return "Not too busy";
  if (level < 75) return "Getting busy";
  return "Very busy";
}

function synthesizeHistory(seed: number) {
  return Array.from({ length: 24 }, (_, hour) => {
    const peak = hour >= 17 && hour <= 20 ? 35 : hour >= 6 && hour <= 9 ? 25 : 0;
    const level = Math.max(
      8,
      Math.min(96, Math.round(28 + peak + ((seed + hour * 17) % 40) - 12))
    );
    return { hour, level };
  });
}

export async function getOccupancy(clubId: string): Promise<OccupancySnapshot> {
  const store = await readStore();
  const existing = store.occupancy.find((item) => item.clubId === clubId);
  const age = existing
    ? Date.now() - new Date(existing.updatedAt).getTime()
    : Number.POSITIVE_INFINITY;

  if (existing && age < 45_000) return existing;

  const seed = clubId.split("").reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
  const hour = new Date().getHours();
  const wobble = Math.round((Math.sin(Date.now() / 60000) + 1) * 10);
  const base = 30 + (seed % 25) + (hour >= 17 && hour <= 20 ? 28 : 0);
  const level = Math.max(5, Math.min(98, base + wobble - 10));

  const snapshot: OccupancySnapshot = {
    clubId,
    level,
    label: labelFor(level),
    updatedAt: new Date().toISOString(),
    history: existing?.history?.length ? existing.history : synthesizeHistory(seed),
  };

  await updateStore((db) => {
    const index = db.occupancy.findIndex((item) => item.clubId === clubId);
    if (index >= 0) db.occupancy[index] = snapshot;
    else db.occupancy.push(snapshot);
  });

  return snapshot;
}

export async function listHomeClubOptions() {
  return getSeedClubRecords().map((club) => ({
    id: club.id,
    name: club.name,
    city: club.city,
    state: club.state,
  }));
}
