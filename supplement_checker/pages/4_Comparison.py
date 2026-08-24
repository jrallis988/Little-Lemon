"""Step 4 — Compare extracted ingredients against the health profile."""

from __future__ import annotations

import sys
from pathlib import Path

import streamlit as st

ROOT = Path(__file__).resolve().parents[2]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from supplement_checker.profile_ingestion import (
    example_profile,
    ingest_profile,
    profile_to_storage_dict,
)

st.set_page_config(
    page_title="Supplement Checker — Comparison",
    layout="centered",
    initial_sidebar_state="expanded",
)

st.title("Profile comparison")
st.caption(
    "Step 4 of 4 — flag conflicts, overlaps, and supportive matches with cited logic."
)

raw_profile = st.session_state.get("ingested_profile")
if not raw_profile:
    raw_profile = profile_to_storage_dict(example_profile())
    st.session_state["ingested_profile"] = raw_profile
    st.info("Using demo profile for comparison preview.")

profile = ingest_profile(raw_profile)
ingredients = st.session_state.get("extracted_ingredients") or [
    {"name": "Vitamin D3 (cholecalciferol)", "amount": 125, "unit": "mcg"},
    {"name": "Iron (ferrous bisglycinate)", "amount": 18, "unit": "mg"},
    {"name": "Caffeine (from green tea extract)", "amount": 50, "unit": "mg"},
    {"name": "Fish oil (omega-3)", "amount": 1000, "unit": "mg"},
]

risk = {t.lower() for t in profile.risk_tokens()}

# Lightweight heuristic preview — research-cited engine lands later.
FINDINGS = []
for item in ingredients:
    name = str(item.get("name") or "").lower()
    severity = "info"
    title = f"Review: {item.get('name')}"
    rationale = "No direct profile conflict detected in this preview heuristic."
    citations = [
        "Placeholder — replace with PubMed / NIH ODS citations in the research engine."
    ]

    if "caffeine" in name or "green tea" in name:
        if profile.caffeine_sensitive or "caffeine" in risk:
            severity = "warning"
            title = "Caffeine / stimulant sensitivity"
            rationale = (
                "Label includes caffeine or green tea extract and the profile "
                "marks caffeine sensitivity."
            )
            citations = [
                "NIH ODS: Caffeine — https://ods.od.nih.gov/factsheets/list-all/",
                "FDA consumer update on caffeine (informational).",
            ]
    if "iron" in name and any("anemia" in c.lower() or "iron" in c.lower() for c in risk):
        severity = "positive"
        title = "May support iron status"
        rationale = (
            "Profile notes iron-related concern; label lists an iron form. "
            "Dose and medical supervision still required."
        )
        citations = [
            "NIH ODS: Iron — https://ods.od.nih.gov/factsheets/Iron-HealthProfessional/",
        ]
    if "fish" in name or "shellfish" in name:
        if "shellfish" in risk:
            severity = "danger"
            title = "Possible allergen overlap (shellfish)"
            rationale = (
                "Profile lists shellfish allergy. Fish oil is not shellfish, but "
                "cross-contamination and personal history warrant clinician review."
            )
            citations = [
                "AAAAI / FARE guidance on fish vs shellfish allergy distinctions.",
            ]
    if "vitamin d" in name or "cholecalciferol" in name:
        if "vitamin d" in risk:
            severity = "positive"
            title = "Aligns with vitamin D flag"
            rationale = (
                "Profile nutrient flag for vitamin D; label includes D3. "
                "Confirm total intake vs labs."
            )
            citations = [
                "NIH ODS: Vitamin D — https://ods.od.nih.gov/factsheets/VitaminD-HealthProfessional/",
            ]

    FINDINGS.append(
        {
            "severity": severity,
            "title": title,
            "ingredient": item.get("name"),
            "rationale": rationale,
            "citations": citations,
        }
    )

st.subheader("Profile snapshot")
c1, c2, c3, c4 = st.columns(4)
c1.metric("Conditions", profile.summary()["condition_count"])
c2.metric("Meds", profile.summary()["medication_count"])
c3.metric("Allergies", profile.summary()["allergy_count"])
c4.metric("Risk tokens", profile.summary()["risk_token_count"])

st.subheader("Findings")
for finding in FINDINGS:
    severity = finding["severity"]
    if severity == "danger":
        box = st.error
    elif severity == "warning":
        box = st.warning
    elif severity == "positive":
        box = st.success
    else:
        box = st.info
    box(f"**{finding['title']}** — {finding['ingredient']}")
    st.markdown(finding["rationale"])
    with st.expander("Research / citation placeholders"):
        for cite in finding["citations"]:
            st.markdown(f"- {cite}")

st.markdown("---")
st.caption(
    "Heuristic preview only. Production comparison will cite primary literature "
    "and labeled interaction databases — not medical advice."
)
