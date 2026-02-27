---
applyTo: "**/*.test.ts,**/*.test.tsx,**/*.spec.ts,**/*.spec.tsx"
description: "Testing standards and practices for Meihyo"
---

# Testing Guidelines

## Testing Strategy
- Prioritize testing custom hooks and business logic in `src/hooks/` — these are the most critical units
- Test React components with a focus on behavior and user interaction, not implementation details
- Test API routes for correct status codes, response shapes, and auth validation
- Aim for meaningful coverage on auth flows, data fetching hooks, and shared utilities

## Unit Testing (Custom Hooks)
- Test hooks in isolation using `renderHook` from React Testing Library
- Mock Supabase client responses to avoid real network calls
- Cover success, loading, and error state transitions
- Test edge cases: empty responses, network failures, invalid inputs

## Component Testing
- Use React Testing Library; test what users see and interact with
- Verify loading, error, and empty states are rendered correctly
- Test form submission flows, validation feedback, and navigation
- Avoid testing internal component state or implementation details

## API Route Testing
- Test that protected routes reject unauthenticated requests (401/403)
- Verify request validation rejects malformed inputs (400)
- Test correct response shapes for success cases (200/201)
- Mock Supabase calls to isolate route logic from the database

## Test File Organization
- Co-locate test files with the code they test or in a `__tests__/` folder within the domain
- Name test files with `.test.ts` or `.spec.ts` suffix
- Use descriptive test names following the pattern: `should [behavior] when [condition]`

## Test Quality Standards
- Follow Arrange-Act-Assert (AAA) pattern for clear test structure
- Tests must be independent and deterministic — no shared mutable state between tests
- Use specific assertions; avoid `toBeTruthy()` when more precise matchers exist
- Clean up mocks and test state after each test using `afterEach`

## Mocking Guidelines
- Mock Supabase client in unit tests using `vi.mock()` or `jest.mock()`
- Mock external API calls; don't make real network requests in tests
- Use factories or builder functions to create consistent test fixtures
