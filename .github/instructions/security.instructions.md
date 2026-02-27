<!-- Based on: https://github.com/github/awesome-copilot/blob/main/instructions/security-and-owasp.instructions.md -->
---
applyTo: "**"
description: "Security best practices and OWASP guidelines for Meihyo"
---

# Security Guidelines

## Authentication & Authorization (OWASP A01, A07)
- Always verify user identity server-side from the Supabase session — never trust client-supplied user data
- Follow deny-by-default: access is only granted when an explicit rule permits it
- Use the SSR-compatible Supabase client from `src/lib/supabase.ts` for all auth operations
- Route all authentication flows through server-side API endpoints in `src/pages/api/auth/`
- Set session cookies with `HttpOnly`, `Secure`, and `SameSite=Strict` attributes

## Secrets & Credentials (OWASP A02)
- Never hardcode Supabase keys, API tokens, or any credentials in source code
- Load all secrets from environment variables; never expose `SUPABASE_SERVICE_ROLE_KEY` on the client
- Only the public `SUPABASE_ANON_KEY` may be used client-side, and only with proper RLS policies active
- Commit `.env.example` with placeholder values; add `.env` to `.gitignore`

## Input Validation & Injection Prevention (OWASP A03)
- Validate and sanitize all incoming request data in API route handlers
- Use Supabase's parameterized queries; never concatenate user input into query strings
- Sanitize user-controlled content before rendering in the DOM; prefer `.textContent` over `.innerHTML`
- Validate URL parameters and form inputs before processing

## Security Misconfiguration (OWASP A05)
- Disable verbose error messages and stack traces in production responses
- Add security headers: `Content-Security-Policy`, `Strict-Transport-Security`, `X-Content-Type-Options`
- Audit dependencies regularly with `npm audit`; keep packages up to date

## Frontend XSS Prevention (OWASP A03)
- Avoid using `dangerouslySetInnerHTML` in React components; if required, sanitize with DOMPurify
- Escape all user-generated content before rendering
- Avoid `eval()` or dynamic code execution patterns

## Row Level Security (Supabase)
- Enable RLS on all Supabase tables; define explicit policies for each operation
- Never bypass RLS using the service-role key on the client side
- Test RLS policies as part of feature development
