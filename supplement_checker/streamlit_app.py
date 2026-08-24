"""
Streamlit multipage entry — Supplement Checker.

Pages:
  1. Health profile ingestion (this file)
  2. Label upload
  3. Extracted ingredients
  4. Profile comparison

Run:
  streamlit run supplement_checker/streamlit_app.py --server.port 8501

Cloudflare Tunnel:
  cloudflared tunnel --url http://127.0.0.1:8501
"""

from __future__ import annotations

import json
import sys
from pathlib import Path

import streamlit as st

ROOT = Path(__file__).resolve().parents[1]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from supplement_checker.profile_ingestion import (
    Allergy,
    AllergyType,
    BiologicalSex,
    Condition,
    CurrentSupplement,
    Demographics,
    DietaryRestriction,
    GoalCategory,
    HealthGoal,
    HealthProfile,
    HistorySource,
    HistorySourceType,
    LactationStatus,
    Medication,
    NutrientFlag,
    PregnancyStatus,
    ProfileIngestionError,
    Severity,
    example_profile,
    ingest_profile,
    profile_to_storage_dict,
)
from supplement_checker.ui_gate import try_verify_session_profile


st.set_page_config(
    page_title="Supplement Checker — Profile",
    layout="centered",
    initial_sidebar_state="expanded",
)

st.title("Health profile ingestion")
st.caption(
    "Research aggregation only — not a medical device or diagnostic tool. "
    "Step 1 of 4 — mandatory history before any scan (`profile_verified` lock)."
)

with st.sidebar:
    st.header("Quick start")
    if st.button("Load demo profile", use_container_width=True):
        st.session_state["demo_seed"] = profile_to_storage_dict(example_profile())
        st.rerun()
    st.markdown(
        "**Non-negotiable:** Label upload / ingredients / comparison stay locked "
        "until you verify the health history."
    )
    if st.button("Verify profile", type="primary", use_container_width=True):
        try_verify_session_profile()


demo = st.session_state.get("demo_seed") or {}
demo_demo = demo.get("demographics") or {}

st.subheader("Demographics")
c1, c2 = st.columns(2)
with c1:
    display_name = st.text_input(
        "Display name",
        value=(demo.get("display_name") or "Demo User"),
    )
    age_years = st.number_input(
        "Age (years)",
        min_value=0,
        max_value=120,
        value=int(demo_demo.get("age_years") or 34),
    )
with c2:
    biological_sex = st.selectbox(
        "Biological sex",
        options=[s.value for s in BiologicalSex],
        index=[s.value for s in BiologicalSex].index(
            demo_demo.get("biological_sex") or BiologicalSex.FEMALE.value
        ),
    )
    pregnancy_status = st.selectbox(
        "Pregnancy status",
        options=[s.value for s in PregnancyStatus],
        index=[s.value for s in PregnancyStatus].index(
            demo_demo.get("pregnancy_status") or PregnancyStatus.NOT_PREGNANT.value
        ),
    )
    lactation_status = st.selectbox(
        "Lactation status",
        options=[s.value for s in LactationStatus],
        index=[s.value for s in LactationStatus].index(
            demo_demo.get("lactation_status") or LactationStatus.NOT_LACTATING.value
        ),
    )

st.subheader("Clinical context")
conditions_raw = st.text_area(
    "Conditions (one per line)",
    value="\n".join(c["name"] for c in demo.get("conditions") or [])
    or "migraine\niron-deficiency anemia",
    height=90,
)
medications_raw = st.text_area(
    "Medications (one per line: name | dose | frequency)",
    value="\n".join(
        " | ".join(
            filter(
                None,
                [m.get("name"), m.get("dose"), m.get("frequency")],
            )
        )
        for m in demo.get("medications") or []
    )
    or "sumatriptan | 50 mg | as needed",
    height=90,
)
allergies_raw = st.text_area(
    "Allergies (one per line: substance | type | severity)",
    value="\n".join(
        " | ".join(
            filter(
                None,
                [a.get("substance"), a.get("allergy_type"), a.get("severity")],
            )
        )
        for a in demo.get("allergies") or []
    )
    or "shellfish | food | severe",
    height=90,
)
allergies_reviewed = st.checkbox(
    "I reviewed the allergy section (required even if empty)",
    value=bool(demo.get("allergies_reviewed", True)),
)

st.subheader("Mandatory health history sources")
st.caption(
    "Provide at least one of: text intake, medical PDF/file (R2 key), "
    "or HealthKit / Health Connect sync."
)
history_text = st.text_area(
    "Direct text intake",
    value=next(
        (
            s.get("text_excerpt") or ""
            for s in demo.get("history_sources") or []
            if s.get("source_type") == "text_input"
        ),
        "Migraine history; iron-deficiency anemia; shellfish allergy.",
    ),
    height=80,
)
medical_pdf_key = st.text_input(
    "Medical PDF R2 object key (optional)",
    value=next(
        (
            s.get("r2_object_key") or ""
            for s in demo.get("history_sources") or []
            if s.get("source_type") == "medical_pdf"
        ),
        "",
    ),
    placeholder="medical/{profile_id}/2026/08/{source_id}/record.pdf",
)
device_sync = st.selectbox(
    "Native device health sync",
    options=["none", "apple_healthkit", "google_health_connect"],
    index=1 if any(
        s.get("source_type") == "apple_healthkit"
        for s in demo.get("history_sources") or []
    ) else 0,
)

st.subheader("Lifestyle & goals")
diet_raw = st.text_input(
    "Dietary restrictions (comma-separated)",
    value=", ".join(d["label"] for d in demo.get("dietary_restrictions") or [])
    or "gluten-free",
)
goal_options = [g.value for g in GoalCategory]
default_goals = [g["category"] for g in demo.get("goals") or []] or [
    GoalCategory.ENERGY.value,
    GoalCategory.SLEEP.value,
]
goals_selected = st.multiselect(
    "Health goals",
    options=goal_options,
    default=[g for g in default_goals if g in goal_options],
)
caffeine_sensitive = st.checkbox(
    "Caffeine sensitive",
    value=bool(demo.get("caffeine_sensitive", True)),
)
stimulant_sensitive = st.checkbox(
    "Stimulant sensitive",
    value=bool(demo.get("stimulant_sensitive", False)),
)
notes = st.text_area("Notes", value=demo.get("notes") or "", height=80)


def _lines(text: str) -> list[str]:
    return [ln.strip() for ln in text.splitlines() if ln.strip()]


def _split_row(line: str) -> list[str]:
    return [part.strip() for part in line.split("|")]


def build_payload() -> dict:
    conditions = [Condition(name=name) for name in _lines(conditions_raw)]

    medications: list[Medication] = []
    for line in _lines(medications_raw):
        parts = _split_row(line)
        medications.append(
            Medication(
                name=parts[0],
                dose=parts[1] if len(parts) > 1 and parts[1] else None,
                frequency=parts[2] if len(parts) > 2 and parts[2] else None,
            )
        )

    allergies: list[Allergy] = []
    for line in _lines(allergies_raw):
        parts = _split_row(line)
        allergy_type = AllergyType.OTHER
        severity = Severity.UNKNOWN
        if len(parts) > 1 and parts[1]:
            try:
                allergy_type = AllergyType(parts[1].lower())
            except ValueError:
                allergy_type = AllergyType.OTHER
        if len(parts) > 2 and parts[2]:
            try:
                severity = Severity(parts[2].lower())
            except ValueError:
                severity = Severity.UNKNOWN
        allergies.append(
            Allergy(
                substance=parts[0],
                allergy_type=allergy_type,
                severity=severity,
            )
        )

    dietary = [
        DietaryRestriction(label=label.strip())
        for label in diet_raw.split(",")
        if label.strip()
    ]
    goals = [
        HealthGoal(category=GoalCategory(g), priority=i + 1)
        for i, g in enumerate(goals_selected)
    ]

    nutrient_flags = [
        NutrientFlag(**item) for item in demo.get("nutrient_flags") or []
    ]
    current_supplements = [
        CurrentSupplement(**item) for item in demo.get("current_supplements") or []
    ]

    history_sources: list[HistorySource] = []
    if history_text.strip():
        history_sources.append(
            HistorySource(
                source_type=HistorySourceType.TEXT_INPUT,
                label="Intake questionnaire",
                text_excerpt=history_text.strip(),
            )
        )
    if medical_pdf_key.strip():
        history_sources.append(
            HistorySource(
                source_type=HistorySourceType.MEDICAL_PDF,
                label="Medical record PDF",
                r2_object_key=medical_pdf_key.strip(),
            )
        )
    if device_sync == "apple_healthkit":
        history_sources.append(
            HistorySource(
                source_type=HistorySourceType.APPLE_HEALTHKIT,
                label="Apple HealthKit sync",
            )
        )
    elif device_sync == "google_health_connect":
        history_sources.append(
            HistorySource(
                source_type=HistorySourceType.GOOGLE_HEALTH_CONNECT,
                label="Google Health Connect sync",
            )
        )

    profile = HealthProfile(
        display_name=display_name or None,
        allergies_reviewed=allergies_reviewed,
        history_sources=history_sources,
        demographics=Demographics(
            age_years=int(age_years),
            biological_sex=BiologicalSex(biological_sex),
            pregnancy_status=PregnancyStatus(pregnancy_status),
            lactation_status=LactationStatus(lactation_status),
        ),
        conditions=conditions,
        medications=medications,
        allergies=allergies,
        dietary_restrictions=dietary,
        goals=goals,
        nutrient_flags=nutrient_flags,
        current_supplements=current_supplements,
        caffeine_sensitive=caffeine_sensitive,
        stimulant_sensitive=stimulant_sensitive,
        notes=notes or None,
        profile_verified=False,
    )
    return profile_to_storage_dict(profile)


if st.button("Ingest profile", type="primary", use_container_width=True):
    try:
        payload = build_payload()
        profile = ingest_profile(payload, trust_verified_flag=False)
        st.session_state["ingested_profile"] = profile_to_storage_dict(profile)
        st.success(
            "Profile ingested (still locked). Use **Verify profile** in the sidebar "
            "after history sources are complete."
        )
    except (ProfileIngestionError, ValueError) as exc:
        st.error(f"Ingestion failed: {exc}")

if "ingested_profile" in st.session_state:
    stored = st.session_state["ingested_profile"]
    try:
        profile = ingest_profile(stored, trust_verified_flag=True)
    except ProfileIngestionError as exc:
        st.error(str(exc))
    else:
        st.subheader("Validated summary")
        st.json(profile.summary())
        lock = "UNLOCKED" if profile.profile_verified else "LOCKED"
        st.markdown(f"**Analysis gate:** `{lock}` (`profile_verified={profile.profile_verified}`)")
        st.subheader("Risk tokens (for ingredient matching)")
        st.write(sorted(profile.risk_tokens()))
        st.subheader("Stored JSON")
        st.code(json.dumps(stored, indent=2), language="json")
        st.download_button(
            "Download profile JSON",
            data=json.dumps(stored, indent=2),
            file_name=f"health_profile_{profile.profile_id[:8]}.json",
            mime="application/json",
            use_container_width=True,
        )
