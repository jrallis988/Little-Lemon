//! Parent PIN verification and encrypted parent-setting storage.
//!
//! Sensitive parent settings are sealed with AES-GCM. The encryption key is
//! derived from the entered PIN plus machine-specific key material that lives in
//! `ParentSecurityState`, separate from the encrypted blobs.

use aes_gcm::{
    aead::{Aead, KeyInit},
    Aes256Gcm, Nonce,
};
use base64::{engine::general_purpose::STANDARD as B64, Engine as _};
use pbkdf2::pbkdf2_hmac;
use rand::{rngs::OsRng, RngCore};
use sha2::Sha256;
use thiserror::Error;

use crate::state::{EncryptedParentBlob, ParentSecurityState};

const PIN_HASH_ITERATIONS: u32 = 120_000;
const PARENT_STORAGE_ITERATIONS: u32 = 210_000;

#[derive(Debug, Error)]
pub enum ParentSecurityError {
    #[error("PIN must be 4 to 8 digits.")]
    InvalidPin,
    #[error("encrypted parent setting is malformed")]
    MalformedBlob,
    #[error("PIN did not unlock this parent setting")]
    DecryptionFailed,
    #[error("encryption failed")]
    EncryptionFailed,
}

pub fn verify_parent_pin(pin: &str, salt: &str, expected_hash: &str) -> bool {
    if !valid_pin(pin) {
        return false;
    }

    let mut derived = [0_u8; 32];
    pbkdf2_hmac::<Sha256>(
        pin.as_bytes(),
        salt.as_bytes(),
        PIN_HASH_ITERATIONS,
        &mut derived,
    );

    let expected = match hex::decode(expected_hash) {
        Ok(value) => value,
        Err(_) => return false,
    };

    constant_time_eq(&derived, &expected)
}

pub fn encrypt_parent_value(
    material: &ParentSecurityState,
    pin: &str,
    plaintext: &str,
) -> Result<EncryptedParentBlob, ParentSecurityError> {
    if !valid_pin(pin) {
        return Err(ParentSecurityError::InvalidPin);
    }

    let cipher = cipher_for_pin(material, pin)?;
    let mut nonce = [0_u8; 12];
    OsRng.fill_bytes(&mut nonce);
    let ciphertext = cipher
        .encrypt(Nonce::from_slice(&nonce), plaintext.as_bytes())
        .map_err(|_| ParentSecurityError::EncryptionFailed)?;
    let now = chrono::Utc::now();

    Ok(EncryptedParentBlob {
        nonce_b64: B64.encode(nonce),
        ciphertext_b64: B64.encode(ciphertext),
        created_at: now,
        updated_at: now,
    })
}

pub fn decrypt_parent_value(
    material: &ParentSecurityState,
    pin: &str,
    blob: &EncryptedParentBlob,
) -> Result<String, ParentSecurityError> {
    if !valid_pin(pin) {
        return Err(ParentSecurityError::InvalidPin);
    }

    let nonce = B64
        .decode(&blob.nonce_b64)
        .map_err(|_| ParentSecurityError::MalformedBlob)?;
    if nonce.len() != 12 {
        return Err(ParentSecurityError::MalformedBlob);
    }

    let ciphertext = B64
        .decode(&blob.ciphertext_b64)
        .map_err(|_| ParentSecurityError::MalformedBlob)?;
    let cipher = cipher_for_pin(material, pin)?;
    let plaintext = cipher
        .decrypt(Nonce::from_slice(&nonce), ciphertext.as_ref())
        .map_err(|_| ParentSecurityError::DecryptionFailed)?;

    String::from_utf8(plaintext).map_err(|_| ParentSecurityError::MalformedBlob)
}

fn cipher_for_pin(
    material: &ParentSecurityState,
    pin: &str,
) -> Result<Aes256Gcm, ParentSecurityError> {
    let mut salt = Vec::with_capacity(material.machine_salt.len() + material.pin_salt.len());
    salt.extend_from_slice(&material.machine_salt);
    salt.extend_from_slice(&material.pin_salt);

    let mut key = [0_u8; 32];
    pbkdf2_hmac::<Sha256>(pin.as_bytes(), &salt, PARENT_STORAGE_ITERATIONS, &mut key);

    Aes256Gcm::new_from_slice(&key).map_err(|_| ParentSecurityError::EncryptionFailed)
}

fn valid_pin(pin: &str) -> bool {
    (4..=8).contains(&pin.len()) && pin.chars().all(|c| c.is_ascii_digit())
}

fn constant_time_eq(left: &[u8], right: &[u8]) -> bool {
    if left.len() != right.len() {
        return false;
    }

    left.iter()
        .zip(right.iter())
        .fold(0_u8, |acc, (left, right)| acc | (left ^ right))
        == 0
}
