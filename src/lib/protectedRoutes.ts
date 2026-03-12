// Configuration module for defining application routes that require
// an authenticated user. Keeping this list centralized makes it easy to
// add or remove protected paths as the project grows.

/**
 * List of path prefixes that should be treated as protected.  Any request
 * whose pathname starts with one of these strings will require a logged-in
 * user or be redirected to the login page by the middleware.
 *
 * Add new entries when you introduce pages that must be behind auth
 * (e.g. "/account" in the future).
 */
export const protectedRoutes: string[] = [
  "/dashboard",
  "/game",
  "/account",
];
