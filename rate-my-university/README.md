# Rate My University

All-in-one student utility for hierarchical campus ratings:

**University → Campus / Dorms → Courses → Professors & Academic Advisors**

This monorepo contains the foundational architecture: PostgreSQL schema, FastAPI backend, Python cold-start seeder, and a React Native (Expo) mobile shell.

## Repository layout

```
rate-my-university/
├── docker-compose.yml          # Postgres 16 + FastAPI API
├── database/
│   └── schema.sql              # Full relational schema + indexes
├── backend/
│   ├── Dockerfile
│   ├── requirements.txt
│   └── app/
│       ├── main.py             # FastAPI entrypoint
│       ├── database.py         # Async SQLAlchemy session
│       ├── core/               # Settings + rating metric constants
│       ├── models/             # ORM models
│       ├── schemas/            # Pydantic request/response models
│       ├── services/           # Hierarchy queries + review auto-create
│       └── api/routes/         # REST routers
├── scripts/seed/
│   ├── seed.py                 # Modular YAML-driven seeder
│   ├── requirements.txt
│   └── data/                   # universities / departments / dorms
└── mobile/                     # Expo React Native app
    ├── App.tsx
    └── src/
        ├── navigation/         # Tab navigator (Home, Directory, Add, Profile)
        ├── screens/
        ├── components/         # LayeredSearch + RatingSlider + form
        ├── api/
        ├── types/
        └── constants/
```

## Quick start

### 1. Database + API

```bash
cd rate-my-university
docker compose up --build
```

- API docs: http://localhost:8000/docs  
- Health: http://localhost:8000/health  
- Postgres: `localhost:5432` · db `rate_my_university` · user/pass `rmu` / `rmu_dev_password`

### 2. Seed foundational campuses

```bash
cd scripts/seed
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
export DATABASE_URL=postgresql://rmu:rmu_dev_password@localhost:5432/rate_my_university
python seed.py
# or: python seed.py --university unh --only departments
```

### 3. Mobile app

```bash
cd mobile
npm install
EXPO_PUBLIC_API_URL=http://localhost:8000/api/v1 npm start
```

Use a LAN IP instead of `localhost` when running on a physical device.

## API surface (v1)

| Method | Path | Purpose |
|--------|------|---------|
| GET | `/api/v1/universities` | List / filter universities |
| GET | `/api/v1/universities/{id}/departments` | Departments for a campus |
| GET | `/api/v1/universities/{id}/professors` | Professors & advisors |
| GET | `/api/v1/universities/{id}/courses` | Courses |
| GET | `/api/v1/universities/{id}/dorms` | Housing |
| GET | `/api/v1/departments/{id}/professors` | People under a department |
| GET | `/api/v1/departments/{id}/courses` | Courses under a department |
| GET | `/api/v1/search?q=` | Cross-hierarchy directory search |
| POST | `/api/v1/reviews` | Submit review (auto-create fallback) |
| GET | `/api/v1/reviews/{type}/{id}` | List reviews for a target |
| GET | `/api/v1/reviews/{type}/{id}/aggregate` | Averaged metrics + top tags |

### Review auto-create

Omit `target_id` and supply the matching `create_*` payload. Example for a newly hired professor:

```json
{
  "target_type": "professor",
  "user_token": "device-opaque-token",
  "ratings": {
    "clarity": 4,
    "helpfulness": 5,
    "difficulty": 3,
    "would_recommend": 5
  },
  "qualitative_tags": ["engaging", "clear-lectures"],
  "comment": "Great first semester.",
  "create_professor": {
    "name": "Dr. Ada Lovelace",
    "type": "professor",
    "department_name": "Computer Science",
    "university_id": "<uuid>"
  }
}
```

`user_token` is SHA-256 hashed before storage; one review per user per target is enforced.

## Design notes

- **Polymorphic reviews** via `(target_type, target_id)` keep rating logic uniform across the hierarchy.
- **JSONB multi-metric ratings** are validated against per-type metric keys in `backend/app/core/constants.py`.
- **`is_verified`** distinguishes seed/catalog entities from student-submitted auto-creates.
- **Mobile tabs**: Home · Directory (layered search) · Add Entry · Profile.
