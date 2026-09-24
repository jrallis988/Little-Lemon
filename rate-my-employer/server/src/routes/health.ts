import { Router } from 'express';

import { googleOAuthConfigured } from '../auth/google.js';
import { pool } from '../db.js';
import { mailConfigured } from '../mail/mailer.js';
import { isPostgresMode } from '../users/repo.js';

export const healthRouter = Router();

healthRouter.get('/health', async (_req, res) => {
  let dbOk: boolean | null = null;
  if (pool) {
    try {
      await pool.query('SELECT 1');
      dbOk = true;
    } catch {
      dbOk = false;
    }
  }

  res.json({
    ok: dbOk !== false,
    service: 'rate-my-employer-api',
    mode: isPostgresMode() ? 'postgres' : 'memory',
    database: {
      configured: Boolean(process.env.DATABASE_URL),
      reachable: dbOk,
    },
    auth: {
      storage: isPostgresMode() ? 'postgres' : 'memory',
      googleOAuth: googleOAuthConfigured(),
      emailReset: mailConfigured(),
    },
    time: new Date().toISOString(),
  });
});
