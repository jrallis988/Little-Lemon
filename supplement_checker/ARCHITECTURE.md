# Architecture Blueprint

Clinical-grade **research and data-aggregation** platform.  
Not a medical device. Not a diagnostic tool. Informational literature cross-referencing only.

## Core concept

Replace generic supplement ratings with:

1. Deep biomedical literature cross-referencing (PubMed / NCBI)
2. Hyper-personalized checks against the user’s structural and physiological profile
3. Multimodal vision OCR of supplement labels

## Non-negotiable rule

**No product scanning or analysis may run until the health history is complete and verified.**

```text
profile_verified = False  →  lock scan / OCR / compare endpoints
profile_verified = True   →  unlock analysis pipeline
```

Health history may be assembled from any combination of:

- Structured form / direct text input
- Medical record PDF uploads (stored in Cloudflare R2)
- File uploads (labs, med lists, clinician notes)
- Native device sync: **Apple HealthKit** and **Google Health Connect**

Verification criteria are enforced server-side (`assert_profile_verified` / FastAPI dependencies). Clients must not bypass this lock.

## Legal & transparency safeguard (Gaps & Knowledge Limits)

**Before** medical-history upload **or** scan UI access, users must explicitly accept an un-skippable Gaps & Knowledge Limits notice (`legal_notice.py`).

```text
terms accepted  →  profile upload / scan UI may proceed
terms missing   →  hard block (UI + API 403)
```

### Unknown / missing literature rule

If OCR extracts an ingredient/dosage without sufficient indexed human research:

1. Hard programmatic stop (no speculative safety or mechanism claims)
2. Explicit UI/API message:

> Data Gap Identified: This ingredient or dosage lacks sufficient indexed human research literature. No safety or mechanistic evaluation can be provided. Review this item directly with your clinician.

Implemented in `data_gaps.py` (`evaluate_ingredients_with_gap_stops`).

## Tech stack

| Layer | Choice |
| --- | --- |
| Editor | Cursor (AI-native) |
| Edge / deploy | Cloudflare Pages + Workers |
| Structured SQL | Cloudflare D1 |
| Document object storage | Cloudflare R2 (PHI-sensitive medical PDFs) |
| API | Python / FastAPI |
| Mobile / UI | React Native or Flutter — data-dense, card-based clinical dashboard |
| Vision | Multimodal vision LLMs (label OCR) |
| Literature | Dynamic PubMed / NCBI querying against the user’s profile |

## Runtime topology

```text
┌─────────────────────────────┐
│ Mobile (RN / Flutter)       │
│  HealthKit / Health Connect │
│  Clinical card dashboard    │
└──────────────┬──────────────┘
               │ HTTPS
┌──────────────▼──────────────┐
│ Cloudflare Pages / Workers  │  auth, edge routing, static web
└──────────────┬──────────────┘
               │
     ┌─────────┴─────────┐
     ▼                   ▼
 Cloudflare D1      Cloudflare R2
 (profiles,         (medical PDFs,
  verification,      label images)
  analysis jobs)
               │
┌──────────────▼──────────────┐
│ FastAPI (Python)            │
│  /profiles  (ingest)        │
│  /documents (R2 signed)     │
│  /health-sync               │
│  /labels/*  [LOCKED]        │
│  /compare/* [LOCKED]        │
│  /literature/* [LOCKED]     │
└─────────────────────────────┘
               │
     ┌─────────┴──────────┐
     ▼                    ▼
 Vision LLM OCR      PubMed / NCBI
```

## Domain modules (this repo)

```text
supplement_checker/
  ARCHITECTURE.md          ← this file
  profile_ingestion.py     ← HealthProfile + history sources
  access_control.py        ← profile_verified gate
  api/                     ← FastAPI application
  cloudflare/              ← D1 schema, wrangler, R2 notes
  streamlit_app.py         ← local prototype UI (gated)
  pages/                   ← prototype screens (gated)
```

## Verification state machine

```text
draft ──ingest history──▶ pending_review ──checks pass──▶ verified
  ▲                            │
  └──────── incomplete ◀───────┘
```

`profile_verified` flips to `True` only when minimum history completeness is met
(see `VerificationRequirements` in code). Analysis routes raise `403` otherwise.

## Security & compliance posture (baseline)

- Treat uploaded records as sensitive; store in R2 with private access + short-lived signed URLs
- Prefer encrypted-at-rest defaults from Cloudflare; never log raw PHI in application logs
- Keep a clear product disclaimer: research aggregation, not diagnosis or treatment advice
- Mobile health syncs require OS-level user consent (HealthKit / Health Connect permissions)

## Prototype vs production UI

- **Streamlit multipage app** — local/dev prototype for profile → label → ingredients → compare
- **React Native / Flutter** — production clinical control-panel dashboard (card-dense)

Prototype screens must still honor `profile_verified = False` locks.
