mod ai;
mod commands;
mod db;

use db::Database;
use tauri::Manager;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .setup(|app| {
            let database = db::init_database(app.handle())?;
            app.manage(database);
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            commands::record_inventory_scan,
            commands::list_inventory_scans,
            commands::record_shift_log,
            commands::list_shift_logs,
            commands::list_audit_trails,
            commands::export_audit_trails,
            commands::get_inventory_summary,
            commands::chat_with_assistant,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
