use crate::{filter, state::UrlCheckResponse};

/// Native URL interceptor used by the web layer via IPC.
#[tauri::command]
pub fn check_url(url: String, whitelist: Vec<String>) -> UrlCheckResponse {
    filter::evaluate_url(&url, &whitelist).into_response()
}
