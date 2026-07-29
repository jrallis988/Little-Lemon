mod academic;
mod commands;
mod state;

use commands::{
    academic_search, check_url, close_window, minimize_window, secure_get, secure_set,
    verify_parent_pin,
};
use state::AppState;
use std::sync::Mutex;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_store::Builder::new().build())
        .manage(Mutex::new(AppState::default()))
        .invoke_handler(tauri::generate_handler![
            academic_search,
            check_url,
            verify_parent_pin,
            minimize_window,
            close_window,
            secure_get,
            secure_set
        ])
        .run(tauri::generate_context!())
        .expect("error while running Surf");
}
