"""Shared Streamlit helpers — terms gate + profile_verified lock."""

from __future__ import annotations

from typing import Any

import streamlit as st

from supplement_checker.access_control import (
    analysis_allowed,
    apply_verification_state,
    evaluate_verification,
)
from supplement_checker.legal_notice import (
    GAPS_AND_KNOWLEDGE_LIMITS_NOTICE,
    NOTICE_VERSION,
    TermsAcceptance,
    TermsNotAcceptedError,
    assert_terms_accepted,
    build_terms_acceptance,
    terms_payload,
)
from supplement_checker.profile_ingestion import (
    ingest_profile,
    profile_to_storage_dict,
)


def get_session_profile() -> dict[str, Any] | None:
    return st.session_state.get("ingested_profile")


def get_session_terms() -> dict[str, Any] | None:
    return st.session_state.get("terms_acceptance")


def terms_accepted() -> bool:
    try:
        assert_terms_accepted(get_session_terms())
        return True
    except TermsNotAcceptedError:
        return False


def render_terms_gate(*, block_message: str) -> bool:
    """
    Mandatory Gaps & Knowledge Limits gate.

    Returns True only after the user checks the un-skippable agreement box
    and confirms acceptance. Blocks medical-history upload and scan UI otherwise.
    """
    if terms_accepted():
        record = TermsAcceptance.model_validate(get_session_terms())
        st.caption(
            f"Gaps & Knowledge Limits notice accepted "
            f"(v `{record.notice_version}` at {record.accepted_at})."
        )
        return True

    meta = terms_payload()
    st.warning("**Mandatory acceptance required** — this step cannot be skipped.")
    st.subheader(meta["title"])
    st.text_area(
        "Please read the full notice",
        value=GAPS_AND_KNOWLEDGE_LIMITS_NOTICE,
        height=280,
        disabled=True,
        label_visibility="collapsed",
    )
    st.error(block_message)

    checked = st.checkbox(meta["checkbox_label"], value=False, key="terms_checkbox")
    if st.button("I agree — continue", type="primary", use_container_width=True):
        if not checked:
            st.error(
                "You must check the agreement box. The Gaps & Knowledge Limits "
                "notice is un-skippable."
            )
            return False
        try:
            acceptance = build_terms_acceptance(accepted=True, method="checkbox_ui")
        except TermsNotAcceptedError as exc:
            st.error(str(exc))
            return False
        st.session_state["terms_acceptance"] = acceptance.model_dump(mode="json")
        st.rerun()

    st.info(f"Notice version: `{NOTICE_VERSION}` · skippable: **false**")
    return False


def require_terms_or_stop(*, for_profile_upload: bool = False) -> None:
    """Call at top of pages that need terms acceptance."""
    if for_profile_upload:
        msg = (
            "Before you can upload or enter a medical history profile, you must "
            "explicitly read and accept the Gaps & Knowledge Limits Notice."
        )
    else:
        msg = (
            "Before you can access the scan interface or analysis screens, you must "
            "explicitly read and accept the Gaps & Knowledge Limits Notice."
        )
    if not render_terms_gate(block_message=msg):
        st.stop()


def render_verification_banner() -> bool:
    """
    Show lock status. Returns True if analysis UI may proceed.
    Terms acceptance is required first.
    """
    require_terms_or_stop(for_profile_upload=False)

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
            f"Profile verified — analysis unlocked for "
            f"**{profile.display_name or profile.profile_id[:8]}**."
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
    _ = ok
    return False


def persist_profile(profile) -> None:
    st.session_state["ingested_profile"] = profile_to_storage_dict(profile)


def try_verify_session_profile() -> None:
    if not terms_accepted():
        st.error("Accept the Gaps & Knowledge Limits Notice before verifying a profile.")
        return
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
