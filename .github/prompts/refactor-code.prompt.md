---
agent: 'agent'
model: Claude Sonnet 4.6
tools: ['codebase']
description: 'Refactor existing Meihyo code to improve quality, structure, or performance'
---

# Refactor Code

Your goal is to refactor existing Meihyo code to improve quality, maintainability, or adherence to project conventions.

Ask for the following if not provided:
1. **Target**: Which file(s) to refactor? (provide paths)
2. **Goal**: What is the refactoring goal? (e.g., extract hook, improve typing, fix naming, reduce duplication)
3. **Constraints**: Any behavior that must be preserved exactly?

## Refactoring Guidelines

### Extract Logic to Custom Hooks
- If a component contains `useState`, `useEffect`, or complex logic, extract it to `src/hooks/<domain>/use<FeatureName>.ts`
- The hook should encapsulate all stateful logic; the component should only call the hook and render

### Improve TypeScript Types
- Replace `any` types with proper interfaces in `src/interfaces/<domain>/`
- Add missing return types to functions and hooks
- Use utility types (`Readonly`, `Partial`, `Pick`) to express intent more precisely

### Simplify Components
- Break large components (> 100 lines) into smaller, focused sub-components
- Eliminate deeply nested conditionals with early returns and guard clauses
- Extract repeated JSX patterns into reusable components

### Fix Naming
- Ensure PascalCase for components/interfaces, camelCase for hooks/utilities
- Rename variables to be descriptive and domain-meaningful

### DRY Improvements
- Identify duplicated logic across hooks or components and extract to shared utilities in `src/lib/`
- Consolidate similar interfaces or types

## Output
- Show the refactored code
- Briefly explain what was changed and why
- Note any behavior changes (even minor ones) explicitly
