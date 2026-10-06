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

This is a **portfolio case study** (`PORTFOLIO_MODE` in `lib/demo.ts`) — not a live campaign.

| Area | Current behavior |
|------|------------------|
| Contact phone / PO Box | Sample `555` number and PO Box on Contact |
| Social links | Facebook shown; Instagram / X / YouTube hidden |
| Intro video | Hero omits Watch Video (no invented YouTube ID) |
| Join / Contact / Volunteer / Town forms | `POST /api/forms` (Join also `/api/join`) |
| Store checkout | Simulated — no payment |
| Privacy & Terms | Sample copy; legal-review banner hidden |
| Photos / events / endorsements | Case-study sample content |

## Primary pages

Home · Meet Nick · Violet Party · Issues (+ subpages) · How to Vote · Store · Volunteer

## Secondary

Contact · Press · Transparency · Privacy · Terms · Come to My Town · Events · Accessibility · FAQ · Endorsements

## Develop

```bash
npm install
npm run dev
```

## Deploy

See **[LAUNCH.md](./LAUNCH.md)** for the public-launch checklist and Vercel setup.

```bash
npm run build
npm start
```

On Vercel, set `FORM_WEBHOOK_URL` or `RESEND_API_KEY` so Contact / Volunteer / Join / Town forms reach staff (local JSONL is not durable there).

## Notes

- General Election: **November 3, 2026** (write in “Nick Varga”)
- No live donation flows on this site
- See `lib/candidate.ts` for contact/social fields still awaiting campaign values
- See `.env.example` to turn on webhook / Resend staff notifications
- Template attribution: Neta by Labartisan (footer)
