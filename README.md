# Varga for Senate

Independent write-in campaign site — **People Over Politics.**

## Stack

- Next.js 14 (App Router) · React · Tailwind (inner pages / forms)
- **Neta** political HTML theme (Labartisan) as the primary visual system — Bootstrap + theme CSS under `public/theme/`
- Roboto (theme default) · Lexend available for dyslexia-friendly mode

## Theme

The live site uses the uploaded Neta homepage-1 template structure:

- Header / footer / hero / about / countdown / issues / get-involved / join sections
- Assets: `public/theme/assets/`
- Overrides: `public/theme/varga-theme.css`
- Original HTML reference: `reference/neta-template/`

Legacy static preview at `/neta/` still exists; the App Router site at `/` is the real product.

## Demo / placeholder status

This repository currently ships as a **front-end demonstration**. The following are intentional:

| Area | Current behavior |
|------|------------------|
| Contact phone | `(603) 555-0142` (placeholder) |
| Social links | Facebook live; other networks still placeholders |
| Join Team Varga form | Live `POST /api/join` — persists signups to `data/join-signups.jsonl`; optional webhook/Resend notify via env |
| Contact / Volunteer / Town Request forms | Front-end mock: validation + success message only |
| Store cart | Fully interactive (add / update / remove) |
| Store checkout | Non-functional demo — no payment gateway |
| Privacy & Terms | Show **LEGAL REVIEW REQUIRED** banner |
| Cookie banner | Mentions analytics for draft policy; **no live tracking scripts** |
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
- Template attribution: Neta by Labartisan (footer)
