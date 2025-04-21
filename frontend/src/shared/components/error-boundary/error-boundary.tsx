'use client';

import { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/shared/ui/button/button';

interface ErrorBoundaryProps {
  fallback?: ReactNode;
  children?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('Error occurred:', error);
    console.error('Component stack:', info.componentStack);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="container">
          <h2>Ooops... You are getting an error</h2>
          <Button btnType="button" to="/" color="dark">
            Back
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
