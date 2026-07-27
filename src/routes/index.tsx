import { Navigate, Route, Routes } from "react-router-dom";
import { BrowserShell } from "@/components/browser/BrowserShell";
import { HomeScreen } from "@/screens/HomeScreen";
import { SearchResultsScreen } from "@/screens/SearchResultsScreen";
import { ExploreScreen } from "@/screens/ExploreScreen";
import { ExploreCategoryScreen } from "@/screens/ExploreCategoryScreen";
import { BlockedSiteScreen } from "@/screens/BlockedSiteScreen";
import { BreakScreen } from "@/screens/BreakScreen";
import { ProfileScreen } from "@/screens/ProfileScreen";
import { ParentDashboardScreen } from "@/screens/ParentDashboardScreen";
import { ProjectsScreen } from "@/features/projects/ProjectsScreen";
import { ROUTES } from "@/routes/paths";

export function AppRouter() {
  return (
    <Routes>
      <Route element={<BrowserShell />}>
        <Route path={ROUTES.home} element={<HomeScreen />} />
        <Route path={ROUTES.search} element={<SearchResultsScreen />} />
        <Route path={ROUTES.explore} element={<ExploreScreen />} />
        <Route
          path={ROUTES.exploreCategory}
          element={<ExploreCategoryScreen />}
        />
        <Route path={ROUTES.blocked} element={<BlockedSiteScreen />} />
        <Route path={ROUTES.break} element={<BreakScreen />} />
        <Route path={ROUTES.profile} element={<ProfileScreen />} />
        <Route path={ROUTES.parent} element={<ParentDashboardScreen />} />
        <Route path={ROUTES.projects} element={<ProjectsScreen />} />
        <Route path={ROUTES.settings} element={<ProfileScreen />} />
        <Route path="*" element={<Navigate to={ROUTES.home} replace />} />
      </Route>
    </Routes>
  );
}
