import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { intentToPath } from "@/services/historyBridge";
import {
  academicHitsToSearchResults,
  runAcademicSearch,
} from "@/services/academicSearch";
import { loadReadableArticle } from "@/services/readerFetch";
import { gradeToBand } from "@/lib/constants";
import { useNavigationStore } from "@/stores/navigationStore";
import { useParentStore, useProfileStore } from "@/stores/profileStore";
import { useSafetyStore } from "@/stores/safetyStore";
import { ROUTES } from "@/routes/paths";
import type { AcademicSearchOptions, SearchResult } from "@/types";

/**
 * Navigation helper that runs the URL filter interceptor before loading content.
 */
export function useUrlInterceptor() {
  const navigate = useNavigate();
  const intercept = useSafetyStore((s) => s.intercept);
  const setResults = useNavigationStore((s) => s.setResults);
  const setAcademicResponse = useNavigationStore((s) => s.setAcademicResponse);
  const setQuery = useNavigationStore((s) => s.setQuery);
  const setActiveArticle = useNavigationStore((s) => s.setActiveArticle);
  const setBlocked = useNavigationStore((s) => s.setBlocked);
  const pushIntent = useNavigationStore((s) => s.pushIntent);
  const pushHistory = useParentStore((s) => s.pushHistory);
  const recordSearch = useParentStore((s) => s.recordSearch);
  const activeProfileId = useProfileStore((s) => s.activeProfileId);
  const getActiveProfile = useProfileStore((s) => s.getActiveProfile);

  const goHome = useCallback(() => {
    pushIntent({ kind: "home" });
    navigate(ROUTES.home);
  }, [navigate, pushIntent]);

  const search = useCallback(
    async (query: string, options: AcademicSearchOptions = {}) => {
      const trimmed = query.trim();
      if (!trimmed) return;
      const profile = getActiveProfile();
      const grade = options.grade ?? profile?.grade;
      const gradeBand =
        options.gradeBand ?? (grade ? gradeToBand(grade) : undefined);
      setQuery(trimmed);
      const response = await runAcademicSearch(trimmed, {
        ...options,
        grade,
        gradeBand,
      });
      setAcademicResponse(response);
      setResults(academicHitsToSearchResults(response.results));
      recordSearch();
      pushIntent({ kind: "search", query: trimmed });
      navigate(`${ROUTES.search}?q=${encodeURIComponent(trimmed)}`);
    },
    [
      getActiveProfile,
      navigate,
      pushIntent,
      recordSearch,
      setAcademicResponse,
      setQuery,
      setResults,
    ],
  );

  const openUrl = useCallback(
    async (rawUrl: string, title = "Learning page") => {
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

      const article = await loadReadableArticle({
        url: check.url,
        title,
        description:
          "This page opened through Surf’s safety filter. Reader mode keeps only the main educational content so learning stays calm and focused.",
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
    async (result: SearchResult) => {
      const check = intercept(result.url);
      if (!check.allowed) {
        setBlocked(check.url, check.reason ?? "This site is restricted.");
        navigate(
          `${ROUTES.blocked}?url=${encodeURIComponent(check.url)}&reason=${encodeURIComponent(check.reason ?? "")}`,
        );
        return;
      }

      const article = await loadReadableArticle({
        url: result.url,
        title: result.title,
        description: result.description,
        sourceBadge: result.sourceBadge,
        citation: result.citation,
        vocabulary: result.vocabulary,
      });
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
