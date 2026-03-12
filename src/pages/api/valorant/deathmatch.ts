import type { APIRoute } from "astro";
import { createClient } from "../../../lib/supabase";
import { requireUser } from "../../../lib/auth";
import type { ValorantDeathmatchInsert, ValorantDeathmatchUpdate } from "../../../interfaces/valorant/ValorantDeathmatch";

// GET - Obtener partidas
export const GET: APIRoute = async ({ request, cookies }) => {
  try {
    const supabase = createClient({ request, cookies });
    const { user, errorResponse } = await requireUser(supabase);
    if (errorResponse) return errorResponse;

    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    const limit = parseInt(url.searchParams.get("limit") || "100", 10);
    const offset = parseInt(url.searchParams.get("offset") || "0", 10);

    let query = supabase
      .from("valorantDeathmatchs")
      .select("*", { count: "exact" })
      .eq("usuario", user.id)
      .order("created_at", { ascending: false });

    if (id) {
      query = query.eq("id", parseInt(id, 10));
      const { data, error } = await query.single();

      if (error || !data) {
        return new Response(
          JSON.stringify({ success: false, error: "Partida no encontrada" }),
          { status: 404, headers: { "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ success: true, data }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    const { data, error, count } = await query.range(offset, offset + limit - 1);

    if (error) {
      console.error("Error al leer deathmatchs:", error);
      return new Response(
        JSON.stringify({ success: false, error: "Error al obtener las partidas" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        data,
        pagination: {
          count,
          limit,
          offset,
          total: count || 0,
        },
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Error en GET deathmatch:", err);
    return new Response(
      JSON.stringify({ success: false, error: "Error interno del servidor" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

// POST - Crear partida
export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const supabase = createClient({ request, cookies });
    const { user, errorResponse } = await requireUser(supabase);
    if (errorResponse) return errorResponse;

    const body = await request.json();
    const { arma, asesinatos, muertes, objetivo, observaciones } = body;

    if (arma !== undefined && typeof arma !== "string") {
      return new Response(
        JSON.stringify({ success: false, error: "El arma debe ser texto" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (asesinatos !== undefined && typeof asesinatos !== "number") {
      return new Response(
        JSON.stringify({ success: false, error: "Los asesinatos deben ser un número" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (muertes !== undefined && typeof muertes !== "number") {
      return new Response(
        JSON.stringify({ success: false, error: "Las muertes deben ser un número" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const deathmatchData: ValorantDeathmatchInsert = {
      usuario: user.id,
      arma: arma || null,
      asesinatos: asesinatos || null,
      muertes: muertes || null,
      objetivo: objetivo || null,
      observaciones: observaciones || null,
    };

    const { data, error } = await supabase
      .from("valorantDeathmatchs")
      .insert([deathmatchData])
      .select()
      .single();

    if (error) {
      console.error("Error al crear deathmatch:", error);
      return new Response(
        JSON.stringify({ success: false, error: "Error al crear la partida" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, data }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Error en POST deathmatch:", err);
    return new Response(
      JSON.stringify({ success: false, error: "Error interno del servidor" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

// PUT - Actualizar partida
export const PUT: APIRoute = async ({ request, cookies }) => {
  try {
    const supabase = createClient({ request, cookies });
    const { user, errorResponse } = await requireUser(supabase);
    if (errorResponse) return errorResponse;

    const body = await request.json();
    const { id, arma, asesinatos, muertes, objetivo, observaciones } = body;

    if (!id) {
      return new Response(
        JSON.stringify({ success: false, error: "El ID de la partida es requerido" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (arma !== undefined && typeof arma !== "string") {
      return new Response(
        JSON.stringify({ success: false, error: "El arma debe ser texto" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (asesinatos !== undefined && typeof asesinatos !== "number") {
      return new Response(
        JSON.stringify({ success: false, error: "Los asesinatos deben ser un número" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (muertes !== undefined && typeof muertes !== "number") {
      return new Response(
        JSON.stringify({ success: false, error: "Las muertes deben ser un número" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const { data: existingData, error: checkError } = await supabase
      .from("valorantDeathmatchs")
      .select("id, usuario")
      .eq("id", id)
      .single();

    if (checkError || !existingData) {
      return new Response(
        JSON.stringify({ success: false, error: "Partida no encontrada" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    if (existingData.usuario !== user.id) {
      return new Response(
        JSON.stringify({ success: false, error: "No tienes permiso para actualizar esta partida" }),
        { status: 403, headers: { "Content-Type": "application/json" } }
      );
    }

    const updateData: ValorantDeathmatchUpdate = {};
    if (arma !== undefined) updateData.arma = arma;
    if (asesinatos !== undefined) updateData.asesinatos = asesinatos;
    if (muertes !== undefined) updateData.muertes = muertes;
    if (objetivo !== undefined) updateData.objetivo = objetivo;
    if (observaciones !== undefined) updateData.observaciones = observaciones;

    if (Object.keys(updateData).length === 0) {
      return new Response(
        JSON.stringify({ success: false, error: "No hay campos para actualizar" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const { data, error } = await supabase
      .from("valorantDeathmatchs")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error al actualizar deathmatch:", error);
      return new Response(
        JSON.stringify({ success: false, error: "Error al actualizar la partida" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, data }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Error en PUT deathmatch:", err);
    return new Response(
      JSON.stringify({ success: false, error: "Error interno del servidor" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

// DELETE - Eliminar partida
export const DELETE: APIRoute = async ({ request, cookies }) => {
  try {
    const supabase = createClient({ request, cookies });
    const { user, errorResponse } = await requireUser(supabase);
    if (errorResponse) return errorResponse;

    const body = await request.json();
    const { id } = body;

    if (!id) {
      return new Response(
        JSON.stringify({ success: false, error: "El ID de la partida es requerido" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const { data: existingData, error: checkError } = await supabase
      .from("valorantDeathmatchs")
      .select("id, usuario")
      .eq("id", id)
      .single();

    if (checkError || !existingData) {
      return new Response(
        JSON.stringify({ success: false, error: "Partida no encontrada" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    if (existingData.usuario !== user.id) {
      return new Response(
        JSON.stringify({ success: false, error: "No tienes permiso para eliminar esta partida" }),
        { status: 403, headers: { "Content-Type": "application/json" } }
      );
    }

    const { error } = await supabase
      .from("valorantDeathmatchs")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error al eliminar deathmatch:", error);
      return new Response(
        JSON.stringify({ success: false, error: "Error al eliminar la partida" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: "Partida eliminada correctamente" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Error en DELETE deathmatch:", err);
    return new Response(
      JSON.stringify({ success: false, error: "Error interno del servidor" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
