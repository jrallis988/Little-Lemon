import { PrismaClient } from "@prisma/client";
import { databaseProviderFromUrl } from "@/lib/env";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

/**
 * Production connection patterns:
 * - Local/dev: DATABASE_URL=file:./dev.db (SQLite)
 * - Staging/prod: DATABASE_URL=postgresql://USER:PASS@HOST:5432/DB?sslmode=require
 *
 * Swap the Prisma `provider` in schema.prisma to `postgresql` when moving off SQLite,
 * then run `npx prisma migrate deploy`.
 */
function createPrismaClient() {
  const url = process.env.DATABASE_URL ?? "file:./dev.db";
  const provider = databaseProviderFromUrl(url);

  return new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["error", "warn"]
        : ["error"],
    datasources: {
      db: { url },
    },
    // Soft signal for ops logs — Prisma still follows schema.prisma provider.
    ...(provider === "postgres"
      ? {}
      : {}),
  });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export async function checkDatabase(): Promise<{
  ok: boolean;
  latencyMs: number;
  error?: string;
}> {
  const started = Date.now();
  try {
    await prisma.$queryRaw`SELECT 1`;
    return { ok: true, latencyMs: Date.now() - started };
  } catch (err) {
    return {
      ok: false,
      latencyMs: Date.now() - started,
      error: err instanceof Error ? err.message : "Database unreachable",
    };
  }
}
