//! Native tab machinery for Surf content webviews.
//!
//! Each content tab is a child webview under the main chrome window, labelled
//! `surf-tab-{id}`. Navigation is checked natively before the webview is allowed
//! to load the target URL, so blocked sites never get a paint opportunity.

use crate::{
    filter,
    state::{AppState, BrowserTab},
};
use serde::Serialize;
use std::sync::{
    atomic::{AtomicU64, Ordering},
    Mutex,
};
use tauri::{
    webview::{NewWindowResponse, Webview, WebviewBuilder},
    Emitter, LogicalPosition, LogicalSize, Manager, State, WebviewUrl, Window,
};

static POPUP_TAB_COUNTER: AtomicU64 = AtomicU64::new(1);

#[derive(Debug, Clone, Serialize)]
pub struct BlockedNavigationPayload {
    pub tab_id: String,
    pub url: String,
    pub reason: String,
    pub domain: String,
    pub timestamp: chrono::DateTime<chrono::Utc>,
}

#[derive(Debug, Clone, Serialize)]
pub struct NewTabCreatedPayload {
    pub tab_id: String,
    pub opener_tab_id: String,
    pub url: String,
    pub timestamp: chrono::DateTime<chrono::Utc>,
}

#[tauri::command]
pub fn browser_create_tab(
    window: Window,
    state: State<'_, Mutex<AppState>>,
    tab_id: String,
    url: String,
    chrome_height: f64,
) -> Result<(), String> {
    ensure_main_window(&window)?;
    let tab_id = validate_tab_id(&tab_id)?;
    let label = tab_label(&tab_id);

    if window.get_webview(&label).is_some() {
        return Err(format!("A browser tab already exists for id {tab_id}."));
    }

    let decision = {
        let guard = state.lock().map_err(|_| "state lock failed".to_string())?;
        filter::evaluate_url(&url, &guard.parent_allowlist)
    };
    if !decision.allowed {
        emit_blocked_navigation(&window, &tab_id, &url, decision.reason, decision.domain);
        return Err("Navigation blocked by Surf's educational filter.".to_string());
    }
    let parsed_url = decision
        .normalized_url
        .ok_or_else(|| "That address could not be understood.".to_string())?;

    let (position, size) = content_geometry(&window, chrome_height)?;
    let builder = content_webview_builder(&window, &tab_id, &label, parsed_url.clone());
    let webview = window
        .add_child(builder, position, size)
        .map_err(|error| error.to_string())?;
    webview.show().map_err(|error| error.to_string())?;

    let now = chrono::Utc::now();
    {
        let mut guard = state.lock().map_err(|_| "state lock failed".to_string())?;
        guard.browser.chrome_height = chrome_height;
        guard.browser.tabs.insert(
            tab_id.clone(),
            BrowserTab {
                id: tab_id,
                label,
                current_url: parsed_url.to_string(),
                visible: true,
                created_at: now,
                updated_at: now,
            },
        );
    }

    Ok(())
}

#[tauri::command]
pub fn browser_navigate(
    window: Window,
    state: State<'_, Mutex<AppState>>,
    tab_id: String,
    url: String,
) -> Result<(), String> {
    ensure_main_window(&window)?;
    let tab_id = validate_tab_id(&tab_id)?;
    let webview = get_tab_webview(&window, &tab_id)?;
    let decision = {
        let guard = state.lock().map_err(|_| "state lock failed".to_string())?;
        filter::evaluate_url(&url, &guard.parent_allowlist)
    };

    if !decision.allowed {
        emit_blocked_navigation(&window, &tab_id, &url, decision.reason, decision.domain);
        return Err("Navigation blocked by Surf's educational filter.".to_string());
    }

    let parsed_url = decision
        .normalized_url
        .ok_or_else(|| "That address could not be understood.".to_string())?;
    webview
        .navigate(parsed_url.clone())
        .map_err(|error| error.to_string())?;

    update_tab_url(&state, &tab_id, parsed_url.as_str())?;
    Ok(())
}

#[tauri::command]
pub fn browser_close_tab(
    window: Window,
    state: State<'_, Mutex<AppState>>,
    tab_id: String,
) -> Result<(), String> {
    ensure_main_window(&window)?;
    let tab_id = validate_tab_id(&tab_id)?;
    let webview = get_tab_webview(&window, &tab_id)?;
    webview.close().map_err(|error| error.to_string())?;

    let mut guard = state.lock().map_err(|_| "state lock failed".to_string())?;
    guard.browser.tabs.remove(&tab_id);
    Ok(())
}

#[tauri::command]
pub fn browser_show_tab(
    window: Window,
    state: State<'_, Mutex<AppState>>,
    tab_id: String,
) -> Result<(), String> {
    ensure_main_window(&window)?;
    let tab_id = validate_tab_id(&tab_id)?;
    let webview = get_tab_webview(&window, &tab_id)?;
    webview.show().map_err(|error| error.to_string())?;
    set_tab_visible(&state, &tab_id, true)
}

#[tauri::command]
pub fn browser_hide_tab(
    window: Window,
    state: State<'_, Mutex<AppState>>,
    tab_id: String,
) -> Result<(), String> {
    ensure_main_window(&window)?;
    let tab_id = validate_tab_id(&tab_id)?;
    let webview = get_tab_webview(&window, &tab_id)?;
    webview.hide().map_err(|error| error.to_string())?;
    set_tab_visible(&state, &tab_id, false)
}

#[tauri::command]
pub fn browser_reload(window: Window, tab_id: String) -> Result<(), String> {
    ensure_main_window(&window)?;
    let tab_id = validate_tab_id(&tab_id)?;
    get_tab_webview(&window, &tab_id)?
        .reload()
        .map_err(|error| error.to_string())
}

#[tauri::command]
pub fn browser_go_back(window: Window, tab_id: String) -> Result<(), String> {
    ensure_main_window(&window)?;
    let tab_id = validate_tab_id(&tab_id)?;
    get_tab_webview(&window, &tab_id)?
        .eval("history.back();")
        .map_err(|error| error.to_string())
}

#[tauri::command]
pub fn browser_go_forward(window: Window, tab_id: String) -> Result<(), String> {
    ensure_main_window(&window)?;
    let tab_id = validate_tab_id(&tab_id)?;
    get_tab_webview(&window, &tab_id)?
        .eval("history.forward();")
        .map_err(|error| error.to_string())
}

#[tauri::command]
pub fn browser_set_chrome_height(
    window: Window,
    state: State<'_, Mutex<AppState>>,
    chrome_height: f64,
) -> Result<(), String> {
    ensure_main_window(&window)?;
    let labels = {
        let mut guard = state.lock().map_err(|_| "state lock failed".to_string())?;
        guard.browser.chrome_height = chrome_height;
        guard
            .browser
            .tabs
            .values()
            .map(|tab| tab.label.clone())
            .collect::<Vec<_>>()
    };

    let (position, size) = content_geometry(&window, chrome_height)?;
    for label in labels {
        if let Some(webview) = window.get_webview(&label) {
            webview
                .set_position(position)
                .map_err(|error| error.to_string())?;
            webview.set_size(size).map_err(|error| error.to_string())?;
        }
    }

    Ok(())
}

/// Find text in the active content webview using the platform find API.
#[tauri::command]
pub fn browser_find_in_page(
    window: Window,
    tab_id: String,
    query: String,
    forward: Option<bool>,
) -> Result<bool, String> {
    ensure_main_window(&window)?;
    let tab_id = validate_tab_id(&tab_id)?;
    let webview = get_tab_webview(&window, &tab_id)?;
    let forward = forward.unwrap_or(true);
    let escaped = serde_json::to_string(&query).map_err(|error| error.to_string())?;
    let script = format!(
        r#"(function(){{
          try {{
            return window.find({escaped}, false, {backwards}, true, false, false, false);
          }} catch (error) {{
            return false;
          }}
        }})()"#,
        backwards = if forward { "false" } else { "true" }
    );
    webview.eval(&script).map_err(|error| error.to_string())?;
    Ok(true)
}

fn content_webview_builder(
    window: &Window,
    tab_id: &str,
    label: &str,
    url: url::Url,
) -> WebviewBuilder<tauri::Wry> {
    let navigation_window = window.clone();
    let navigation_tab_id = tab_id.to_string();
    let new_window_window = window.clone();
    let new_window_tab_id = tab_id.to_string();

    WebviewBuilder::new(label, WebviewUrl::External(url))
        .on_navigation(move |navigation_url| {
            let allowlist = navigation_window
                .state::<Mutex<AppState>>()
                .lock()
                .map(|guard| guard.parent_allowlist.clone())
                .unwrap_or_default();
            let decision = filter::evaluate_parsed_url(navigation_url.clone(), &allowlist);
            if decision.allowed {
                true
            } else {
                emit_blocked_navigation(
                    &navigation_window,
                    &navigation_tab_id,
                    navigation_url.as_str(),
                    decision.reason,
                    decision.domain,
                );
                false
            }
        })
        .on_new_window(move |new_url, _features| {
            let allowlist = new_window_window
                .state::<Mutex<AppState>>()
                .lock()
                .map(|guard| guard.parent_allowlist.clone())
                .unwrap_or_default();
            let decision = filter::evaluate_parsed_url(new_url.clone(), &allowlist);
            if decision.allowed {
                if let Err(error) =
                    create_popup_tab(&new_window_window, &new_window_tab_id, new_url)
                {
                    emit_blocked_navigation(
                        &new_window_window,
                        &new_window_tab_id,
                        "",
                        Some(format!("Surf could not open a new tab: {error}")),
                        String::new(),
                    );
                }
            } else {
                emit_blocked_navigation(
                    &new_window_window,
                    &new_window_tab_id,
                    new_url.as_str(),
                    decision.reason,
                    decision.domain,
                );
            }

            NewWindowResponse::Deny
        })
}

fn create_popup_tab(window: &Window, opener_tab_id: &str, url: url::Url) -> Result<(), String> {
    let tab_id = format!(
        "popup-{}",
        POPUP_TAB_COUNTER.fetch_add(1, Ordering::Relaxed)
    );
    let label = tab_label(&tab_id);
    let chrome_height = {
        let state = window.state::<Mutex<AppState>>();
        let guard = state.lock().map_err(|_| "state lock failed".to_string())?;
        guard.browser.chrome_height
    };

    let (position, size) = content_geometry(window, chrome_height)?;
    let builder = content_webview_builder(window, &tab_id, &label, url.clone());
    let webview = window
        .add_child(builder, position, size)
        .map_err(|error| error.to_string())?;
    webview.hide().map_err(|error| error.to_string())?;

    let now = chrono::Utc::now();
    {
        let state = window.state::<Mutex<AppState>>();
        let mut guard = state.lock().map_err(|_| "state lock failed".to_string())?;
        guard.browser.tabs.insert(
            tab_id.clone(),
            BrowserTab {
                id: tab_id.clone(),
                label,
                current_url: url.to_string(),
                visible: false,
                created_at: now,
                updated_at: now,
            },
        );
    }

    let _ = window.emit(
        "surf-new-tab-created",
        NewTabCreatedPayload {
            tab_id,
            opener_tab_id: opener_tab_id.to_string(),
            url: url.to_string(),
            timestamp: now,
        },
    );

    Ok(())
}

fn get_tab_webview(window: &Window, tab_id: &str) -> Result<Webview, String> {
    window
        .get_webview(&tab_label(tab_id))
        .ok_or_else(|| format!("No browser tab exists for id {tab_id}."))
}

fn content_geometry(
    window: &Window,
    chrome_height: f64,
) -> Result<(LogicalPosition<f64>, LogicalSize<f64>), String> {
    if !chrome_height.is_finite() || chrome_height < 0.0 {
        return Err("chrome_height must be a non-negative number.".to_string());
    }

    let inner_size = window.inner_size().map_err(|error| error.to_string())?;
    let scale_factor = window.scale_factor().map_err(|error| error.to_string())?;
    let logical_width = inner_size.width as f64 / scale_factor;
    let logical_height = inner_size.height as f64 / scale_factor;
    let content_height = (logical_height - chrome_height).max(1.0);

    Ok((
        LogicalPosition::new(0.0, chrome_height),
        LogicalSize::new(logical_width, content_height),
    ))
}

fn emit_blocked_navigation(
    window: &Window,
    tab_id: &str,
    url: &str,
    reason: Option<String>,
    domain: String,
) {
    let _ = window.emit(
        "surf-navigation-blocked",
        BlockedNavigationPayload {
            tab_id: tab_id.to_string(),
            url: url.to_string(),
            reason: reason.unwrap_or_else(|| "Navigation blocked by Surf.".to_string()),
            domain,
            timestamp: chrono::Utc::now(),
        },
    );
}

fn update_tab_url(
    state: &State<'_, Mutex<AppState>>,
    tab_id: &str,
    url: &str,
) -> Result<(), String> {
    let mut guard = state.lock().map_err(|_| "state lock failed".to_string())?;
    if let Some(tab) = guard.browser.tabs.get_mut(tab_id) {
        tab.current_url = url.to_string();
        tab.updated_at = chrono::Utc::now();
    }
    Ok(())
}

fn set_tab_visible(
    state: &State<'_, Mutex<AppState>>,
    tab_id: &str,
    visible: bool,
) -> Result<(), String> {
    let mut guard = state.lock().map_err(|_| "state lock failed".to_string())?;
    if let Some(tab) = guard.browser.tabs.get_mut(tab_id) {
        tab.visible = visible;
        tab.updated_at = chrono::Utc::now();
    }
    Ok(())
}

fn ensure_main_window(window: &Window) -> Result<(), String> {
    if window.label() == "main" {
        Ok(())
    } else {
        Err("Browser tabs must be managed from the main Surf window.".to_string())
    }
}

fn validate_tab_id(tab_id: &str) -> Result<String, String> {
    let tab_id = tab_id.trim();
    if tab_id.is_empty() {
        return Err("tab_id is required.".to_string());
    }
    if tab_id
        .chars()
        .all(|c| c.is_ascii_alphanumeric() || c == '-' || c == '_')
    {
        Ok(tab_id.to_string())
    } else {
        Err("tab_id may only contain letters, numbers, dashes, and underscores.".to_string())
    }
}

fn tab_label(tab_id: &str) -> String {
    format!("surf-tab-{tab_id}")
}
