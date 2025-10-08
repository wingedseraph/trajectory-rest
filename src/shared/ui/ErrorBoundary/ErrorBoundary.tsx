import type { ReactNode } from "react";
import { Component } from "react";
import { Button } from "@/shared/ui/Button/button";

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col gap-5 min-h-screen items-center justify-center p-4">
          <h1>Something went wrong</h1>
          <Button>
            <a href="..">Refresh Page</a>
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
