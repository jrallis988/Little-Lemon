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

| Area | Current behavior |
|------|------------------|
| Contact phone / PO Box | Hidden until the campaign supplies verified values in `lib/candidate.ts` |
| Social links | Facebook only; Instagram / X / YouTube stay hidden until URLs are supplied |
| Intro video | Hero “Watch Video” hidden until `candidate.introVideo.youtubeId` is set |
| Join / Contact / Volunteer / Town forms | Live `POST /api/forms` (Join also at `/api/join`) — persist to `data/form-submissions.jsonl` and notify via `FORM_WEBHOOK_URL` or Resend when env is set |
| Store cart | Fully interactive (add / update / remove) |
| Store checkout | Non-functional demo — no payment gateway |
| Privacy & Terms | Show **LEGAL REVIEW REQUIRED** banner until counsel approves copy |
| Cookie banner | Mentions analytics for draft policy; **no live tracking scripts** |
| Photos / testimonials / events | Some generated stand-ins; upload original files to replace them |

Central flags and copy live in `lib/demo.ts` and `lib/candidate.ts`.

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
