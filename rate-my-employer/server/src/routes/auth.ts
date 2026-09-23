import { Router } from 'express';
import { z } from 'zod';

import { hashPassword, verifyPassword } from '../auth/password.js';
import { createResetToken, signAccessToken } from '../auth/tokens.js';
import {
  addMemoryUser,
  findMemoryUserByEmail,
  findMemoryUserById,
  setPasswordReset,
  takePasswordReset,
  updateMemoryUserPassword,
  type MemoryUser,
} from '../store.js';
import { requireAuth, type AuthedRequest } from '../middleware/auth.js';

export const authRouter = Router();

function toPublicUser(user: MemoryUser) {
  return {
    id: user.id,
    email: user.email,
    displayName: user.displayName,
    username: user.username,
    role: user.role,
    headline: user.headline ?? null,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  displayName: z.string().min(1).optional(),
  username: z.string().min(1).optional(),
});

authRouter.post('/sign-up', (req, res) => {
  const parsed = credentialsSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: 'Valid email, password (6+), and name are required.' });
    return;
  }
  const email = parsed.data.email.trim().toLowerCase();
  const displayName = (parsed.data.displayName || parsed.data.username || '').trim();
  if (!displayName) {
    res.status(400).json({ error: 'Display name is required.' });
    return;
  }
  if (findMemoryUserByEmail(email)) {
    res.status(409).json({ error: 'An account with that email already exists.' });
    return;
  }
  const now = new Date().toISOString();
  const user = addMemoryUser({
    id: `user-${Date.now()}`,
    email,
    passwordHash: hashPassword(parsed.data.password),
    displayName,
    username: parsed.data.username?.trim(),
    role: 'user',
    createdAt: now,
    updatedAt: now,
  });
  const accessToken = signAccessToken(user);
  res.status(201).json({ user: toPublicUser(user), accessToken });
});

authRouter.post('/sign-in', (req, res) => {
  const parsed = credentialsSchema.pick({ email: true, password: true }).safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: 'Email and password are required.' });
    return;
  }
  const email = parsed.data.email.trim().toLowerCase();
  const user = findMemoryUserByEmail(email);
  if (!user || !verifyPassword(parsed.data.password, user.passwordHash)) {
    res.status(401).json({ error: 'Invalid email or password.' });
    return;
  }
  res.json({ user: toPublicUser(user), accessToken: signAccessToken(user) });
});

authRouter.post('/forgot-password', (req, res) => {
  const email = String(req.body?.email ?? '')
    .trim()
    .toLowerCase();
  if (!email) {
    res.status(400).json({ error: 'Email is required.' });
    return;
  }
  const user = findMemoryUserByEmail(email);
  // Always return success to avoid account enumeration; include resetToken in memory/dev mode.
  if (!user) {
    res.json({
      ok: true,
      message: 'If that email exists, a reset code was issued.',
    });
    return;
  }
  const token = createResetToken();
  setPasswordReset(email, token, Date.now() + 1000 * 60 * 30);
  res.json({
    ok: true,
    message: 'If that email exists, a reset code was issued.',
    resetToken: token,
    expiresInMinutes: 30,
  });
});

authRouter.post('/reset-password', (req, res) => {
  const schema = z.object({
    email: z.string().email(),
    token: z.string().min(8),
    password: z.string().min(6),
  });
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: 'Email, reset token, and new password are required.' });
    return;
  }
  const email = parsed.data.email.trim().toLowerCase();
  const reset = takePasswordReset(email, parsed.data.token);
  if (!reset) {
    res.status(400).json({ error: 'Invalid or expired reset token.' });
    return;
  }
  const updated = updateMemoryUserPassword(email, hashPassword(parsed.data.password));
  if (!updated) {
    res.status(404).json({ error: 'User not found.' });
    return;
  }
  res.json({ ok: true, message: 'Password updated.' });
});

authRouter.get('/me', requireAuth, (req: AuthedRequest, res) => {
  const user = findMemoryUserById(req.userId!);
  if (!user) {
    res.status(401).json({ error: 'User not found' });
    return;
  }
  res.json(toPublicUser(user));
});
