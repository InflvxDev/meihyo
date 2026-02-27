<!-- Based on: https://github.com/github/awesome-copilot/blob/main/instructions/code-review-generic.instructions.md -->
---
applyTo: "**"
description: "Code review standards and GitHub review guidelines for Meihyo"
---

# Code Review Guidelines

## Review Priorities

### 🔴 CRITICAL (Block merge)
- Security vulnerabilities, exposed secrets, or authentication/authorization bypasses
- Logic errors that could corrupt user data or game state
- Breaking changes to API contracts without versioning
- Supabase RLS policies missing or misconfigured

### 🟡 IMPORTANT (Requires discussion)
- Violations of Islands Architecture (unnecessary client-side hydration)
- Missing error handling or loading/empty states in data-fetching flows
- TypeScript `any` usage or missing type definitions in `src/interfaces/`
- Supabase service-role key exposure or server-side auth bypass
- Significant deviations from the established domain folder structure

### 🟢 SUGGESTION (Non-blocking improvements)
- Readability improvements (naming, simplification)
- Tailwind class ordering or redundant styles
- Missing JSDoc on complex hooks or utilities
- Minor DRY violations extractable to shared hooks

## Code Quality Standards
- Functions should be small and focused (ideally < 30 lines)
- No deeply nested conditionals — prefer early returns and guard clauses
- No commented-out code without an associated ticket or explanation
- No `console.log` statements in committed code; use structured logging if needed
- DRY: extract repeated logic into shared hooks or utilities

## Astro & React Specific Checks
- Confirm `.astro` components are used for static content and `.tsx` only for interactive islands
- Verify `client:*` directives are justified and use the least-invasive hydration strategy
- Check that custom hooks are in `src/hooks/` and follow the `use` prefix convention
- Confirm all prop types are defined with TypeScript interfaces

## Security Checks
- No hardcoded secrets, API keys, or Supabase credentials
- All API routes validate incoming data before processing
- Server-side session verification is used for protected endpoints
- `dangerouslySetInnerHTML` is absent unless sanitized with DOMPurify

## Testing Checks
- New interactive components have corresponding test coverage
- Custom hooks are tested in isolation with appropriate mocks
- Auth flows are tested for both success and failure paths

## Review Comment Format
```
**[PRIORITY] Category: Brief title**

Description of the issue.

**Why this matters:** Impact explanation.

**Suggested fix:** [optional code example]
```

## GitHub PR Conventions
- PRs should be small and focused on a single feature or fix
- PR titles follow Conventional Commits format: `feat:`, `fix:`, `chore:`, `refactor:`
- Link PRs to related issues when applicable
- Reviewers should approve only after all CRITICAL and IMPORTANT items are resolved
