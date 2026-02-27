---
agent: 'agent'
model: Claude Sonnet 4.6
tools: ['codebase']
description: 'Scaffold a new Astro page or React component for Meihyo following project conventions'
---

# Setup Component / Page

Your goal is to scaffold a new UI component or Astro page for the Meihyo gaming companion app.

Ask for the following if not provided:
1. **Type**: Astro page (`.astro`) or React component (`.tsx`)?
2. **Domain**: Which domain does it belong to? (`auth`, `home`, `shared`, `game`)
3. **Name**: What is the component/page name? (PascalCase)
4. **Purpose**: What does it do? (brief description)
5. **Interactivity**: Does it need client-side state or hooks? (determines `.astro` vs `.tsx`)

## Requirements

### For Astro Pages (`src/pages/`)
- Use the appropriate layout (`AppLayout.astro` for authenticated pages, `Layout.astro` for public)
- Fetch all data in the component frontmatter
- Import React components only when interactivity is needed; add the correct `client:*` directive
- Redirect unauthenticated users server-side before rendering

### For React Components (`src/components/<domain>/`)
- Create a matching custom hook in `src/hooks/<domain>/use<ComponentName>.ts` for all logic
- Define TypeScript interface(s) for all props in `src/interfaces/<domain>/`
- Handle loading, error, and empty states explicitly
- Use Tailwind CSS v4 utility classes for all styling
- Export the component as a named export

### General
- PascalCase filename for components, camelCase for hooks
- No hardcoded strings — use constants or props
- No `any` types — define proper interfaces
- Follow the folder structure: group by domain, not by file type
