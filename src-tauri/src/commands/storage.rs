use crate::state::AppState;
use std::sync::Mutex;
use tauri::State;

#[tauri::command]
pub fn secure_set(
    state: State<'_, Mutex<AppState>>,
    key: String,
    value: String,
) -> Result<(), String> {
    let mut guard = state.lock().map_err(|_| "state lock failed".to_string())?;
    guard.secure_kv.insert(key, value);
    Ok(())
}

#[tauri::command]
pub fn secure_get(
    state: State<'_, Mutex<AppState>>,
    key: String,
) -> Result<Option<String>, String> {
    let guard = state.lock().map_err(|_| "state lock failed".to_string())?;
    Ok(guard.secure_kv.get(&key).cloned())
}

#[tauri::command]
pub fn parent_secure_set(
    state: State<'_, Mutex<AppState>>,
    key: String,
    pin: String,
    value: String,
) -> Result<(), String> {
    let mut guard = state.lock().map_err(|_| "state lock failed".to_string())?;
    let previous_created_at = guard
        .parent_security
        .encrypted_blobs
        .get(&key)
        .map(|blob| blob.created_at);
    let mut blob = crate::security::pin::encrypt_parent_value(&guard.parent_security, &pin, &value)
        .map_err(|error| error.to_string())?;

    if let Some(created_at) = previous_created_at {
        blob.created_at = created_at;
        blob.updated_at = chrono::Utc::now();
    }

    guard.parent_security.encrypted_blobs.insert(key, blob);
    Ok(())
}

#[tauri::command]
pub fn parent_secure_get(
    state: State<'_, Mutex<AppState>>,
    key: String,
    pin: String,
) -> Result<Option<String>, String> {
    let guard = state.lock().map_err(|_| "state lock failed".to_string())?;
    let Some(blob) = guard.parent_security.encrypted_blobs.get(&key) else {
        return Ok(None);
    };

    crate::security::pin::decrypt_parent_value(&guard.parent_security, &pin, blob)
        .map(Some)
        .map_err(|error| error.to_string())
}
