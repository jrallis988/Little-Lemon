-- Rate My Employer — PostgreSQL schema
-- Compatible with Supabase (run in SQL editor) or local Postgres.

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TYPE user_role AS ENUM ('user', 'employer_admin', 'moderator', 'admin');
CREATE TYPE employment_status AS ENUM ('current', 'former');
CREATE TYPE employment_type AS ENUM ('full_time', 'part_time', 'contract', 'intern', 'freelance');
CREATE TYPE tag_sentiment AS ENUM ('positive', 'neutral', 'negative');
CREATE TYPE tag_category AS ENUM ('culture', 'pay', 'management', 'process', 'other');

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  display_name TEXT NOT NULL,
  avatar_url TEXT,
  role user_role NOT NULL DEFAULT 'user',
  headline TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  industry TEXT NOT NULL,
  location TEXT NOT NULL,
  headquarters TEXT,
  size TEXT NOT NULL,
  website TEXT,
  logo_url TEXT,
  summary TEXT NOT NULL DEFAULT '',
  founded_year INT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT NOT NULL UNIQUE,
  label TEXT NOT NULL,
  sentiment tag_sentiment NOT NULL DEFAULT 'neutral',
  category tag_category NOT NULL DEFAULT 'other'
);

CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  author_name TEXT NOT NULL,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  role TEXT NOT NULL,
  department TEXT,
  employment_status employment_status NOT NULL,
  employment_type employment_type,
  would_recommend BOOLEAN NOT NULL DEFAULT TRUE,
  score_overall NUMERIC(2,1) NOT NULL CHECK (score_overall BETWEEN 1 AND 5),
  score_culture NUMERIC(2,1) NOT NULL CHECK (score_culture BETWEEN 1 AND 5),
  score_pay NUMERIC(2,1) NOT NULL CHECK (score_pay BETWEEN 1 AND 5),
  score_management NUMERIC(2,1) NOT NULL CHECK (score_management BETWEEN 1 AND 5),
  score_work_life NUMERIC(2,1) NOT NULL CHECK (score_work_life BETWEEN 1 AND 5),
  score_career_growth NUMERIC(2,1) CHECK (score_career_growth IS NULL OR score_career_growth BETWEEN 1 AND 5),
  is_anonymous BOOLEAN NOT NULL DEFAULT FALSE,
  helpful_count INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (company_id, user_id)
);

CREATE TABLE review_tags (
  review_id UUID NOT NULL REFERENCES reviews(id) ON DELETE CASCADE,
  tag_id UUID NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (review_id, tag_id)
);

CREATE TABLE salaries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role TEXT NOT NULL,
  department TEXT,
  employment_type employment_type NOT NULL,
  base_annual NUMERIC(12,2) NOT NULL CHECK (base_annual >= 0),
  bonus_annual NUMERIC(12,2) CHECK (bonus_annual IS NULL OR bonus_annual >= 0),
  equity_annual NUMERIC(12,2) CHECK (equity_annual IS NULL OR equity_annual >= 0),
  currency CHAR(3) NOT NULL DEFAULT 'USD',
  years_experience NUMERIC(4,1),
  location TEXT,
  is_verified BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE employer_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  review_id UUID NOT NULL UNIQUE REFERENCES reviews(id) ON DELETE CASCADE,
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  responder_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  responder_name TEXT NOT NULL,
  body TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_companies_name ON companies USING gin (to_tsvector('english', name));
CREATE INDEX idx_reviews_company ON reviews(company_id, created_at DESC);
CREATE INDEX idx_salaries_company ON salaries(company_id, role);
CREATE INDEX idx_employer_responses_company ON employer_responses(company_id);
