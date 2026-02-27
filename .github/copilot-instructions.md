# Meihyo - GitHub Copilot Instructions

<!-- Based on: https://github.com/github/awesome-copilot/blob/main/instructions/astro.instructions.md -->
<!-- and: https://github.com/github/awesome-copilot/blob/main/instructions/reactjs.instructions.md -->
<!-- and: https://github.com/github/awesome-copilot/blob/main/instructions/typescript-5-es2022.instructions.md -->

## Project Overview

**Meihyo** is a gaming companion web application for titles like League of Legends and Valorant. It is built with:

- **Astro 5.x** (SSR mode with Node.js adapter) — Islands Architecture, server-first rendering
- **React 19** (via `@astrojs/react`) — interactive components only
- **TypeScript** — strict type safety across all files
- **Tailwind CSS v4** (via `@tailwindcss/vite`) — utility-first styling
- **Supabase** — authentication (SSR cookies) and database backend
- **react-icons** — icon library

## Project Structure

```
src/
  components/   # React (.tsx) and Astro (.astro) UI components
  hooks/        # Custom React hooks (auth, game data, UI state)
  interfaces/   # TypeScript interfaces and type definitions
  layouts/      # Astro layout wrappers (AppLayout, Layout)
  lib/          # Supabase client and shared utilities
  pages/        # Astro file-based routing + api/ endpoints
  styles/       # Global CSS (global.css)
```

## Core Standards

### Architecture Principles
- Follow **Islands Architecture**: render everything server-side by default; add React `client:*` directives only when interactivity is required
- Keep `.astro` components for static, server-rendered shells/layouts
- Use `.tsx` React components only when client-side interactivity, state, or hooks are needed
- Place business logic in custom hooks under `src/hooks/`; keep components as thin presentational layers
- Group files by domain (auth, home, shared, game) — not by type

### TypeScript
- Use TypeScript for every new file; never use `.js` or `.jsx`
- Enable strict mode; avoid `any` — prefer `unknown` with type guards
- Define all prop types and data shapes in `src/interfaces/`
- Use utility types (`Readonly`, `Partial`, `Record`) to express intent clearly

### Naming Conventions
- PascalCase for React components, Astro components, interfaces, and type aliases
- camelCase for variables, functions, custom hooks, and file names for hooks/utilities
- Prefix custom hooks with `use` (e.g., `useLoginForm`)
- Files: PascalCase for components (`LoginForm.tsx`), camelCase for hooks/utils (`useLoginForm.ts`)

### Styling
- Use **Tailwind CSS v4** utility classes as the primary styling mechanism
- Prefer responsive, mobile-first class ordering
- Use scoped `<style>` blocks in `.astro` files for layout-level overrides when necessary
- Do not introduce CSS-in-JS libraries

### Supabase & Authentication
- Always use the SSR-compatible Supabase client from `src/lib/supabase.ts`
- Authentication flows must go through API routes in `src/pages/api/auth/`
- Never expose Supabase service-role keys on the client side
- Use environment variables for all secrets; never hardcode credentials

### API Routes
- Place all server-side endpoints under `src/pages/api/`
- Use correct HTTP methods and return proper status codes
- Validate all incoming request data; handle errors explicitly
- Never trust client-supplied user identity — always verify from the session

## Code Quality
- Follow the DRY principle; extract reusable logic into shared hooks or utilities
- Keep functions small and focused (ideally < 30 lines)
- Avoid deeply nested conditionals — use early returns and guard clauses
- Handle loading, error, and empty states explicitly in all data-fetching flows

## References
- [Astro Instructions](.github/instructions/astro.instructions.md)
- [TypeScript Instructions](.github/instructions/typescript.instructions.md)
- [Security Instructions](.github/instructions/security.instructions.md)
- [Testing Instructions](.github/instructions/testing.instructions.md)
- [Performance Instructions](.github/instructions/performance.instructions.md)
- [Code Review Instructions](.github/instructions/code-review.instructions.md)
- [Documentation Instructions](.github/instructions/documentation.instructions.md)
