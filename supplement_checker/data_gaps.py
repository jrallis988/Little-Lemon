"""
System behavioral rule for unknown / missing literature.

When an OCR'd label item lacks clear peer-reviewed documentation or database
indexing, refuse to speculate and emit an explicit Data Gap Identified stop.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from enum import Enum
from typing import Any, Iterable

from .legal_notice import DATA_GAP_UI_MESSAGE


class LiteratureCoverage(str, Enum):
    INDEXED = "indexed"  # Sufficient indexed human research to evaluate
    INSUFFICIENT = "insufficient"  # Missing / unindexed — hard stop
    UNKNOWN = "unknown"  # Coverage not yet resolved — treat as stop


class DataGapStopError(RuntimeError):
    """Hard programmatic stop — do not invent safety or mechanism claims."""

    def __init__(
        self,
        *,
        ingredient: str,
        reason: str,
        ui_message: str = DATA_GAP_UI_MESSAGE,
    ) -> None:
        self.ingredient = ingredient
        self.reason = reason
        self.ui_message = ui_message
        super().__init__(ui_message)


@dataclass
class IngredientLiteratureStatus:
    name: str
    coverage: LiteratureCoverage
    indexed_record_count: int = 0
    notes: str | None = None
    sources_checked: list[str] = field(default_factory=list)

    @property
    def allows_evaluation(self) -> bool:
        return (
            self.coverage == LiteratureCoverage.INDEXED
            and self.indexed_record_count > 0
        )


# Minimal local allow-list for prototype demos. Production replaces this with
# live PubMed/NCBI / internal index lookups. Anything absent → data gap stop.
PROTOTYPE_INDEXED_INGREDIENTS: dict[str, int] = {
    "vitamin d3": 120,
    "cholecalciferol": 120,
    "vitamin d": 200,
    "iron": 180,
    "ferrous bisglycinate": 25,
    "caffeine": 300,
    "green tea extract": 40,
    "fish oil": 150,
    "omega-3": 220,
    "epa": 90,
    "dha": 90,
}


def normalize_ingredient_name(name: str) -> str:
    text = " ".join((name or "").lower().split())
    # Strip common parenthetical forms: "Vitamin D3 (cholecalciferol)"
    if "(" in text:
        base = text.split("(", 1)[0].strip()
        inner = text[text.find("(") + 1 : text.rfind(")")].strip() if ")" in text else ""
        return base or inner or text
    return text


def lookup_literature_coverage(
    ingredient_name: str,
    *,
    index: dict[str, int] | None = None,
) -> IngredientLiteratureStatus:
    """
    Resolve whether an ingredient has sufficient indexed human literature.

    Prototype uses a static map; production must query PubMed/NCBI and mark
    proprietary blends / rare variants as INSUFFICIENT when evidence is thin.
    """
    index = index if index is not None else PROTOTYPE_INDEXED_INGREDIENTS
    raw = ingredient_name or ""
    normalized = normalize_ingredient_name(raw)
    tokens = {normalized, *[t for t in normalized.replace("/", " ").split() if len(t) > 2]}

    # Also consider parenthetical inner form if present on the raw string.
    lower_raw = raw.lower()
    if "(" in lower_raw and ")" in lower_raw:
        tokens.add(lower_raw[lower_raw.find("(") + 1 : lower_raw.rfind(")")].strip())

    hits = []
    for key, count in index.items():
        if key in tokens or any(key in token or token in key for token in tokens):
            hits.append((key, count))

    if not hits:
        return IngredientLiteratureStatus(
            name=raw,
            coverage=LiteratureCoverage.INSUFFICIENT,
            indexed_record_count=0,
            notes="No indexed human research literature found for this item.",
            sources_checked=["prototype_index", "pubmed_pending"],
        )

    best = max(hits, key=lambda item: item[1])
    return IngredientLiteratureStatus(
        name=raw,
        coverage=LiteratureCoverage.INDEXED,
        indexed_record_count=best[1],
        notes=f"Matched indexed key '{best[0]}' ({best[1]} prototype records).",
        sources_checked=["prototype_index"],
    )


def assert_literature_allows_evaluation(status: IngredientLiteratureStatus) -> None:
    """Hard stop — refuse speculative safety / mechanism claims."""
    if status.allows_evaluation:
        return
    raise DataGapStopError(
        ingredient=status.name,
        reason=status.notes or "insufficient_indexed_literature",
        ui_message=DATA_GAP_UI_MESSAGE,
    )


def evaluate_ingredients_with_gap_stops(
    ingredients: Iterable[dict[str, Any] | str],
    *,
    index: dict[str, int] | None = None,
) -> dict[str, Any]:
    """
    Walk OCR'd ingredients. Evaluable items pass through; unindexed items
    trigger an explicit data-gap record and are excluded from speculation.
    """
    evaluable: list[dict[str, Any]] = []
    data_gaps: list[dict[str, Any]] = []

    for item in ingredients:
        if isinstance(item, str):
            name = item
            payload: dict[str, Any] = {"name": item}
        else:
            payload = dict(item)
            name = str(payload.get("name") or payload.get("ingredient") or "").strip()

        status = lookup_literature_coverage(name, index=index)
        if status.allows_evaluation:
            evaluable.append(
                {
                    **payload,
                    "literature_coverage": status.coverage.value,
                    "indexed_record_count": status.indexed_record_count,
                }
            )
        else:
            data_gaps.append(
                {
                    "ingredient": name,
                    "dosage": payload.get("amount"),
                    "unit": payload.get("unit"),
                    "coverage": status.coverage.value,
                    "hard_stop": True,
                    "ui_message": DATA_GAP_UI_MESSAGE,
                    "reason": status.notes,
                    # Explicit: no safety / mechanism fields are populated.
                    "safety_evaluation": None,
                    "mechanistic_evaluation": None,
                    "speculative_assessment_refused": True,
                }
            )

    return {
        "evaluable_ingredients": evaluable,
        "data_gaps": data_gaps,
        "evaluation_blocked_for_gaps": len(data_gaps) > 0,
        "notice": (
            DATA_GAP_UI_MESSAGE
            if data_gaps
            else "All submitted ingredients had sufficient indexed literature for evaluation."
        ),
    }


def data_gap_response(ingredient: str, *, reason: str | None = None) -> dict[str, Any]:
    """Canonical API/UI payload for a single hard stop."""
    return {
        "hard_stop": True,
        "ingredient": ingredient,
        "ui_message": DATA_GAP_UI_MESSAGE,
        "reason": reason or "insufficient_indexed_human_research_literature",
        "safety_evaluation": None,
        "mechanistic_evaluation": None,
        "speculative_assessment_refused": True,
    }
