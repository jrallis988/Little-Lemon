import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export function NotFoundPage() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 p-8 text-center">
      <h1 className="font-display text-3xl font-semibold">Page not found</h1>
      <p className="text-sm text-[var(--text-muted)]">
        That route doesn’t exist in the Working Intelligence workspace.
      </p>
      <Link to="/app">
        <Button>Back to workspace</Button>
      </Link>
    </div>
  );
}
