<!-- .github/copilot-instructions.md - guidance for AI coding agents -->

# Copilot instructions for this repository

This is a small React + Vite single-page app template. Keep instructions concise and focused on discoverable, actionable patterns in this repo.

Key facts
- Project type: React (JSX) with Vite (dev server + build). See `package.json` scripts.
- Entry point: `index.html` loads `src/main.jsx` which renders `src/App.jsx`.
- Build tooling: Vite (`vite`), plugin `@vitejs/plugin-react` enabled in `vite.config.js`.
- Linting: ESLint configured in `eslint.config.js`.

What to change and why
- Prefer edits inside `src/` for app code. Keep static assets in `src/assets` or `public/`.
- Avoid changing Vite defaults unless adding specific behavior (eg. custom proxy, additional plugins). If necessary, update `vite.config.js` and add a short comment explaining the need.

Developer workflows (commands you can run)
- Start dev server with HMR: `npm run dev` (runs `vite`).
- Build for production: `npm run build` (runs `vite build`).
- Preview built app locally: `npm run preview` (runs `vite preview`).
- Lint JS/JSX files: `npm run lint` (runs `eslint .`).

Patterns and conventions used here
- File extensions: `.jsx` for React components (no TypeScript). Follow the existing pattern in `src/App.jsx`.
- CSS: simple component-scoped styles live in `src/*.css` (see `App.css`, `index.css`).
- Assets: SVGs and images live in `src/assets` or referenced from project root (e.g. `/vite.svg` used in `App.jsx`).
- ESLint: project uses the modern config file `eslint.config.js`. Rule example: unused vars are allowed if they match `^[A-Z_]` (useful for globals/consts).

Integration points and important files to reference
- `package.json` — scripts and dependency list (React 19, Vite plugin).
- `vite.config.js` — plugin configuration (`@vitejs/plugin-react`).
- `src/main.jsx` — app bootstrap (uses react-dom/client createRoot).
- `src/App.jsx` — canonical component showing HMR, assets, and hooks usage.
- `eslint.config.js` — linting rules and ignored globs (dist).

When making changes
- Keep PRs small and focused (this is a template project). For UI changes, include screenshots and a short note about UX intent.
- When adding dependencies, update `package.json` and ensure `devDependencies` vs `dependencies` are correctly classified.
- Run `npm run lint` and `npm run dev` locally to verify no runtime or lint errors.

Examples the agent can use as templates
- Add a new component:
  - Create `src/components/MyWidget.jsx` with a default export React component.
  - Import it into `src/App.jsx` and add minimal styling in `src/components/MyWidget.css`.
- Add an image asset:
  - Place under `src/assets/` and import like `import logo from './assets/logo.svg'` as shown in `src/App.jsx`.

What the agent should NOT do
- Do not introduce TypeScript or large build system changes without a clear migration plan and tests.
- Do not change Vite plugin list or transpiler settings unless necessary and documented in the PR.

Missing or unclear areas to ask the maintainer about
- CI configuration (not present in repo) — ask whether to add GitHub Actions or other CI.
- Any runtime environment variables or backend API endpoints (none are present). If integrating APIs, ask for base URL and auth pattern.

If you are uncertain, ask for: a preferred testing approach (Jest/RTL), CI expectations, or whether TypeScript migration is desired.

End of file.
