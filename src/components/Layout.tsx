import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="app-layout">
      <header className="header">
        <div className="container header-content">
          <div className="logo">AI Stylist</div>
          <nav className="nav">
            {/* Navigation items can go here */}
          </nav>
        </div>
      </header>
      <main className="main-content container">
        {children}
      </main>
      <footer className="footer">
        <div className="container">
          <p>&copy; 2025 AI Styling Assistant. All rights reserved.</p>
        </div>
      </footer>
      <style>{`
        .app-layout {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }
        .header {
          background-color: var(--color-surface);
          border-bottom: 1px solid var(--color-border);
          padding: var(--spacing-4) 0;
          position: sticky;
          top: 0;
          z-index: 10;
        }
        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .logo {
          font-size: var(--font-size-xl);
          font-weight: 700;
          letter-spacing: -0.5px;
        }
        .main-content {
          flex: 1;
          padding-top: var(--spacing-8);
          padding-bottom: var(--spacing-8);
        }
        .footer {
          background-color: var(--color-primary);
          color: var(--color-surface);
          padding: var(--spacing-8) 0;
          text-align: center;
          font-size: var(--font-size-sm);
          opacity: 0.9;
        }
      `}</style>
    </div>
  );
};
