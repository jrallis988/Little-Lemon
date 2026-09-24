# Supplement Research Platform

Clinical-grade **research and data-aggregation** platform (not a medical device or diagnostic tool).

See [`ARCHITECTURE.md`](./ARCHITECTURE.md) for the full blueprint.

## Non-negotiable rule

`profile_verified = False` locks **all** product scanning / OCR / comparison / literature routes until a detailed health history is completed via:

- Direct text intake
- Medical record PDF / file uploads (Cloudflare R2)
- Apple HealthKit or Google Health Connect sync

## Gaps & Knowledge Limits (legal gate)

Before medical-history upload **or** scan UI, users must accept the un-skippable notice in `legal_notice.py`.

Unindexed OCR ingredients hard-stop via `data_gaps.py` with:

> Data Gap Identified: This ingredient or dosage lacks sufficient indexed human research literature...

## Production readiness (honest scorecard)

| Area | Score | Notes |
| --- | --- | --- |
| Architecture & gates | 9/10 | Terms, verify lock, data-gap stops |
| Intelligence pipeline | 7/10 | OCR + PubMed + richer compare rules |
| API / auth / persistence | 8/10 | SQLite+auth+export; CF deploy still manual |
| UI | 6/10 | Clinical web console + Streamlit; no native apps yet |
| Compliance docs | 6/10 | Draft privacy/terms — **not counsel-approved** |
| Ops | 7/10 | Pytest + GitHub Actions + Docker + deploy checklist |

**Overall foundation: ~8 / 10.** Remaining to a true launch 10: native HealthKit/Health Connect apps, live Cloudflare D1/R2, counsel sign-off, staging/monitoring.

Card-based web dashboard served by FastAPI:

```bash
uvicorn supplement_checker.api.main:app --reload --port 8000
# open http://127.0.0.1:8000/dashboard
```

Auth: `POST /auth/register` · `POST /auth/login` · bearer tokens  
Set `SUPPLEMENT_AUTH_DISABLED=true` only for local smoke tests.

| Module | Role |
| --- | --- |
| `storage.py` | SQLite persistence matching D1 schema |
| `object_store.py` | Local R2 stand-in for medical PDFs / label images |
| `vision_ocr.py` | Label OCR (demo, or OpenAI / Anthropic with API keys) |
| `literature.py` | PubMed/NCBI E-utilities + offline fallback |
| `compare_engine.py` | Profile × ingredients findings with citations |

```bash
# optional live providers
export OPENAI_API_KEY=...          # or ANTHROPIC_API_KEY
export NCBI_EMAIL=you@example.com  # recommended for PubMed
export SUPPLEMENT_OCR_MODE=demo    # force demo OCR
```

## Stack

| Layer | Tech |
| --- | --- |
| API | Python / FastAPI (`api/main.py`) |
| Edge / data | Cloudflare Pages/Workers, D1, R2 (`cloudflare/`) |
| Local persistence | SQLite + filesystem object store (D1/R2 stand-ins) |
| Prototype UI | Streamlit multipage (gated) |
| Production UI | React Native / Flutter clinical dashboard (planned) |
| Intelligence | Vision OCR + PubMed (live keys optional; demo fallback) |

## Setup

```bash
python3 -m pip install -r supplement_checker/requirements.txt
```

## FastAPI

```bash
uvicorn supplement_checker.api.main:app --reload --port 8000
```

Key routes:

- `POST /legal/accept` — Gaps & Knowledge Limits acceptance
- `POST /profiles` — ingest history (always starts unverified)
- `POST /profiles/{id}/documents/upload` — medical file → object store
- `POST /profiles/{id}/verify` — flip `profile_verified` when complete
- `POST /labels/scan/{id}` — vision OCR (multipart image; demo without API keys)
- `POST /compare/{id}` — literature-gated profile comparison
- `GET /literature/{id}?query=` — PubMed search
- `GET /jobs/{id}` — analysis job status

## Streamlit prototype

```bash
streamlit run supplement_checker/streamlit_app.py --server.port 8501
```

## Cloudflare Tunnel (demo)

```bash
cloudflared tunnel --url http://127.0.0.1:8501
```

## Screenshots

| File | Screen |
| --- | --- |
| `screenshots/00-nav-overview.png` | Profile + sidebar navigation |
| `screenshots/01-profile.png` | Health profile ingestion |
| `screenshots/02-label-upload.png` | Label image upload (now gated) |
| `screenshots/03-ingredients.png` | Extracted ingredients (now gated) |
| `screenshots/04-comparison.png` | Profile comparison (now gated) |
