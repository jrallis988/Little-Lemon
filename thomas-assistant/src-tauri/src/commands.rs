use crate::ai;
use crate::db::{AuditTrail, Database, InventoryScan, InventorySummary, ShiftLog};
use tauri::State;

#[tauri::command]
pub fn record_inventory_scan(
    db: State<'_, Database>,
    sku: String,
    expected_qty: i64,
    actual_qty: i64,
    user_id: String,
) -> Result<InventoryScan, String> {
    let scan = db
        .insert_inventory_scan(&sku, expected_qty, actual_qty)
        .map_err(|e| e.to_string())?;

    let severity = variance_severity(scan.variance);
    db.insert_audit_trail(
        "inventory_scan",
        &format!(
            "SKU {sku}: expected {expected_qty}, actual {actual_qty}, variance {variance} ({severity})",
            variance = scan.variance
        ),
        &user_id,
    )
    .map_err(|e| e.to_string())?;

    Ok(scan)
}

#[tauri::command]
pub fn list_inventory_scans(
    db: State<'_, Database>,
    limit: Option<i64>,
) -> Result<Vec<InventoryScan>, String> {
    db.list_inventory_scans(limit.unwrap_or(50))
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub fn record_shift_log(
    db: State<'_, Database>,
    register_id: String,
    cash_expected: f64,
    cash_actual: f64,
    user_id: String,
) -> Result<ShiftLog, String> {
    let log = db
        .insert_shift_log(&register_id, cash_expected, cash_actual, &user_id)
        .map_err(|e| e.to_string())?;

    db.insert_audit_trail(
        "shift_close",
        &format!(
            "Register {register_id}: expected ${cash_expected:.2}, actual ${cash_actual:.2}, variance ${variance:.2}",
            variance = log.variance
        ),
        &user_id,
    )
    .map_err(|e| e.to_string())?;

    Ok(log)
}

#[tauri::command]
pub fn list_shift_logs(
    db: State<'_, Database>,
    limit: Option<i64>,
) -> Result<Vec<ShiftLog>, String> {
    db.list_shift_logs(limit.unwrap_or(50))
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub fn list_audit_trails(
    db: State<'_, Database>,
    limit: Option<i64>,
) -> Result<Vec<AuditTrail>, String> {
    db.list_audit_trails(limit.unwrap_or(100))
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub fn export_audit_trails(
    db: State<'_, Database>,
    format: String,
) -> Result<String, String> {
    match format.as_str() {
        "csv" => db.export_audit_trails_csv().map_err(|e| e.to_string()),
        "json" => db.export_audit_trails_json().map_err(|e| e.to_string()),
        _ => Err("Format must be 'csv' or 'json'".to_string()),
    }
}

#[tauri::command]
pub fn get_inventory_summary(db: State<'_, Database>) -> Result<InventorySummary, String> {
    db.inventory_summary().map_err(|e| e.to_string())
}

#[tauri::command]
pub fn chat_with_assistant(message: String, context: String) -> Result<String, String> {
    match ai::chat(&message, &context) {
        Ok(response) => Ok(response),
        Err(_) => Ok(ai::offline_response(&message, &context)),
    }
}

fn variance_severity(variance: i64) -> &'static str {
    let abs = variance.abs();
    if abs == 0 {
        "exact"
    } else if abs <= 5 {
        "minor"
    } else {
        "critical"
    }
}
