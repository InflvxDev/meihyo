import { defineMiddleware } from "astro:middleware";
import { createClient } from "./lib/supabase";
import { protectedRoutes } from "./lib/protectedRoutes";

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;

  // 1. Omitir archivos estáticos y assets de Astro para mejorar rendimiento
  if (
    pathname.startsWith("/_astro") || 
    pathname.includes(".") || 
    pathname.startsWith("/api")
  ) {
    return next();
  }

  // Inicializamos el cliente
  const supabase = createClient(context);

  // 2. Obtener el usuario y, MUY IMPORTANTE, refrescar la sesión si es necesario
  // Esto asegura que las cookies se mantengan actualizadas
  const { data: { user } } = await supabase.auth.getUser();

  context.locals.supabase = supabase;
  context.locals.user = user;

  // 3. Lógica de redirección optimizada
  // Consultamos la lista centralizada de rutas protegidas para mantener
  // el middleware flexible y fácil de extender en el futuro.
  const isProtectedRoute = protectedRoutes.some((prefix) =>
    pathname.startsWith(prefix)
  );
  const isAuthRoute = ["/login", "/signup"].includes(pathname);

  if (isProtectedRoute && !user) {
    return context.redirect("/login");
  }

  if (isAuthRoute && user) {
    return context.redirect("/dashboard");
  }

  return next();
});