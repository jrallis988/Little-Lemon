use chrono::{DateTime, Utc};
use rusqlite::{params, Connection};
use serde::{Deserialize, Serialize};
use std::path::PathBuf;
use std::sync::Mutex;
use tauri::AppHandle;
use tauri::Manager;

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct InventoryScan {
    pub id: i64,
    pub sku: String,
    pub expected_qty: i64,
    pub actual_qty: i64,
    pub variance: i64,
    pub timestamp: String,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct ShiftLog {
    pub id: i64,
    pub register_id: String,
    pub cash_expected: f64,
    pub cash_actual: f64,
    pub variance: f64,
    pub user_id: String,
    pub timestamp: String,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct AuditTrail {
    pub id: i64,
    pub action_type: String,
    pub details: String,
    pub user_id: String,
    pub timestamp: String,
}

pub struct Database {
    conn: Mutex<Connection>,
}

impl Database {
    pub fn new(path: PathBuf) -> Result<Self, rusqlite::Error> {
        if let Some(parent) = path.parent() {
            std::fs::create_dir_all(parent).ok();
        }

        let conn = Connection::open(path)?;
        let db = Self {
            conn: Mutex::new(conn),
        };
        db.migrate()?;
        Ok(db)
    }

    fn migrate(&self) -> Result<(), rusqlite::Error> {
        let conn = self.conn.lock().unwrap();
        conn.execute_batch(
            "
            CREATE TABLE IF NOT EXISTS inventory_scans (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                sku TEXT NOT NULL,
                expected_qty INTEGER NOT NULL,
                actual_qty INTEGER NOT NULL,
                variance INTEGER NOT NULL,
                timestamp TEXT NOT NULL DEFAULT (datetime('now'))
            );

            CREATE TABLE IF NOT EXISTS shift_logs (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                register_id TEXT NOT NULL,
                cash_expected REAL NOT NULL,
                cash_actual REAL NOT NULL,
                variance REAL NOT NULL,
                user_id TEXT NOT NULL,
                timestamp TEXT NOT NULL DEFAULT (datetime('now'))
            );

            CREATE TABLE IF NOT EXISTS audit_trails (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                action_type TEXT NOT NULL,
                details TEXT NOT NULL,
                user_id TEXT NOT NULL,
                timestamp TEXT NOT NULL DEFAULT (datetime('now'))
            );
            ",
        )?;
        Ok(())
    }

    pub fn insert_inventory_scan(
        &self,
        sku: &str,
        expected_qty: i64,
        actual_qty: i64,
    ) -> Result<InventoryScan, rusqlite::Error> {
        let variance = actual_qty - expected_qty;
        let conn = self.conn.lock().unwrap();
        conn.execute(
            "INSERT INTO inventory_scans (sku, expected_qty, actual_qty, variance) VALUES (?1, ?2, ?3, ?4)",
            params![sku, expected_qty, actual_qty, variance],
        )?;
        let id = conn.last_insert_rowid();
        self.get_inventory_scan_by_id(&conn, id)
    }

    fn get_inventory_scan_by_id(
        &self,
        conn: &Connection,
        id: i64,
    ) -> Result<InventoryScan, rusqlite::Error> {
        conn.query_row(
            "SELECT id, sku, expected_qty, actual_qty, variance, timestamp FROM inventory_scans WHERE id = ?1",
            params![id],
            |row| {
                Ok(InventoryScan {
                    id: row.get(0)?,
                    sku: row.get(1)?,
                    expected_qty: row.get(2)?,
                    actual_qty: row.get(3)?,
                    variance: row.get(4)?,
                    timestamp: row.get(5)?,
                })
            },
        )
    }

    pub fn list_inventory_scans(&self, limit: i64) -> Result<Vec<InventoryScan>, rusqlite::Error> {
        let conn = self.conn.lock().unwrap();
        let mut stmt = conn.prepare(
            "SELECT id, sku, expected_qty, actual_qty, variance, timestamp
             FROM inventory_scans ORDER BY id DESC LIMIT ?1",
        )?;
        let rows = stmt.query_map(params![limit], |row| {
            Ok(InventoryScan {
                id: row.get(0)?,
                sku: row.get(1)?,
                expected_qty: row.get(2)?,
                actual_qty: row.get(3)?,
                variance: row.get(4)?,
                timestamp: row.get(5)?,
            })
        })?;
        rows.collect()
    }

    pub fn insert_shift_log(
        &self,
        register_id: &str,
        cash_expected: f64,
        cash_actual: f64,
        user_id: &str,
    ) -> Result<ShiftLog, rusqlite::Error> {
        let variance = cash_actual - cash_expected;
        let conn = self.conn.lock().unwrap();
        conn.execute(
            "INSERT INTO shift_logs (register_id, cash_expected, cash_actual, variance, user_id)
             VALUES (?1, ?2, ?3, ?4, ?5)",
            params![register_id, cash_expected, cash_actual, variance, user_id],
        )?;
        let id = conn.last_insert_rowid();
        conn.query_row(
            "SELECT id, register_id, cash_expected, cash_actual, variance, user_id, timestamp
             FROM shift_logs WHERE id = ?1",
            params![id],
            |row| {
                Ok(ShiftLog {
                    id: row.get(0)?,
                    register_id: row.get(1)?,
                    cash_expected: row.get(2)?,
                    cash_actual: row.get(3)?,
                    variance: row.get(4)?,
                    user_id: row.get(5)?,
                    timestamp: row.get(6)?,
                })
            },
        )
    }

    pub fn list_shift_logs(&self, limit: i64) -> Result<Vec<ShiftLog>, rusqlite::Error> {
        let conn = self.conn.lock().unwrap();
        let mut stmt = conn.prepare(
            "SELECT id, register_id, cash_expected, cash_actual, variance, user_id, timestamp
             FROM shift_logs ORDER BY id DESC LIMIT ?1",
        )?;
        let rows = stmt.query_map(params![limit], |row| {
            Ok(ShiftLog {
                id: row.get(0)?,
                register_id: row.get(1)?,
                cash_expected: row.get(2)?,
                cash_actual: row.get(3)?,
                variance: row.get(4)?,
                user_id: row.get(5)?,
                timestamp: row.get(6)?,
            })
        })?;
        rows.collect()
    }

    pub fn insert_audit_trail(
        &self,
        action_type: &str,
        details: &str,
        user_id: &str,
    ) -> Result<AuditTrail, rusqlite::Error> {
        let conn = self.conn.lock().unwrap();
        conn.execute(
            "INSERT INTO audit_trails (action_type, details, user_id) VALUES (?1, ?2, ?3)",
            params![action_type, details, user_id],
        )?;
        let id = conn.last_insert_rowid();
        conn.query_row(
            "SELECT id, action_type, details, user_id, timestamp FROM audit_trails WHERE id = ?1",
            params![id],
            |row| {
                Ok(AuditTrail {
                    id: row.get(0)?,
                    action_type: row.get(1)?,
                    details: row.get(2)?,
                    user_id: row.get(3)?,
                    timestamp: row.get(4)?,
                })
            },
        )
    }

    pub fn list_audit_trails(&self, limit: i64) -> Result<Vec<AuditTrail>, rusqlite::Error> {
        let conn = self.conn.lock().unwrap();
        let mut stmt = conn.prepare(
            "SELECT id, action_type, details, user_id, timestamp
             FROM audit_trails ORDER BY id DESC LIMIT ?1",
        )?;
        let rows = stmt.query_map(params![limit], |row| {
            Ok(AuditTrail {
                id: row.get(0)?,
                action_type: row.get(1)?,
                details: row.get(2)?,
                user_id: row.get(3)?,
                timestamp: row.get(4)?,
            })
        })?;
        rows.collect()
    }

    pub fn export_audit_trails_json(&self) -> Result<String, rusqlite::Error> {
        let trails = self.list_audit_trails(10_000)?;
        serde_json::to_string_pretty(&trails).map_err(|e| {
            rusqlite::Error::ToSqlConversionFailure(Box::new(std::io::Error::new(
                std::io::ErrorKind::Other,
                e.to_string(),
            )))
        })
    }

    pub fn export_audit_trails_csv(&self) -> Result<String, rusqlite::Error> {
        let trails = self.list_audit_trails(10_000)?;
        let mut csv = String::from("id,action_type,details,user_id,timestamp\n");
        for trail in trails {
            let details = trail.details.replace('"', "\"\"");
            csv.push_str(&format!(
                "{},\"{}\",\"{}\",\"{}\",\"{}\"\n",
                trail.id, trail.action_type, details, trail.user_id, trail.timestamp
            ));
        }
        Ok(csv)
    }

    pub fn inventory_summary(&self) -> Result<InventorySummary, rusqlite::Error> {
        let conn = self.conn.lock().unwrap();
        let total: i64 = conn
            .query_row("SELECT COUNT(*) FROM inventory_scans", [], |row| row.get(0))
            .unwrap_or(0);
        let critical: i64 = conn
            .query_row(
                "SELECT COUNT(*) FROM inventory_scans WHERE ABS(variance) > 5",
                [],
                |row| row.get(0),
            )
            .unwrap_or(0);
        let minor: i64 = conn
            .query_row(
                "SELECT COUNT(*) FROM inventory_scans WHERE ABS(variance) BETWEEN 1 AND 5",
                [],
                |row| row.get(0),
            )
            .unwrap_or(0);
        Ok(InventorySummary {
            total_scans: total,
            critical_variances: critical,
            minor_variances: minor,
            exact_matches: total - critical - minor,
        })
    }
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct InventorySummary {
    pub total_scans: i64,
    pub critical_variances: i64,
    pub minor_variances: i64,
    pub exact_matches: i64,
}

pub fn init_database(app: &AppHandle) -> Result<Database, String> {
    let data_dir = app
        .path()
        .app_data_dir()
        .map_err(|e| e.to_string())?;
    let db_path = data_dir.join("thomas.db");
    Database::new(db_path).map_err(|e| e.to_string())
}

pub fn now_iso() -> String {
    let now: DateTime<Utc> = Utc::now();
    now.format("%Y-%m-%d %H:%M:%S UTC").to_string()
}
