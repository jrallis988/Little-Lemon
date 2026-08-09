use crate::academic::types::{AcademicContentTier, IndexedSource};
use serde::Deserialize;

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
struct CorpusRow {
    id: String,
    title: String,
    url: String,
    domain: String,
    publisher: String,
    content_tier: String,
    grade_min: u8,
    grade_max: u8,
    abstract_text: String,
    vocabulary: Vec<String>,
    citation: String,
    topics: Vec<String>,
    keywords: Vec<String>,
    base_legitimacy: u8,
}

/// Shared educational corpus (same JSON as the TypeScript app).
const CORPUS_JSON: &str = include_str!("../../../src/data/educational_corpus.json");

/// Seed academic index for AreoOS Machu / Surf.
pub fn academic_corpus() -> Vec<IndexedSource> {
    let rows: Vec<CorpusRow> = serde_json::from_str(CORPUS_JSON)
        .unwrap_or_else(|err| panic!("educational corpus JSON invalid: {err}"));
    rows.into_iter()
        .filter_map(|row| {
            let content_tier = AcademicContentTier::parse(&row.content_tier)?;
            Some(IndexedSource {
                id: row.id,
                title: row.title,
                url: row.url,
                domain: row.domain,
                publisher: row.publisher,
                content_tier,
                grade_min: row.grade_min,
                grade_max: row.grade_max,
                abstract_text: row.abstract_text,
                vocabulary: row.vocabulary,
                citation: row.citation,
                topics: row.topics,
                keywords: row.keywords,
                base_legitimacy: row.base_legitimacy,
            })
        })
        .collect()
}
