import { Component, type ErrorInfo, type ReactNode } from "react"
import { Button } from "@/components/ui/button"

type Props = { children: ReactNode }
type State = { hasError: boolean; message?: string }

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Marshalls UI error:", error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="shelf-container flex min-h-[50vh] flex-col items-start justify-center gap-4 py-16">
          <p className="text-2xs font-semibold uppercase tracking-[0.12em] text-primary">
            Something went wrong
          </p>
          <h1 className="font-display text-display-sm font-bold tracking-tight">
            We hit a snag loading this view.
          </h1>
          <p className="max-w-md text-sm text-muted-foreground">
            {this.state.message ??
              "Please refresh the page. Your bag contents are saved locally."}
          </p>
          <Button onClick={() => window.location.reload()}>Refresh page</Button>
        </div>
      )
    }
    return this.props.children
  }
}
