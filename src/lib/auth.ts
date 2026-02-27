import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * Verifica server-side que existe un usuario autenticado en la sesión actual.
 *
 * Usa `getUser()` en lugar de `getSession()` para revalidar el token contra
 * Supabase Auth y no confiar ciegamente en el JWT de la cookie.
 *
 * @returns `user` si la sesión es válida, o `errorResponse` (401) listo para
 *          devolver desde el API route si no lo es. Nunca ambos a la vez.
 *
 * @example
 * ```ts
 * const { user, errorResponse } = await requireUser(supabase);
 * if (errorResponse) return errorResponse;
 * // A partir de aquí `user` está garantizado
 * ```
 */
export async function requireUser(
  supabase: SupabaseClient,
): Promise<
  | { user: NonNullable<Awaited<ReturnType<SupabaseClient["auth"]["getUser"]>>["data"]["user"]>; errorResponse: null }
  | { user: null; errorResponse: Response }
> {
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    return {
      user: null,
      errorResponse: new Response(
        JSON.stringify({ error: "No autorizado" }),
        { status: 401, headers: { "Content-Type": "application/json" } },
      ),
    };
  }

  return { user, errorResponse: null };
}
