import { randomBytes } from "crypto";
import { newId, readStore, updateStore, type GuestPassRecord } from "@/lib/db";

function endOfDay(date = new Date()) {
  const d = new Date(date);
  d.setHours(23, 59, 59, 999);
  return d;
}

export async function listGuestPasses(membershipId: string) {
  const store = await readStore();
  const now = Date.now();
  return store.guestPasses
    .filter((pass) => pass.membershipId === membershipId)
    .map((pass) =>
      new Date(pass.expiresAt).getTime() < now && pass.status === "active"
        ? { ...pass, status: "expired" as const }
        : pass
    );
}

export async function createGuestPass(input: {
  membershipId: string;
  guestName: string;
  clubId: string;
  clubName: string;
}): Promise<GuestPassRecord> {
  const pass: GuestPassRecord = {
    id: newId("gst"),
    membershipId: input.membershipId,
    guestName: input.guestName.trim() || "Guest",
    clubId: input.clubId,
    clubName: input.clubName,
    createdAt: new Date().toISOString(),
    expiresAt: endOfDay().toISOString(),
    code: randomBytes(4).toString("hex").toUpperCase(),
    status: "active",
  };

  await updateStore((store) => {
    store.guestPasses.unshift(pass);
  });
  return pass;
}

export async function markGuestPassUsed(id: string) {
  await updateStore((store) => {
    const pass = store.guestPasses.find((item) => item.id === id);
    if (pass && pass.status === "active") pass.status = "used";
  });
}
