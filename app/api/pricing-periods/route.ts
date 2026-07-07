import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/app/lib/supabaseAdmin";
import { isAuthenticated } from "@/app/lib/requireAuth";

/**
 * GET : liste les périodes tarifaires. Réservé à l'admin connecté.
 * (Le tunnel visiteur utilise /api/public-pricing-periods, qui reste public.)
 */
export async function GET(request: Request) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const villa = searchParams.get("villa");

  let query = supabaseAdmin
    .from("pricing_periods")
    .select("id, villa_slug, start_date, end_date, price_per_night, weekly_discount_percent, label")
    .order("start_date", { ascending: true });

  if (villa) {
    query = query.eq("villa_slug", villa);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ periods: data ?? [] });
}

/**
 * POST : ajoute une période tarifaire.
 */
export async function POST(request: Request) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const body = await request.json();
  const {
    villa_slug,
    start_date,
    end_date,
    price_per_night,
    weekly_discount_percent,
    label,
  } = body;

  if (!villa_slug || !start_date || !end_date || price_per_night === undefined) {
    return NextResponse.json(
      { error: "Champs manquants (villa, dates, prix)" },
      { status: 400 }
    );
  }

  if (start_date > end_date) {
    return NextResponse.json(
      { error: "La date de fin doit être après la date de début" },
      { status: 400 }
    );
  }

  if (Number(price_per_night) <= 0) {
    return NextResponse.json(
      { error: "Le prix par nuit doit être supérieur à 0" },
      { status: 400 }
    );
  }

  const { data: existing } = await supabaseAdmin
    .from("pricing_periods")
    .select("start_date, end_date")
    .eq("villa_slug", villa_slug);

  const overlap = (existing ?? []).some(
    (p) => start_date <= p.end_date && end_date >= p.start_date
  );

  if (overlap) {
    return NextResponse.json(
      { error: "Cette période chevauche une période déjà définie pour cette villa." },
      { status: 400 }
    );
  }

  const { data, error } = await supabaseAdmin
    .from("pricing_periods")
    .insert({
      villa_slug,
      start_date,
      end_date,
      price_per_night: Number(price_per_night),
      weekly_discount_percent: Number(weekly_discount_percent) || 0,
      label: label || null,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ period: data });
}

/**
 * DELETE : supprime une période par son id.
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
    .from("pricing_periods")
    .delete()
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}