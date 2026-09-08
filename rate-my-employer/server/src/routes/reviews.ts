import { Router } from 'express';
import { z } from 'zod';

import { addMemoryInterview, addMemoryReview, store, updateMemoryReview } from '../store.js';

export const reviewsRouter = Router();
export const interviewsRouter = Router();

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

reviewsRouter.get('/:id', (req, res) => {
  const review = store.reviews.find((item) => item.id === req.params.id);
  if (!review) {
    res.status(404).json({ error: 'Review not found' });
    return;
  }
  res.json(review);
});

reviewsRouter.post('/', (req, res) => {
  const parsed = reviewSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }
  const input = parsed.data;
  const now = new Date().toISOString();
  const review = addMemoryReview({
    id: `rev-${Date.now()}`,
    companyId: input.companyId,
    workplaceId: input.workplaceId ?? null,
    userId: input.userId ?? 'api-user',
    authorName: input.isAnonymous ? 'Anonymous' : input.authorName ?? 'RME User',
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

reviewsRouter.patch('/:id', (req, res) => {
  const parsed = reviewSchema.partial().safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }
  const updated = updateMemoryReview(req.params.id, parsed.data);
  if (!updated) {
    res.status(404).json({ error: 'Review not found' });
    return;
  }
  res.json(updated);
});

interviewsRouter.get('/:id', (req, res) => {
  const interview = store.interviews.find((item) => item.id === req.params.id);
  if (!interview) {
    res.status(404).json({ error: 'Interview not found' });
    return;
  }
  res.json(interview);
});

interviewsRouter.post('/', (req, res) => {
  const parsed = interviewSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }
  const input = parsed.data;
  const interview = addMemoryInterview({
    id: `int-${Date.now()}`,
    companyId: input.companyId,
    workplaceId: input.workplaceId ?? null,
    userId: input.userId ?? 'api-user',
    authorName: input.authorName ?? 'RME User',
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
