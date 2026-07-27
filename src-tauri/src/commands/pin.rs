/// Cryptographic parent gate verification on the native side.
#[tauri::command]
pub fn verify_parent_pin(pin: String, salt: String, expected_hash: String) -> bool {
    crate::security::pin::verify_parent_pin(&pin, &salt, &expected_hash)
}
