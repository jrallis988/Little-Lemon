export const ROUTES = {
  home: "/",
  search: "/search",
  article: "/article",
  explore: "/explore",
  exploreCategory: "/explore/:categoryId",
  blocked: "/blocked",
  break: "/break",
  profile: "/profile",
  parent: "/parent",
} as const;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];
