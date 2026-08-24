"""Step 3 — Extracted ingredients from the label (vision model output)."""

from __future__ import annotations

import sys
from pathlib import Path

import streamlit as st

ROOT = Path(__file__).resolve().parents[2]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

st.set_page_config(
    page_title="Supplement Checker — Ingredients",
    layout="centered",
    initial_sidebar_state="expanded",
)

st.title("Extracted ingredients")
st.caption(
    "Step 3 of 4 — structured actives pulled from the label image via vision OCR."
)

# Demo extraction payload until the vision pipeline is wired.
DEMO_INGREDIENTS = [
    {
        "name": "Vitamin D3 (cholecalciferol)",
        "amount": 125,
        "unit": "mcg",
        "daily_value_pct": 625,
        "form": "cholecalciferol",
    },
    {
        "name": "Iron (ferrous bisglycinate)",
        "amount": 18,
        "unit": "mg",
        "daily_value_pct": 100,
        "form": "ferrous bisglycinate",
    },
    {
        "name": "Caffeine (from green tea extract)",
        "amount": 50,
        "unit": "mg",
        "daily_value_pct": None,
        "form": "green tea extract",
    },
    {
        "name": "Fish oil (omega-3)",
        "amount": 1000,
        "unit": "mg",
        "daily_value_pct": None,
        "form": "triglyceride",
    },
]

if "extracted_ingredients" not in st.session_state:
    st.session_state["extracted_ingredients"] = DEMO_INGREDIENTS

upload_name = st.session_state.get("label_upload_name")
if upload_name:
    st.info(f"Source label: **{upload_name}**")
else:
    st.warning("No label uploaded yet — showing demo extraction for UI preview.")

if st.button("Reset to demo extraction"):
    st.session_state["extracted_ingredients"] = DEMO_INGREDIENTS
    st.rerun()

ingredients = st.session_state["extracted_ingredients"]

st.subheader("Supplement Facts (parsed)")
st.dataframe(
    ingredients,
    use_container_width=True,
    hide_index=True,
)

st.subheader("Ingredient cards")
for item in ingredients:
    with st.container(border=True):
        left, right = st.columns([3, 1])
        with left:
            st.markdown(f"**{item['name']}**")
            st.caption(f"Form: {item.get('form') or '—'}")
        with right:
            amount = item.get("amount")
            unit = item.get("unit") or ""
            st.metric("Amount", f"{amount} {unit}".strip())
            dv = item.get("daily_value_pct")
            if dv is not None:
                st.caption(f"{dv}% DV")

st.markdown("---")
st.caption(
    "Vision model wiring comes next. Edit/confirm these rows before comparison."
)
