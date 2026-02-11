import { defineMiddleware } from "astro:middleware";
import { createClient } from "./lib/supabase";

export const onRequest = defineMiddleware(async (context, next) => {
  // Inicializamos el cliente de Supabase
  const supabase = createClient(context);

  // Obtenemos el usuario autenticado
  const { data: { user } } = await supabase.auth.getUser();

  // Guardamos supabase y user en locals para acceder desde cualquier página (.astro)
  context.locals.supabase = supabase;
  context.locals.user = user;

  const { pathname } = context.url;

  // 1. Proteger rutas privadas (dashboard)
  if (pathname.startsWith("/dashboard") && !user) {
    return context.redirect("/login");
  }

  // 2. Redirigir si ya está logeado e intenta ir a auth
  const isAuthRoute = pathname === "/login" || pathname === "/signup";
  if (isAuthRoute && user) {
    return context.redirect("/dashboard");
  }

  return next();
});
