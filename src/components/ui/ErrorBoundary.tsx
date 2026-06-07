import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[ErrorBoundary]', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div
          style={{
            minHeight: '100vh',
            background: '#131313',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
          }}
        >
          <div
            style={{
              background: 'rgba(28,28,28,0.7)',
              backdropFilter: 'blur(20px)',
              border: '0.5px solid rgba(255,175,214,0.1)',
              borderRadius: '20px',
              padding: '32px 24px',
              textAlign: 'center',
              maxWidth: '320px',
              width: '100%',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06), 0 8px 32px rgba(0,0,0,0.4)',
            }}
          >
            <div style={{ fontSize: '40px', marginBottom: '16px', opacity: 0.6 }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ffafd6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <h2 style={{ color: '#ffffff', fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, fontSize: '18px', marginBottom: '8px' }}>
              Something went wrong
            </h2>
            <p style={{ color: 'rgba(214,193,201,0.65)', fontSize: '13px', lineHeight: 1.6, marginBottom: '24px' }}>
              {this.state.error?.message || 'An unexpected error occurred.'}
            </p>
            <button
              onClick={() => window.location.reload()}
              style={{
                width: '100%',
                padding: '14px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, #ffafd6, #e38cb8)',
                color: '#57173e',
                fontWeight: 700,
                fontSize: '14px',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Reload App
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
