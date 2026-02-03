import type { APIRoute } from "astro";
import { createClient } from "../../../lib/supabase";

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    // 1. Parsear y validar datos básicos
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: "Email y contraseña son requeridos" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // 2. Validación simple de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: "Formato de email inválido" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // 3. Crear cliente y autenticar
    const supabase = createClient({ request, cookies });
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    // 4. Manejar errores específicos de Supabase
    if (error) {
      // Credenciales inválidas
      if (error.message === "Invalid login credentials") {
        return new Response(
          JSON.stringify({ 
            error: "Email o contraseña incorrectos" 
          }),
          { status: 401, headers: { "Content-Type": "application/json" } }
        );
      }

      // Usuario no confirmado
      if (error.message.includes("Email not confirmed")) {
        return new Response(
          JSON.stringify({ 
            error: "Por favor confirma tu email antes de iniciar sesión" 
          }),
          { status: 403, headers: { "Content-Type": "application/json" } }
        );
      }
      
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // 5. Éxito - usuario autenticado
    return new Response(
      JSON.stringify({
        mensaje: "Sesión iniciada exitosamente",
        usuario: {
          id: data.user?.id,
          email: data.user?.email,
        },
      }),
      { 
        status: 200, 
        headers: { "Content-Type": "application/json" } 
      }
    );
    
  } catch (error) {
    console.error("Error en inicio de sesión:", error);
    return new Response(
      JSON.stringify({ 
        error: "Ocurrió un error inesperado durante el inicio de sesión" 
      }),
      { 
        status: 500, 
        headers: { "Content-Type": "application/json" } 
      }
    );
  }
};
