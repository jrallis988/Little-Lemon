# Portfolio notes — Varga for Senate

This project is a **portfolio case study**, not a live campaign.

`PORTFOLIO_MODE` in `lib/demo.ts` is on. The site uses sample contact, events, endorsements, and legal copy so screens look finished. Footer and key pages say it is not an official campaign website.

Do **not** invent a real FEC committee ID, a real Instagram, or a real YouTube video. Do **not** treat Privacy/Terms as lawyer-signed.

## Sample values already in `lib/candidate.ts`

- Phone: `(603) 555-0121` (reserved 555 sample)
- Mail: `P.O. Box 21, Newmarket, NH 03857` (sample)
- Email: `vargaforsenate@gmail.com`
- Facebook: `https://www.facebook.com/Vargraforsenate`
- `legalReviewApproved: true` (hides the review banner for the case study)

## If you ever swapped this to a real campaign

Turn `PORTFOLIO_MODE` off, clear sample phone/mail, restore the legal banner until counsel signs, and only then add verified socials, video ID, photos, and FEC ID.
