mod filter;
mod pin;
mod search;
mod storage;
mod window;

pub use crate::browser::tabs::{
    browser_close_tab, browser_create_tab, browser_go_back, browser_go_forward, browser_hide_tab,
    browser_navigate, browser_reload, browser_set_chrome_height, browser_show_tab,
};
pub use filter::check_url;
pub use pin::verify_parent_pin;
pub use search::educational_search;
pub use storage::{parent_secure_get, parent_secure_set, secure_get, secure_set};
pub use window::{close_window, minimize_window};
