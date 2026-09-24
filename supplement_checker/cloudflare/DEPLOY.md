# Cloudflare production deploy checklist

## Prerequisites

- [ ] Cloudflare account with Workers + D1 + R2 enabled
- [ ] Domain for API / Pages (or `workers.dev` for staging)
- [ ] NCBI email (+ optional API key)
- [ ] Vision provider key (OpenAI and/or Anthropic) if not using demo OCR
- [ ] Counsel-reviewed Privacy + Terms (replace drafts in `docs/`)

## 1. Create data plane

```bash
cd supplement_checker/cloudflare
npx wrangler d1 create supplement_profiles
# paste database_id into wrangler.toml

npx wrangler d1 migrations apply supplement_profiles --remote
npx wrangler r2 bucket create supplement-medical-docs
npx wrangler r2 bucket create supplement-label-images
```

## 2. Deploy edge worker

```bash
npx wrangler deploy
```

Set `API_ORIGIN` to the FastAPI origin (Fly.io, Render, Cloud Run, etc.).

## 3. Deploy FastAPI origin

```bash
# from repo root
docker build -f supplement_checker/Dockerfile -t supplement-api .
# push + run with env from .env.example
# SUPPLEMENT_AUTH_DISABLED=false
```

Point the Worker `API_ORIGIN` at this service. Prefer private networking / allowlist.

## 4. Wire secrets

| Secret | Where |
| --- | --- |
| `OPENAI_API_KEY` / `ANTHROPIC_API_KEY` | FastAPI host |
| `NCBI_EMAIL` / `NCBI_API_KEY` | FastAPI host |
| D1 `database_id` | `wrangler.toml` |
| R2 access via Worker bindings | Wrangler |

## 5. Smoke test production

1. `GET /health`  
2. Register → accept legal notice → create profile → verify  
3. Upload label → compare → confirm data-gap hard stop on proprietary blend  
4. Confirm medical PDF land in private R2 (no public ACL)  

## 6. Post-deploy

- [ ] Enable GitHub Actions on `main`  
- [ ] Error monitoring (Sentry or equivalent)  
- [ ] Backup/export runbook for D1  
- [ ] Document retention + delete process  
