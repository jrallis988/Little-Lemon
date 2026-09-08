import { Router } from 'express';

import { query } from '../db.js';
import {
  findMemoryCompany,
  listMemoryInterviews,
  listMemoryReviews,
  listMemoryWorkplaces,
  searchMemoryCompanies,
} from '../store.js';

export const companiesRouter = Router();

companiesRouter.get('/', async (req, res) => {
  const q = String(req.query.q ?? '').trim();
  const page = Math.max(1, Number(req.query.page ?? 1));
  const pageSize = Math.min(50, Math.max(1, Number(req.query.pageSize ?? 20)));

  if (!process.env.DATABASE_URL) {
    res.json(searchMemoryCompanies(q, page, pageSize));
    return;
  }

  const offset = (page - 1) * pageSize;

  try {
    const result = await query(
      `
      SELECT id, name, slug, industry, location, headquarters, size, website,
             logo_url AS "logoUrl", summary, founded_year AS "foundedYear",
             created_at AS "createdAt", updated_at AS "updatedAt"
      FROM companies
      WHERE ($1 = '' OR name ILIKE '%' || $1 || '%' OR industry ILIKE '%' || $1 || '%' OR location ILIKE '%' || $1 || '%')
      ORDER BY name ASC
      LIMIT $2 OFFSET $3
      `,
      [q, pageSize, offset],
    );

    const count = await query<{ count: string }>(
      `
      SELECT COUNT(*)::text AS count
      FROM companies
      WHERE ($1 = '' OR name ILIKE '%' || $1 || '%' OR industry ILIKE '%' || $1 || '%' OR location ILIKE '%' || $1 || '%')
      `,
      [q],
    );

    res.json({
      data: result.rows,
      page,
      pageSize,
      total: Number(count.rows[0]?.count ?? 0),
    });
  } catch (error) {
    console.error(error);
    res.json(searchMemoryCompanies(q, page, pageSize));
  }
});

companiesRouter.get('/:idOrSlug/workplaces', async (req, res) => {
  const match = findMemoryCompany(req.params.idOrSlug);
  if (!process.env.DATABASE_URL) {
    if (!match) {
      res.status(404).json({ error: 'Company not found' });
      return;
    }
    res.json({ data: listMemoryWorkplaces(match.id) });
    return;
  }

  try {
    const row = await query(
      `SELECT id FROM companies WHERE id::text = $1 OR slug = $1 LIMIT 1`,
      [req.params.idOrSlug],
    );
    if (!row.rows[0]) {
      res.status(404).json({ error: 'Company not found' });
      return;
    }
    const workplaces = await query(
      `
      SELECT id, company_id AS "companyId", name, store_code AS "storeCode",
             address, city, state, zip,
             is_remote_or_corporate AS "isRemoteOrCorporate", summary
      FROM workplaces WHERE company_id = $1 ORDER BY name ASC
      `,
      [row.rows[0].id],
    );
    res.json({ data: workplaces.rows });
  } catch (error) {
    console.error(error);
    if (!match) {
      res.status(503).json({ error: 'Database unavailable' });
      return;
    }
    res.json({ data: listMemoryWorkplaces(match.id) });
  }
});

companiesRouter.get('/:idOrSlug/reviews', async (req, res) => {
  const workplaceId = req.query.workplaceId ? String(req.query.workplaceId) : null;
  const match = findMemoryCompany(req.params.idOrSlug);
  if (!match) {
    res.status(404).json({ error: 'Company not found' });
    return;
  }
  res.json({ data: listMemoryReviews(match.id, workplaceId) });
});

companiesRouter.get('/:idOrSlug/interviews', async (req, res) => {
  const workplaceId = req.query.workplaceId ? String(req.query.workplaceId) : null;
  const match = findMemoryCompany(req.params.idOrSlug);
  if (!match) {
    res.status(404).json({ error: 'Company not found' });
    return;
  }
  res.json({ data: listMemoryInterviews(match.id, workplaceId) });
});

companiesRouter.get('/:idOrSlug', async (req, res) => {
  const idOrSlug = req.params.idOrSlug;

  if (!process.env.DATABASE_URL) {
    const company = findMemoryCompany(idOrSlug);
    if (!company) {
      res.status(404).json({ error: 'Company not found' });
      return;
    }
    res.json({
      ...company,
      workplaces: listMemoryWorkplaces(company.id),
      reviews: listMemoryReviews(company.id),
      interviews: listMemoryInterviews(company.id),
    });
    return;
  }

  try {
    const company = await query(
      `
      SELECT id, name, slug, industry, location, headquarters, size, website,
             logo_url AS "logoUrl", summary, founded_year AS "foundedYear",
             created_at AS "createdAt", updated_at AS "updatedAt"
      FROM companies
      WHERE id::text = $1 OR slug = $1
      LIMIT 1
      `,
      [idOrSlug],
    );

    if (!company.rows[0]) {
      res.status(404).json({ error: 'Company not found' });
      return;
    }

    const workplaces = await query(
      `
      SELECT id, company_id AS "companyId", name, store_code AS "storeCode",
             address, city, state, zip,
             is_remote_or_corporate AS "isRemoteOrCorporate", summary
      FROM workplaces
      WHERE company_id = $1
      ORDER BY name ASC
      `,
      [company.rows[0].id],
    ).catch(() => ({ rows: [] as unknown[] }));

    res.json({ ...company.rows[0], workplaces: workplaces.rows });
  } catch (error) {
    console.error(error);
    const company = findMemoryCompany(idOrSlug);
    if (!company) {
      res.status(503).json({ error: 'Database unavailable' });
      return;
    }
    res.json({
      ...company,
      workplaces: listMemoryWorkplaces(company.id),
      reviews: listMemoryReviews(company.id),
      interviews: listMemoryInterviews(company.id),
    });
  }
});
