import type { APIRoute } from "astro";
import { createClient } from "../../../lib/supabase";

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const supabase = createClient({ request, cookies });
    const { error } = await supabase.auth.signOut();

    if (error) {
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({
        mensaje: "Sesión cerrada exitosamente",
      }),
      { 
        status: 200, 
        headers: { "Content-Type": "application/json" } 
      }
    );
    
  } catch (error) {
    console.error("Error en cierre de sesión:", error);
    return new Response(
      JSON.stringify({ 
        error: "Ocurrió un error inesperado" 
      }),
      { 
        status: 500, 
        headers: { "Content-Type": "application/json" } 
      }
    );
  }
};