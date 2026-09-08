"""
Modular cold-start seeder for Rate My University.

Usage:
  export DATABASE_URL=postgresql://rmu:rmu_dev_password@localhost:5432/rate_my_university
  python seed.py                          # seed everything
  python seed.py --only universities
  python seed.py --only departments
  python seed.py --only dorms
  python seed.py --only professors
  python seed.py --only courses
  python seed.py --university unh         # limit to one campus slug
"""

from __future__ import annotations

import argparse
import os
import sys
from pathlib import Path
from typing import Any

import psycopg
import yaml
from dotenv import load_dotenv

DATA_DIR = Path(__file__).resolve().parent / "data"


def load_yaml(name: str) -> dict[str, Any]:
    path = DATA_DIR / name
    if not path.exists():
        raise FileNotFoundError(f"Missing seed file: {path}")
    with path.open(encoding="utf-8") as fh:
        return yaml.safe_load(fh) or {}


def connect() -> psycopg.Connection:
    load_dotenv()
    url = os.getenv(
        "DATABASE_URL",
        "postgresql://rmu:rmu_dev_password@localhost:5432/rate_my_university",
    )
    url = url.replace("postgresql+asyncpg://", "postgresql://")
    return psycopg.connect(url)


def _department_id(
    cur: psycopg.Cursor,
    university_id: str,
    department_name: str,
) -> str | None:
    cur.execute(
        """
        SELECT id::text FROM departments
        WHERE university_id = %s AND name = %s
        """,
        (university_id, department_name),
    )
    row = cur.fetchone()
    return row[0] if row else None


# ---------------------------------------------------------------------------
# Seed modules
# ---------------------------------------------------------------------------


def seed_universities(
    conn: psycopg.Connection, *, only_slug: str | None = None
) -> dict[str, str]:
    """Upsert universities; return {slug: id} map."""
    payload = load_yaml("universities.yaml")
    rows = payload.get("universities", [])
    slug_to_id: dict[str, str] = {}

    with conn.cursor() as cur:
        for row in rows:
            if only_slug and row["slug"] != only_slug:
                continue
            cur.execute(
                """
                INSERT INTO universities (name, domain, location, slug)
                VALUES (%(name)s, %(domain)s, %(location)s, %(slug)s)
                ON CONFLICT (slug) DO UPDATE
                  SET name = EXCLUDED.name,
                      domain = EXCLUDED.domain,
                      location = EXCLUDED.location
                RETURNING id::text, slug
                """,
                row,
            )
            uid, slug = cur.fetchone()
            slug_to_id[slug] = uid
            print(f"  ✓ university {slug}")

    conn.commit()
    return slug_to_id


def seed_departments(
    conn: psycopg.Connection,
    slug_to_id: dict[str, str],
    *,
    only_slug: str | None = None,
) -> None:
    payload = load_yaml("departments.yaml")
    defaults: list[dict[str, str]] = payload.get("defaults", [])
    by_uni: dict[str, list[dict[str, str]]] = payload.get("by_university", {})

    with conn.cursor() as cur:
        for slug, university_id in slug_to_id.items():
            if only_slug and slug != only_slug:
                continue
            catalog: dict[str, dict[str, str]] = {d["name"]: d for d in defaults}
            for override in by_uni.get(slug, []):
                catalog[override["name"]] = override

            for dept in catalog.values():
                cur.execute(
                    """
                    INSERT INTO departments (university_id, name, code)
                    VALUES (%s, %s, %s)
                    ON CONFLICT (university_id, name) DO UPDATE
                      SET code = COALESCE(EXCLUDED.code, departments.code)
                    """,
                    (university_id, dept["name"], dept.get("code")),
                )
            print(f"  ✓ departments for {slug} ({len(catalog)})")

    conn.commit()


def seed_dorms(
    conn: psycopg.Connection,
    slug_to_id: dict[str, str],
    *,
    only_slug: str | None = None,
) -> None:
    payload = load_yaml("dorms.yaml")
    by_uni: dict[str, list[dict[str, Any]]] = payload.get("by_university", {})

    with conn.cursor() as cur:
        for slug, dorms in by_uni.items():
            if only_slug and slug != only_slug:
                continue
            university_id = slug_to_id.get(slug)
            if not university_id:
                print(f"  ⚠ skip dorms for unknown slug {slug}")
                continue
            for dorm in dorms:
                cur.execute(
                    """
                    INSERT INTO dorms_housing
                      (university_id, building_name, campus_zone, capacity, is_verified)
                    VALUES (%s, %s, %s, %s, TRUE)
                    ON CONFLICT (university_id, building_name) DO UPDATE
                      SET campus_zone = EXCLUDED.campus_zone,
                          capacity = EXCLUDED.capacity,
                          is_verified = TRUE
                    """,
                    (
                        university_id,
                        dorm["building_name"],
                        dorm.get("campus_zone"),
                        dorm.get("capacity"),
                    ),
                )
            print(f"  ✓ dorms for {slug} ({len(dorms)})")

    conn.commit()


def seed_professors(
    conn: psycopg.Connection,
    slug_to_id: dict[str, str],
    *,
    only_slug: str | None = None,
) -> None:
    payload = load_yaml("professors.yaml")
    by_uni: dict[str, list[dict[str, Any]]] = payload.get("by_university", {})

    with conn.cursor() as cur:
        for slug, people in by_uni.items():
            if only_slug and slug != only_slug:
                continue
            university_id = slug_to_id.get(slug)
            if not university_id:
                print(f"  ⚠ skip professors for unknown slug {slug}")
                continue
            created = 0
            for person in people:
                dept_id = _department_id(cur, university_id, person["department"])
                if not dept_id:
                    print(
                        f"  ⚠ missing department '{person['department']}' for {slug}"
                    )
                    continue
                cur.execute(
                    """
                    INSERT INTO professors_advisors
                      (department_id, name, type, title, is_verified)
                    SELECT %s, %s, %s::person_type, %s, TRUE
                    WHERE NOT EXISTS (
                      SELECT 1 FROM professors_advisors
                      WHERE department_id = %s AND lower(name) = lower(%s)
                    )
                    """,
                    (
                        dept_id,
                        person["name"],
                        person.get("type", "professor"),
                        person.get("title"),
                        dept_id,
                        person["name"],
                    ),
                )
                created += cur.rowcount
            print(f"  ✓ professors for {slug} (+{created})")

    conn.commit()


def seed_courses(
    conn: psycopg.Connection,
    slug_to_id: dict[str, str],
    *,
    only_slug: str | None = None,
) -> None:
    payload = load_yaml("courses.yaml")
    by_uni: dict[str, list[dict[str, Any]]] = payload.get("by_university", {})

    with conn.cursor() as cur:
        for slug, courses in by_uni.items():
            if only_slug and slug != only_slug:
                continue
            university_id = slug_to_id.get(slug)
            if not university_id:
                print(f"  ⚠ skip courses for unknown slug {slug}")
                continue
            for course in courses:
                dept_id = _department_id(cur, university_id, course["department"])
                if not dept_id:
                    print(
                        f"  ⚠ missing department '{course['department']}' for {slug}"
                    )
                    continue
                code = course["course_code"].strip().upper()
                cur.execute(
                    """
                    INSERT INTO courses
                      (department_id, course_code, course_name, credits, is_verified)
                    VALUES (%s, %s, %s, %s, TRUE)
                    ON CONFLICT (department_id, course_code) DO UPDATE
                      SET course_name = EXCLUDED.course_name,
                          credits = EXCLUDED.credits,
                          is_verified = TRUE
                    """,
                    (
                        dept_id,
                        code,
                        course["course_name"].strip(),
                        course.get("credits"),
                    ),
                )
            print(f"  ✓ courses for {slug} ({len(courses)})")

    conn.commit()


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------

MODULES = ("universities", "departments", "dorms", "professors", "courses")
CHILD_MODULES = {"departments", "dorms", "professors", "courses"}


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Seed Rate My University foundational data")
    parser.add_argument("--only", choices=MODULES, help="Run a single seed module")
    parser.add_argument(
        "--university",
        dest="university_slug",
        help="Limit seeding to one university slug (e.g. unh)",
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    steps = (args.only,) if args.only else MODULES

    print("Connecting…")
    try:
        conn = connect()
    except Exception as exc:  # noqa: BLE001
        print(f"Failed to connect: {exc}", file=sys.stderr)
        return 1

    try:
        slug_to_id: dict[str, str] = {}
        needs_universities = "universities" in steps or bool(
            set(steps) & CHILD_MODULES
        )
        if needs_universities:
            print("Seeding universities…")
            slug_to_id = seed_universities(conn, only_slug=args.university_slug)

        if "departments" in steps or (
            set(steps) & {"professors", "courses"} and "departments" not in steps
        ):
            # Professors/courses need departments present
            if "departments" not in steps:
                print("Ensuring departments…")
            else:
                print("Seeding departments…")
            seed_departments(conn, slug_to_id, only_slug=args.university_slug)

        if "dorms" in steps:
            print("Seeding dorms…")
            seed_dorms(conn, slug_to_id, only_slug=args.university_slug)

        if "professors" in steps:
            print("Seeding professors…")
            seed_professors(conn, slug_to_id, only_slug=args.university_slug)

        if "courses" in steps:
            print("Seeding courses…")
            seed_courses(conn, slug_to_id, only_slug=args.university_slug)

        print("Done.")
        return 0
    finally:
        conn.close()


if __name__ == "__main__":
    raise SystemExit(main())
