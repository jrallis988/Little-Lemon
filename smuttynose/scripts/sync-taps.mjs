/**
 * Sync public/data/taps.json "updated" stamp and refresh classics from beerDetails.
 * Run from smuttynose/: node scripts/sync-taps.mjs
 *
 * For live board changes, edit pouringNow in public/data/taps.json directly —
 * the homepage reads that file at runtime.
 */
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const tapsPath = path.join(root, "public/data/taps.json");

const classics = [
  {
    name: "Finestkind IPA",
    style: "American IPA",
    abv: "6.9%",
    note: "Core year-round — citrus, pine, and a dry finish. First brewed 2010.",
    status: "classic",
  },
  {
    name: "Old Brown Dog",
    style: "American Brown Ale",
    abv: "6.5%",
    note: "Core year-round since ’94 — toasty malt and caramel.",
    status: "classic",
  },
  {
    name: "Whole Lotta Haze",
    style: "NEIPA",
    abv: "6.5%",
    note: "Core year-round tropical NEIPA — cans and draft.",
    status: "classic",
  },
  {
    name: "Summer Ale",
    style: "Blonde Ale",
    abv: "5.0%",
    note: "Seasonal — light citrus notes and a thirst-quenching finish.",
    status: "classic",
  },
  {
    name: "Key Lime Pie Sour",
    style: "Sour Ale",
    abv: "5.2%",
    note: "Tart key lime with a graham-cracker finish — a newer classic.",
    status: "classic",
  },
];

const taps = JSON.parse(readFileSync(tapsPath, "utf8"));
taps.updated = new Date().toISOString().slice(0, 10);
taps.classics = classics;
writeFileSync(tapsPath, `${JSON.stringify(taps, null, 2)}\n`);
console.log("Updated", tapsPath, "→", taps.updated);
console.log("pouringNow entries:", taps.pouringNow?.length ?? 0);
console.log("Edit pouringNow manually to match today’s board.");
