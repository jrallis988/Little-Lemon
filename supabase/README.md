# Supabase setup (Phase 2+)

## Apply schema

1. Create a Supabase project.
2. In **SQL Editor**, run `migrations/20260328000000_phase2_artist_uploads.sql`.
3. Confirm Storage buckets exist: `artist-avatars`, `artist-headers`, `track-artwork`, `release-artwork`, `track-audio`.
4. Copy project URL + anon key into `.env`:

```bash
EXPO_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY
```

## What this migration creates

| Table | Purpose |
| --- | --- |
| `profiles` | Listeners + artists; bio, avatar, header, scene, status |
| `releases` | Single / EP / album metadata + artwork |
| `tracks` | Uploaded audio + artwork + copyright confirmation |
| `media_assets` | Ownership ledger for Storage objects |

RLS: artists can only insert/update/delete their own rows. Public can read rows where `disabled_at` is null.

Storage object paths must start with `{auth.uid()}/…`.

## Phase 3 — taste persistence

Also run `migrations/20260328120000_phase3_taste_persistence.sql` to create:

| Table | Purpose |
| --- | --- |
| `taste_logs` | Diary log + optional rating per user/track |
| `taste_reviews` | Written reviews |
| `taste_lists` / `taste_list_items` | User lists |
| `follows` | Follow artists or listeners |
| `track_downloads` / `track_reposts` | Public support signals |

`track_id` / follow `target_id` are **text** so demo catalog ids and Postgres uuids both work.

## Soft disable (Phase 7 prep)

Set `disabled_at` on a profile, track, release, or media_asset to hide it without deleting files or related social records.
