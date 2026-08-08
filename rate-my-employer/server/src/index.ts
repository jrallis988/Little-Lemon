import 'dotenv/config';
import cors from 'cors';
import express from 'express';

import { companiesRouter } from './routes/companies.js';
import { healthRouter } from './routes/health.js';

const app = express();
const port = Number(process.env.PORT ?? 4000);

app.use(cors());
app.use(express.json());

app.use(healthRouter);
app.use('/api/companies', companiesRouter);

app.get('/', (_req, res) => {
  res.json({
    name: 'Rate My Employer API',
    docs: {
      health: '/health',
      companies: '/api/companies?q=',
    },
  });
});

app.listen(port, () => {
  console.log(`Rate My Employer API listening on http://localhost:${port}`);
});
