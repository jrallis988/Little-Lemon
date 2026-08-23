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

    let status = count_status(scan.variance);
    let name = product_name(&sku);
    db.insert_audit_trail(
        "cellar_check",
        &format!(
            "{name}: should have {expected_qty}, counted {actual_qty} — {gap} ({status})",
            gap = count_gap_label(scan.variance)
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

    let till = register_id.replace("REG-", "Till ");
    db.insert_audit_trail(
        "close_night",
        &format!(
            "{till}: expected ${cash_expected:.2}, counted ${cash_actual:.2} — {}",
            till_gap_label(log.variance)
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

fn product_name(sku: &str) -> &str {
    match sku.to_uppercase().as_str() {
        "SKU-8842" => "House Porter",
        "SKU-3310" => "Session IPA",
        "SKU-1104" => "Golden Lager",
        "SKU-2201" => "Bright Pilsner",
        "SKU-5500" => "Cabernet Sauvignon",
        _ => sku,
    }
}

fn count_gap_label(gap: i64) -> String {
    if gap == 0 {
        return "all set".to_string();
    }
    let n = gap.abs();
    if gap < 0 {
        format!("{n} short")
    } else {
        format!("{n} over")
    }
}

fn count_status(gap: i64) -> &'static str {
    let abs = gap.abs();
    if abs == 0 {
        "all set"
    } else if abs <= 5 {
        "double-check"
    } else {
        "needs attention"
    }
}

fn till_gap_label(gap: f64) -> String {
    if gap == 0.0 {
        return "balanced".to_string();
    }
    let amount = gap.abs();
    if gap < 0.0 {
        format!("${amount:.2} short")
    } else {
        format!("${amount:.2} over")
    }
}
