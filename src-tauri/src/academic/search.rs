use crate::academic::filter::{
    bands_for_range, evaluate_source, rank_and_take, to_hit, FilterReject,
};
use crate::academic::index::academic_corpus;
use crate::academic::types::{
    AcademicContentTier, AcademicSearchResponse, GradeBand, GradeFilter, TierFilter,
};

/// Execute an academic research query against the indexed corpus.
///
/// Returns structured metadata: clean abstracts, vocabulary, recommended grades,
/// citations, and tier/legitimacy-filtered hits — never ad-driven SEO listings.
pub fn academic_search(
    query: &str,
    grade: Option<u8>,
    grade_band: Option<&str>,
    tiers: Option<Vec<String>>,
    limit: Option<usize>,
) -> Result<AcademicSearchResponse, String> {
    let query = query.trim();
    if query.is_empty() {
        return Err("Please enter a research query.".into());
    }

    let tier_filter = TierFilter {
        allowed: tiers.map(|list| {
            list.iter()
                .filter_map(|value| AcademicContentTier::parse(value))
                .collect::<Vec<_>>()
        }),
    };

    let band = grade_band
        .map(str::trim)
        .filter(|value| !value.is_empty())
        .and_then(parse_band);

    let grade_filter = GradeFilter { grade, band };
    let limit = limit.unwrap_or(8).clamp(1, 12);

    let mut farm_rejects = 0_u32;
    let mut candidates = Vec::new();

    for source in academic_corpus() {
        match evaluate_source(source, query, &tier_filter, &grade_filter) {
            Ok(candidate) => candidates.push(candidate),
            Err(FilterReject::ContentFarm) | Err(FilterReject::Legitimacy) => {
                farm_rejects += 1;
            }
            Err(_) => {}
        }
    }

    let ranked = rank_and_take(candidates, limit);
    let results: Vec<_> = ranked.into_iter().map(to_hit).collect();

    let key_vocabulary = collect_vocabulary(&results, 10);
    let recommended_grade_levels = collect_grade_labels(&results);
    let available_tiers = collect_tiers(&results);
    let abstract_summary = build_summary(query, &results);

    Ok(AcademicSearchResponse {
        query: query.to_string(),
        abstract_summary,
        key_vocabulary,
        recommended_grade_levels,
        available_tiers,
        filtered_out_farms: farm_rejects,
        results,
    })
}

fn parse_band(value: &str) -> Option<GradeBand> {
    match value.to_ascii_lowercase().as_str() {
        "grades_1_2" | "1-2" | "1_2" => Some(GradeBand::Grades1To2),
        "grades_3_5" | "3-5" | "3_5" => Some(GradeBand::Grades3To5),
        "grades_6_8" | "6-8" | "6_8" | "middle" => Some(GradeBand::Grades6To8),
        "high_school" | "9-12" | "hs" => Some(GradeBand::HighSchool),
        _ => None,
    }
}

fn collect_vocabulary(
    results: &[crate::academic::types::AcademicSearchHit],
    max: usize,
) -> Vec<String> {
    let mut seen = std::collections::BTreeSet::new();
    let mut out = Vec::new();
    for hit in results {
        for term in &hit.vocabulary {
            let key = term.to_ascii_lowercase();
            if seen.insert(key) {
                out.push(term.clone());
                if out.len() >= max {
                    return out;
                }
            }
        }
    }
    out
}

fn collect_grade_labels(results: &[crate::academic::types::AcademicSearchHit]) -> Vec<String> {
    let mut bands = std::collections::BTreeSet::new();
    for hit in results {
        for band in bands_for_range(hit.grade_min, hit.grade_max) {
            bands.insert(band.label().to_string());
        }
    }
    bands.into_iter().collect()
}

fn collect_tiers(results: &[crate::academic::types::AcademicSearchHit]) -> Vec<String> {
    let mut tiers = std::collections::BTreeSet::new();
    for hit in results {
        tiers.insert(hit.content_tier.clone());
    }
    tiers.into_iter().collect()
}

fn build_summary(query: &str, results: &[crate::academic::types::AcademicSearchHit]) -> String {
    if results.is_empty() {
        return format!(
            "No verified academic sources matched “{query}” after tier, grade, and legitimacy filtering."
        );
    }

    let lead = results
        .first()
        .map(|hit| hit.abstract_text.as_str())
        .unwrap_or_default();
    let clipped = if lead.chars().count() > 280 {
        let shortened: String = lead.chars().take(277).collect();
        format!("{shortened}…")
    } else {
        lead.to_string()
    };

    format!(
        "Research briefing for “{query}”: {clipped} Surf ranked {} verified source(s) by academic tier and legitimacy—not by ads or SEO spam.",
        results.len()
    )
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn plate_tectonics_returns_structured_hits() {
        let response = academic_search("Plate Tectonics", Some(7), None, None, Some(8))
            .expect("search should succeed");
        assert!(!response.results.is_empty());
        assert!(!response.key_vocabulary.is_empty());
        assert!(response.filtered_out_farms >= 1);
        assert!(response.results.iter().all(|hit| hit.legitimacy_score >= 55));
        assert!(response
            .results
            .iter()
            .all(|hit| !hit.domain.contains("clickbait")));
    }
}
