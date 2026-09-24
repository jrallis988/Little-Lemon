import 'dotenv/config';
import cors from 'cors';
import express from 'express';

import { authRouter } from './routes/auth.js';
import { companiesRouter } from './routes/companies.js';
import { healthRouter } from './routes/health.js';
import { interviewsRouter, reviewsRouter } from './routes/reviews.js';
import { workplacesRouter } from './routes/workplaces.js';

export function createApp() {
  const app = express();
  const mode = process.env.DATABASE_URL ? 'postgres' : 'memory';

  app.use(cors());
  app.use(express.json());

  app.use(healthRouter);
  app.use('/api/auth', authRouter);
  app.use('/api/companies', companiesRouter);
  app.use('/api/workplaces', workplacesRouter);
  app.use('/api/reviews', reviewsRouter);
  app.use('/api/interviews', interviewsRouter);

  app.get('/', (_req, res) => {
    res.json({
      name: 'Rate My Employer API',
      mode,
      docs: {
        health: '/health',
        authSignUp: 'POST /api/auth/sign-up',
        authSignIn: 'POST /api/auth/sign-in',
        authForgot: 'POST /api/auth/forgot-password',
        authReset: 'POST /api/auth/reset-password',
        authGoogle: 'POST /api/auth/oauth/google',
        authProviders: 'GET /api/auth/providers',
        authMe: 'GET /api/auth/me',
        companies: '/api/companies?q=',
        company: '/api/companies/:idOrSlug',
        workplaces: '/api/workplaces?companyId=',
        workplace: '/api/workplaces/:id',
        companyReviews: '/api/companies/:idOrSlug/reviews',
        companyInterviews: '/api/companies/:idOrSlug/interviews',
        createReview: 'POST /api/reviews',
        createInterview: 'POST /api/interviews',
      },
    });
  });

  return app;
}

const app = createApp();
const port = Number(process.env.PORT ?? 4000);
const mode = process.env.DATABASE_URL ? 'postgres' : 'memory';

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Rate My Employer API (${mode}) listening on http://localhost:${port}`);
  });
}

export default app;
