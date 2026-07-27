import { Component, type ErrorInfo, type ReactNode } from "react";
import { Button } from "@/components/ui/button";

type Props = {
  children: ReactNode;
};

type State = {
  error: Error | null;
};

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Surf UI error", error, info);
  }

  render() {
    if (!this.state.error) return this.props.children;

    return (
      <main className="flex min-h-screen items-center justify-center p-6">
        <section className="max-w-lg rounded-3xl border border-white/70 bg-white/85 p-8 text-center shadow-soft">
          <h1 className="font-display text-3xl font-semibold text-navy">
            Surf hit a rough wave
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-slate">
            The browser chrome stayed safe, but this screen could not render.
          </p>
          <pre className="mt-4 max-h-40 overflow-auto rounded-2xl bg-cream p-3 text-left text-xs text-slate-deep">
            {this.state.error.message}
          </pre>
          <Button className="mt-5" onClick={() => window.location.assign("/")}>
            Return to new tab
          </Button>
        </section>
      </main>
    );
  }
}
