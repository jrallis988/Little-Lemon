#!/usr/bin/env node
/**
 * Local smoke against a running server (default http://localhost:3000).
 * Usage: npm run build && npm start & npm run smoke
 */
const base = (process.env.SMOKE_BASE_URL || "http://localhost:3000").replace(
  /\/$/,
  ""
);

const paths = ["/", "/product", "/status", "/join", "/screens", "/api/health"];

async function main() {
  let failed = 0;
  for (const path of paths) {
    const url = `${base}${path}`;
    try {
      const res = await fetch(url, { redirect: "follow" });
      const ok = res.status >= 200 && res.status < 400;
      console.log(`${ok ? "OK" : "FAIL"} ${res.status} ${path}`);
      if (!ok) failed += 1;
      if (path === "/api/health") {
        const json = await res.json();
        if (!json?.ok) {
          console.log("FAIL health payload missing ok:true");
          failed += 1;
        }
      }
    } catch (err) {
      console.log(`FAIL ${path} ${err instanceof Error ? err.message : err}`);
      failed += 1;
    }
  }
  if (failed) {
    console.error(`Smoke failed: ${failed} path(s)`);
    process.exit(1);
  }
  console.log("Smoke passed.");
}

main();
