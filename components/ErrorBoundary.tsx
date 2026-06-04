'use client';

import { Component, type ReactNode, type ErrorInfo } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="flex items-center justify-center py-32 px-6">
            <div className="text-center">
              <p className="text-luxury-gold/40 text-[10px] tracking-[0.4em] uppercase font-inter mb-4">
                Hata
              </p>
              <p className="text-luxury-cream/30 font-inter text-sm">
                Bu bölüm yüklenemedi.
              </p>
            </div>
          </div>
        )
      );
    }
    return this.props.children;
  }
}
