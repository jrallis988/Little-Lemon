# Morgan Bright

Academic software sales website for classrooms, schools, and districts.

## Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS

## Pages

- `/` — sales homepage
- `/features` — platform features
- `/plans` — Classroom / School / District pricing
- `/demo` — demo and pricing request forms
- `/about` — company positioning + social proof
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

Forms POST to `/api/leads`.

Delivery options:

1. Local file: `data/leads.jsonl`
2. `FORM_WEBHOOK_URL` → Zapier / Make / CRM
3. `RESEND_API_KEY` → email to `NEXT_PUBLIC_SALES_EMAIL`

## Analytics

Set either:

- `NEXT_PUBLIC_GA_MEASUREMENT_ID` for Google Analytics
- `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` for Plausible

## Production deploy (Vercel)

1. Push this repo and import it in Vercel
2. Add env vars from `.env.example`
3. Set `NEXT_PUBLIC_SITE_URL` to your live domain
4. Deploy
5. Point your domain DNS to Vercel

```bash
npm run build
npm start
```

## Launch checklist

- [ ] Buy/connect real domain
- [ ] Set production env vars (email, phone, site URL)
- [ ] Configure Resend and/or webhook for lead delivery
- [ ] Enable analytics
- [ ] Replace sample testimonials if you have real customer quotes
- [ ] Legal review of privacy/terms
