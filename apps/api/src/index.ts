/**
 * BioCross API — full mobile client contract.
 *
 * Local:  SQLITE (default) → npm run dev
 * Prod:   DATABASE_URL=postgres://... → Docker / Railway / Fly
 */
import { randomBytes } from 'crypto';
import Fastify from 'fastify';
import cors from '@fastify/cors';
import jwt from 'jsonwebtoken';
import { hashPassword, verifyPassword } from './auth.js';
import { analyzeSupplement } from './analysis.js';
import { findByBarcode, findById, findByQuery } from './catalog.js';
import { createStore, mergeProfileItem, publicUser } from './db/index.js';
import type { AppPreferences, HealthProfile, HealthProfileItem, UserRecord } from './types.js';

const JWT_SECRET = process.env.JWT_SECRET ?? 'biocross-dev-secret-change-me';
const PORT = Number(process.env.PORT ?? 3001);
const TOKEN_TTL = '7d';
const TOKEN_SECONDS = 60 * 60 * 24 * 7;

const store = await createStore();
const app = Fastify({ logger: true });
await app.register(cors, { origin: true });

async function auth(req: { headers: { authorization?: string } }): Promise<UserRecord | null> {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) return null;
  try {
    const payload = jwt.verify(header.slice(7), JWT_SECRET) as { sub: string };
    return store.getUser(payload.sub);
  } catch {
    return null;
  }
}

function tokensFor(userId: string) {
  const accessToken = jwt.sign({ sub: userId }, JWT_SECRET, { expiresIn: TOKEN_TTL });
  const refreshToken = randomBytes(24).toString('hex');
  return { accessToken, refreshToken, expiresIn: TOKEN_SECONDS };
}

app.get('/health', async () => ({
  ok: true,
  service: 'biocross-api',
  store: store.kind,
  time: new Date().toISOString(),
}));

app.post<{ Body: { email: string; password: string } }>('/auth/sign-in', async (req, reply) => {
  const user = await store.findUserByEmail(req.body?.email ?? '');
  if (!user || !verifyPassword(req.body.password ?? '', user.passwordHash)) {
    return reply.code(401).send({ message: 'Invalid email or password.' });
  }
  return { data: { user: publicUser(user), tokens: tokensFor(user.id) } };
});

app.post<{ Body: { email: string; password: string; fullName: string } }>('/auth/sign-up', async (req, reply) => {
  const email = req.body?.email?.trim() ?? '';
  const password = req.body?.password ?? '';
  const fullName = req.body?.fullName?.trim() ?? '';
  if (!email || password.length < 8 || !fullName) {
    return reply.code(400).send({ message: 'Name, email, and password (8+ chars) are required.' });
  }
  if (await store.findUserByEmail(email)) {
    return reply.code(409).send({ message: 'An account with this email already exists.' });
  }
  const user = await store.createUser({
    id: `user-${Date.now()}`,
    email,
    fullName,
    passwordHash: hashPassword(password),
    onboardingCompleted: false,
    createdAt: new Date().toISOString(),
  });
  return { data: { user: publicUser(user), tokens: tokensFor(user.id) } };
});

app.post('/auth/sign-out', async (req, reply) => {
  if (!(await auth(req))) return reply.code(401).send({ message: 'Unauthorized' });
  return { data: { ok: true } };
});

app.get('/auth/me', async (req, reply) => {
  const user = await auth(req);
  if (!user) return reply.code(401).send({ message: 'Unauthorized' });
  return { data: publicUser(user) };
});

app.put<{ Body: Partial<UserRecord> }>('/user', async (req, reply) => {
  const user = await auth(req);
  if (!user) return reply.code(401).send({ message: 'Unauthorized' });
  const next = { ...user, ...req.body, id: user.id, passwordHash: user.passwordHash, email: user.email };
  return { data: publicUser(await store.updateUser(next)) };
});

app.post<{ Body: { email: string } }>('/auth/forgot-password', async (req, reply) => {
  const email = req.body?.email?.trim() ?? '';
  const user = email ? await store.findUserByEmail(email) : null;
  // Always return success to avoid account enumeration
  if (user) {
    const token = randomBytes(24).toString('hex');
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000).toISOString();
    await store.savePasswordReset(token, user.id, expiresAt);
    req.log.info({ email, token }, 'password reset token created (wire email provider in production)');
  }
  return {
    data: {
      ok: true,
      message: 'If an account exists, a reset link would be emailed.',
    },
  };
});

app.post<{ Body: { token: string; password: string } }>('/auth/reset-password', async (req, reply) => {
  const token = req.body?.token ?? '';
  const password = req.body?.password ?? '';
  if (!token || password.length < 8) {
    return reply.code(400).send({ message: 'Valid token and password (8+ chars) required.' });
  }
  const userId = await store.consumePasswordReset(token);
  if (!userId) return reply.code(400).send({ message: 'Invalid or expired reset token.' });
  const user = await store.getUser(userId);
  if (!user) return reply.code(404).send({ message: 'User not found.' });
  user.passwordHash = hashPassword(password);
  await store.updateUser(user);
  return { data: { ok: true } };
});

app.delete('/auth/account', async (req, reply) => {
  const user = await auth(req);
  if (!user) return reply.code(401).send({ message: 'Unauthorized' });
  await store.deleteUser(user.id);
  return { data: { ok: true } };
});

app.get('/profile', async (req, reply) => {
  const user = await auth(req);
  if (!user) return reply.code(401).send({ message: 'Unauthorized' });
  return { data: await store.getProfile(user.id) };
});

app.put<{ Body: { profile: HealthProfile } }>('/profile', async (req, reply) => {
  const user = await auth(req);
  if (!user) return reply.code(401).send({ message: 'Unauthorized' });
  const profile = { ...req.body.profile, userId: user.id, lastUpdatedAt: new Date().toISOString() };
  return { data: await store.saveProfile(profile) };
});

app.post<{ Body: { item: HealthProfileItem } }>('/profile/items', async (req, reply) => {
  const user = await auth(req);
  if (!user) return reply.code(401).send({ message: 'Unauthorized' });
  const profile = await store.getProfile(user.id);
  return { data: await store.saveProfile(mergeProfileItem(profile, req.body.item)) };
});

app.delete<{ Params: { id: string } }>('/profile/items/:id', async (req, reply) => {
  const user = await auth(req);
  if (!user) return reply.code(401).send({ message: 'Unauthorized' });
  const profile = await store.getProfile(user.id);
  profile.items = profile.items.filter((i) => i.id !== req.params.id);
  profile.lastUpdatedAt = new Date().toISOString();
  return { data: await store.saveProfile(profile) };
});

app.post<{ Params: { id: string } }>('/profile/items/:id/confirm', async (req, reply) => {
  const user = await auth(req);
  if (!user) return reply.code(401).send({ message: 'Unauthorized' });
  const profile = await store.getProfile(user.id);
  profile.items = profile.items.map((i) =>
    i.id === req.params.id ? { ...i, status: 'confirmed' as const, confirmedAt: new Date().toISOString() } : i,
  );
  profile.lastUpdatedAt = new Date().toISOString();
  return { data: await store.saveProfile(profile) };
});

app.get('/checks', async (req, reply) => {
  const user = await auth(req);
  if (!user) return reply.code(401).send({ message: 'Unauthorized' });
  return { data: await store.getChecks(user.id) };
});

app.get<{ Params: { id: string } }>('/checks/:id', async (req, reply) => {
  const user = await auth(req);
  if (!user) return reply.code(401).send({ message: 'Unauthorized' });
  const check = await store.getCheck(user.id, req.params.id);
  if (!check) return reply.code(404).send({ message: 'Check not found.' });
  return { data: check };
});

app.post<{ Body: { supplementId: string } }>('/checks/analyze', async (req, reply) => {
  const user = await auth(req);
  if (!user) return reply.code(401).send({ message: 'Unauthorized' });
  const supplement = findById(req.body?.supplementId ?? '');
  if (!supplement) return reply.code(404).send({ message: 'Supplement not found.' });
  const profile = await store.getProfile(user.id);
  const check = analyzeSupplement(supplement, profile, user.id);
  return { data: await store.saveCheck(check) };
});

app.get<{ Querystring: { q?: string } }>('/supplements/search', async (req) => {
  return { data: { supplements: findByQuery(req.query.q ?? '') } };
});

app.get<{ Params: { code: string } }>('/supplements/barcode/:code', async (req) => {
  return { data: { supplement: findByBarcode(req.params.code) ?? null } };
});

app.get('/alerts', async (req, reply) => {
  const user = await auth(req);
  if (!user) return reply.code(401).send({ message: 'Unauthorized' });
  return { data: await store.getAlerts(user.id) };
});

app.post<{ Params: { id: string } }>('/alerts/:id/read', async (req, reply) => {
  const user = await auth(req);
  if (!user) return reply.code(401).send({ message: 'Unauthorized' });
  const alert = await store.markAlertRead(user.id, req.params.id);
  if (!alert) return reply.code(404).send({ message: 'Alert not found.' });
  return { data: alert };
});

app.get('/preferences', async (req, reply) => {
  const user = await auth(req);
  if (!user) return reply.code(401).send({ message: 'Unauthorized' });
  return { data: await store.getPreferences(user.id) };
});

app.put<{ Body: AppPreferences }>('/preferences', async (req, reply) => {
  const user = await auth(req);
  if (!user) return reply.code(401).send({ message: 'Unauthorized' });
  return { data: await store.savePreferences(user.id, req.body) };
});

app.get('/documents', async (req, reply) => {
  const user = await auth(req);
  if (!user) return reply.code(401).send({ message: 'Unauthorized' });
  return { data: await store.getDocuments(user.id) };
});

app.post<{ Body: { fileName: string } }>('/documents/upload', async (req, reply) => {
  const user = await auth(req);
  if (!user) return reply.code(401).send({ message: 'Unauthorized' });
  const fileName = req.body?.fileName ?? 'upload.pdf';
  const doc = {
    id: `doc-${Date.now()}`,
    fileName,
    mimeType: fileName.toLowerCase().endsWith('.pdf') ? 'application/pdf' : 'image/jpeg',
    sizeBytes: 1_200_000,
    pageCount: 12,
    uploadedAt: new Date().toISOString(),
    status: 'extracted' as const,
  };
  await store.saveDocument(user.id, doc);
  const extracted = [
    {
      id: `ext-${doc.id}-1`,
      documentId: doc.id,
      category: 'medication' as const,
      name: 'Losartan',
      details: '50 mg daily',
      status: 'ready' as const,
    },
    {
      id: `ext-${doc.id}-2`,
      documentId: doc.id,
      category: 'condition' as const,
      name: 'Hypertension',
      status: 'ready' as const,
    },
  ];
  await store.saveExtracted(user.id, extracted);
  return { data: doc };
});

app.get<{ Params: { id: string } }>('/documents/:id/extracted', async (req, reply) => {
  const user = await auth(req);
  if (!user) return reply.code(401).send({ message: 'Unauthorized' });
  return { data: { items: await store.getExtracted(user.id, req.params.id) } };
});

app.post('/onboarding/complete', async (req, reply) => {
  const user = await auth(req);
  if (!user) return reply.code(401).send({ message: 'Unauthorized' });
  user.onboardingCompleted = true;
  return { data: publicUser(await store.updateUser(user)) };
});

const shutdown = async () => {
  await store.close();
  await app.close();
  process.exit(0);
};
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

app.listen({ port: PORT, host: '0.0.0.0' }).then(() => {
  app.log.info(`BioCross API on :${PORT} (store=${store.kind})`);
});
