use serde::{Deserialize, Serialize};
use std::collections::HashMap;

#[derive(Default)]
pub struct AppState {
    pub secure_kv: HashMap<String, String>,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct UrlCheckResponse {
    pub allowed: bool,
    pub domain: String,
    pub reason: Option<String>,
}
