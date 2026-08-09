#!/usr/bin/env node
/**
 * Switch Prisma datasource provider to postgresql for production deploys.
 * Usage: npm run db:use-postgres
 */
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const schemaPath = resolve(process.cwd(), "prisma/schema.prisma");
let schema = readFileSync(schemaPath, "utf8");

if (/provider\s*=\s*"postgresql"/.test(schema)) {
  console.log("Prisma provider is already postgresql.");
  process.exit(0);
}

if (!/provider\s*=\s*"sqlite"/.test(schema)) {
  console.error("Could not find sqlite provider in prisma/schema.prisma");
  process.exit(1);
}

schema = schema.replace(
  /provider\s*=\s*"sqlite"/,
  'provider = "postgresql"'
);
writeFileSync(schemaPath, schema, "utf8");

console.log("Updated prisma/schema.prisma → provider = \"postgresql\"");
console.log("Next steps:");
console.log('  1. Set DATABASE_URL="postgresql://USER:PASS@HOST:5432/trumprx?sslmode=require"');
console.log("  2. npx prisma migrate deploy");
console.log("  3. npm run db:seed   # optional catalog seed");
console.log("  4. Deploy (see docs/DEPLOY.md)");
