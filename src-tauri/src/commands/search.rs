use crate::browser::search::EducationalSearchResult;

#[tauri::command]
pub async fn educational_search(
    query: String,
    limit: Option<usize>,
) -> Result<Vec<EducationalSearchResult>, String> {
    crate::browser::search::educational_search(query, limit)
        .await
        .map_err(|error| error.to_string())
}
