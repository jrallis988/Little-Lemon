/**
 * Lightweight E2E-style smoke against a running server.
 * Usage: BASE_URL=http://localhost:3000 npm run test:e2e
 */
const base = (process.env.BASE_URL ?? "http://127.0.0.1:3000").replace(/\/$/, "");

async function check(path, expectOk = true) {
  const res = await fetch(`${base}${path}`, { redirect: "manual" });
  if (expectOk && res.status >= 500) {
    throw new Error(`${path} → ${res.status}`);
  }
  console.log(`ok ${res.status} ${path}`);
  return res;
}

async function main() {
  await check("/api/health");
  await check("/api/config");
  await check("/");
  await check("/search?drug=atorvastatin");
  await check("/help");
  await check("/api/chat");
  console.log("e2e smoke ok against", base);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
