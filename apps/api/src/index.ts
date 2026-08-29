/**
 * BioCross API server — implements the mobile client contract (src/api/types.ts).
 * Run: cd apps/api && npm install && npm run dev
 *
 * Demo mode uses in-memory storage. Replace with Postgres for production.
 */
import Fastify from 'fastify';
import cors from '@fastify/cors';
import jwt from 'jsonwebtoken';
import { store } from './store.js';
import { hashPassword, verifyPassword } from './auth.js';

const JWT_SECRET = process.env.JWT_SECRET ?? 'biocross-dev-secret-change-me';
const PORT = Number(process.env.PORT ?? 3001);

const app = Fastify({ logger: true });
await app.register(cors, { origin: true });

function authUser(req: { headers: { authorization?: string } }) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) return null;
  try {
    const payload = jwt.verify(header.slice(7), JWT_SECRET) as { sub: string };
    return store.getUser(payload.sub);
  } catch {
    return null;
  }
}

app.get('/health', async () => ({ ok: true, service: 'biocross-api' }));

app.post<{ Body: { email: string; password: string } }>('/auth/sign-in', async (req, reply) => {
  const user = store.findUserByEmail(req.body.email);
  if (!user || !verifyPassword(req.body.password, user.passwordHash)) {
    return reply.code(401).send({ message: 'Invalid email or password.' });
  }
  const tokens = store.createSession(user.id);
  const accessToken = jwt.sign({ sub: user.id }, JWT_SECRET, { expiresIn: '7d' });
  return { data: { user: store.publicUser(user), tokens: { ...tokens, accessToken, expiresIn: 604800 } } };
});

app.post<{ Body: { email: string; password: string; fullName: string } }>('/auth/sign-up', async (req, reply) => {
  if (store.findUserByEmail(req.body.email)) {
    return reply.code(409).send({ message: 'An account with this email already exists.' });
  }
  const user = store.createUser(req.body.email, req.body.fullName, hashPassword(req.body.password));
  const accessToken = jwt.sign({ sub: user.id }, JWT_SECRET, { expiresIn: '7d' });
  const tokens = store.createSession(user.id);
  return { data: { user: store.publicUser(user), tokens: { ...tokens, accessToken, expiresIn: 604800 } } };
});

app.post('/auth/sign-out', async (req, reply) => {
  if (!authUser(req)) return reply.code(401).send({ message: 'Unauthorized' });
  return { data: { ok: true } };
});

app.get('/auth/me', async (req, reply) => {
  const user = authUser(req);
  if (!user) return reply.code(401).send({ message: 'Unauthorized' });
  return { data: store.publicUser(user) };
});

app.get('/profile', async (req, reply) => {
  const user = authUser(req);
  if (!user) return reply.code(401).send({ message: 'Unauthorized' });
  return { data: store.getProfile(user.id) };
});

app.listen({ port: PORT, host: '0.0.0.0' }).then(() => {
  app.log.info(`BioCross API listening on http://localhost:${PORT}`);
});
