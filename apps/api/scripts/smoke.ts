/**
 * Smoke test against a running API (default http://localhost:3001).
 * Usage: npm run smoke
 */
const BASE = process.env.API_URL ?? 'http://localhost:3001';

async function req(path: string, init: RequestInit = {}) {
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(init.headers ?? {}),
    },
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`${init.method ?? 'GET'} ${path} → ${res.status} ${JSON.stringify(json)}`);
  return json;
}

async function main() {
  const health = await req('/health');
  console.log('health', health);

  const session = await req('/auth/sign-in', {
    method: 'POST',
    body: JSON.stringify({ email: 'demo@biocross.app', password: 'demo1234' }),
  });
  const token = session.data.tokens.accessToken;
  console.log('signed in as', session.data.user.email);

  const auth = { Authorization: `Bearer ${token}` };
  const profile = await req('/profile', { headers: auth });
  console.log('profile items', profile.data.items.length);

  const barcode = await req('/supplements/barcode/012345678943', { headers: auth });
  console.log('barcode', barcode.data.supplement?.name);

  const check = await req('/checks/analyze', {
    method: 'POST',
    headers: auth,
    body: JSON.stringify({ supplementId: 'sup-catalog-testo' }),
  });
  console.log('analysis', check.data.riskLevel, check.data.headline, check.data.rulesetVersion);

  console.log('SMOKE OK');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
