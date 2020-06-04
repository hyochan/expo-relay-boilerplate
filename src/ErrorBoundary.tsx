import { Component, ReactElement } from 'react';

interface Props {
  children?: ReactElement;
  fallback?: ReactElement;
}

// Error boundaries currently have to be classes.
class ErrorBoundary extends Component<Props> {
  state = { hasError: false, error: null };
  static getDerivedStateFromError = (error: ErrorBoundary): Record<string, unknown> => {
    return {
      hasError: true,
      error,
    };
  };

  public render(): ReactElement | null {
    if (this.state.hasError && this.props.fallback) {
      return this.props.fallback;
    }
    if (this.props.children) {
      return this.props.children;
    }
    return null;
  }
}

export default ErrorBoundary;
