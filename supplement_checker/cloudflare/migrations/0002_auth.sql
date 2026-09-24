-- Auth users + sessions (Cloudflare D1 / SQLite)

CREATE TABLE IF NOT EXISTS users (
  user_id TEXT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  display_name TEXT,
  created_at TEXT NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_users_email ON users (email);

CREATE TABLE IF NOT EXISTS sessions (
  token_hash TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  client_id TEXT NOT NULL,
  created_at TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  revoked INTEGER NOT NULL DEFAULT 0 CHECK (revoked IN (0, 1))
);

CREATE INDEX IF NOT EXISTS idx_sessions_user ON sessions (user_id);

-- Optional ownership column on profiles (nullable for legacy rows)
-- SQLite ignores ADD COLUMN if we guard in application; D1 supports it.
-- Application code uses: ALTER TABLE profiles ADD COLUMN user_id TEXT;
