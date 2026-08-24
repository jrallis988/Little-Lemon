# Supplement Checker

Python starter for a FastAPI + Streamlit flow that:

1. Ingests a structured health profile
2. Accepts a supplement-label image
3. Extracts ingredients with a vision model
4. Compares them to the profile with cited research logic

Informational only — not medical advice.

## Screenshots

Captured UI screens live under `supplement_checker/screenshots/`:

| File | Screen |
| --- | --- |
| `00-nav-overview.png` | Profile + sidebar navigation |
| `01-profile.png` | Health profile ingestion |
| `02-label-upload.png` | Label image upload |
| `03-ingredients.png` | Extracted ingredients |
| `04-comparison.png` | Profile comparison findings |

## Setup

```bash
python3 -m pip install -r supplement_checker/requirements.txt
```

## Profile UI (Streamlit)

```bash
streamlit run supplement_checker/streamlit_app.py --server.port 8501
```

## Open with Cloudflare Tunnel

Expose the local Streamlit app on a public `*.trycloudflare.com` URL:

```bash
cloudflared tunnel --url http://127.0.0.1:8501
```

Quick tunnels are for demos only (no uptime guarantee). For production, use a named Cloudflare Tunnel.
