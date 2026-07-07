import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/app/lib/supabaseAdmin";

/**
 * Renvoie la liste des périodes bloquées pour une villa donnée.
 * Appelé par le calendrier de réservation (BookingBox).
 * Exemple : /api/availability?villa=logis
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const villa = searchParams.get("villa");

  if (!villa) {
    return NextResponse.json(
      { error: "Paramètre 'villa' manquant" },
      { status: 400 }
    );
  }

  const { data, error } = await supabaseAdmin
    .from("blocked_dates")
    .select("start_date, end_date, reason")
    .eq("villa_slug", villa)
    .order("start_date", { ascending: true });

  if (error) {
    console.error("Erreur lecture blocked_dates:", error.message);
    return NextResponse.json(
      { error: "Erreur lors de la lecture des disponibilités" },
      { status: 500 }
    );
  }

  return NextResponse.json({ blocked: data ?? [] });
}