use crate::academic;

#[tauri::command]
pub fn academic_search(
    query: String,
    grade: Option<u8>,
    grade_band: Option<String>,
    tiers: Option<Vec<String>>,
    limit: Option<usize>,
) -> Result<academic::AcademicSearchResponse, String> {
    academic::academic_search(
        &query,
        grade,
        grade_band.as_deref(),
        tiers,
        limit,
    )
}
