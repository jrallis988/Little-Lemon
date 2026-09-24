import { Router } from 'express';
import { z } from 'zod';

import { googleOAuthConfigured, verifyGoogleIdToken } from '../auth/google.js';
import { hashPassword, verifyPassword } from '../auth/password.js';
import { createResetToken, signAccessToken } from '../auth/tokens.js';
import { mailConfigured, sendPasswordResetEmail } from '../mail/mailer.js';
import { requireAuth, type AuthedRequest } from '../middleware/auth.js';
import {
  consumePasswordReset,
  createUser,
  findUserByEmail,
  findUserById,
  findUserByOAuth,
  isPostgresMode,
  savePasswordReset,
  updateUserPassword,
  type AppUser,
} from '../users/repo.js';

export const authRouter = Router();

function toPublicUser(user: AppUser) {
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

authRouter.post('/sign-up', async (req, res) => {
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

  try {
    if (await findUserByEmail(email)) {
      res.status(409).json({ error: 'An account with that email already exists.' });
      return;
    }
    const user = await createUser({
      email,
      passwordHash: hashPassword(parsed.data.password),
      displayName,
      username: parsed.data.username?.trim(),
    });
    res.status(201).json({ user: toPublicUser(user), accessToken: signAccessToken(user) });
  } catch (error) {
    console.error(error);
    res.status(503).json({
      error: isPostgresMode()
        ? 'Auth database unavailable. Check DATABASE_URL and migrations.'
        : 'Unable to create account.',
    });
  }
});

authRouter.post('/sign-in', async (req, res) => {
  const parsed = credentialsSchema.pick({ email: true, password: true }).safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: 'Email and password are required.' });
    return;
  }
  try {
    const email = parsed.data.email.trim().toLowerCase();
    const user = await findUserByEmail(email);
    if (
      !user ||
      !user.passwordHash ||
      !verifyPassword(parsed.data.password, user.passwordHash)
    ) {
      res.status(401).json({ error: 'Invalid email or password.' });
      return;
    }
    res.json({ user: toPublicUser(user), accessToken: signAccessToken(user) });
  } catch (error) {
    console.error(error);
    res.status(503).json({ error: 'Auth database unavailable.' });
  }
});

authRouter.post('/forgot-password', async (req, res) => {
  const email = String(req.body?.email ?? '')
    .trim()
    .toLowerCase();
  if (!email) {
    res.status(400).json({ error: 'Email is required.' });
    return;
  }

  const generic = {
    ok: true,
    message: 'If that email exists, a reset code was issued.',
  };

  try {
    const user = await findUserByEmail(email);
    if (!user) {
      res.json(generic);
      return;
    }

    const token = createResetToken();
    await savePasswordReset(email, token, new Date(Date.now() + 1000 * 60 * 30));
    const mail = await sendPasswordResetEmail({ to: email, token });

    const revealToken =
      process.env.REVEAL_RESET_TOKEN === 'true' ||
      (process.env.NODE_ENV !== 'production' && !mail.sent);

    res.json({
      ...generic,
      emailed: mail.sent,
      ...(revealToken
        ? { resetToken: token, expiresInMinutes: 30 }
        : { expiresInMinutes: 30 }),
    });
  } catch (error) {
    console.error(error);
    res.json(generic);
  }
});

authRouter.post('/reset-password', async (req, res) => {
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
  try {
    const email = parsed.data.email.trim().toLowerCase();
    const ok = await consumePasswordReset(email, parsed.data.token);
    if (!ok) {
      res.status(400).json({ error: 'Invalid or expired reset token.' });
      return;
    }
    const updated = await updateUserPassword(email, hashPassword(parsed.data.password));
    if (!updated) {
      res.status(404).json({ error: 'User not found.' });
      return;
    }
    res.json({ ok: true, message: 'Password updated.' });
  } catch (error) {
    console.error(error);
    res.status(503).json({ error: 'Auth database unavailable.' });
  }
});

authRouter.post('/oauth/google', async (req, res) => {
  if (!googleOAuthConfigured()) {
    res.status(503).json({
      error: 'Google OAuth is not configured. Set GOOGLE_CLIENT_ID on the API.',
    });
    return;
  }
  const parsed = z.object({ idToken: z.string().min(20) }).safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: 'Google idToken is required.' });
    return;
  }

  try {
    const profile = await verifyGoogleIdToken(parsed.data.idToken);
    let user =
      (await findUserByOAuth('google', profile.sub)) ??
      (await findUserByEmail(profile.email));

    if (!user) {
      user = await createUser({
        email: profile.email,
        passwordHash: null,
        displayName: profile.name?.trim() || profile.email.split('@')[0],
        oauthProvider: 'google',
        oauthSub: profile.sub,
      });
    } else if (!user.oauthProvider) {
      // Link Google to an existing email account on first OAuth sign-in.
      if (isPostgresMode()) {
        const { query } = await import('../db.js');
        await query(
          `
          UPDATE users
          SET oauth_provider = 'google', oauth_sub = $2, updated_at = NOW()
          WHERE id = $1
          `,
          [user.id, profile.sub],
        );
        user = (await findUserById(user.id)) ?? user;
      } else {
        user.oauthProvider = 'google';
        user.oauthSub = profile.sub;
      }
    }

    res.json({ user: toPublicUser(user), accessToken: signAccessToken(user) });
  } catch (error) {
    console.error(error);
    res.status(401).json({
      error: error instanceof Error ? error.message : 'Google sign-in failed.',
    });
  }
});

authRouter.get('/me', requireAuth, async (req: AuthedRequest, res) => {
  try {
    const user = await findUserById(req.userId!);
    if (!user) {
      res.status(401).json({ error: 'User not found' });
      return;
    }
    res.json(toPublicUser(user));
  } catch (error) {
    console.error(error);
    res.status(503).json({ error: 'Auth database unavailable.' });
  }
});

authRouter.get('/providers', (_req, res) => {
  res.json({
    password: true,
    google: googleOAuthConfigured(),
    emailReset: mailConfigured(),
    storage: isPostgresMode() ? 'postgres' : 'memory',
  });
});
