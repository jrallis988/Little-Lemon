#!/usr/bin/env node
/**
 * Local go-live readiness check.
 * Usage: node scripts/go-live-check.mjs
 */
import { existsSync, readFileSync } from "fs";
import path from "path";

function loadEnvFile(file) {
  const full = path.join(process.cwd(), file);
  if (!existsSync(full)) return {};
  const out = {};
  for (const line of readFileSync(full, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const idx = trimmed.indexOf("=");
    if (idx === -1) continue;
    const key = trimmed.slice(0, idx).trim();
    let value = trimmed.slice(idx + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    out[key] = value;
  }
  return out;
}

const env = {
  ...loadEnvFile(".env"),
  ...loadEnvFile(".env.local"),
  ...process.env,
};

const checks = [
  {
    id: "site_url",
    ok: Boolean(env.NEXT_PUBLIC_SITE_URL) && !String(env.NEXT_PUBLIC_SITE_URL).includes("localhost"),
    message: "NEXT_PUBLIC_SITE_URL should be your public https domain",
  },
  {
    id: "site_mode",
    ok: env.NEXT_PUBLIC_SITE_MODE === "production",
    message: "NEXT_PUBLIC_SITE_MODE=production",
  },
  {
    id: "intake_channel",
    ok: Boolean(env.INTAKE_WEBHOOK_URL || env.RESEND_API_KEY || env.UPSTASH_REDIS_REST_URL),
    message: "Configure INTAKE_WEBHOOK_URL, RESEND_API_KEY, or Upstash Redis",
  },
  {
    id: "ops_secret",
    ok: Boolean(env.INTAKE_OPS_SECRET),
    message: "INTAKE_OPS_SECRET for /ops/intake (recommended)",
  },
  {
    id: "support_email",
    ok: Boolean(env.NEXT_PUBLIC_SUPPORT_EMAIL) && !String(env.NEXT_PUBLIC_SUPPORT_EMAIL).includes("example.com"),
    message: "NEXT_PUBLIC_SUPPORT_EMAIL should be a real mailbox",
  },
  {
    id: "branding",
    ok:
      env.NEXT_PUBLIC_SITE_OFFICIAL === "true" ||
      Boolean(env.NEXT_PUBLIC_SITE_NAME),
    message:
      "Set NEXT_PUBLIC_SITE_OFFICIAL=true only if authorized, otherwise set your own NEXT_PUBLIC_SITE_NAME",
  },
  {
    id: "cms",
    ok: Boolean(env.NEXT_PUBLIC_SANITY_PROJECT_ID),
    message: "NEXT_PUBLIC_SANITY_PROJECT_ID (optional but recommended)",
    warn: true,
  },
  {
    id: "monitoring",
    ok: Boolean(env.SENTRY_DSN || env.NEXT_PUBLIC_ANALYTICS_ID),
    message: "SENTRY_DSN and/or NEXT_PUBLIC_ANALYTICS_ID",
    warn: true,
  },
];

let failed = 0;
let warned = 0;

console.log("Go-live readiness\n");
for (const check of checks) {
  if (check.ok) {
    console.log(`✓ ${check.id}`);
    continue;
  }
  if (check.warn) {
    warned += 1;
    console.log(`! ${check.id} — ${check.message}`);
  } else {
    failed += 1;
    console.log(`✗ ${check.id} — ${check.message}`);
  }
}

console.log(`\n${failed} required missing, ${warned} recommended missing`);
process.exit(failed > 0 ? 1 : 0);
