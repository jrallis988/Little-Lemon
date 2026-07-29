//! Academic search indexing and EBSCO-style filtering for Surf / AreoOS Machu.
//!
//! Unlike open-web crawlers that reward SEO spam, this module categorizes sources
//! by academic content tier, tags grade appropriateness, scores domain legitimacy
//! against a curated educational allowlist, and returns structured research metadata.

mod allowlist;
mod filter;
mod index;
mod search;
mod types;

pub use search::academic_search;
pub use types::AcademicSearchResponse;
