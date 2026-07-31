# Care Platform Sanity Studio

## Setup

1. Create a project at https://www.sanity.io/manage
2. Copy the project ID into `studio/.env`:

```bash
SANITY_STUDIO_PROJECT_ID=yourProjectId
SANITY_STUDIO_DATASET=production
```

3. Install and run:

```bash
cd studio
npm install
npm run dev
```

4. Mirror the same IDs in the Next.js app `.env.local`:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=yourProjectId
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=...optional read token...
```

## Import local catalog

From the repo root:

```bash
node scripts/export-cms-ndjson.mjs > /tmp/bch-content.ndjson
# Then use Sanity's import CLI / dataset import with this NDJSON
```

Schemas mirror `src/content/types` and `src/lib/cms/schemas.ts`.
