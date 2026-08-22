# Launch checklist — Varga for Senate

Copy/paste:

```
The pages and design are in place. What’s left is launch work, not more site-building.

TO GO PUBLIC
1. Hosting + domain — Preview tunnels expire. Put the site on Vercel or Cloudflare Pages with a campaign domain.
2. Email/CRM notify — Forms save on the server, but staff won’t get them until you set FORM_WEBHOOK_URL or RESEND_API_KEY on the host.
3. Facts from the campaign — see **`CAMPAIGN_DATA.md`** for the paste template (phone, mail, Instagram, intro YouTube ID, FEC ID, photos).
4. Lawyer review — set `legalReviewApproved: true` in `lib/candidate.ts` only after counsel signs off Privacy, Terms, and disclaimers.
5. Original photos — replace files listed in `CAMPAIGN_DATA.md` (chat previews do not save to the repo).

STILL PLACEHOLDER CONTENT
- Events are TBA
- Endorsements are “coming soon”
- Testimonials are samples
- Press kit is missing photos and a bio PDF

OPTIONAL LATER
- Real store checkout (no payments yet)
- Donations (none on purpose)
- Analytics
- Live chat to staff

NEXT STEP
Hosting + domain, or send the phone/social/video details to drop into the site.
```

## Deploy on Vercel (recommended)

1. Import the GitHub repo at [vercel.com/new](https://vercel.com/new).
2. Framework preset: **Next.js** (see `vercel.json`).
3. Add environment variables from `.env.example`:
   - `FORM_WEBHOOK_URL` **or** `RESEND_API_KEY`
   - `FORM_NOTIFY_TO=vargaforsenate@gmail.com`
   - `FORM_FROM_EMAIL` (a verified Resend sender once you have a domain)
4. Deploy, then attach the campaign domain under **Project → Settings → Domains**.

On Vercel, local JSONL files are ephemeral. Production forms **require** webhook or Resend so staff actually receive submissions.

## Deploy on Cloudflare Pages

Use the Next.js Cloudflare adapter only if the team chooses Cloudflare as the permanent host. For the fastest public launch, Vercel is the path of least resistance for this App Router project.

## After deploy

- Paste phone, mail address, social URLs, and YouTube ID into `lib/candidate.ts`
- Replace generated section photos with uploaded originals under `public/images/`
- Remove the legal-review banner only after counsel approves Privacy, Terms, and the paid-for-by line
- Link FEC filings on `/transparency` once a committee ID exists
