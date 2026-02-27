---
agent: 'agent'
model: Claude Sonnet 4.6
tools: ['codebase']
description: 'Systematically debug an issue in Meihyo using structured analysis'
---

# Debug Issue

Your goal is to help diagnose and fix a bug in the Meihyo application.

Ask for the following if not provided:
1. **Symptom**: What is the observed behavior? What was expected?
2. **Repro steps**: How to reproduce the issue?
3. **Scope**: Which area is affected? (auth, routing, game data, UI, API)
4. **Context**: Any recent changes, error messages, or console output?

## Debugging Approach

### 1. Understand the Data Flow
- For UI issues: trace from the component → custom hook → Supabase/API call
- For auth issues: trace from the browser request → middleware → Supabase session → API route
- For API issues: trace from the request → validation → Supabase query → response

### 2. Common Issue Patterns in Meihyo

**Auth/Session Issues**
- Supabase session cookie not set correctly (check SSR client usage)
- Middleware not refreshing the session before it expires
- Service-role key used incorrectly or on the client side

**Data Fetching Issues**
- Missing error handling causing silent failures in hooks
- Astro frontmatter fetch not awaited or error not caught
- Supabase RLS policy blocking the query unexpectedly

**Islands Architecture Issues**
- Component not hydrated (missing `client:*` directive)
- Wrong hydration directive causing timing issues
- State not shared correctly between islands

**TypeScript Issues**
- `any` types masking null/undefined errors at runtime
- Interface mismatch between API response and expected type

### 3. Resolution Steps
- Identify the exact line or function where the failure occurs
- Check if the issue is in the hook, the component, or the API route
- Propose a minimal, targeted fix that doesn't introduce regressions
- Suggest adding a test case to prevent recurrence

## Output
- Root cause explanation
- Proposed fix with code changes
- Recommendation to add a test or guard to prevent recurrence
