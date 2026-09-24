"""Step 4 — Compare ingredients vs profile. Terms + verified + data-gap hard stops."""

from __future__ import annotations

import sys
from pathlib import Path

import streamlit as st

ROOT = Path(__file__).resolve().parents[2]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from supplement_checker.data_gaps import (
    DATA_GAP_UI_MESSAGE,
    evaluate_ingredients_with_gap_stops,
)
from supplement_checker.profile_ingestion import ingest_profile
from supplement_checker.ui_gate import get_session_profile, render_verification_banner

st.set_page_config(
    page_title="Supplement Checker — Comparison",
    layout="centered",
    initial_sidebar_state="expanded",
)

st.title("Profile comparison")
st.caption(
    "Step 4 of 4 — literature-backed flags. Unindexed items hard-stop with "
    "Data Gap Identified (no speculation)."
)

if not render_verification_banner():
    st.stop()

raw_profile = get_session_profile()
profile = ingest_profile(raw_profile, trust_verified_flag=True)
ingredients = st.session_state.get("extracted_ingredients") or [
    {"name": "Vitamin D3 (cholecalciferol)", "amount": 125, "unit": "mcg"},
    {"name": "Iron (ferrous bisglycinate)", "amount": 18, "unit": "mg"},
    {"name": "Caffeine (from green tea extract)", "amount": 50, "unit": "mg"},
    {"name": "Fish oil (omega-3)", "amount": 1000, "unit": "mg"},
    # Intentionally unindexed proprietary / rare variant for gap demo:
    {"name": "Proprietary NeuroBlend X-9", "amount": 500, "unit": "mg"},
]

gap_result = evaluate_ingredients_with_gap_stops(ingredients)

st.subheader("Profile snapshot")
c1, c2, c3, c4 = st.columns(4)
c1.metric("Conditions", profile.summary()["condition_count"])
c2.metric("Meds", profile.summary()["medication_count"])
c3.metric("Allergies", profile.summary()["allergy_count"])
c4.metric("Risk tokens", profile.summary()["risk_token_count"])

if gap_result["data_gaps"]:
    st.subheader("Data gaps — evaluation refused")
    st.error(DATA_GAP_UI_MESSAGE)
    for gap in gap_result["data_gaps"]:
        st.markdown(f"**{gap['ingredient']}**")
        st.caption(
            "Hard stop · safety_evaluation=None · mechanistic_evaluation=None · "
            "speculative_assessment_refused=True"
        )

risk = {t.lower() for t in profile.risk_tokens()}
evaluable = gap_result["evaluable_ingredients"]

st.subheader("Findings (indexed ingredients only)")
if not evaluable:
    st.warning("No ingredients cleared the literature-coverage gate for evaluation.")

FINDINGS = []
for item in evaluable:
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
    "Absence of a flag does not indicate safety. Unindexed items never receive "
    "speculative assessments. Not medical advice."
)
