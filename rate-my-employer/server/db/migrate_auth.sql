-- Incremental auth/production upgrades for existing databases.
ALTER TABLE users ALTER COLUMN password_hash DROP NOT NULL;
ALTER TABLE users ADD COLUMN IF NOT EXISTS username TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS oauth_provider TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS oauth_sub TEXT;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'users_oauth_provider_oauth_sub_key'
  ) THEN
    ALTER TABLE users ADD CONSTRAINT users_oauth_provider_oauth_sub_key UNIQUE (oauth_provider, oauth_sub);
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS password_resets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  token TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_password_resets_email ON password_resets(email);

ALTER TABLE reviews DROP CONSTRAINT IF EXISTS reviews_score_culture_check;
ALTER TABLE reviews DROP CONSTRAINT IF EXISTS reviews_score_pay_check;
ALTER TABLE reviews DROP CONSTRAINT IF EXISTS reviews_score_management_check;
ALTER TABLE reviews DROP CONSTRAINT IF EXISTS reviews_score_work_life_check;
ALTER TABLE reviews DROP CONSTRAINT IF EXISTS reviews_score_career_growth_check;

ALTER TABLE reviews ADD CONSTRAINT reviews_score_culture_check CHECK (score_culture BETWEEN 0 AND 5);
ALTER TABLE reviews ADD CONSTRAINT reviews_score_pay_check CHECK (score_pay BETWEEN 0 AND 5);
ALTER TABLE reviews ADD CONSTRAINT reviews_score_management_check CHECK (score_management BETWEEN 0 AND 5);
ALTER TABLE reviews ADD CONSTRAINT reviews_score_work_life_check CHECK (score_work_life BETWEEN 0 AND 5);
ALTER TABLE reviews ADD CONSTRAINT reviews_score_career_growth_check
  CHECK (score_career_growth IS NULL OR score_career_growth BETWEEN 0 AND 5);
