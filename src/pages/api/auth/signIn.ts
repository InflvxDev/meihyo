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

    // 2. Validación simple de email (misma que en signup)
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
      // Mapear errores comunes a mensajes amigables
      let errorMessage = error.message;
      let statusCode = 400;

      switch (error.message) {
        case "Invalid login credentials":
          errorMessage = "Credenciales inválidas. Verifica tu email y contraseña.";
          statusCode = 401;
          break;
        case "Email not confirmed":
          errorMessage = "Por favor confirma tu email antes de iniciar sesión.";
          statusCode = 403;
          break;
        case "User not found":
          errorMessage = "No existe una cuenta con este email.";
          statusCode = 404;
          break;
      }

      return new Response(
        JSON.stringify({ error: errorMessage }),
        { status: statusCode, headers: { "Content-Type": "application/json" } }
      );
    }

    // 5. Éxito - usuario autenticado
    return new Response(
      JSON.stringify({
        mensaje: "Inicio de sesión exitoso",
        usuario: {
          id: data.user?.id,
          email: data.user?.email,
          ultimo_inicio: data.user?.last_sign_in_at,
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