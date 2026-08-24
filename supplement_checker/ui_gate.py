"""Shared Streamlit helpers for the profile_verified lock."""

from __future__ import annotations

from typing import Any

import streamlit as st

from supplement_checker.access_control import (
    analysis_allowed,
    apply_verification_state,
    evaluate_verification,
)
from supplement_checker.profile_ingestion import (
    ingest_profile,
    profile_to_storage_dict,
)


def get_session_profile() -> dict[str, Any] | None:
    return st.session_state.get("ingested_profile")


def render_verification_banner() -> bool:
    """
    Show lock status. Returns True if analysis UI may proceed.
    """
    raw = get_session_profile()
    if not raw:
        st.error(
            "**Analysis locked** — complete health history on the Profile page first "
            "(`profile_verified = False`)."
        )
        return False

    profile = ingest_profile(raw, trust_verified_flag=True)
    allowed = analysis_allowed(profile)
    if allowed:
        st.success(
            f"Profile verified — analysis unlocked for **{profile.display_name or profile.profile_id[:8]}**."
        )
        return True

    ok, gaps = evaluate_verification(profile)
    st.error(
        "**Analysis locked** (`profile_verified = False`). "
        "Mandatory health history must be completed and verified before "
        "label scanning or comparison."
    )
    if gaps:
        st.markdown("**Missing:**")
        for gap in gaps:
            st.markdown(f"- {gap}")
    st.info(
        "Add history via text, medical PDF / file upload metadata, or "
        "HealthKit / Health Connect sync, then click **Verify profile** on the Profile page."
    )
    # Silence unused in soft-check path
    _ = ok
    return False


def persist_profile(profile) -> None:
    st.session_state["ingested_profile"] = profile_to_storage_dict(profile)


def try_verify_session_profile() -> None:
    raw = get_session_profile()
    if not raw:
        st.warning("No profile loaded.")
        return
    profile = ingest_profile(raw, trust_verified_flag=True)
    profile = apply_verification_state(profile)
    persist_profile(profile)
    if profile.profile_verified:
        st.success("Profile verified. Scanning and comparison are unlocked.")
    else:
        st.error("Verification failed — history still incomplete.")
        for gap in profile.verification_gaps:
            st.markdown(f"- {gap}")
