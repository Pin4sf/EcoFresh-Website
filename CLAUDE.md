# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

EcoFresh Website is a static, single-file site for EcoFresh GreenSync LLP, a cleantech startup turning institutional food waste into PHA bioplastic. It is hosted on Vercel, which deploys `master` to production automatically.

## Commands

```bash
npm run dev      # Start dev server (localhost:5173)
npm run build    # Production build to dist/
npm run preview  # Preview production build locally
```

No test framework or linter is configured.

## Architecture

- **`index.html`** holds the whole site: markup, CSS and inline scripts. There is no framework and no bundled JS.
- **Pages** are client-side sections switched by URL hash: `#/` (home), `#/science`, `#/technology`, `#/team`, `#/vision`. The router is the last `<script>` in `index.html`; each page lives in a `<div id="pg-…">`.
- **Assets** (images, PDFs) live flat in `public/` and are referenced by relative path (e.g. `logo.webp`). Vite copies `public/` into `dist/` unchanged.
- **Vite** is used only as a dev server and to copy files into `dist/`; the build output is byte-identical to the source page.
- **`vercel.json`** redirects the old React-era routes (`/team`, `/investors`, `/problem`, `/impact`, `/credibility`, `/gallery`) to the new pages.

### Styling
- Design tokens are CSS custom properties on `:root` near the top of `index.html` (`--deep`, `--teal`, `--ink`, `--grow`, …).
- Fonts: Figtree and Cormorant Garamond from Google Fonts.

## Source of truth

The page was built as a claude.ai artifact. When the artifact is updated, re-export its files into `index.html` (keeping the `<head>` SEO/OG/favicon block) and `public/`.
