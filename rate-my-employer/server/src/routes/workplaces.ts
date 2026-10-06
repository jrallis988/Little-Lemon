import { Router } from 'express';

import { query } from '../db.js';
import {
  findMemoryCompany,
  findMemoryWorkplace,
  listMemoryWorkplaces,
} from '../store.js';

export const workplacesRouter = Router();

workplacesRouter.get('/:id', async (req, res) => {
  const id = req.params.id;

  if (!process.env.DATABASE_URL) {
    const workplace = findMemoryWorkplace(id);
    if (!workplace) {
      res.status(404).json({ error: 'Workplace not found' });
      return;
    }
    const company = findMemoryCompany(workplace.companyId);
    res.json({ ...workplace, company });
    return;
  }

  try {
    const result = await query(
      `
      SELECT id, company_id AS "companyId", name, store_code AS "storeCode",
             address, city, state, zip,
             is_remote_or_corporate AS "isRemoteOrCorporate", summary
      FROM workplaces
      WHERE id::text = $1
      LIMIT 1
      `,
      [id],
    );
    if (!result.rows[0]) {
      res.status(404).json({ error: 'Workplace not found' });
      return;
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    const workplace = findMemoryWorkplace(id);
    if (!workplace) {
      res.status(503).json({ error: 'Database unavailable' });
      return;
    }
    res.json({ ...workplace, company: findMemoryCompany(workplace.companyId) });
  }
});

workplacesRouter.get('/', async (req, res) => {
  const companyId = String(req.query.companyId ?? '').trim();
  if (!companyId) {
    res.status(400).json({ error: 'companyId query param is required' });
    return;
  }

  if (!process.env.DATABASE_URL) {
    const company = findMemoryCompany(companyId);
    if (!company) {
      res.status(404).json({ error: 'Company not found' });
      return;
    }
    res.json({ data: listMemoryWorkplaces(company.id) });
    return;
  }

  try {
    const result = await query(
      `
      SELECT id, company_id AS "companyId", name, store_code AS "storeCode",
             address, city, state, zip,
             is_remote_or_corporate AS "isRemoteOrCorporate", summary
      FROM workplaces
      WHERE company_id::text = $1 OR company_id = (SELECT id FROM companies WHERE slug = $1 LIMIT 1)
      ORDER BY name ASC
      `,
      [companyId],
    );
    res.json({ data: result.rows });
  } catch (error) {
    console.error(error);
    const company = findMemoryCompany(companyId);
    if (!company) {
      res.status(503).json({ error: 'Database unavailable' });
      return;
    }
    res.json({ data: listMemoryWorkplaces(company.id) });
  }
});
