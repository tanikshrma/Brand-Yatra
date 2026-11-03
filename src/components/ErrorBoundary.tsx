import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  componentName?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(`[ErrorBoundary] Caught error in ${this.props.componentName || 'component'}:`, error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div className="p-6 rounded-2xl bg-[var(--color-dark-text)] border border-[var(--color-primary)]/30 text-center my-4">
          <div className="w-10 h-10 rounded-full bg-[var(--color-primary)]/20 border border-[var(--color-primary)]/40 text-[var(--color-primary)] flex items-center justify-center mx-auto mb-3 font-bold text-lg">
            !
          </div>
          <h3 className="font-['Marcellus',serif] text-base text-[var(--color-white)] font-semibold mb-1">
            Component Display Warning
          </h3>
          <p className="font-['Plus_Jakarta_Sans',sans-serif] text-xs text-[var(--color-muted-slate)] max-w-sm mx-auto">
            This element encountered a temporary rendering issue, but the rest of the website is unaffected.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}
