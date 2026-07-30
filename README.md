# Morgan Bright

Academic software sales website for classrooms, schools, and districts.

## Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS

## Pages

- `/` — sales homepage
- `/features` — platform features
- `/plans` — Classroom / School / District plans
- `/demo` — demo and pricing request forms
- `/about` — company positioning
- `/contact` — sales contact form
- `/privacy` — privacy policy
- `/terms` — terms of use

## Develop

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Lead capture

Demo, pricing, and contact forms POST to `/api/leads`.

- Leads are saved locally to `data/leads.jsonl`
- Optional: set `FORM_WEBHOOK_URL` to forward submissions to Zapier, Make, a CRM, or email automation

## Production deploy

1. Set environment variables from `.env.example`
2. Deploy to Vercel (or similar)
3. Point your domain DNS to the host
4. Update `NEXT_PUBLIC_SITE_URL` to the live domain
5. Configure `FORM_WEBHOOK_URL` for real sales notifications

```bash
npm run build
npm start
```
