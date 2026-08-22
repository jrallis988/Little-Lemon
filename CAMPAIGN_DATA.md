# Campaign data intake — Varga for Senate

The site is wired to read contact facts, video, FEC ID, and legal sign-off from `lib/candidate.ts`. Photos are file replacements under `public/images/` (and one hero path in the theme folder).

**Paste your answers in a follow-up message, or edit `lib/candidate.ts` directly.**

---

## 1. Contact facts

| Field | Current | Paste here |
|-------|---------|------------|
| Public phone | hidden | |
| Mailing address | hidden | |
| Facebook | `https://www.facebook.com/Vargraforsenate` | confirm or replace |
| Instagram | hidden | full profile URL |

Email is already set: `vargaforsenate@gmail.com`

**Code fields** (`lib/candidate.ts`):

```ts
phone: "",
mailAddress: "",
social: {
  facebook: "https://www.facebook.com/Vargraforsenate",
  instagram: "",
  // ...
},
```

---

## 2. Intro video (homepage hero)

| Field | Current |
|-------|---------|
| YouTube video ID | empty — “Watch Video” button hidden |

From a URL like `https://www.youtube.com/watch?v=ABC123xyz`, the ID is `ABC123xyz`.

```ts
introVideo: {
  youtubeId: "",
  title: "Varga for Senate — campaign introduction",
},
```

---

## 3. Original photos

Upload image files to these paths (same filename = no code change). Chat image previews do **not** persist on the server — attach files to the repo or send via a channel that saves files.

| Asset | Path | Used for |
|-------|------|----------|
| Hero background | `public/theme/assets/images/homepage1/banner/varga-hero.jpg` | Homepage hero (Newmarket) |
| Write-in band | `public/images/write-in-bg.jpg` | “Write In Nick” section |
| Get involved | `public/images/get-involved/bg.jpg` | Get Involved section background |
| Volunteer thumb | `public/images/get-involved/volunteer.jpg` | Get Involved card |
| Apparel thumb | `public/images/get-involved/apparel.jpg` | Get Involved card |
| Term limits | `public/images/issues/term-limits.jpg` | Issues preview |
| Healthcare | `public/images/issues/healthcare.jpg` | Issues preview |
| Footer | `public/images/footer-mountains.jpg` | Footer mountain band |
| OG / social | `public/images/newmarket-hero.jpg` | Link previews (`layout.tsx`) |

Optional: replace `public/images/candidate-portrait.svg` on Meet Nick with a JPG and update `app/meet-nick/page.tsx` if needed.

---

## 4. Lawyer-approved Privacy & Terms

**Do not remove the review banner without counsel sign-off.**

When your lawyer approves the Privacy Policy, Terms, “Paid for by {committee}” line, and FEC disclaimer language:

1. Set `legalReviewApproved: true` in `lib/candidate.ts`
2. Remove or revise the gray “Demo status” draft paragraphs on `/privacy` and `/terms` if counsel supplies final copy

```ts
legalReviewApproved: false, // → true after counsel approval
```

---

## 5. FEC / transparency

| Field | Current |
|-------|---------|
| Committee name | Nick Varga Campaign Committee |
| FEC committee ID | empty — `/transparency` shows pending notice |

When the Statement of Organization is filed, paste the committee ID (format `C00XXXXXX` or `S6NHXXXXX`):

```ts
fecCommitteeId: "",
```

The transparency page will automatically link to:

- FEC committee profile
- FEC financial reports & filings

---

## One-message paste template

Copy, fill in, and send:

```
PHONE:
MAILING ADDRESS:
INSTAGRAM URL:
FACEBOOK URL (if different): https://www.facebook.com/Vargraforsenate
YOUTUBE INTRO VIDEO ID:
FEC COMMITTEE ID:
LEGAL REVIEW APPROVED: no / yes (only yes after lawyer sign-off)
PHOTOS: attached / uploaded to repo at paths in CAMPAIGN_DATA.md
```
