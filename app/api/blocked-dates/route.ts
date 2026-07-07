import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/app/lib/supabaseAdmin";
import { isAuthenticated } from "@/app/lib/requireAuth";

/**
 * GET : liste les périodes bloquées (toutes villas, ou ?villa=slug).
 * Réservé à l'admin connecté (le tunnel visiteur utilise /api/availability).
 */
export async function GET(request: Request) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const villa = searchParams.get("villa");

  let query = supabaseAdmin
    .from("blocked_dates")
    .select("id, villa_slug, start_date, end_date, reason, source")
    .order("start_date", { ascending: true });

  if (villa) {
    query = query.eq("villa_slug", villa);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ blocked: data ?? [] });
}

/**
 * POST : ajoute une période bloquée.
 */
export async function POST(request: Request) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const body = await request.json();
  const { villa_slug, start_date, end_date, reason } = body;

  if (!villa_slug || !start_date || !end_date) {
    return NextResponse.json(
      { error: "Champs manquants (villa, dates)" },
      { status: 400 }
    );
  }

  if (start_date >= end_date) {
    return NextResponse.json(
      { error: "La date de fin doit être après la date de début" },
      { status: 400 }
    );
  }

  const { data, error } = await supabaseAdmin
    .from("blocked_dates")
    .insert({
      villa_slug,
      start_date,
      end_date,
      reason: reason || null,
      source: "manual",
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ blocked: data });
}

/**
 * DELETE : supprime une période bloquée par son id.
 */
export async function DELETE(request: Request) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const body = await request.json();
  const { id } = body;

  if (!id) {
    return NextResponse.json({ error: "id manquant" }, { status: 400 });
  }

  const { error } = await supabaseAdmin
    .from("blocked_dates")
    .delete()
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}