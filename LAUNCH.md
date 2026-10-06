# Varga for Senate — portfolio case study

This is a **student / designer portfolio piece**, not a live campaign website.

Sample phone, mailing address, events, endorsements, Privacy/Terms, and transparency copy exist so the UI looks complete. They are not official filings, lawyer-signed policies, or a real committee.

## What this demonstrates

- Next.js 14 App Router campaign site on the Neta political theme
- District 21 entry gate, homepage narrative, issues, write-in education
- Volunteer / contact / join forms, store (simulated checkout)
- Accessibility panel, cookie notice, SEO sitemap + JSON-LD
- Footer disclaimer: “Portfolio case study — not an official campaign website.”

## Optional if you host it

Hosting is only so recruiters can click a URL. You do **not** need FEC IDs, counsel sign-off, or a campaign domain.

If you deploy (Vercel is easiest):

1. Import the repo; framework **Next.js**
2. Optional: `SITE_URL` = your live URL
3. Optional: form notify (`FORM_WEBHOOK_URL` or `RESEND_API_KEY`) if you want submissions emailed to you

See `.env.example`.

## Sample vs real

| Surface | Treatment |
|---------|-----------|
| Phone / PO Box | Reserved `555` sample on Contact |
| Instagram | Hidden (no invented profile) |
| Intro video | Hero omits Watch Video (no invented YouTube ID) |
| Photos | Campaign-styled assets + illustrated portrait |
| Privacy / Terms | Finished sample copy; no “legal review” banner |
| FEC | Transparency explains disclosure UI; no fake committee ID |
| Store / chat | Simulated |

Flag: `PORTFOLIO_MODE` in `lib/demo.ts`.
