#!/usr/bin/env bash
# Create PF_STORE KV and print wrangler.jsonc snippet.
# Requires: wrangler login (or CLOUDFLARE_API_TOKEN + CLOUDFLARE_ACCOUNT_ID)
set -euo pipefail
cd "$(dirname "$0")/.."

echo "Creating KV namespace PF_STORE…"
PROD_OUT=$(npx wrangler kv namespace create PF_STORE)
echo "$PROD_OUT"
PROD_ID=$(echo "$PROD_OUT" | sed -n 's/.*id = "\([^"]*\)".*/\1/p' | tail -1)
if [ -z "$PROD_ID" ]; then
  PROD_ID=$(echo "$PROD_OUT" | sed -n 's/.*"id": "\([^"]*\)".*/\1/p' | tail -1)
fi

echo "Creating preview KV namespace…"
PRE_OUT=$(npx wrangler kv namespace create PF_STORE --preview)
echo "$PRE_OUT"
PRE_ID=$(echo "$PRE_OUT" | sed -n 's/.*id = "\([^"]*\)".*/\1/p' | tail -1)
if [ -z "$PRE_ID" ]; then
  PRE_ID=$(echo "$PRE_OUT" | sed -n 's/.*"id": "\([^"]*\)".*/\1/p' | tail -1)
fi

cat <<EOF

Add to wrangler.jsonc:

  "kv_namespaces": [
    {
      "binding": "PF_STORE",
      "id": "${PROD_ID:-REPLACE_PROD_ID}",
      "preview_id": "${PRE_ID:-REPLACE_PREVIEW_ID}"
    }
  ]

Then remove vars.USE_MEMORY_STORE (or set to "false") and redeploy:

  npm run deploy

EOF
