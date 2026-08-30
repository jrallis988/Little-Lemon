import { Router } from 'express';

import { query } from '../db.js';

export const companiesRouter = Router();

companiesRouter.get('/', async (req, res) => {
  const q = String(req.query.q ?? '').trim();
  const page = Math.max(1, Number(req.query.page ?? 1));
  const pageSize = Math.min(50, Math.max(1, Number(req.query.pageSize ?? 20)));
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
    res.status(503).json({
      error: 'Database unavailable. Set DATABASE_URL and run db/schema.sql.',
    });
  }
});

companiesRouter.get('/:idOrSlug', async (req, res) => {
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
      [req.params.idOrSlug],
    );

    if (!company.rows[0]) {
      res.status(404).json({ error: 'Company not found' });
      return;
    }

    res.json(company.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(503).json({ error: 'Database unavailable' });
  }
});
