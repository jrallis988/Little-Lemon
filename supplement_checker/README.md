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

## Intelligence pipeline (v0.3)

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

- `POST /profiles` — ingest history (always starts unverified)
- `POST /profiles/{id}/documents` — attach R2 medical PDF metadata
- `POST /profiles/{id}/health-sync` — HealthKit / Health Connect
- `POST /profiles/{id}/verify` — flip `profile_verified` when complete
- `POST /labels/scan/{id}` — **403 unless verified**
- `POST /compare/{id}` — **403 unless verified**

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
