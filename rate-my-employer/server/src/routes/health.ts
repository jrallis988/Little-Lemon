import { Router } from 'express';

export const healthRouter = Router();

healthRouter.get('/health', (_req, res) => {
  res.json({
    ok: true,
    service: 'rate-my-employer-api',
    mode: process.env.DATABASE_URL ? 'postgres' : 'memory',
    time: new Date().toISOString(),
  });
});
