---
applyTo: "**"
description: "Documentation standards for Meihyo"
---

# Documentation Guidelines

## Code-Level Documentation
- Add JSDoc comments to all public custom hooks documenting purpose, parameters, and return shape
- Add JSDoc to shared utility functions in `src/lib/` and complex helper functions
- Keep comments focused on *why* not *what* — code should be self-explanatory for the "what"
- Remove stale or misleading comments during refactors; outdated comments are worse than none

## Component Documentation
- Document non-obvious component behavior or constraints in a comment above the component definition
- Document complex prop shapes with inline JSDoc or a reference to the interface definition
- For Astro components, document any server-side data-fetching logic that isn't self-evident

## Interface & Type Documentation
- Add JSDoc to interfaces in `src/interfaces/` when property names alone are not self-descriptive
- Document optional vs required fields and any business rules attached to a type

## README Standards
- Keep `README.md` current with: project overview, setup instructions, environment variables required, and development scripts
- Update README when adding new environment variables, integrations, or major features
- Include a concise description of the domain structure for new contributors

## Environment Variables
- Maintain an up-to-date `.env.example` with all required environment variables and placeholder values
- Document the purpose of each variable inline in `.env.example`
- Never document actual secret values in any committed file

## API Documentation
- Document all API routes in `src/pages/api/` with their method, expected request body, and response shape
- Document authentication requirements for each endpoint
- Document error response codes and their meaning
