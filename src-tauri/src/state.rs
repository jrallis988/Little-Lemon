use rand::{rngs::OsRng, RngCore};
use serde::{Deserialize, Serialize};
use std::collections::HashMap;

pub struct AppState {
    pub secure_kv: HashMap<String, String>,
    pub browser: BrowserState,
    pub parent_security: ParentSecurityState,
    pub parent_allowlist: Vec<String>,
}

impl Default for AppState {
    fn default() -> Self {
        Self {
            secure_kv: HashMap::new(),
            browser: BrowserState::default(),
            parent_security: ParentSecurityState::default(),
            parent_allowlist: Vec::new(),
        }
    }
}

#[derive(Debug, Default)]
pub struct BrowserState {
    pub chrome_height: f64,
    pub tabs: HashMap<String, BrowserTab>,
}

#[derive(Debug, Clone)]
#[allow(dead_code)]
pub struct BrowserTab {
    pub id: String,
    pub label: String,
    pub current_url: String,
    pub visible: bool,
    pub created_at: chrono::DateTime<chrono::Utc>,
    pub updated_at: chrono::DateTime<chrono::Utc>,
}

#[derive(Debug)]
pub struct ParentSecurityState {
    pub machine_salt: [u8; 32],
    pub pin_salt: [u8; 32],
    pub encrypted_blobs: HashMap<String, EncryptedParentBlob>,
}

impl Default for ParentSecurityState {
    fn default() -> Self {
        let mut machine_salt = [0_u8; 32];
        let mut pin_salt = [0_u8; 32];
        OsRng.fill_bytes(&mut machine_salt);
        OsRng.fill_bytes(&mut pin_salt);

        Self {
            machine_salt,
            pin_salt,
            encrypted_blobs: HashMap::new(),
        }
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct EncryptedParentBlob {
    pub nonce_b64: String,
    pub ciphertext_b64: String,
    pub created_at: chrono::DateTime<chrono::Utc>,
    pub updated_at: chrono::DateTime<chrono::Utc>,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct UrlCheckResponse {
    pub allowed: bool,
    pub domain: String,
    pub reason: Option<String>,
}
