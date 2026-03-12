import type { APIRoute } from "astro";
import { createClient } from "../../../lib/supabase";
import { requireUser } from "../../../lib/auth";

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const body = await request.json();
    const { displayName } = body;

    if (!displayName || typeof displayName !== "string" || displayName.trim().length === 0) {
      return new Response(
        JSON.stringify({ success: false, error: "El nombre de usuario es requerido" }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    if (displayName.trim().length > 50) {
      return new Response(
        JSON.stringify({ success: false, error: "El nombre no puede tener más de 50 caracteres" }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    const supabase = createClient({ request, cookies });
    const { user, errorResponse } = await requireUser(supabase);
    if (errorResponse) return errorResponse;

    const { data, error } = await supabase.auth.updateUser({
      data: { display_name: displayName.trim() },
    });

    if (error) {
      return new Response(
        JSON.stringify({ success: false, error: error.message }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        displayName: data.user.user_metadata?.display_name,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error("Error al actualizar el nombre:", err);
    return new Response(
      JSON.stringify({ success: false, error: "Error interno del servidor" }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
};
