import type { APIRoute } from "astro";
import { createClient } from "../../../lib/supabase";
import { requireUser } from "../../../lib/auth";

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const body = await request.json();
    const { currentPassword, newPassword } = body;

    if (!currentPassword || !newPassword) {
      return new Response(
        JSON.stringify({ success: false, error: "La contraseña actual y la nueva son requeridas" }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    if (newPassword.length < 8) {
      return new Response(
        JSON.stringify({ success: false, error: "La nueva contraseña debe tener al menos 8 caracteres" }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    const supabase = createClient({ request, cookies });
    const { user, errorResponse } = await requireUser(supabase);
    if (errorResponse) return errorResponse;

    // Verify current password by re-authenticating
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: user.email!,
      password: currentPassword,
    });

    if (signInError) {
      return new Response(
        JSON.stringify({ success: false, error: "La contraseña actual es incorrecta" }),
        { status: 401, headers: { "Content-Type": "application/json" } },
      );
    }

    const { error } = await supabase.auth.updateUser({ password: newPassword });

    if (error) {
      return new Response(
        JSON.stringify({ success: false, error: error.message }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: "Contraseña actualizada correctamente" }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error("Error al actualizar la contraseña:", err);
    return new Response(
      JSON.stringify({ success: false, error: "Error interno del servidor" }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
};
