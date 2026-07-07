import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/app/lib/supabaseAdmin";

/**
 * Route publique : renvoie les périodes tarifaires d'une villa.
 * Utilisée par les pages client du tunnel (devis, synthèse, paiement).
 * Exemple : /api/public-pricing-periods?villa=logis
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const villa = searchParams.get("villa");

  if (!villa) {
    return NextResponse.json({ periods: [] });
  }

  const { data, error } = await supabaseAdmin
    .from("pricing_periods")
    .select("start_date, end_date, price_per_night, weekly_discount_percent")
    .eq("villa_slug", villa)
    .order("start_date", { ascending: true });

  if (error) {
    return NextResponse.json({ periods: [] });
  }

  return NextResponse.json({ periods: data ?? [] });
}