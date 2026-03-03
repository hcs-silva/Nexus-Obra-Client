import { Component, type ErrorInfo, type ReactNode } from "react";

interface RouteErrorBoundaryProps {
  children: ReactNode;
  routeName: string;
}

interface RouteErrorBoundaryState {
  hasError: boolean;
}

class RouteErrorBoundary extends Component<
  RouteErrorBoundaryProps,
  RouteErrorBoundaryState
> {
  public state: RouteErrorBoundaryState = {
    hasError: false,
  };

  public static getDerivedStateFromError(): RouteErrorBoundaryState {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error(`Route error in ${this.props.routeName}`, error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return <div>We couldn&apos;t load this page. Please try again.</div>;
    }

    return this.props.children;
  }
}

export default RouteErrorBoundary;
