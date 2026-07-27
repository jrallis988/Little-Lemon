use crate::state::AppState;
use std::sync::Mutex;
use tauri::State;

/// Sync the parent-managed allowlist into native filter state.
#[tauri::command]
pub fn set_parent_allowlist(
    state: State<'_, Mutex<AppState>>,
    domains: Vec<String>,
) -> Result<(), String> {
    let mut guard = state.lock().map_err(|_| "state lock failed".to_string())?;
    guard.parent_allowlist = domains
        .into_iter()
        .map(|domain| {
            domain
                .trim()
                .trim_start_matches("www.")
                .to_ascii_lowercase()
        })
        .filter(|domain| !domain.is_empty())
        .collect();
    Ok(())
}
