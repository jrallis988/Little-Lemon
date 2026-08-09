import { Navigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-media-query';
import { MobileInboxPage } from '@/pages/mobile-inbox-page';

export function AppHomePage() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <MobileInboxPage />;
  }

  return <Navigate to="nate" replace />;
}
