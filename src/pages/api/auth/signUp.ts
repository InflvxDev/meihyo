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

    // 3. Validación de contraseña (ajusta según necesites)
    if (password.length < 8) {
      return new Response(
        JSON.stringify({ 
          error: "La contraseña debe tener al menos 8 caracteres" 
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // 4. Crear cliente y registrar
    const supabase = createClient({ request, cookies });
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    // 5. Manejar errores específicos de Supabase
    if (error) {
      // Usuario ya existe (sin confirmación activada)
      if (error.message === "User already registered") {
        return new Response(
          JSON.stringify({ 
            error: "Este email ya está registrado. Por favor inicia sesión." 
          }),
          { status: 409, headers: { "Content-Type": "application/json" } }
        );
      }
      
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // 6. Éxito - usuario registrado y automáticamente logueado
    return new Response(
      JSON.stringify({
        mensaje: "Usuario registrado exitosamente",
        usuario: {
          id: data.user?.id,
          email: data.user?.email,
        },
      }),
      { 
        status: 201, 
        headers: { "Content-Type": "application/json" } 
      }
    );
    
  } catch (error) {
    console.error("Error en registro:", error);
    return new Response(
      JSON.stringify({ 
        error: "Ocurrió un error inesperado durante el registro" 
      }),
      { 
        status: 500, 
        headers: { "Content-Type": "application/json" } 
      }
    );
  }
};