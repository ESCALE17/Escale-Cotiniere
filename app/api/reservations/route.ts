import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/app/lib/supabaseAdmin";
import { isAuthenticated } from "@/app/lib/requireAuth";

/**
 * GET : liste toutes les réservations. Réservé à l'admin connecté.
 */
export async function GET(request: Request) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { data, error } = await supabaseAdmin
    .from("reservations")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ reservations: data ?? [] });
}

/**
 * PATCH : met à jour le statut de règlement et/ou les notes.
 */
export async function PATCH(request: Request) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const body = await request.json();
  const { id, payment_status, notes } = body;

  if (!id) {
    return NextResponse.json({ error: "id manquant" }, { status: 400 });
  }

  const updates: Record<string, unknown> = {};
  if (payment_status !== undefined) updates.payment_status = payment_status;
  if (notes !== undefined) updates.notes = notes;

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: "Rien à mettre à jour" }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from("reservations")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ reservation: data });
}

/**
 * POST : annuler ou réactiver une réservation.
 */
export async function POST(request: Request) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const body = await request.json();
  const { id, action } = body;

  if (!id || !action) {
    return NextResponse.json({ error: "id ou action manquant" }, { status: 400 });
  }

  const { data: reservation, error: fetchError } = await supabaseAdmin
    .from("reservations")
    .select("*")
    .eq("id", id)
    .single();

  if (fetchError || !reservation) {
    return NextResponse.json({ error: "Réservation introuvable" }, { status: 404 });
  }

  if (action === "cancel") {
    await supabaseAdmin
      .from("reservations")
      .update({ status: "cancelled" })
      .eq("id", id);

    await supabaseAdmin
      .from("blocked_dates")
      .delete()
      .eq("villa_slug", reservation.villa_slug)
      .eq("start_date", reservation.arrival)
      .eq("end_date", reservation.departure)
      .eq("source", "reservation");

    return NextResponse.json({ success: true, status: "cancelled" });
  }

  if (action === "reactivate") {
    await supabaseAdmin
      .from("reservations")
      .update({ status: "active" })
      .eq("id", id);

    await supabaseAdmin.from("blocked_dates").insert({
      villa_slug: reservation.villa_slug,
      start_date: reservation.arrival,
      end_date: reservation.departure,
      reason: `Réservation directe – ${reservation.client_name ?? ""}`,
      source: "reservation",
    });

    return NextResponse.json({ success: true, status: "active" });
  }

  return NextResponse.json({ error: "Action inconnue" }, { status: 400 });
}