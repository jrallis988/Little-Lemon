# Cloudflare infrastructure notes

## Bindings

| Binding | Service | Purpose |
| --- | --- | --- |
| `DB` | D1 | Profiles, verification flags, history source metadata, analysis job rows |
| `MEDICAL_DOCS` | R2 | Medical record PDFs / lab uploads (private) |
| `LABEL_IMAGES` | R2 | Supplement label photos for vision OCR (private) |

## R2 object key conventions

```text
medical/{profile_id}/{yyyy}/{mm}/{source_id}/{filename}
labels/{profile_id}/{yyyy}/{mm}/{upload_id}/{filename}
```

- Buckets are **private** (no public access)
- Clients upload via short-lived signed URLs issued by FastAPI / Worker
- D1 stores `r2_object_key` only — never file bytes

## profile_verified enforcement

1. Mobile / web cannot call scan endpoints until `/profiles/{id}/verify` succeeds
2. FastAPI `Depends(require_verified_profile)` returns **403** when locked
3. Workers should double-check `profiles.profile_verified = 1` before enqueueing `analysis_jobs`

## Deploy (when account ready)

```bash
cd supplement_checker/cloudflare
npx wrangler d1 create supplement_profiles
npx wrangler d1 migrations apply supplement_profiles --remote
npx wrangler r2 bucket create supplement-medical-docs
npx wrangler r2 bucket create supplement-label-images
# set database_id in wrangler.toml, then:
npx wrangler deploy
```

## PHI posture

- Do not write raw medical PDF text into D1 or application logs
- Prefer summarizing device syncs (counts/types) over dumping HealthKit payloads
- Keep product copy: research aggregation — not diagnosis
