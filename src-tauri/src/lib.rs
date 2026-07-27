mod browser;
mod commands;
mod filter;
mod security;
mod state;

use commands::{
    browser_close_tab, browser_create_tab, browser_find_in_page, browser_go_back, browser_go_forward,
    browser_hide_tab, browser_navigate, browser_reload, browser_set_chrome_height, browser_show_tab,
    check_url, close_window, educational_search, minimize_window, parent_secure_get,
    parent_secure_set, secure_get, secure_set, set_parent_allowlist, verify_parent_pin,
};
use state::AppState;
use std::sync::Mutex;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_store::Builder::new().build())
        .manage(Mutex::new(AppState::default()))
        .invoke_handler(tauri::generate_handler![
            check_url,
            verify_parent_pin,
            minimize_window,
            close_window,
            secure_get,
            secure_set,
            parent_secure_set,
            parent_secure_get,
            set_parent_allowlist,
            browser_create_tab,
            browser_navigate,
            browser_close_tab,
            browser_show_tab,
            browser_hide_tab,
            browser_reload,
            browser_go_back,
            browser_go_forward,
            browser_set_chrome_height,
            browser_find_in_page,
            educational_search
        ])
        .run(tauri::generate_context!())
        .expect("error while running Surf");
}
