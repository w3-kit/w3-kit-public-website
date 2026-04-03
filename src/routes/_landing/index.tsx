import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_landing/")({
  component: UnderConstructionPage,
});

function UnderConstructionPage() {
  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root { --bg: #09090b; --fg: #fafafa; --muted: #71717a; --border: #27272a; --accent: #a78bfa; --accent-dim: #7c3aed; }
        body { background: var(--bg); color: var(--fg); font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; -webkit-font-smoothing: antialiased; }

        .page { min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 2rem; gap: 1.5rem; }
        .badge { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.375rem 0.875rem; border: 1px solid var(--border); border-radius: 999px; font-size: 0.75rem; color: var(--accent); background: rgba(167, 139, 250, 0.05); }
        .badge-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--accent); animation: pulse 2s ease-in-out infinite; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        .page h1 { font-size: clamp(2.5rem, 6vw, 4rem); font-weight: 800; letter-spacing: -0.03em; line-height: 1.1; max-width: 600px; }
        .page h1 span { background: linear-gradient(135deg, var(--accent), #c4b5fd, var(--accent-dim)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .page p { color: var(--muted); font-size: 1.125rem; max-width: 420px; line-height: 1.6; }
        .links { display: flex; gap: 0.75rem; margin-top: 0.5rem; }
        .links a { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.625rem 1.5rem; border-radius: 0.5rem; font-size: 0.875rem; font-weight: 600; text-decoration: none; transition: all 0.15s; }
        .primary { background: var(--accent); color: var(--bg); }
        .primary:hover { background: #8b5cf6; }
        .secondary { border: 1px solid var(--border); color: var(--fg); }
        .secondary:hover { border-color: var(--muted); }
      `}</style>
      <div className="page">
        <div className="badge">
          <span className="badge-dot" />
          Under construction
        </div>
        <h1>Build and learn web3. <span>Any chain.</span></h1>
        <p>Open-source developer toolkit with production-ready components, recipes, and learning resources.</p>
        <div className="links">
          <a href="https://github.com/w3-kit" target="_blank" rel="noopener noreferrer" className="primary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            GitHub
          </a>
          <a href="https://x.com/nickstoev" target="_blank" rel="noopener noreferrer" className="secondary">Follow updates</a>
        </div>
      </div>
    </>
  );
}
