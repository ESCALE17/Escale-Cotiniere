import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/app/lib/supabaseAdmin";
import { isAuthenticated } from "@/app/lib/requireAuth";

/**
 * GET : renvoie les liens iCal d'une villa. Réservé à l'admin.
 * Usage : /api/villa-ical?villa=logis
 */
export async function GET(request: Request) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const villa = searchParams.get("villa");

  if (!villa) {
    return NextResponse.json({ error: "villa manquante" }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from("villas_ical")
    .select("villa_slug, ical_airbnb, ical_booking, ical_abritel")
    .eq("villa_slug", villa)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    ical: data ?? {
      villa_slug: villa,
      ical_airbnb: "",
      ical_booking: "",
      ical_abritel: "",
    },
  });
}

/**
 * PUT : enregistre (ou crée) les liens iCal d'une villa. Réservé à l'admin.
 */
export async function PUT(request: Request) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const body = await request.json();
  const { villa_slug, ical_airbnb, ical_booking, ical_abritel } = body;

  if (!villa_slug) {
    return NextResponse.json({ error: "villa manquante" }, { status: 400 });
  }

  const { error } = await supabaseAdmin
    .from("villas_ical")
    .upsert(
      {
        villa_slug,
        ical_airbnb: ical_airbnb || null,
        ical_booking: ical_booking || null,
        ical_abritel: ical_abritel || null,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "villa_slug" }
    );

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}