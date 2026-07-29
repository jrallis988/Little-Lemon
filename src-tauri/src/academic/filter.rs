use crate::academic::allowlist::{combine_legitimacy, is_content_farm, passes_legitimacy, score_domain};
use crate::academic::types::{
    AcademicContentTier, AcademicSearchHit, GradeBand, GradeFilter, IndexedSource, TierFilter,
};

const MAX_RESULTS: usize = 12;

#[derive(Debug, Clone)]
pub struct RankedCandidate {
    pub source: IndexedSource,
    pub legitimacy_score: u8,
    pub match_score: f32,
}

/// Score how well an indexed source matches the student query.
pub fn score_query_match(query: &str, source: &IndexedSource) -> f32 {
    let q = query.trim().to_ascii_lowercase();
    if q.is_empty() {
        return 0.0;
    }

    let tokens: Vec<&str> = q
        .split(|c: char| !c.is_alphanumeric())
        .filter(|t| t.len() > 2)
        .collect();

    if tokens.is_empty() {
        return 0.0;
    }

    let haystacks = [
        source.title.to_ascii_lowercase(),
        source.abstract_text.to_ascii_lowercase(),
        source.topics.join(" ").to_ascii_lowercase(),
        source.keywords.join(" ").to_ascii_lowercase(),
        source.vocabulary.join(" ").to_ascii_lowercase(),
    ];

    let mut hits = 0.0_f32;
    let mut weight = 0.0_f32;
    for token in &tokens {
        weight += 1.0;
        let mut token_hit: f32 = 0.0;
        for (index, hay) in haystacks.iter().enumerate() {
            if hay.contains(token) {
                // Title / topics weigh more than abstract body.
                let boost = match index {
                    0 => 1.4,
                    2 | 3 => 1.2,
                    _ => 1.0,
                };
                token_hit = token_hit.max(boost);
            }
        }
        hits += token_hit;
    }

    if weight == 0.0 {
        0.0
    } else {
        (hits / weight).min(1.6)
    }
}

pub fn apply_tier_filter(source: &IndexedSource, filter: &TierFilter) -> bool {
    match &filter.allowed {
        None => true,
        Some(tiers) if tiers.is_empty() => true,
        Some(tiers) => tiers.contains(&source.content_tier),
    }
}

pub fn apply_grade_filter(source: &IndexedSource, filter: &GradeFilter) -> bool {
    if let Some(grade) = filter.grade {
        if !(source.grade_min..=source.grade_max).contains(&grade) {
            return false;
        }
    }
    if let Some(band) = filter.band {
        let (lo, hi) = band.grade_span();
        // Overlap between source range and requested band.
        if source.grade_max < lo || source.grade_min > hi {
            return false;
        }
    }
    true
}

pub fn evaluate_source(
    source: IndexedSource,
    query: &str,
    tier_filter: &TierFilter,
    grade_filter: &GradeFilter,
) -> Result<RankedCandidate, FilterReject> {
    if is_content_farm(&source.domain) {
        return Err(FilterReject::ContentFarm);
    }
    if !apply_tier_filter(&source, tier_filter) {
        return Err(FilterReject::Tier);
    }
    if !apply_grade_filter(&source, grade_filter) {
        return Err(FilterReject::Grade);
    }

    let (domain_score, _) = score_domain(&source.domain);
    let legitimacy = combine_legitimacy(source.base_legitimacy, domain_score);
    if !passes_legitimacy(legitimacy) {
        return Err(FilterReject::Legitimacy);
    }

    let match_score = score_query_match(query, &source);
    if match_score < 0.35 {
        return Err(FilterReject::Relevance);
    }

    Ok(RankedCandidate {
        source,
        legitimacy_score: legitimacy,
        match_score,
    })
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum FilterReject {
    ContentFarm,
    Tier,
    Grade,
    Legitimacy,
    Relevance,
}

pub fn rank_and_take(mut candidates: Vec<RankedCandidate>, limit: usize) -> Vec<RankedCandidate> {
    candidates.sort_by(|a, b| {
        b.match_score
            .partial_cmp(&a.match_score)
            .unwrap_or(std::cmp::Ordering::Equal)
            .then_with(|| b.legitimacy_score.cmp(&a.legitimacy_score))
            .then_with(|| {
                tier_rank(a.source.content_tier).cmp(&tier_rank(b.source.content_tier))
            })
    });
    candidates.truncate(limit.min(MAX_RESULTS));
    candidates
}

fn tier_rank(tier: AcademicContentTier) -> u8 {
    match tier {
        AcademicContentTier::PeerReviewedJournal => 0,
        AcademicContentTier::AuthoritativeResearch => 1,
        AcademicContentTier::EducationalMagazine => 2,
        AcademicContentTier::VerifiedReference => 3,
    }
}

pub fn to_hit(candidate: RankedCandidate) -> AcademicSearchHit {
    let source = candidate.source;
    let reading_minutes = estimate_minutes(&source.abstract_text);
    AcademicSearchHit {
        id: source.id,
        title: source.title,
        url: source.url,
        domain: source.domain,
        publisher: source.publisher,
        content_tier: source.content_tier.as_str().to_string(),
        content_tier_label: source.content_tier.label().to_string(),
        grade_min: source.grade_min,
        grade_max: source.grade_max,
        recommended_grades: format_grade_range(source.grade_min, source.grade_max),
        abstract_text: source.abstract_text,
        vocabulary: source.vocabulary,
        citation: source.citation,
        legitimacy_score: candidate.legitimacy_score,
        match_score: (candidate.match_score * 100.0).round() / 100.0,
        reading_minutes,
    }
}

pub fn format_grade_range(min: u8, max: u8) -> String {
    if min == max {
        format!("Grade {min}")
    } else if min >= 9 {
        "High School".into()
    } else {
        format!("Grades {min}–{max}")
    }
}

pub fn bands_for_range(min: u8, max: u8) -> Vec<GradeBand> {
    [
        GradeBand::Grades1To2,
        GradeBand::Grades3To5,
        GradeBand::Grades6To8,
        GradeBand::HighSchool,
    ]
    .into_iter()
    .filter(|band| {
        let (lo, hi) = band.grade_span();
        !(max < lo || min > hi)
    })
    .collect()
}

fn estimate_minutes(abstract_text: &str) -> u32 {
    let words = abstract_text.split_whitespace().count().max(40);
    ((words as f32 / 140.0).ceil() as u32).clamp(2, 12)
}
