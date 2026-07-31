/**
 * Export local TypeScript catalog as Sanity-compatible NDJSON.
 * Usage: npx tsx scripts/export-cms-ndjson.ts
 */
import { locations } from "../src/content/data/locations";
import { providers } from "../src/content/data/providers";
import { conditions } from "../src/content/data/conditions";
import { programs } from "../src/content/data/programs";
import {
  clinicalTrials,
  departments,
} from "../src/content/data/departments";

function asSlug(value?: string) {
  if (!value) return undefined;
  return { _type: "slug", current: value };
}

function mapDoc<T extends { _type: string; _id: string; slug: string }>(
  doc: T,
) {
  const { slug, ...rest } = doc;
  return {
    ...rest,
    slug: asSlug(slug),
  };
}

const docs = [
  ...locations.map(mapDoc),
  ...providers.map(mapDoc),
  ...conditions.map(mapDoc),
  ...programs.map(mapDoc),
  ...departments.map(mapDoc),
  ...clinicalTrials.map(mapDoc),
];

for (const doc of docs) {
  process.stdout.write(`${JSON.stringify(doc)}\n`);
}

process.stderr.write(`Exported ${docs.length} documents\n`);
