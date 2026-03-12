import type { APIRoute } from "astro";
import { createClient } from "../../../lib/supabase";
import { requireUser } from "../../../lib/auth";

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const body = await request.json();
    const { email } = body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ success: false, error: "Formato de email inválido" }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    const supabase = createClient({ request, cookies });
    const { user, errorResponse } = await requireUser(supabase);
    if (errorResponse) return errorResponse;

    if (email === user.email) {
      return new Response(
        JSON.stringify({ success: false, error: "El nuevo correo es igual al actual" }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    const { error } = await supabase.auth.updateUser({ email });

    if (error) {
      return new Response(
        JSON.stringify({ success: false, error: error.message }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Se ha enviado un enlace de confirmación a tu nuevo correo electrónico.",
      }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error("Error al actualizar el email:", err);
    return new Response(
      JSON.stringify({ success: false, error: "Error interno del servidor" }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
};
