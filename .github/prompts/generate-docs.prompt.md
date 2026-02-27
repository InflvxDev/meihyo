---
agent: 'agent'
model: Claude Sonnet 4.6
tools: ['codebase']
description: 'Generate documentation for a component, hook, API route, or module in Meihyo'
---

# Generate Documentation

Your goal is to generate clear, accurate documentation for an existing Meihyo module.

Ask for the following if not provided:
1. **Target**: Which file(s) to document? (provide paths)
2. **Type**: Component, custom hook, API route, or utility?
3. **Audience**: Internal developer docs or public API documentation?

## Requirements

### Custom Hooks (`src/hooks/`)
- Add JSDoc above the hook function documenting: purpose, parameters, and return value shape
- Document each returned property/method (what it is and when to use it)
- Include a `@example` showing typical usage in a component

### React Components (`src/components/`)
- Add JSDoc above the component documenting its purpose and usage context
- Document each prop with type, whether required, and its purpose
- Note any important behavioral constraints (e.g., requires authentication, specific parent context)

### API Routes (`src/pages/api/`)
- Document: HTTP method, authentication requirement, request body shape, response shape
- Document possible error codes and their causes
- Note any rate limiting or access control requirements

### Utilities & Library (`src/lib/`)
- Add JSDoc to all exported functions with `@param`, `@returns`, and `@throws` annotations
- Include `@example` for non-obvious utilities

## Style Guidelines
- Be concise — explain *why* and *when*, not just *what*
- Do not include implementation details in JSDoc; the code itself explains those
- Keep examples short and realistic to the Meihyo domain
- Write in plain English; avoid jargon
