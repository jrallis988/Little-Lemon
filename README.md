# Varga for Senate

Independent write-in campaign site — **People Over Politics.**

## Stack

- Next.js 14 (App Router) · Tailwind CSS · Lucide React
- Archivo Black (display) + Inter (body) + Georgia (pull quotes)
- Design system: navy/slate/charcoal neutrals, red/yellow accents (70/20/10)

## Demo / placeholder status

This repository currently ships as a **front-end demonstration**. The following are intentional:

| Area | Current behavior |
|------|------------------|
| Contact phone | `(603) 555-0142` (placeholder) |
| Social links | Generic platform homepages (`facebook.com/`, `x.com/`, etc.) — not live profiles |
| Contact / Volunteer / Join / Town Request forms | Front-end mock: validation + success message only; no email, CRM, or API persistence |
| Store cart | Fully interactive (add / update / remove) |
| Store checkout | Non-functional demo — no payment gateway, no order database |
| Privacy & Terms | Show **LEGAL REVIEW REQUIRED** banner |
| Cookie banner | Mentions analytics for display / draft policy purposes; **no live tracking scripts or pixels are loaded** |
| Photos / testimonials / events | Placeholder content flagged for campaign replacement |

Central flags and copy live in `lib/demo.ts`.

## Primary pages

Home · Meet Nick · Violet Party · Issues (+ subpages) · How to Vote · Store · Volunteer

## Secondary

Contact · Press · Transparency · Privacy · Terms · Come to My Town · Events · Accessibility · FAQ · Endorsements

## Develop

```bash
npm install
npm run dev
```

## Notes

- General Election: **November 3, 2026** (write in “Nick Varga”)
- No live donation flows on this site
- See `lib/candidate.ts` for contact/social placeholders
