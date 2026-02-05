# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

EcoFresh Website is a React + Vite landing site for a B2B cleantech startup. The site has two main pages: a general landing page and an investor-focused page with detailed financials.

## Commands

```bash
npm run dev      # Start dev server with HMR (localhost:5173)
npm run build    # Production build to dist/
npm run preview  # Preview production build locally
npm run lint     # Run ESLint
```

No test framework is currently configured.

## Architecture

### Page Composition
- **Pages** (`src/pages/`) contain page-level components that compose sections
- **Sections** (`src/components/sections/home/` and `sections/investors/`) are self-contained units with their own animations
- **Layout** (`src/components/layout/Layout.jsx`) wraps all pages with persistent Navbar and Footer
- Routes: `/` (Home) and `/investors` (Investors) via React Router v7

### Content Management
All copy is centralized in `src/content/siteCopy.js`. Update text content there rather than in components directly.

### Styling System
- Tailwind CSS 4 with custom theme colors defined in both `tailwind.config.js` and `src/index.css`
- Custom colors: `ink` (dark), `eco` (primary green), `mist` (light green), `sand` (off-white), `sky` (blue accent)
- Fonts: Sora (display/headings), IBM Plex Sans (body)
- Component classes in `src/index.css` under `@layer components` (`.btn-primary`, `.chip`, `.dashed-card`, etc.)

### Animation Framework
GSAP with ScrollTrigger powers all scroll-based animations. Key patterns:
- Add `data-reveal` attribute to elements for automatic fade-in on scroll
- Add `data-split` for word-by-word text animation
- Animation initialization happens in `src/animations.js`
- All animations respect `prefers-reduced-motion`

Custom hooks for animations:
- `useReveal()` - Intersection Observer-based reveal
- `useParallax()` - Parallax scrolling effects
- `useCountUp()` - Animate numbers from 0 to target

### UI Components
- Radix UI primitives for accessible dialogs and interactive elements
- Custom animated backgrounds in `src/components/ui/` (particles, grids, fog effects)
- Three.js available via `@react-three/fiber` for 3D elements

## Adding a New Section

1. Create component in `src/components/sections/home/` or `sections/investors/`
2. Add any text content to `src/content/siteCopy.js`
3. Import and place in the appropriate page component (`src/pages/Home.jsx` or `Investors.jsx`)
4. Use `data-reveal` attributes for scroll animations

## Legacy Components

Root-level components in `src/components/` (e.g., `Hero.jsx`, `Team.jsx`, `Flywheel.jsx`) are legacy. The current architecture uses the `sections/` subdirectory structure.
