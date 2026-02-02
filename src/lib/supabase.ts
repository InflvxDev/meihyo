// src/lib/supabase-client.ts
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { type AstroCookies } from "astro";

export function createClient({
  request,
  cookies,
}: {
  request: Request;
  cookies: AstroCookies;
}) {
  const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
  const supabaseKey = import.meta.env.PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      "Supabase URL or Key is not defined in environment variables",
    );
  }

  return createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        const cookieHeader = request.headers.get("Cookie") || "";

        // Parsear la cadena de cookies manualmente
        const parsedCookies: { name: string; value: string }[] = [];
        if (cookieHeader) {
          const pairs = cookieHeader.split(/;\s*/);
          for (const pair of pairs) {
            const [name, ...value] = pair.split("=");
            parsedCookies.push({
              name: name?.trim() || "",
              value: value.join("="),
            });
          }
        }
        return parsedCookies;
      },
      setAll(
        cookiesToSet: {
          name: string;
          value: string;
          options?: CookieOptions;
        }[],
      ) {
        cookiesToSet.forEach(({ name, value, options }) => {
          // Usar los métodos seguros de AstroCookies
          cookies.set(name, value, {
            ...options,
            httpOnly: options?.httpOnly ?? true,
            secure: options?.secure ?? true,
            sameSite: options?.sameSite ?? "lax",
            path: options?.path ?? "/",
          });
        });
      },
    },
  });
}

// Tipo de retorno de la función (útil para inferencias)
export type SupabaseClient = ReturnType<typeof createClient>;
