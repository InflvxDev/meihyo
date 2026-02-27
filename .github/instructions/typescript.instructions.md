<!-- Based on: https://github.com/github/awesome-copilot/blob/main/instructions/typescript-5-es2022.instructions.md -->
---
applyTo: "**/*.ts,**/*.tsx"
description: "TypeScript 5.x development guidelines for Meihyo"
---

# TypeScript Development Guidelines

## Core Principles
- Target TypeScript 5.x with strict mode enabled in `tsconfig.json`
- Prefer readable, explicit solutions over clever shortcuts
- Extend existing abstractions before inventing new ones
- Prioritize maintainability and clarity with small, focused functions

## Type System
- Avoid `any` (implicit or explicit); prefer `unknown` with proper type guards
- Define all data shapes and prop types in `src/interfaces/` grouped by domain
- Use discriminated unions for state machines and variant types
- Express intent with utility types: `Readonly`, `Partial`, `Record`, `Pick`, `Omit`
- Use optional chaining (`?.`) and nullish coalescing (`??`) operators consistently

## Naming & Style
- PascalCase for interfaces, type aliases, enums, and React components
- camelCase for variables, functions, and custom hooks
- Skip `I` prefix on interfaces; use descriptive domain-driven names
- Prefix custom hooks with `use` (e.g., `useLoginForm`, `useGameSelector`)

## Async & Error Handling
- Use `async/await`; wrap awaits in `try/catch` with meaningful error messages
- Use early returns and guard clauses to avoid deep nesting
- Handle loading, error, and empty states explicitly in all data flows
- Never swallow errors silently

## Architecture Patterns
- Keep components thin; push logic and side effects into custom hooks
- Decouple UI from API calls — abstract Supabase operations into hooks or service functions
- Use pure functions and immutable patterns where practical
- Centralize shared contracts; avoid duplicating type shapes across files

## Configuration & Secrets
- Read all secrets and configuration from environment variables
- Never hardcode Supabase keys, API tokens, or credentials
- Validate environment variables at startup with type-safe helpers
