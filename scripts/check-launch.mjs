#!/usr/bin/env node
/**
 * Quick launch readiness check for Playhouse Animation.
 * Usage: node scripts/check-launch.mjs
 */
import { readFileSync, existsSync, readdirSync, statSync } from "fs";
import { join } from "path";

const root = new URL("..", import.meta.url).pathname;
const problems = [];
const notes = [];

function ok(msg) {
  console.log(`✓ ${msg}`);
}
function warn(msg) {
  notes.push(msg);
  console.log(`! ${msg}`);
}
function fail(msg) {
  problems.push(msg);
  console.log(`✗ ${msg}`);
}

const required = [
  "index.html",
  "styles.css",
  "main.js",
  "config.js",
  "404.html",
  "robots.txt",
  "sitemap.xml",
  "wrangler.toml",
  "_headers",
  "images/logo.png",
  "images/hero-storybook.webp",
  "images/hero-storybook.jpg",
  "films/lemon-friend.html",
  "films/starry-friends.html",
  "films/lemon-bus.html",
  "films/storybook-magic.html",
  "studio/educators.html",
  "studio/partners.html",
  "studio/co-production.html",
];

for (const rel of required) {
  const p = join(root, rel);
  if (existsSync(p)) ok(`found ${rel}`);
  else fail(`missing ${rel}`);
}

const cfg = readFileSync(join(root, "config.js"), "utf8");
const endpoint = (cfg.match(/formEndpoint:\s*"([^"]*)"/) || [])[1] ?? "";
const siteUrl = (cfg.match(/siteUrl:\s*"([^"]*)"/) || [])[1] ?? "";
const yt = (cfg.match(/showreelYoutube:\s*"([^"]*)"/) || [])[1] ?? "";
const vimeo = (cfg.match(/showreelVimeo:\s*"([^"]*)"/) || [])[1] ?? "";

if (endpoint) ok(`Formspree endpoint set`);
else warn(`config.js formEndpoint is empty — contact form is demo-only`);

if (siteUrl) ok(`siteUrl set (${siteUrl})`);
else warn(`config.js siteUrl is empty — set before production for OG tags/sitemap`);

if (yt || vimeo) ok(`showreel video ID set`);
else warn(`no showreel YouTube/Vimeo ID — trailers show poster placeholder`);

// image budget
let total = 0;
function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) walk(p);
    else total += st.size;
  }
}
walk(join(root, "images"));
const mb = total / (1024 * 1024);
if (mb < 5) ok(`images folder ${mb.toFixed(1)}MB`);
else warn(`images folder is ${mb.toFixed(1)}MB — consider more compression`);

console.log("\n---");
if (problems.length) {
  console.log(`Failed with ${problems.length} problem(s).`);
  process.exit(1);
}
console.log(`Ready structurally. ${notes.length} go-live item(s) left in config/media.`);
process.exit(0);
