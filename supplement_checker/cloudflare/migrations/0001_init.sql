-- Cloudflare D1 schema for structured health profiles
-- Sensitive document bytes live in R2; D1 stores metadata + verification state.

PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS profiles (
  profile_id TEXT PRIMARY KEY,
  display_name TEXT,
  profile_verified INTEGER NOT NULL DEFAULT 0 CHECK (profile_verified IN (0, 1)),
  verification_status TEXT NOT NULL DEFAULT 'draft',
  allergies_reviewed INTEGER NOT NULL DEFAULT 0 CHECK (allergies_reviewed IN (0, 1)),
  demographics_json TEXT NOT NULL,
  clinical_json TEXT NOT NULL,
  verification_gaps_json TEXT NOT NULL DEFAULT '[]',
  notes TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_profiles_verified
  ON profiles (profile_verified);

CREATE TABLE IF NOT EXISTS history_sources (
  source_id TEXT PRIMARY KEY,
  profile_id TEXT NOT NULL REFERENCES profiles(profile_id) ON DELETE CASCADE,
  source_type TEXT NOT NULL,
  label TEXT,
  r2_object_key TEXT,
  device_sync_at TEXT,
  text_excerpt TEXT,
  received_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_history_sources_profile
  ON history_sources (profile_id);

CREATE TABLE IF NOT EXISTS analysis_jobs (
  job_id TEXT PRIMARY KEY,
  profile_id TEXT NOT NULL REFERENCES profiles(profile_id) ON DELETE CASCADE,
  job_type TEXT NOT NULL, -- label_scan | compare | literature
  status TEXT NOT NULL DEFAULT 'queued',
  input_json TEXT,
  result_json TEXT,
  error TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_analysis_jobs_profile
  ON analysis_jobs (profile_id, created_at);

CREATE TABLE IF NOT EXISTS terms_acceptances (
  client_id TEXT PRIMARY KEY,
  notice_version TEXT NOT NULL,
  accepted INTEGER NOT NULL CHECK (accepted IN (0, 1)),
  accepted_at TEXT NOT NULL,
  acceptance_method TEXT
);

-- Application MUST refuse profile create / document upload / scan when
-- no matching terms_acceptances row exists for the client session.
