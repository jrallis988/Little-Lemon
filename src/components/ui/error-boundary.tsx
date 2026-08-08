import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Button } from '@/components/ui/button';

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
}

interface State {
  hasError: boolean;
  message?: string;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('UI error boundary', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-full min-h-64 flex-col items-center justify-center gap-3 p-8 text-center">
          <h2 className="font-display text-2xl font-semibold">
            {this.props.fallbackTitle ?? 'Something went wrong'}
          </h2>
          <p className="max-w-md text-sm text-[var(--text-muted)]">
            {this.state.message ?? 'An unexpected error occurred in this view.'}
          </p>
          <Button onClick={() => this.setState({ hasError: false, message: undefined })}>
            Try again
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
