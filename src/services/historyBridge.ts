import type { NavigationIntent } from "@/types";

/**
 * Session stack helpers that mirror history.push / history.back semantics.
 */
export function intentToPath(intent: NavigationIntent): string {
  switch (intent.kind) {
    case "home":
      return "/";
    case "search":
      return `/search?q=${encodeURIComponent(intent.query)}`;
    case "article":
      return `/article?url=${encodeURIComponent(intent.url)}`;
    case "explore":
      return "/explore";
    case "explore-category":
      return `/explore/${intent.categoryId}`;
    case "blocked":
      return `/blocked?url=${encodeURIComponent(intent.url)}`;
    case "break":
      return "/break";
    case "profile":
      return "/profile";
    case "parent":
      return "/parent";
    case "projects":
      return "/projects";
    case "project":
      return `/projects/${intent.projectId}`;
    default:
      return "/";
  }
}
