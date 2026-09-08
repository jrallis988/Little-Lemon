"""Allowed rating metric keys per review target type."""

from typing import Final

RATING_METRICS: Final[dict[str, list[str]]] = {
    "professor": ["clarity", "helpfulness", "difficulty", "would_recommend"],
    "advisor": ["clarity", "helpfulness", "availability", "would_recommend"],
    "course": ["workload", "interest", "organization", "grading_fairness"],
    "dorm": ["cleanliness", "location", "community", "value"],
    "university": ["academics", "campus_life", "resources", "overall"],
}

RATING_MIN: Final[int] = 1
RATING_MAX: Final[int] = 5

ALLOWED_TAGS: Final[dict[str, list[str]]] = {
    "professor": [
        "engaging",
        "tough-grader",
        "caring",
        "clear-lectures",
        "heavy-workload",
        "accessible",
        "test-heavy",
        "participation-matters",
    ],
    "advisor": [
        "responsive",
        "knowledgeable",
        "supportive",
        "hard-to-reach",
        "career-focused",
        "flexible",
    ],
    "course": [
        "project-based",
        "curve",
        "group-work",
        "reading-heavy",
        "lab-intensive",
        "practical",
        "theoretical",
    ],
    "dorm": [
        "quiet",
        "social",
        "renovated",
        "outdated",
        "good-location",
        "noisy",
        "great-amenities",
    ],
    "university": [
        "strong-stem",
        "party-school",
        "research-heavy",
        "affordable",
        "beautiful-campus",
        "career-support",
        "diverse",
    ],
}
