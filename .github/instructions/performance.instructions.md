<!-- Based on: https://github.com/github/awesome-copilot/blob/main/instructions/performance-optimization.instructions.md -->
---
applyTo: "**"
description: "Performance optimization guidelines for Meihyo"
---

# Performance Guidelines

## Astro & Islands Architecture
- Default to zero JavaScript — only hydrate components that absolutely require interactivity
- Choose client directives based on priority: `client:visible` for below-the-fold islands, `client:idle` for low-priority interactive components
- Avoid importing heavy React component trees in `.astro` files unless needed
- Leverage Astro's built-in static asset optimization and image optimization

## React Component Optimization
- Use `React.memo` for pure components that receive stable props to prevent unnecessary re-renders
- Use `useMemo` and `useCallback` judiciously — only when profiling identifies re-render problems
- Avoid creating new objects or functions inside render; extract to constants or hooks
- Prefer stable, meaningful keys in lists; avoid using array indices as keys

## Bundle Size
- Avoid bloated third-party libraries for simple tasks achievable with native APIs
- Use tree-shakeable imports (named imports instead of default imports where possible)
- Lazy-load heavy components using dynamic imports and Astro's `client:visible` directive
- Audit bundle size periodically with build tooling

## Data Fetching
- Fetch data at build/request time in Astro component frontmatter — minimize client-side fetching
- Deduplicate data fetching; avoid waterfall requests
- Handle loading and error states to avoid layout shifts
- Paginate large result sets from Supabase; never load unbounded collections

## Asset Optimization
- Use Astro's `<Image />` component for automatic image optimization (WebP, AVIF, lazy loading)
- Provide explicit width/height on images to prevent Cumulative Layout Shift (CLS)
- Use `font-display: swap` for web fonts; subset fonts to character sets actually used
- Serve static assets with long-lived cache headers and cache-busting filenames

## CSS & Styling
- Prefer Tailwind utility classes over custom CSS to minimize stylesheet size
- Avoid inline styles that trigger layout recalculations
- Use CSS transitions/animations over JavaScript for GPU-accelerated effects

## Measurement First
- Profile with browser DevTools and Lighthouse before optimizing
- Monitor Core Web Vitals: LCP, CLS, and INP
- Avoid premature optimization; write clear code first, then optimize proven bottlenecks
