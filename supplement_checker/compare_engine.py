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
    normalize_ingredient_name,
)
from .literature import citations_for_ingredient, literature_status_for_ingredient
from .profile_ingestion import HealthProfile, PregnancyStatus, LactationStatus


# Lightweight interaction / caution map for evaluable ingredients only.
# Citations are research pointers — not prescribing guidance.
KNOWN_MED_CAUTIONS: dict[str, list[str]] = {
    "sumatriptan": ["caffeine", "green tea", "synephrine", "yohimbine"],
    "warfarin": ["vitamin k", "vitamin e", "fish oil", "omega-3", "garlic", "ginkgo"],
    "levothyroxine": ["iron", "calcium", "soy"],
    "ssri": ["st john", "st. john", "5-htp", "tryptophan"],
    "sertraline": ["st john", "st. john", "5-htp"],
    "escitalopram": ["st john", "st. john", "5-htp"],
}

PREGNANCY_EXTRA_CAUTION = {
    "caffeine",
    "green tea",
    "vitamin a",
    "retinol",
    "yohimbine",
    "synephrine",
}


def _findings_for_item(
    profile: HealthProfile,
    item: dict[str, Any],
    risk: set[str],
    *,
    use_live_literature: bool,
) -> list[dict[str, Any]]:
    name = str(item.get("name") or "")
    lower = name.lower()
    norm = normalize_ingredient_name(name)
    findings: list[dict[str, Any]] = []

    def add(
        *,
        severity: str,
        title: str,
        rationale: str,
        rule_id: str,
    ) -> None:
        cites = citations_for_ingredient(name, limit=3) if use_live_literature else []
        if not cites:
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
                "severity": severity,
                "title": title,
                "ingredient": name,
                "amount": item.get("amount"),
                "unit": item.get("unit"),
                "rule_id": rule_id,
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

    # Default informational review if no stronger rule fires.
    matched = False

    if ("caffeine" in lower or "green tea" in lower) and (
        profile.caffeine_sensitive or "caffeine" in risk
    ):
        matched = True
        add(
            severity="warning",
            title="Caffeine / stimulant sensitivity",
            rationale=(
                "Label includes caffeine or green tea extract and the profile "
                "marks caffeine sensitivity."
            ),
            rule_id="caffeine_sensitivity",
        )

    if profile.stimulant_sensitive and any(
        tok in lower for tok in ("synephrine", "yohimbine", "ephedra", "dmaa")
    ):
        matched = True
        add(
            severity="warning",
            title="Stimulant sensitivity",
            rationale="Profile marks stimulant sensitivity and label lists a stimulant-class active.",
            rule_id="stimulant_sensitivity",
        )

    if "iron" in lower and any("anemia" in token or "iron" in token for token in risk):
        matched = True
        add(
            severity="positive",
            title="May support iron status",
            rationale=(
                "Profile notes iron-related concern; label lists an iron form. "
                "Dose and medical supervision still required."
            ),
            rule_id="iron_status_align",
        )

    if ("fish" in lower or "shellfish" in lower) and "shellfish" in risk:
        matched = True
        add(
            severity="danger",
            title="Possible allergen overlap (shellfish)",
            rationale=(
                "Profile lists shellfish allergy. Fish oil is not shellfish, but "
                "cross-contamination and personal history warrant clinician review."
            ),
            rule_id="shellfish_allergen_overlap",
        )

    # Generic allergy substance intersection
    for allergy in profile.allergies:
        substance = allergy.substance.lower()
        if substance and substance in lower:
            matched = True
            add(
                severity="danger",
                title=f"Allergy match: {allergy.substance}",
                rationale=(
                    f"Label text appears to reference allergy substance "
                    f"'{allergy.substance}' (severity: {allergy.severity.value})."
                ),
                rule_id="allergy_substance_match",
            )

    if ("vitamin d" in lower or "cholecalciferol" in lower) and "vitamin d" in risk:
        matched = True
        add(
            severity="positive",
            title="Aligns with vitamin D flag",
            rationale=(
                "Profile nutrient flag for vitamin D; label includes D3. "
                "Confirm total intake vs labs."
            ),
            rule_id="vitamin_d_flag_align",
        )

    # Stacking / duplicate actives vs current supplements
    for supp in profile.current_supplements:
        keys = {supp.name.lower(), *supp.key_ingredients}
        if any(k and (k in lower or norm in k or k in norm) for k in keys):
            matched = True
            add(
                severity="warning",
                title="Possible stacking / duplicate active",
                rationale=(
                    f"Overlaps with current supplement '{supp.name}'. "
                    "Review total daily exposure with a clinician."
                ),
                rule_id="stacking_duplicate",
            )

    # Medication caution heuristics (evaluable ingredients only)
    for med in profile.medications:
        med_name = med.name.lower()
        for med_key, cautions in KNOWN_MED_CAUTIONS.items():
            if med_key in med_name or med_name in med_key:
                if any(c in lower for c in cautions):
                    matched = True
                    add(
                        severity="warning",
                        title=f"Medication caution vs {med.name}",
                        rationale=(
                            f"Indexed ingredient may warrant clinician review alongside "
                            f"'{med.name}'. This is not an interaction verdict."
                        ),
                        rule_id="med_caution_heuristic",
                    )

    preg = profile.demographics.pregnancy_status
    if preg in {PregnancyStatus.PREGNANT, PregnancyStatus.TRYING_TO_CONCEIVE}:
        if any(c in lower for c in PREGNANCY_EXTRA_CAUTION):
            matched = True
            add(
                severity="warning",
                title="Pregnancy / conception caution",
                rationale=(
                    "Profile indicates pregnancy or trying to conceive; this ingredient "
                    "class commonly needs clinician-guided limits."
                ),
                rule_id="pregnancy_caution",
            )

    if profile.demographics.lactation_status == LactationStatus.LACTATING:
        if "caffeine" in lower or "green tea" in lower:
            matched = True
            add(
                severity="info",
                title="Lactation context",
                rationale=(
                    "Profile indicates lactation; discuss stimulant/caffeine intake "
                    "with a clinician."
                ),
                rule_id="lactation_context",
            )

    if not matched:
        add(
            severity="info",
            title=f"Review: {name}",
            rationale=(
                "Indexed literature exists; no direct profile conflict detected "
                "in this rule set. Confirm with a clinician."
            ),
            rule_id="default_indexed_review",
        )

    return findings


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
        findings.extend(
            _findings_for_item(
                profile,
                item,
                risk,
                use_live_literature=use_live_literature,
            )
        )

    severity_rank = {"danger": 0, "warning": 1, "positive": 2, "info": 3}
    findings.sort(key=lambda f: severity_rank.get(str(f.get("severity")), 9))

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
        "finding_counts": {
            "danger": sum(1 for f in findings if f["severity"] == "danger"),
            "warning": sum(1 for f in findings if f["severity"] == "warning"),
            "positive": sum(1 for f in findings if f["severity"] == "positive"),
            "info": sum(1 for f in findings if f["severity"] == "info"),
        },
        "message": (
            "Comparison ran only on ingredients with sufficient indexed literature. "
            "Unindexed items received an explicit Data Gap Identified hard stop."
        ),
    }


def clinician_export_payload(
    profile: HealthProfile,
    comparison: dict[str, Any] | None = None,
) -> dict[str, Any]:
    """JSON export suitable for clinician handoff (not a medical record)."""
    return {
        "export_type": "clinician_research_summary",
        "disclaimer": (
            "Informational research aggregation only — not a medical record, "
            "diagnosis, or treatment plan."
        ),
        "gaps_notice_required": True,
        "profile": profile.summary(),
        "risk_tokens": sorted(profile.risk_tokens()),
        "comparison": comparison,
    }
