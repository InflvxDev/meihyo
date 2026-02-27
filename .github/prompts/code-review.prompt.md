---
agent: 'agent'
model: Claude Sonnet 4.6
tools: ['codebase']
description: 'Perform a structured code review of Meihyo changes using project standards'
---

# Code Review

Your goal is to review the provided code or diff against Meihyo's project standards.

If no specific files or diff are provided, ask which files or PR to review.

## Review Checklist

### 🔴 CRITICAL (Must fix before merge)
- [ ] No hardcoded secrets, Supabase keys, or credentials
- [ ] Protected API routes verify user identity server-side from the session
- [ ] No RLS bypass using the service-role key client-side
- [ ] No `dangerouslySetInnerHTML` without DOMPurify sanitization
- [ ] No TypeScript `any` that bypasses meaningful type safety

### 🟡 IMPORTANT (Requires discussion)
- [ ] Islands Architecture respected: `.astro` for static, `.tsx` only for interactive
- [ ] `client:*` directives are the least invasive for the use case
- [ ] Custom hooks are in `src/hooks/<domain>/` with `use` prefix
- [ ] All prop types are defined in `src/interfaces/<domain>/`
- [ ] Loading, error, and empty states are handled in all data flows
- [ ] API routes validate all incoming request data

### 🟢 SUGGESTIONS (Non-blocking)
- [ ] Functions are small and focused (< 30 lines)
- [ ] No deeply nested conditionals — prefer early returns
- [ ] JSDoc on complex hooks and utility functions
- [ ] Tailwind classes follow mobile-first, responsive ordering
- [ ] DRY: repeated logic extracted into shared hooks or utilities

## Comment Format
For each issue found, use:
```
**[🔴/🟡/🟢] Category: Brief title**
Description of the issue and why it matters.
Suggested fix: [code snippet if applicable]
```

## Summary
End the review with:
- Total issues by severity
- Overall assessment: ready to merge / needs changes / requires rework
