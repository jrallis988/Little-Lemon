import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { sanitizeArticleContent } from "@/services/contentSanitizer";
import { intentToPath } from "@/services/historyBridge";
import { runCuratedSearch } from "@/data/curatedContent";
import { useNavigationStore } from "@/stores/navigationStore";
import { useParentStore } from "@/stores/profileStore";
import { useSafetyStore } from "@/stores/safetyStore";
import { useProfileStore } from "@/stores/profileStore";
import { ROUTES } from "@/routes/paths";

/**
 * Navigation helper that runs the URL filter interceptor before loading content.
 */
export function useUrlInterceptor() {
  const navigate = useNavigate();
  const intercept = useSafetyStore((s) => s.intercept);
  const setResults = useNavigationStore((s) => s.setResults);
  const setQuery = useNavigationStore((s) => s.setQuery);
  const setActiveArticle = useNavigationStore((s) => s.setActiveArticle);
  const setBlocked = useNavigationStore((s) => s.setBlocked);
  const pushIntent = useNavigationStore((s) => s.pushIntent);
  const pushHistory = useParentStore((s) => s.pushHistory);
  const recordSearch = useParentStore((s) => s.recordSearch);
  const activeProfileId = useProfileStore((s) => s.activeProfileId);

  const goHome = useCallback(() => {
    pushIntent({ kind: "home" });
    navigate(ROUTES.home);
  }, [navigate, pushIntent]);

  const search = useCallback(
    (query: string) => {
      const trimmed = query.trim();
      if (!trimmed) return;
      setQuery(trimmed);
      const results = runCuratedSearch(trimmed);
      setResults(results);
      recordSearch();
      pushIntent({ kind: "search", query: trimmed });
      navigate(`${ROUTES.search}?q=${encodeURIComponent(trimmed)}`);
    },
    [navigate, pushIntent, recordSearch, setQuery, setResults],
  );

  const openUrl = useCallback(
    (rawUrl: string, title = "Learning page") => {
      const check = intercept(rawUrl);
      if (!check.allowed) {
        setBlocked(check.url, check.reason ?? "This site is restricted.");
        pushIntent({
          kind: "blocked",
          url: check.url,
          reason: check.reason ?? "restricted",
        });
        pushHistory({
          profileId: activeProfileId ?? "unknown",
          title,
          url: check.url,
          domain: check.domain,
          visitedAt: new Date().toISOString(),
          blocked: true,
        });
        navigate(
          `${ROUTES.blocked}?url=${encodeURIComponent(check.url)}&reason=${encodeURIComponent(check.reason ?? "")}`,
        );
        return false;
      }

      const article = sanitizeArticleContent({
        url: check.url,
        title,
        description:
          "This page opened through Surf’s safety filter. Reader mode keeps only the main educational content so learning stays calm and focused. Sidebars, ads, and trackers are removed before anything is shown.",
        sourceBadge: "Curated",
      });
      setActiveArticle(article);
      pushIntent({ kind: "article", url: check.url, title });
      pushHistory({
        profileId: activeProfileId ?? "unknown",
        title,
        url: check.url,
        domain: check.domain,
        visitedAt: new Date().toISOString(),
        blocked: false,
      });
      navigate(`${ROUTES.article}?url=${encodeURIComponent(check.url)}`);
      return true;
    },
    [
      activeProfileId,
      intercept,
      navigate,
      pushHistory,
      pushIntent,
      setActiveArticle,
      setBlocked,
    ],
  );

  const openSearchResult = useCallback(
    (result: {
      url: string;
      title: string;
      description: string;
      sourceBadge: string;
    }) => {
      const check = intercept(result.url);
      if (!check.allowed) {
        setBlocked(check.url, check.reason ?? "This site is restricted.");
        navigate(
          `${ROUTES.blocked}?url=${encodeURIComponent(check.url)}&reason=${encodeURIComponent(check.reason ?? "")}`,
        );
        return;
      }

      const article = sanitizeArticleContent(result);
      setActiveArticle(article);
      pushIntent({ kind: "article", url: check.url, title: result.title });
      pushHistory({
        profileId: activeProfileId ?? "unknown",
        title: result.title,
        url: check.url,
        domain: check.domain,
        visitedAt: new Date().toISOString(),
      });
      navigate(`${ROUTES.article}?url=${encodeURIComponent(check.url)}`);
    },
    [
      activeProfileId,
      intercept,
      navigate,
      pushHistory,
      pushIntent,
      setActiveArticle,
      setBlocked,
    ],
  );

  const goBack = useCallback(() => {
    const intent = useNavigationStore.getState().popIntent();
    if (!intent) {
      navigate(ROUTES.home);
      return;
    }
    navigate(intentToPath(intent));
  }, [navigate]);

  return { goHome, search, openUrl, openSearchResult, goBack };
}
