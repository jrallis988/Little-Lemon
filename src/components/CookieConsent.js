import { useEffect, useId, useState } from "react";

const STORAGE_KEY = "seascape-cookie-consent";

export function readConsent() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function writeConsent(value) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  window.dispatchEvent(new CustomEvent("seascape-consent", { detail: value }));
}

export default function CookieConsent() {
  const titleId = useId();
  const [visible, setVisible] = useState(false);
  const [manage, setManage] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    const existing = readConsent();
    if (!existing) {
      setVisible(true);
      return undefined;
    }
    return undefined;
  }, []);

  if (!visible) return null;

  function acceptAll() {
    writeConsent({ necessary: true, analytics: true, updatedAt: Date.now() });
    setVisible(false);
  }

  function rejectOptional() {
    writeConsent({ necessary: true, analytics: false, updatedAt: Date.now() });
    setVisible(false);
  }

  function savePrefs() {
    writeConsent({
      necessary: true,
      analytics,
      updatedAt: Date.now(),
    });
    setVisible(false);
  }

  return (
    <div className="consent" role="dialog" aria-modal="false" aria-labelledby={titleId}>
      <div className="consent__inner">
        <div className="consent__copy">
          <h2 id={titleId}>Cookies on this site</h2>
          <p>
            We use essential cookies to run booking and the site. Optional analytics
            cookies help us improve visits—only if you allow them. See our{" "}
            <a href="#cookies">Cookie policy</a> and{" "}
            <a href="#privacy">Privacy policy</a>.
          </p>

          {manage ? (
            <label className="consent__toggle">
              <input
                type="checkbox"
                checked={analytics}
                onChange={(event) => setAnalytics(event.target.checked)}
              />
              <span>Allow analytics cookies</span>
            </label>
          ) : null}
        </div>

        <div className="consent__actions">
          {manage ? (
            <button className="btn btn-primary" type="button" onClick={savePrefs}>
              Save preferences
            </button>
          ) : (
            <button className="btn btn-primary" type="button" onClick={acceptAll}>
              Accept
            </button>
          )}
          <button className="btn btn-ghost consent__ghost" type="button" onClick={rejectOptional}>
            Decline
          </button>
          {!manage ? (
            <button
              className="btn btn-ghost consent__ghost"
              type="button"
              onClick={() => setManage(true)}
            >
              Manage
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
