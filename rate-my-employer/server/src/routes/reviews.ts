import { Router } from 'express';
import { z } from 'zod';

import { query } from '../db.js';
import { addMemoryInterview, addMemoryReview, store, updateMemoryReview } from '../store.js';
import { isPostgresMode } from '../users/repo.js';

export const reviewsRouter = Router();
export const interviewsRouter = Router();

const uuidRe =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function looksLikeUuid(value: string | null | undefined) {
  return Boolean(value && uuidRe.test(value));
}

const reviewSchema = z.object({
  companyId: z.string().min(1),
  workplaceId: z.string().nullable().optional(),
  title: z.string().min(1),
  body: z.string().min(1),
  role: z.string().min(1),
  department: z.string().optional(),
  employmentStatus: z.enum(['current', 'former']),
  employmentType: z
    .enum(['full_time', 'part_time', 'contract', 'intern', 'freelance'])
    .optional(),
  wouldRecommend: z.boolean(),
  scores: z.object({
    overall: z.number().min(1).max(5),
    culture: z.number().min(0).max(5),
    pay: z.number().min(0).max(5),
    management: z.number().min(0).max(5),
    workLife: z.number().min(0).max(5),
    careerGrowth: z.number().min(0).max(5),
  }),
  tagIds: z.array(z.string()).optional(),
  isAnonymous: z.boolean().optional(),
  authorName: z.string().optional(),
  userId: z.string().optional(),
});

const interviewSchema = z.object({
  companyId: z.string().min(1),
  workplaceId: z.string().nullable().optional(),
  role: z.string().min(1),
  rating: z.number().min(1).max(5),
  outcome: z.enum(['positive', 'neutral', 'negative']),
  body: z.string().min(1),
  questions: z.array(z.string()).default([]),
  authorName: z.string().optional(),
  userId: z.string().optional(),
});

function mapPgReview(row: Record<string, unknown>) {
  return {
    id: String(row.id),
    companyId: String(row.company_id),
    workplaceId: row.workplace_id ? String(row.workplace_id) : null,
    userId: String(row.user_id),
    authorName: String(row.author_name),
    title: String(row.title),
    body: String(row.body),
    role: String(row.role),
    department: row.department ? String(row.department) : undefined,
    employmentStatus: row.employment_status,
    employmentType: row.employment_type ?? undefined,
    wouldRecommend: Boolean(row.would_recommend),
    scores: {
      overall: Number(row.score_overall),
      culture: Number(row.score_culture),
      pay: Number(row.score_pay),
      management: Number(row.score_management),
      workLife: Number(row.score_work_life),
      careerGrowth: row.score_career_growth == null ? 0 : Number(row.score_career_growth),
    },
    isAnonymous: Boolean(row.is_anonymous),
    helpfulCount: Number(row.helpful_count ?? 0),
    createdAt: new Date(String(row.created_at)).toISOString(),
    updatedAt: row.updated_at
      ? new Date(String(row.updated_at)).toISOString()
      : undefined,
  };
}

function mapPgInterview(row: Record<string, unknown>) {
  return {
    id: String(row.id),
    companyId: String(row.company_id),
    workplaceId: row.workplace_id ? String(row.workplace_id) : null,
    userId: String(row.user_id),
    authorName: String(row.author_name),
    role: String(row.role),
    rating: Number(row.rating),
    outcome: row.outcome,
    body: String(row.body),
    questions: Array.isArray(row.questions) ? row.questions : [],
    helpfulCount: Number(row.helpful_count ?? 0),
    createdAt: new Date(String(row.created_at)).toISOString(),
  };
}

reviewsRouter.get('/:id', async (req, res) => {
  if (isPostgresMode() && looksLikeUuid(req.params.id)) {
    try {
      const result = await query(`SELECT * FROM reviews WHERE id = $1`, [req.params.id]);
      if (result.rows[0]) {
        res.json(mapPgReview(result.rows[0]));
        return;
      }
    } catch (error) {
      console.error(error);
    }
  }
  const review = store.reviews.find((item) => item.id === req.params.id);
  if (!review) {
    res.status(404).json({ error: 'Review not found' });
    return;
  }
  res.json(review);
});

reviewsRouter.post('/', async (req, res) => {
  const parsed = reviewSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }
  const input = parsed.data;
  const now = new Date().toISOString();
  const authorName = input.isAnonymous ? 'Anonymous' : input.authorName ?? 'RME User';
  const userId = input.userId ?? 'api-user';

  if (isPostgresMode() && looksLikeUuid(input.companyId) && looksLikeUuid(userId)) {
    try {
      const result = await query(
        `
        INSERT INTO reviews (
          company_id, workplace_id, user_id, author_name, title, body, role, department,
          employment_status, employment_type, would_recommend,
          score_overall, score_culture, score_pay, score_management, score_work_life, score_career_growth,
          is_anonymous
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8,
          $9, $10, $11,
          $12, $13, $14, $15, $16, $17,
          $18
        )
        RETURNING *
        `,
        [
          input.companyId,
          looksLikeUuid(input.workplaceId) ? input.workplaceId : null,
          userId,
          authorName,
          input.title,
          input.body,
          input.role,
          input.department ?? null,
          input.employmentStatus,
          input.employmentType ?? null,
          input.wouldRecommend,
          input.scores.overall,
          input.scores.culture,
          input.scores.pay,
          input.scores.management,
          input.scores.workLife,
          input.scores.careerGrowth,
          Boolean(input.isAnonymous),
        ],
      );
      res.status(201).json(mapPgReview(result.rows[0]));
      return;
    } catch (error) {
      console.error(error);
      // Fall through to memory for dual-write / seed-id clients.
    }
  }

  const review = addMemoryReview({
    id: `rev-${Date.now()}`,
    companyId: input.companyId,
    workplaceId: input.workplaceId ?? null,
    userId,
    authorName,
    title: input.title,
    body: input.body,
    role: input.role,
    department: input.department,
    employmentStatus: input.employmentStatus,
    employmentType: input.employmentType,
    wouldRecommend: input.wouldRecommend,
    scores: input.scores,
    tagIds: input.tagIds,
    isAnonymous: input.isAnonymous,
    helpfulCount: 0,
    createdAt: now,
  });
  res.status(201).json(review);
});

reviewsRouter.patch('/:id', async (req, res) => {
  const parsed = reviewSchema.partial().safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }
  if (isPostgresMode() && looksLikeUuid(req.params.id)) {
    try {
      const patch = parsed.data;
      const result = await query(
        `
        UPDATE reviews SET
          title = COALESCE($2, title),
          body = COALESCE($3, body),
          role = COALESCE($4, role),
          would_recommend = COALESCE($5, would_recommend),
          score_overall = COALESCE($6, score_overall),
          score_culture = COALESCE($7, score_culture),
          score_pay = COALESCE($8, score_pay),
          score_management = COALESCE($9, score_management),
          score_work_life = COALESCE($10, score_work_life),
          score_career_growth = COALESCE($11, score_career_growth),
          updated_at = NOW()
        WHERE id = $1
        RETURNING *
        `,
        [
          req.params.id,
          patch.title ?? null,
          patch.body ?? null,
          patch.role ?? null,
          patch.wouldRecommend ?? null,
          patch.scores?.overall ?? null,
          patch.scores?.culture ?? null,
          patch.scores?.pay ?? null,
          patch.scores?.management ?? null,
          patch.scores?.workLife ?? null,
          patch.scores?.careerGrowth ?? null,
        ],
      );
      if (result.rows[0]) {
        res.json(mapPgReview(result.rows[0]));
        return;
      }
    } catch (error) {
      console.error(error);
    }
  }
  const updated = updateMemoryReview(req.params.id, parsed.data);
  if (!updated) {
    res.status(404).json({ error: 'Review not found' });
    return;
  }
  res.json(updated);
});

interviewsRouter.get('/:id', async (req, res) => {
  if (isPostgresMode() && looksLikeUuid(req.params.id)) {
    try {
      const result = await query(`SELECT * FROM interviews WHERE id = $1`, [req.params.id]);
      if (result.rows[0]) {
        res.json(mapPgInterview(result.rows[0]));
        return;
      }
    } catch (error) {
      console.error(error);
    }
  }
  const interview = store.interviews.find((item) => item.id === req.params.id);
  if (!interview) {
    res.status(404).json({ error: 'Interview not found' });
    return;
  }
  res.json(interview);
});

interviewsRouter.post('/', async (req, res) => {
  const parsed = interviewSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }
  const input = parsed.data;
  const userId = input.userId ?? 'api-user';
  const authorName = input.authorName ?? 'RME User';

  if (isPostgresMode() && looksLikeUuid(input.companyId) && looksLikeUuid(userId)) {
    try {
      const result = await query(
        `
        INSERT INTO interviews (
          company_id, workplace_id, user_id, author_name, role, rating, outcome, body, questions
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9::jsonb)
        RETURNING *
        `,
        [
          input.companyId,
          looksLikeUuid(input.workplaceId) ? input.workplaceId : null,
          userId,
          authorName,
          input.role,
          input.rating,
          input.outcome,
          input.body,
          JSON.stringify(input.questions),
        ],
      );
      res.status(201).json(mapPgInterview(result.rows[0]));
      return;
    } catch (error) {
      console.error(error);
    }
  }

  const interview = addMemoryInterview({
    id: `int-${Date.now()}`,
    companyId: input.companyId,
    workplaceId: input.workplaceId ?? null,
    userId,
    authorName,
    role: input.role,
    rating: input.rating,
    outcome: input.outcome,
    body: input.body,
    questions: input.questions,
    helpfulCount: 0,
    createdAt: new Date().toISOString(),
  });
  res.status(201).json(interview);
});

export { mapPgReview, mapPgInterview };
