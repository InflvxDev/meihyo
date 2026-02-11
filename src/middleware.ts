import { defineMiddleware } from "astro:middleware";
import { createClient } from "./lib/supabase";

export const onRequest = defineMiddleware(async (context, next) => {
  // Inicializamos el cliente de Supabase
  const supabase = createClient(context);

  // Obtenemos la sesión actual
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Guardamos supabase y session en locals para acceder desde cualquier página (.astro)
  context.locals.supabase = supabase;
  context.locals.session = session;

  const { pathname } = context.url;

  // 1. Proteger rutas privadas (dashboard)
  if (pathname.startsWith("/dashboard") && !session) {
    return context.redirect("/login");
  }

  // 2. Redirigir si ya está logeado e intenta ir a auth
  const isAuthRoute = pathname === "/login" || pathname === "/signup";
  if (isAuthRoute && session) {
    return context.redirect("/dashboard");
  }

  return next();
});
