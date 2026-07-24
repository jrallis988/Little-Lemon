use crate::state::AppState;
use std::sync::Mutex;
use tauri::State;

#[tauri::command]
pub fn secure_set(state: State<'_, Mutex<AppState>>, key: String, value: String) -> Result<(), String> {
    let mut guard = state.lock().map_err(|_| "state lock failed".to_string())?;
    guard.secure_kv.insert(key, value);
    Ok(())
}

#[tauri::command]
pub fn secure_get(state: State<'_, Mutex<AppState>>, key: String) -> Result<Option<String>, String> {
    let guard = state.lock().map_err(|_| "state lock failed".to_string())?;
    Ok(guard.secure_kv.get(&key).cloned())
}
