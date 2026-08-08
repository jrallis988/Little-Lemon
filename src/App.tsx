import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppLayout } from '@/layouts/app-layout';

const LandingPage = lazy(() =>
  import('@/pages/landing-page').then((module) => ({ default: module.LandingPage })),
);
const AuthPage = lazy(() =>
  import('@/pages/auth-page').then((module) => ({ default: module.AuthPage })),
);
const EmployeeWorkspacePage = lazy(() =>
  import('@/pages/employee-workspace-page').then((module) => ({
    default: module.EmployeeWorkspacePage,
  })),
);
const SettingsPage = lazy(() =>
  import('@/pages/settings-page').then((module) => ({ default: module.SettingsPage })),
);
const AppHomePage = lazy(() =>
  import('@/pages/app-home-page').then((module) => ({ default: module.AppHomePage })),
);
const MobileTeamPage = lazy(() =>
  import('@/pages/mobile-team-page').then((module) => ({ default: module.MobileTeamPage })),
);
const NotFoundPage = lazy(() =>
  import('@/pages/not-found-page').then((module) => ({ default: module.NotFoundPage })),
);

function RouteFallback() {
  return (
    <div className="flex h-full items-center justify-center text-sm text-[var(--text-muted)]">
      Loading Working Intelligence…
    </div>
  );
}

export default function App() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<AppHomePage />} />
          <Route path="team" element={<MobileTeamPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path=":employeeSlug" element={<EmployeeWorkspacePage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
