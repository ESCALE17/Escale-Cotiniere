import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/app/lib/supabaseAdmin";
import { isAuthenticated } from "@/app/lib/requireAuth";

/**
 * GET : renvoie tous les paramètres. Réservé à l'admin connecté.
 * (Le tunnel visiteur utilise /api/public-settings, qui reste public.)
 */
export async function GET(request: Request) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { data, error } = await supabaseAdmin
    .from("app_settings")
    .select("key, value, label")
    .order("label", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ settings: data ?? [] });
}

/**
 * PATCH : met à jour la valeur d'un paramètre.
 */
export async function PATCH(request: Request) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const body = await request.json();
  const { key, value } = body;

  if (!key || value === undefined || value === null || isNaN(Number(value))) {
    return NextResponse.json(
      { error: "Clé ou valeur invalide" },
      { status: 400 }
    );
  }

  const { data, error } = await supabaseAdmin
    .from("app_settings")
    .update({ value: Number(value) })
    .eq("key", key)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ setting: data });
}