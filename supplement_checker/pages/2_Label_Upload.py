"""Step 2 — Supplement label image upload + vision OCR. LOCKED until verified."""

from __future__ import annotations

import sys
from pathlib import Path

import streamlit as st

ROOT = Path(__file__).resolve().parents[2]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from supplement_checker.ui_gate import render_verification_banner
from supplement_checker.vision_ocr import (
    extract_label_from_bytes,
    extraction_to_dicts,
)

st.set_page_config(
    page_title="Supplement Checker — Label Upload",
    layout="centered",
    initial_sidebar_state="expanded",
)

st.title("Label image upload")
st.caption(
    "Step 2 of 4 — upload a photo of the Supplement Facts panel. "
    "Blocked while `profile_verified = False`."
)

if not render_verification_banner():
    st.stop()

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
    raw = uploaded.getvalue()
    st.session_state["label_upload_name"] = uploaded.name
    st.session_state["label_upload_bytes"] = raw
    st.session_state["label_upload_type"] = uploaded.type
    st.image(uploaded, caption=uploaded.name, use_container_width=True)
    st.success(f"Saved upload: `{uploaded.name}` ({len(raw):,} bytes)")

    if st.button("Extract ingredients with vision model", type="primary"):
        result = extract_label_from_bytes(
            raw,
            filename=uploaded.name,
            content_type=uploaded.type,
        )
        st.session_state["extracted_ingredients"] = extraction_to_dicts(result)
        st.session_state["ocr_meta"] = {
            "provider": result.provider,
            "product_name": result.product_name,
            "serving_size": result.serving_size,
            "confidence": result.confidence,
        }
        st.success(
            f"OCR via **{result.provider}** — "
            f"{len(result.ingredients)} ingredients. Open **Ingredients**."
        )
        if result.provider == "demo":
            st.caption(
                "Demo OCR active. Set `OPENAI_API_KEY` or `ANTHROPIC_API_KEY` for live vision."
            )
elif st.session_state.get("label_upload_name"):
    st.write(f"Previously uploaded: `{st.session_state['label_upload_name']}`")
    if st.button("Re-run demo / vision extraction"):
        raw = st.session_state.get("label_upload_bytes") or b""
        result = extract_label_from_bytes(
            raw,
            filename=st.session_state["label_upload_name"],
            content_type=st.session_state.get("label_upload_type"),
        )
        st.session_state["extracted_ingredients"] = extraction_to_dicts(result)
        st.rerun()
else:
    st.markdown("---")
    st.subheader("Or run demo extraction")
    if st.button("Extract demo label (no photo)"):
        result = extract_label_from_bytes(b"", filename="demo")
        st.session_state["extracted_ingredients"] = extraction_to_dicts(result)
        st.session_state["ocr_meta"] = {"provider": result.provider}
        st.success("Demo ingredients ready — open **Ingredients**.")
