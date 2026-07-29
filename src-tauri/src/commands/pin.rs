use pbkdf2::pbkdf2_hmac;
use sha2::Sha256;

/// Cryptographic parent gate verification on the native side.
#[tauri::command]
pub fn verify_parent_pin(pin: String, salt: String, expected_hash: String) -> bool {
    if !(4..=8).contains(&pin.len()) || !pin.chars().all(|c| c.is_ascii_digit()) {
        return false;
    }

    let mut derived = [0u8; 32];
    pbkdf2_hmac::<Sha256>(pin.as_bytes(), salt.as_bytes(), 120_000, &mut derived);
    let hash = hex::encode(derived);
    hash == expected_hash
}
