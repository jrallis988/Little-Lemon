import 'dotenv/config';
import cors from 'cors';
import express from 'express';

import { companiesRouter } from './routes/companies.js';
import { healthRouter } from './routes/health.js';
import { interviewsRouter, reviewsRouter } from './routes/reviews.js';
import { workplacesRouter } from './routes/workplaces.js';

const app = express();
const port = Number(process.env.PORT ?? 4000);
const mode = process.env.DATABASE_URL ? 'postgres' : 'memory';

app.use(cors());
app.use(express.json());

app.use(healthRouter);
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

app.listen(port, () => {
  console.log(`Rate My Employer API (${mode}) listening on http://localhost:${port}`);
});
