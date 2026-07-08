import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/app/lib/supabaseAdmin";

/**
 * Route PUBLIQUE : renvoie les périodes tarifaires d'une villa.
 * Utilisée par le tunnel visiteur (calendrier, devis…), sans authentification.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const villa = searchParams.get("villa");

  if (!villa) {
    return NextResponse.json({ periods: [] });
  }

  const { data, error } = await supabaseAdmin
    .from("pricing_periods")
    .select("start_date, end_date, price_per_night, weekly_discount_percent, min_nights, arrival_day, departure_day")
    .eq("villa_slug", villa)
    .order("start_date", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ periods: data ?? [] });
}