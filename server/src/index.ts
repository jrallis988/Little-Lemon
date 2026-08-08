import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import { z } from 'zod';
import { getProvider, listProviders } from './providers/registry.js';
import type { ProviderId } from './providers/types.js';

const app = express();
const port = Number(process.env.PORT ?? 8787);

app.use(cors());
app.use(express.json({ limit: '1mb' }));

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    service: 'working-intelligence-api',
    providers: listProviders(),
  });
});

const chatSchema = z.object({
  provider: z
    .enum(['openai', 'anthropic', 'gemini', 'grok', 'ollama', 'demo'])
    .default('demo'),
  model: z.string().optional(),
  systemPrompt: z.string().min(1),
  messages: z
    .array(
      z.object({
        role: z.enum(['user', 'assistant', 'system']),
        content: z.string(),
      }),
    )
    .default([]),
  employee: z
    .object({
      id: z.string(),
      name: z.string(),
      jobTitle: z.string(),
      department: z.string(),
      personality: z.string().optional(),
      responsibilities: z.array(z.string()).optional(),
      knowledgeBase: z.array(z.string()).optional(),
    })
    .optional(),
});

app.post('/api/chat/stream', async (req, res) => {
  const parsed = chatSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }

  const { provider, model, systemPrompt, messages, employee } = parsed.data;
  const enrichedPrompt = [
    systemPrompt,
    employee
      ? `\nEmployee context:\n- Name: ${employee.name}\n- Title: ${employee.jobTitle}\n- Department: ${employee.department}\n- Responsibilities: ${(employee.responsibilities ?? []).join(', ')}\n- Knowledge: ${(employee.knowledgeBase ?? []).join('; ')}`
      : '',
  ]
    .filter(Boolean)
    .join('\n');

  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Transfer-Encoding', 'chunked');
  res.setHeader('Cache-Control', 'no-cache');
  res.flushHeaders?.();

  const controller = new AbortController();
  req.on('close', () => controller.abort());

  try {
    const ai = getProvider(provider as ProviderId);
    for await (const token of ai.streamCompletion({
      systemPrompt: enrichedPrompt,
      messages,
      model,
      signal: controller.signal,
    })) {
      res.write(token);
    }
    res.end();
  } catch (error) {
    if (!res.headersSent) {
      res.status(500).json({ error: (error as Error).message });
      return;
    }
    res.write(`\n\n[error] ${(error as Error).message}`);
    res.end();
  }
});

app.listen(port, () => {
  console.log(`Working Intelligence API listening on http://localhost:${port}`);
});
