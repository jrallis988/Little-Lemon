"""
Profile × ingredient comparison with literature citations.

Only evaluates ingredients that clear the data-gap / literature-coverage gate.
Never invents safety claims for unindexed items.
"""

from __future__ import annotations

from typing import Any

from .data_gaps import (
    DATA_GAP_UI_MESSAGE,
    evaluate_ingredients_with_gap_stops,
    lookup_literature_coverage,
)
from .literature import citations_for_ingredient, literature_status_for_ingredient
from .profile_ingestion import HealthProfile


def _severity_box(level: str) -> str:
    return level  # danger | warning | positive | info


def compare_profile_to_ingredients(
    profile: HealthProfile,
    ingredients: list[dict[str, Any]],
    *,
    use_live_literature: bool = True,
) -> dict[str, Any]:
    """
    Run literature coverage gate, then profile-aware findings for evaluable items.
    """
    if use_live_literature:
        # Re-check each ingredient via PubMed (falls back offline).
        enriched: list[dict[str, Any]] = []
        data_gaps: list[dict[str, Any]] = []
        for item in ingredients:
            name = str(item.get("name") or item.get("ingredient") or "").strip()
            status = literature_status_for_ingredient(name)
            if status.allows_evaluation:
                enriched.append(
                    {
                        **item,
                        "literature_coverage": status.coverage.value,
                        "indexed_record_count": status.indexed_record_count,
                        "literature_notes": status.notes,
                    }
                )
            else:
                data_gaps.append(
                    {
                        "ingredient": name,
                        "dosage": item.get("amount"),
                        "unit": item.get("unit"),
                        "coverage": status.coverage.value,
                        "hard_stop": True,
                        "ui_message": DATA_GAP_UI_MESSAGE,
                        "reason": status.notes,
                        "safety_evaluation": None,
                        "mechanistic_evaluation": None,
                        "speculative_assessment_refused": True,
                    }
                )
        gap_result = {
            "evaluable_ingredients": enriched,
            "data_gaps": data_gaps,
            "evaluation_blocked_for_gaps": len(data_gaps) > 0,
            "notice": DATA_GAP_UI_MESSAGE if data_gaps else None,
        }
    else:
        gap_result = evaluate_ingredients_with_gap_stops(ingredients)

    risk = {t.lower() for t in profile.risk_tokens()}
    findings: list[dict[str, Any]] = []

    for item in gap_result["evaluable_ingredients"]:
        name = str(item.get("name") or "")
        lower = name.lower()
        severity = "info"
        title = f"Review: {name}"
        rationale = (
            "Indexed literature exists; no direct profile conflict detected "
            "in this rule set. Confirm with a clinician."
        )

        if ("caffeine" in lower or "green tea" in lower) and (
            profile.caffeine_sensitive or "caffeine" in risk
        ):
            severity = "warning"
            title = "Caffeine / stimulant sensitivity"
            rationale = (
                "Label includes caffeine or green tea extract and the profile "
                "marks caffeine sensitivity."
            )
        if "iron" in lower and any(
            "anemia" in token or "iron" in token for token in risk
        ):
            severity = "positive"
            title = "May support iron status"
            rationale = (
                "Profile notes iron-related concern; label lists an iron form. "
                "Dose and medical supervision still required."
            )
        if ("fish" in lower or "shellfish" in lower) and "shellfish" in risk:
            severity = "danger"
            title = "Possible allergen overlap (shellfish)"
            rationale = (
                "Profile lists shellfish allergy. Fish oil is not shellfish, but "
                "cross-contamination and personal history warrant clinician review."
            )
        if ("vitamin d" in lower or "cholecalciferol" in lower) and "vitamin d" in risk:
            severity = "positive"
            title = "Aligns with vitamin D flag"
            rationale = (
                "Profile nutrient flag for vitamin D; label includes D3. "
                "Confirm total intake vs labs."
            )

        cites = citations_for_ingredient(name, limit=3) if use_live_literature else []
        if not cites:
            # Offline / fallback citations stay clearly labeled as placeholders.
            status = lookup_literature_coverage(name)
            cites = [
                {
                    "pmid": None,
                    "title": status.notes or "Prototype index match only",
                    "url": "https://pubmed.ncbi.nlm.nih.gov/",
                    "source": "prototype_index",
                }
            ]

        findings.append(
            {
                "severity": _severity_box(severity),
                "title": title,
                "ingredient": name,
                "amount": item.get("amount"),
                "unit": item.get("unit"),
                "rationale": rationale,
                "citations": cites,
                "indexed_record_count": item.get("indexed_record_count"),
                "disclaimer": (
                    "Exploratory research projection only — not a diagnosis "
                    "or treatment recommendation. Absence of a flag does not "
                    "indicate safety."
                ),
            }
        )

    return {
        "status": "completed_with_gaps" if gap_result["data_gaps"] else "completed",
        "profile_id": profile.profile_id,
        "profile_summary": profile.summary(),
        "risk_tokens": sorted(profile.risk_tokens()),
        "evaluable_ingredients": gap_result["evaluable_ingredients"],
        "data_gaps": gap_result["data_gaps"],
        "evaluation_blocked_for_gaps": gap_result["evaluation_blocked_for_gaps"],
        "data_gap_notice": DATA_GAP_UI_MESSAGE if gap_result["data_gaps"] else None,
        "findings": findings,
        "message": (
            "Comparison ran only on ingredients with sufficient indexed literature. "
            "Unindexed items received an explicit Data Gap Identified hard stop."
        ),
    }
