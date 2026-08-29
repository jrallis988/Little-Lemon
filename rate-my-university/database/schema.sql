-- Rate My University — PostgreSQL schema
-- Hierarchical: University → Departments / Dorms → Courses → Professors & Advisors
-- Reviews are polymorphic via (target_type, target_id)

CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ---------------------------------------------------------------------------
-- Enums
-- ---------------------------------------------------------------------------
CREATE TYPE person_type AS ENUM ('professor', 'advisor', 'both');
CREATE TYPE review_target_type AS ENUM ('professor', 'advisor', 'course', 'dorm', 'university');

-- ---------------------------------------------------------------------------
-- Core hierarchy
-- ---------------------------------------------------------------------------
CREATE TABLE universities (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name        TEXT NOT NULL,
    domain      TEXT NOT NULL UNIQUE,          -- e.g. '@unh.edu'
    location    TEXT NOT NULL,
    slug        TEXT NOT NULL UNIQUE,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT universities_domain_format CHECK (domain ~ '^@[a-z0-9.-]+\.[a-z]{2,}$')
);

CREATE TABLE departments (
    id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    university_id  UUID NOT NULL REFERENCES universities(id) ON DELETE CASCADE,
    name           TEXT NOT NULL,
    code           TEXT,                      -- e.g. 'CS', 'ENG'
    created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT departments_unique_name UNIQUE (university_id, name)
);

CREATE TABLE professors_advisors (
    id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    department_id  UUID NOT NULL REFERENCES departments(id) ON DELETE CASCADE,
    name           TEXT NOT NULL,
    type           person_type NOT NULL DEFAULT 'professor',
    email          TEXT,
    title          TEXT,
    is_verified    BOOLEAN NOT NULL DEFAULT FALSE,  -- false when auto-created from review
    created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE courses (
    id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    department_id  UUID NOT NULL REFERENCES departments(id) ON DELETE CASCADE,
    course_code    TEXT NOT NULL,             -- e.g. 'CS-420'
    course_name    TEXT NOT NULL,
    credits        SMALLINT,
    is_verified    BOOLEAN NOT NULL DEFAULT FALSE,
    created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT courses_unique_code UNIQUE (department_id, course_code)
);

CREATE TABLE dorms_housing (
    id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    university_id  UUID NOT NULL REFERENCES universities(id) ON DELETE CASCADE,
    building_name  TEXT NOT NULL,
    campus_zone    TEXT,                      -- e.g. 'North Campus', 'Downtown'
    capacity       INTEGER,
    is_verified    BOOLEAN NOT NULL DEFAULT FALSE,
    created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT dorms_unique_building UNIQUE (university_id, building_name)
);

-- Optional many-to-many: which professors teach which courses
CREATE TABLE course_instructors (
    course_id     UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    professor_id  UUID NOT NULL REFERENCES professors_advisors(id) ON DELETE CASCADE,
    term          TEXT,                       -- e.g. 'Fall 2026'
    PRIMARY KEY (course_id, professor_id)
);

-- ---------------------------------------------------------------------------
-- Reviews (polymorphic)
-- ---------------------------------------------------------------------------
-- ratings JSONB shape examples:
--   professor/advisor: {"clarity": 4, "helpfulness": 5, "difficulty": 3, "would_recommend": 5}
--   course:            {"workload": 3, "interest": 5, "organization": 4, "grading_fairness": 4}
--   dorm:              {"cleanliness": 3, "location": 5, "community": 4, "value": 3}
--   university:        {"academics": 4, "campus_life": 5, "resources": 4, "overall": 4}

CREATE TABLE reviews (
    id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    target_type       review_target_type NOT NULL,
    target_id         UUID NOT NULL,
    user_id_hash      TEXT NOT NULL,          -- SHA-256 of device/account id — never store PII
    ratings           JSONB NOT NULL,
    qualitative_tags  TEXT[] NOT NULL DEFAULT '{}',
    comment           TEXT,
    is_flagged        BOOLEAN NOT NULL DEFAULT FALSE,
    created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT reviews_ratings_object CHECK (jsonb_typeof(ratings) = 'object'),
    CONSTRAINT reviews_comment_length CHECK (comment IS NULL OR char_length(comment) <= 2000)
);

-- One review per user per target
CREATE UNIQUE INDEX reviews_one_per_user
    ON reviews (target_type, target_id, user_id_hash);

CREATE INDEX reviews_target_idx ON reviews (target_type, target_id);
CREATE INDEX reviews_created_idx ON reviews (created_at DESC);
CREATE INDEX reviews_tags_gin ON reviews USING GIN (qualitative_tags);
CREATE INDEX reviews_ratings_gin ON reviews USING GIN (ratings);

-- Hierarchy lookup indexes
CREATE INDEX departments_university_idx ON departments (university_id);
CREATE INDEX professors_department_idx ON professors_advisors (department_id);
CREATE INDEX professors_name_trgm_idx ON professors_advisors (lower(name));
CREATE INDEX courses_department_idx ON courses (department_id);
CREATE INDEX courses_code_idx ON courses (course_code);
CREATE INDEX dorms_university_idx ON dorms_housing (university_id);

-- ---------------------------------------------------------------------------
-- Aggregate materialization helpers (updated by trigger or app layer)
-- ---------------------------------------------------------------------------
CREATE TABLE review_aggregates (
    target_type       review_target_type NOT NULL,
    target_id         UUID NOT NULL,
    review_count      INTEGER NOT NULL DEFAULT 0,
    avg_ratings       JSONB NOT NULL DEFAULT '{}',
    top_tags          TEXT[] NOT NULL DEFAULT '{}',
    updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (target_type, target_id)
);

-- ---------------------------------------------------------------------------
-- updated_at trigger
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER universities_updated_at
    BEFORE UPDATE ON universities
    FOR EACH ROW EXECUTE PROCEDURE set_updated_at();

CREATE TRIGGER departments_updated_at
    BEFORE UPDATE ON departments
    FOR EACH ROW EXECUTE PROCEDURE set_updated_at();

CREATE TRIGGER professors_updated_at
    BEFORE UPDATE ON professors_advisors
    FOR EACH ROW EXECUTE PROCEDURE set_updated_at();

CREATE TRIGGER courses_updated_at
    BEFORE UPDATE ON courses
    FOR EACH ROW EXECUTE PROCEDURE set_updated_at();

CREATE TRIGGER dorms_updated_at
    BEFORE UPDATE ON dorms_housing
    FOR EACH ROW EXECUTE PROCEDURE set_updated_at();

CREATE TRIGGER reviews_updated_at
    BEFORE UPDATE ON reviews
    FOR EACH ROW EXECUTE PROCEDURE set_updated_at();
