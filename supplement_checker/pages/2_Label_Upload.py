"""Step 2 — Supplement label image upload (vision OCR input)."""

from __future__ import annotations

import sys
from pathlib import Path

import streamlit as st

ROOT = Path(__file__).resolve().parents[2]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

st.set_page_config(
    page_title="Supplement Checker — Label Upload",
    layout="centered",
    initial_sidebar_state="expanded",
)

st.title("Label image upload")
st.caption(
    "Step 2 of 4 — upload a photo of the Supplement Facts / ingredients panel."
)

profile = st.session_state.get("ingested_profile")
if profile:
    st.info(f"Active profile: **{profile.get('display_name') or 'Unnamed'}**")
else:
    st.warning("No profile yet — ingest one on the Profile page first (demo OK).")

uploaded = st.file_uploader(
    "Supplement label photo",
    type=["png", "jpg", "jpeg", "webp"],
    help="Clear, well-lit shot of the ingredients or Supplement Facts panel.",
)

col_a, col_b = st.columns(2)
with col_a:
    st.markdown("**Tips for a good capture**")
    st.markdown(
        "- Fill the frame with the facts panel\n"
        "- Avoid glare and blur\n"
        "- Include serving size if visible"
    )
with col_b:
    st.markdown("**What happens next**")
    st.markdown(
        "- Vision model reads ingredient lines\n"
        "- Amounts + units are normalized\n"
        "- Results appear on **Ingredients**"
    )

if uploaded is not None:
    st.session_state["label_upload_name"] = uploaded.name
    st.session_state["label_upload_bytes"] = uploaded.getvalue()
    st.session_state["label_upload_type"] = uploaded.type
    st.image(uploaded, caption=uploaded.name, use_container_width=True)
    st.success(f"Saved upload: `{uploaded.name}` ({len(uploaded.getvalue()):,} bytes)")
    st.button("Extract ingredients with vision model", type="primary", disabled=True)
    st.caption("Vision extraction hooks up next — placeholder button for now.")
elif st.session_state.get("label_upload_name"):
    st.write(f"Previously uploaded: `{st.session_state['label_upload_name']}`")
else:
    st.markdown("---")
    st.subheader("Preview placeholder")
    st.markdown(
        "Once you upload a label, a preview appears here. "
        "Use a phone photo of any multivitamin or protein powder facts panel."
    )
