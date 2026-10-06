# Morgan Bright

Portfolio case study: a multi-page academic software **sales website** for a fictional brand. It shows how a classroom / school / district product would be marketed and sold — not a live company or student-facing app.

## What this demonstrates

- Education-software sales IA (home → features → plans → demo/pricing → contact)
- McGraw Hill–style visual system (navy/red, Plus Jakarta Sans, full-bleed hero)
- Plan comparison, FAQ, and lead-form UX
- Next.js App Router, TypeScript, Tailwind

## Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS

## Pages

- `/` — sales homepage
- `/features` — platform features
- `/plans` — Classroom / School / District pricing + comparison
- `/demo` — demo and pricing request forms (portfolio demo mode)
- `/about` — positioning + sample social proof
- `/contact` — sales contact form
- `/privacy` — sample privacy policy
- `/terms` — sample terms of use

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Forms POST to `/api/leads`. They validate, rate-limit, and show a success state. They do **not** notify a real sales team unless you optionally set `FORM_WEBHOOK_URL` or `RESEND_API_KEY`.

## Optional env

Copy `.env.example` only if you want a custom site URL or optional analytics. Nothing is required to run the demo.
