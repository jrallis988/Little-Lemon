"""
Structured health-profile ingestion for supplement label comparison.

This module is the first building block of a FastAPI + Streamlit app that:
  1. Accepts a structured user health profile
  2. Accepts a supplement-label image upload
  3. Extracts ingredients via a vision model
  4. Compares ingredients against the profile with cited research logic

Not medical advice — output is informational only and should be reviewed
with a qualified clinician before changing diet or supplements.
"""

from __future__ import annotations

from datetime import datetime, timezone
from enum import Enum
from typing import Any
from uuid import uuid4

from pydantic import (
    BaseModel,
    ConfigDict,
    Field,
    field_validator,
    model_validator,
)


# ---------------------------------------------------------------------------
# Enumerations
# ---------------------------------------------------------------------------


class BiologicalSex(str, Enum):
    FEMALE = "female"
    MALE = "male"
    INTERSEX = "intersex"
    PREFER_NOT_TO_SAY = "prefer_not_to_say"
    UNSPECIFIED = "unspecified"


class PregnancyStatus(str, Enum):
    NOT_APPLICABLE = "not_applicable"
    NOT_PREGNANT = "not_pregnant"
    PREGNANT = "pregnant"
    TRYING_TO_CONCEIVE = "trying_to_conceive"
    POSTPARTUM = "postpartum"
    UNKNOWN = "unknown"


class LactationStatus(str, Enum):
    NOT_APPLICABLE = "not_applicable"
    NOT_LACTATING = "not_lactating"
    LACTATING = "lactating"
    UNKNOWN = "unknown"


class Severity(str, Enum):
    MILD = "mild"
    MODERATE = "moderate"
    SEVERE = "severe"
    UNKNOWN = "unknown"


class AllergyType(str, Enum):
    FOOD = "food"
    DRUG = "drug"
    SUPPLEMENT = "supplement"
    ENVIRONMENTAL = "environmental"
    OTHER = "other"


class GoalCategory(str, Enum):
    ENERGY = "energy"
    SLEEP = "sleep"
    IMMUNE = "immune"
    HEART = "heart"
    BONE = "bone"
    JOINT = "joint"
    COGNITIVE = "cognitive"
    MOOD = "mood"
    DIGESTIVE = "digestive"
    METABOLIC = "metabolic"
    HORMONAL = "hormonal"
    ATHLETIC = "athletic"
    GENERAL_WELLNESS = "general_wellness"
    OTHER = "other"


# ---------------------------------------------------------------------------
# Nested profile components
# ---------------------------------------------------------------------------


class Condition(BaseModel):
    """Diagnosed or self-reported health condition."""

    model_config = ConfigDict(str_strip_whitespace=True)

    name: str = Field(..., min_length=1, max_length=200)
    icd10_code: str | None = Field(
        default=None,
        description="Optional ICD-10 code when known.",
        max_length=16,
    )
    diagnosed: bool = Field(
        default=False,
        description="True if clinician-diagnosed; False if self-reported.",
    )
    notes: str | None = Field(default=None, max_length=1000)

    @field_validator("name")
    @classmethod
    def normalize_name(cls, value: str) -> str:
        return " ".join(value.split())


class Medication(BaseModel):
    """Current prescription or OTC medication relevant to interactions."""

    model_config = ConfigDict(str_strip_whitespace=True)

    name: str = Field(..., min_length=1, max_length=200)
    dose: str | None = Field(default=None, max_length=100)
    frequency: str | None = Field(default=None, max_length=100)
    route: str | None = Field(
        default=None,
        description="e.g. oral, topical, injectable",
        max_length=50,
    )
    reason: str | None = Field(default=None, max_length=300)

    @field_validator("name")
    @classmethod
    def normalize_name(cls, value: str) -> str:
        return " ".join(value.split())


class Allergy(BaseModel):
    """Allergy or intolerance that may conflict with label ingredients."""

    model_config = ConfigDict(str_strip_whitespace=True)

    substance: str = Field(..., min_length=1, max_length=200)
    allergy_type: AllergyType = AllergyType.OTHER
    severity: Severity = Severity.UNKNOWN
    reaction: str | None = Field(default=None, max_length=500)

    @field_validator("substance")
    @classmethod
    def normalize_substance(cls, value: str) -> str:
        return " ".join(value.split())


class DietaryRestriction(BaseModel):
    """Diet pattern or restriction (vegan, kosher, low-FODMAP, etc.)."""

    model_config = ConfigDict(str_strip_whitespace=True)

    label: str = Field(..., min_length=1, max_length=120)
    notes: str | None = Field(default=None, max_length=500)

    @field_validator("label")
    @classmethod
    def normalize_label(cls, value: str) -> str:
        return " ".join(value.split()).lower()


class HealthGoal(BaseModel):
    """User goal that later research-cited scoring can weight."""

    model_config = ConfigDict(str_strip_whitespace=True)

    category: GoalCategory
    description: str | None = Field(default=None, max_length=500)
    priority: int = Field(
        default=3,
        ge=1,
        le=5,
        description="1 = highest priority, 5 = lowest.",
    )


class NutrientFlag(BaseModel):
    """Known deficiency, excess, or lab-linked nutrient concern."""

    model_config = ConfigDict(str_strip_whitespace=True)

    nutrient: str = Field(..., min_length=1, max_length=120)
    status: str = Field(
        ...,
        description="e.g. deficient, low, adequate, high, excess",
        max_length=40,
    )
    source: str | None = Field(
        default=None,
        description="e.g. lab panel date, clinician note",
        max_length=200,
    )

    @field_validator("nutrient", "status")
    @classmethod
    def normalize_text(cls, value: str) -> str:
        return " ".join(value.split()).lower()


class CurrentSupplement(BaseModel):
    """Supplement already in use — used to flag stacking / duplicate actives."""

    model_config = ConfigDict(str_strip_whitespace=True)

    name: str = Field(..., min_length=1, max_length=200)
    brand: str | None = Field(default=None, max_length=120)
    key_ingredients: list[str] = Field(default_factory=list)
    daily_servings: float | None = Field(default=None, gt=0)

    @field_validator("name")
    @classmethod
    def normalize_name(cls, value: str) -> str:
        return " ".join(value.split())

    @field_validator("key_ingredients")
    @classmethod
    def normalize_ingredients(cls, values: list[str]) -> list[str]:
        cleaned: list[str] = []
        for item in values:
            text = " ".join(item.split()).lower()
            if text and text not in cleaned:
                cleaned.append(text)
        return cleaned


class Demographics(BaseModel):
    """Age and reproductive context used for safety heuristics."""

    model_config = ConfigDict(str_strip_whitespace=True)

    age_years: int = Field(..., ge=0, le=120)
    biological_sex: BiologicalSex = BiologicalSex.UNSPECIFIED
    pregnancy_status: PregnancyStatus = PregnancyStatus.UNKNOWN
    lactation_status: LactationStatus = LactationStatus.UNKNOWN
    weight_kg: float | None = Field(default=None, gt=0, le=500)
    height_cm: float | None = Field(default=None, gt=0, le=300)

    @model_validator(mode="after")
    def align_reproductive_defaults(self) -> Demographics:
        """If sex is male, default pregnancy/lactation to not applicable when unset."""
        if self.biological_sex == BiologicalSex.MALE:
            if self.pregnancy_status == PregnancyStatus.UNKNOWN:
                self.pregnancy_status = PregnancyStatus.NOT_APPLICABLE
            if self.lactation_status == LactationStatus.UNKNOWN:
                self.lactation_status = LactationStatus.NOT_APPLICABLE
        return self


# ---------------------------------------------------------------------------
# Top-level profile
# ---------------------------------------------------------------------------


class HealthProfile(BaseModel):
    """
    Canonical structured health profile.

    FastAPI can accept this as a request body; Streamlit can build the same
    payload from form widgets and POST it to the API.
    """

    model_config = ConfigDict(str_strip_whitespace=True)

    profile_id: str = Field(default_factory=lambda: str(uuid4()))
    created_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc)
    )
    updated_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc)
    )
    display_name: str | None = Field(default=None, max_length=120)

    demographics: Demographics
    conditions: list[Condition] = Field(default_factory=list)
    medications: list[Medication] = Field(default_factory=list)
    allergies: list[Allergy] = Field(default_factory=list)
    dietary_restrictions: list[DietaryRestriction] = Field(default_factory=list)
    goals: list[HealthGoal] = Field(default_factory=list)
    nutrient_flags: list[NutrientFlag] = Field(default_factory=list)
    current_supplements: list[CurrentSupplement] = Field(default_factory=list)

    caffeine_sensitive: bool = False
    stimulant_sensitive: bool = False
    notes: str | None = Field(default=None, max_length=2000)

    @model_validator(mode="after")
    def touch_updated_at(self) -> HealthProfile:
        # Keep updated_at aligned when callers rebuild from partial payloads.
        if self.updated_at < self.created_at:
            self.updated_at = self.created_at
        return self

    def risk_tokens(self) -> set[str]:
        """
        Normalized strings useful for later ingredient matching.

        Downstream comparison modules can intersect these tokens with
        extracted label ingredients / allergens / contraindicated actives.
        """
        tokens: set[str] = set()

        for allergy in self.allergies:
            tokens.add(allergy.substance.lower())

        for condition in self.conditions:
            tokens.add(condition.name.lower())

        for med in self.medications:
            tokens.add(med.name.lower())

        for restriction in self.dietary_restrictions:
            tokens.add(restriction.label.lower())

        for flag in self.nutrient_flags:
            tokens.add(flag.nutrient.lower())

        for supplement in self.current_supplements:
            tokens.add(supplement.name.lower())
            tokens.update(supplement.key_ingredients)

        if self.caffeine_sensitive:
            tokens.update({"caffeine", "guarana", "yerba mate", "green tea extract"})
        if self.stimulant_sensitive:
            tokens.update({"synephrine", "ephedra", "yohimbine", "dmaa"})

        if self.demographics.pregnancy_status in {
            PregnancyStatus.PREGNANT,
            PregnancyStatus.TRYING_TO_CONCEIVE,
        }:
            tokens.add("pregnancy")
        if self.demographics.lactation_status == LactationStatus.LACTATING:
            tokens.add("lactation")

        return tokens

    def summary(self) -> dict[str, Any]:
        """Compact summary for UI previews and API responses."""
        return {
            "profile_id": self.profile_id,
            "display_name": self.display_name,
            "age_years": self.demographics.age_years,
            "biological_sex": self.demographics.biological_sex.value,
            "pregnancy_status": self.demographics.pregnancy_status.value,
            "lactation_status": self.demographics.lactation_status.value,
            "condition_count": len(self.conditions),
            "medication_count": len(self.medications),
            "allergy_count": len(self.allergies),
            "goal_count": len(self.goals),
            "current_supplement_count": len(self.current_supplements),
            "risk_token_count": len(self.risk_tokens()),
            "updated_at": self.updated_at.isoformat(),
        }


# ---------------------------------------------------------------------------
# Ingestion helpers
# ---------------------------------------------------------------------------


class ProfileIngestionError(ValueError):
    """Raised when raw profile input cannot be normalized into HealthProfile."""


def ingest_profile(payload: dict[str, Any] | HealthProfile) -> HealthProfile:
    """
    Validate and normalize a raw profile payload.

    Accepts either an already-built HealthProfile or a dict (e.g. from
    FastAPI JSON body or Streamlit session state).
    """
    if isinstance(payload, HealthProfile):
        return payload.model_copy(deep=True)

    if not isinstance(payload, dict):
        raise ProfileIngestionError(
            f"Expected dict or HealthProfile, got {type(payload).__name__}"
        )

    try:
        profile = HealthProfile.model_validate(payload)
    except Exception as exc:  # pydantic.ValidationError
        raise ProfileIngestionError(f"Invalid health profile: {exc}") from exc

    profile.updated_at = datetime.now(timezone.utc)
    return profile


def ingest_profile_json(raw_json: str) -> HealthProfile:
    """Parse a JSON string into a validated HealthProfile."""
    import json

    try:
        data = json.loads(raw_json)
    except json.JSONDecodeError as exc:
        raise ProfileIngestionError(f"Malformed JSON: {exc}") from exc

    return ingest_profile(data)


def profile_to_storage_dict(profile: HealthProfile) -> dict[str, Any]:
    """Serialize for JSON file / DB document storage."""
    return profile.model_dump(mode="json")


def example_profile() -> HealthProfile:
    """Demo profile for local Streamlit / API smoke tests."""
    return HealthProfile(
        display_name="Demo User",
        demographics=Demographics(
            age_years=34,
            biological_sex=BiologicalSex.FEMALE,
            pregnancy_status=PregnancyStatus.NOT_PREGNANT,
            lactation_status=LactationStatus.NOT_LACTATING,
        ),
        conditions=[
            Condition(name="migraine", diagnosed=True),
            Condition(name="iron-deficiency anemia", diagnosed=True),
        ],
        medications=[
            Medication(name="sumatriptan", dose="50 mg", frequency="as needed"),
        ],
        allergies=[
            Allergy(
                substance="shellfish",
                allergy_type=AllergyType.FOOD,
                severity=Severity.SEVERE,
                reaction="anaphylaxis",
            ),
        ],
        dietary_restrictions=[
            DietaryRestriction(label="gluten-free"),
        ],
        goals=[
            HealthGoal(category=GoalCategory.ENERGY, priority=1),
            HealthGoal(category=GoalCategory.SLEEP, priority=2),
        ],
        nutrient_flags=[
            NutrientFlag(nutrient="iron", status="deficient", source="labs 2026-01"),
            NutrientFlag(nutrient="vitamin d", status="low", source="labs 2026-01"),
        ],
        current_supplements=[
            CurrentSupplement(
                name="Vitamin D3",
                brand="Generic",
                key_ingredients=["cholecalciferol"],
                daily_servings=1,
            ),
        ],
        caffeine_sensitive=True,
        notes="Avoid stimulants late in the day.",
    )


if __name__ == "__main__":
    demo = example_profile()
    print(demo.summary())
    print("risk_tokens:", sorted(demo.risk_tokens()))
