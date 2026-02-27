---
agent: 'agent'
model: Claude Sonnet 4.6
tools: ['codebase']
description: 'Generate tests for a custom hook, React component, or API route in Meihyo'
---

# Write Tests

Your goal is to generate tests for existing Meihyo code following project testing conventions.

Ask for the following if not provided:
1. **Target**: Which file or function needs tests? (provide path)
2. **Type**: Custom hook, React component, or API route?
3. **Coverage priority**: What scenarios are most important to cover?

## Requirements

### Custom Hooks (`src/hooks/`)
- Use `renderHook` from React Testing Library
- Mock the Supabase client — never make real network calls in tests
- Cover: success state, loading state, error state, and relevant edge cases
- Test state transitions (e.g., `isLoading` → `data`, `isLoading` → `error`)

### React Components (`src/components/`)
- Use React Testing Library; test behavior and rendered output, not implementation
- Render the component with realistic props matching defined interfaces
- Test: renders correctly, user interactions, loading/error/empty states
- Mock custom hooks that the component depends on

### API Routes (`src/pages/api/`)
- Test: unauthenticated requests return 401/403
- Test: invalid request bodies return 400 with descriptive errors
- Test: valid requests return correct status and response shape
- Mock Supabase calls to isolate route logic

## Standards
- Descriptive test names: `should [behavior] when [condition]`
- Follow Arrange-Act-Assert (AAA) structure
- Tests must be independent — no shared mutable state
- Use specific matchers (`.toBe()`, `.toEqual()`) over `.toBeTruthy()`
- Clean up mocks after each test with `afterEach`
