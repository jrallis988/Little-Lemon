use serde::{Deserialize, Serialize};

/// EBSCO-style academic content tiers — ordered from strongest scholarly signal
/// to verified reference / primary sources.
#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum AcademicContentTier {
    PeerReviewedJournal,
    AuthoritativeResearch,
    EducationalMagazine,
    VerifiedReference,
}

impl AcademicContentTier {
    pub fn as_str(self) -> &'static str {
        match self {
            Self::PeerReviewedJournal => "peer_reviewed_journal",
            Self::AuthoritativeResearch => "authoritative_research",
            Self::EducationalMagazine => "educational_magazine",
            Self::VerifiedReference => "verified_reference",
        }
    }

    pub fn label(self) -> &'static str {
        match self {
            Self::PeerReviewedJournal => "Academic Journals",
            Self::AuthoritativeResearch => "Research Papers",
            Self::EducationalMagazine => "Magazines",
            Self::VerifiedReference => "Reference Sources",
        }
    }

    pub fn parse(value: &str) -> Option<Self> {
        match value.trim().to_ascii_lowercase().as_str() {
            "peer_reviewed_journal" | "peer-reviewed" | "journal" => {
                Some(Self::PeerReviewedJournal)
            }
            "authoritative_research" | "research" | "research_paper" => {
                Some(Self::AuthoritativeResearch)
            }
            "educational_magazine" | "magazine" => Some(Self::EducationalMagazine),
            "verified_reference" | "reference" | "primary" | "primary_source" => {
                Some(Self::VerifiedReference)
            }
            _ => None,
        }
    }
}

/// Cognitive grade bands covering elementary through high school.
#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum GradeBand {
    Grades1To2,
    Grades3To5,
    Grades6To8,
    HighSchool,
}

impl GradeBand {
    pub fn as_str(self) -> &'static str {
        match self {
            Self::Grades1To2 => "grades_1_2",
            Self::Grades3To5 => "grades_3_5",
            Self::Grades6To8 => "grades_6_8",
            Self::HighSchool => "high_school",
        }
    }

    pub fn label(self) -> &'static str {
        match self {
            Self::Grades1To2 => "Grades 1–2",
            Self::Grades3To5 => "Grades 3–5",
            Self::Grades6To8 => "Grades 6–8",
            Self::HighSchool => "High School",
        }
    }

    pub fn grade_span(self) -> (u8, u8) {
        match self {
            Self::Grades1To2 => (1, 2),
            Self::Grades3To5 => (3, 5),
            Self::Grades6To8 => (6, 8),
            Self::HighSchool => (9, 12),
        }
    }

    pub fn contains_grade(self, grade: u8) -> bool {
        let (lo, hi) = self.grade_span();
        grade >= lo && grade <= hi
    }

    pub fn from_grade(grade: u8) -> Option<Self> {
        match grade {
            1 | 2 => Some(Self::Grades1To2),
            3..=5 => Some(Self::Grades3To5),
            6..=8 => Some(Self::Grades6To8),
            9..=12 => Some(Self::HighSchool),
            _ => None,
        }
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct IndexedSource {
    pub id: String,
    pub title: String,
    pub url: String,
    pub domain: String,
    pub publisher: String,
    pub content_tier: AcademicContentTier,
    pub grade_min: u8,
    pub grade_max: u8,
    pub abstract_text: String,
    pub vocabulary: Vec<String>,
    pub citation: String,
    pub topics: Vec<String>,
    pub keywords: Vec<String>,
    /// Base legitimacy before domain cross-check (0–100).
    pub base_legitimacy: u8,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct AcademicSearchHit {
    pub id: String,
    pub title: String,
    pub url: String,
    pub domain: String,
    pub publisher: String,
    pub content_tier: String,
    pub content_tier_label: String,
    pub grade_min: u8,
    pub grade_max: u8,
    pub recommended_grades: String,
    pub abstract_text: String,
    pub vocabulary: Vec<String>,
    pub citation: String,
    pub legitimacy_score: u8,
    pub match_score: f32,
    pub reading_minutes: u32,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct AcademicSearchResponse {
    pub query: String,
    pub abstract_summary: String,
    pub key_vocabulary: Vec<String>,
    pub recommended_grade_levels: Vec<String>,
    pub available_tiers: Vec<String>,
    pub filtered_out_farms: u32,
    pub results: Vec<AcademicSearchHit>,
}

#[derive(Debug, Clone, Default)]
pub struct TierFilter {
    pub allowed: Option<Vec<AcademicContentTier>>,
}

#[derive(Debug, Clone, Default)]
pub struct GradeFilter {
    /// Exact student grade 1–12. When set, only sources spanning that grade pass.
    pub grade: Option<u8>,
    /// Optional band filter (e.g. only middle school sources).
    pub band: Option<GradeBand>,
}
