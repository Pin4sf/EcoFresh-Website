# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

EcoFresh Website is a static, single-file site for EcoFresh GreenSync LLP, a cleantech startup turning institutional food waste into PHA bioplastic. It is hosted on Vercel, which deploys `master` to production automatically (build command `npm run build`, output `dist/`).

## Commands

```bash
npm run dev      # Start dev server (localhost:5173)
npm run build    # Production build to dist/
npm run preview  # Preview production build locally
```

No test framework or linter is configured.

## Architecture

- **`index.html`** holds the whole site: markup, CSS and inline scripts. There is no framework and no bundled JS.
- **Pages** are client-side sections at real URLs: `/` (home), `/science`, `/technology`, `/team`, `/vision`. The router is the last `<script>` in `index.html`; each page lives in a `<div id="pg-…">`. Internal links use these paths and the router switches pages with `history.pushState`; old `#/science`-style links still work and are rewritten to the real path.
- **Per-page head tags**: `npm run build` runs `scripts/pages.mjs` after Vite, which writes `dist/science.html`, `dist/technology.html`, `dist/team.html` and `dist/vision.html` with their own title, description, canonical URL and link-preview (Open Graph/Twitter) tags and image (`public/og-*.png`, 1200×630). Vercel serves them at clean URLs (`cleanUrls` in `vercel.json`). Edit page titles/descriptions there; the home page's tags are in the `<head>` of `index.html`, and the router's `TITLE` map should match.
- **Founder profiles**: `/ark-patil`, `/ansh-bathija`, `/shivansh-fulper`, `/mayur-kumar` are also written by `scripts/pages.mjs`, each with Person JSON-LD (role, awards, LinkedIn and other profiles). The router's `FOUNDER` map shows only that founder's `<section id="tm-…">` of the Team page, with a breadcrumb back to `/team`. Keep founder titles in `pages.mjs` and `FOUNDER` in step, and update the JSON-LD when a founder's credentials change.
- **SEO files**: `public/robots.txt` and `public/sitemap.xml` (update `lastmod` when pages change). The home `<head>` also carries Organization JSON-LD.
- **Assets** (images, PDFs) live flat in `public/` and are referenced by relative path (e.g. `logo.webp`). Vite copies `public/` into `dist/` unchanged.
- **Vite** is used only as a dev server and to copy files into `dist/`; the build output is byte-identical to the source page.
- **`vercel.json`** sets the build, clean URLs, and redirects the old React-era routes (`/investors`, `/problem`, `/impact`, `/credibility`, `/gallery`) to the home page.

### Styling
- Design tokens are CSS custom properties on `:root` near the top of `index.html` (`--deep`, `--teal`, `--ink`, `--grow`, …).
- Fonts: Figtree and Cormorant Garamond from Google Fonts.

## Source of truth

The page was built as a claude.ai artifact. When the artifact is updated, re-export its files into `index.html` (keeping the `<head>` SEO/OG/favicon block and the path-based router) and `public/`. Copy in the repo has been corrected since the last export (Together 7.0 Second Globally, Prof. Das's title, no "expedited examination", "IIITDM Jabalpur", biodegradable not compostable, no unsorted/mixed-waste claims); keep those corrections when re-exporting.
