<!-- Based on: https://github.com/github/awesome-copilot/blob/main/instructions/astro.instructions.md -->
<!-- and: https://github.com/github/awesome-copilot/blob/main/instructions/reactjs.instructions.md -->
<!-- and: https://github.com/github/awesome-copilot/blob/main/instructions/typescript-5-es2022.instructions.md -->
---
applyTo: "**/*.astro,**/*.tsx,**/*.ts"
description: "Astro + React + TypeScript development standards for Meihyo"
---

# Astro + React Development Guidelines

## Islands Architecture
- Default to server-side rendering in `.astro` components; add `client:*` directives only when interactivity is needed
- Choose hydration directives based on interaction urgency: `client:load` for critical UI, `client:visible` for below-the-fold components, `client:idle` for low-priority islands
- Keep Astro components as thin shells; delegate interactive logic to `.tsx` React components

## Astro Component Standards
- Structure frontmatter (data fetching, imports, logic) at the top of `.astro` files, template below
- Fetch all data at build/request time in component frontmatter — avoid client-side fetching unless necessary
- Use scoped `<style>` blocks for layout-specific CSS overrides; rely on Tailwind for component-level styling
- Implement proper prop validation using TypeScript interfaces in the component script

## React Component Standards
- Use functional components with hooks exclusively; no class components
- Keep components small and focused on a single concern (ideally < 100 lines)
- Extract all stateful or reusable logic into custom hooks under `src/hooks/`
- Handle all three UI states explicitly: loading, error, and empty/success

## File Organization
- Group files by domain (auth, home, shared, game) rather than by file type
- PascalCase for component files (`GameSelector.tsx`), camelCase for hooks/utilities (`useGameSelector.ts`)
- Define all interfaces and type shapes in `src/interfaces/`, co-located by domain
- Place Supabase and shared utilities in `src/lib/`

## Astro Routing & API
- Use Astro's file-based routing in `src/pages/`; API endpoints live under `src/pages/api/`
- Use correct HTTP methods and status codes in API routes
- Always validate and sanitize all incoming request data in API handlers
- Verify user identity server-side from the session — never trust client-supplied identity

## Tailwind CSS v4
- Use Tailwind utility classes as the primary styling mechanism; avoid inline styles
- Follow mobile-first, responsive class ordering
- Use `@layer` and CSS custom properties for design tokens when utility classes fall short
- Do not introduce CSS-in-JS or additional styling libraries
