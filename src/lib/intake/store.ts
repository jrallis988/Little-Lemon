import { readdir, readFile } from "fs/promises";
import path from "path";
import type { IntakeRecord } from "./types";

export function intakeStoreRoot() {
  return (
    process.env.INTAKE_STORE_DIR ||
    (process.env.VERCEL
      ? "/tmp/bch-intake"
      : path.join(process.cwd(), ".data/intake"))
  );
}

export async function listIntakeRecords(limit = 50): Promise<IntakeRecord[]> {
  const root = intakeStoreRoot();
  let files: string[] = [];
  try {
    files = (await readdir(root)).filter((f) => f.endsWith(".json"));
  } catch {
    return [];
  }

  const records: IntakeRecord[] = [];
  for (const file of files.slice(0, limit * 2)) {
    try {
      const raw = await readFile(path.join(root, file), "utf8");
      records.push(JSON.parse(raw) as IntakeRecord);
    } catch {
      // skip corrupt
    }
  }

  return records
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, limit);
}

export function assertOpsAuthorized(request: Request) {
  const secret = process.env.INTAKE_OPS_SECRET;
  if (!secret) {
    return {
      ok: false as const,
      status: 503,
      message:
        "INTAKE_OPS_SECRET is not configured. Set it to enable the staff inbox.",
    };
  }

  const header = request.headers.get("authorization");
  const bearer = header?.startsWith("Bearer ")
    ? header.slice("Bearer ".length)
    : null;
  const url = new URL(request.url);
  const query = url.searchParams.get("secret");
  const provided = bearer || query;

  if (!provided || provided !== secret) {
    return {
      ok: false as const,
      status: 401,
      message: "Unauthorized",
    };
  }

  return { ok: true as const };
}
