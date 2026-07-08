import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/app/lib/supabaseAdmin";
import { isAuthenticated } from "@/app/lib/requireAuth";

const JOUR_INDEX: Record<string, number> = {
  dimanche: 0,
  lundi: 1,
  mardi: 2,
  mercredi: 3,
  jeudi: 4,
  vendredi: 5,
  samedi: 6,
};

/**
 * Vérifie la cohérence entre le minimum de nuits et les jours d'arrivée/départ.
 * Retourne un message d'erreur si incohérent, sinon null.
 *
 * Règle : si arrivée ET départ sont des jours fixes, la durée d'un séjour
 * est forcément "durée de base entre les 2 jours + un multiple de 7".
 * Le minimum de nuits doit donc correspondre à une de ces valeurs atteignables.
 */
function verifierCoherence(
  minNights: number,
  arrivalDay: string,
  departureDay: string
): string | null {
  // Si l'un des deux jours est "tous", pas de contrainte : minimum libre.
  if (arrivalDay === "tous" || departureDay === "tous") {
    return null;
  }

  const iArr = JOUR_INDEX[arrivalDay];
  const iDep = JOUR_INDEX[departureDay];

  if (iArr === undefined || iDep === undefined) {
    return null;
  }

  // Durée de base entre le jour d'arrivée et le jour de départ (en nuits, 1 à 7).
  let base = (iDep - iArr + 7) % 7;
  if (base === 0) base = 7; // samedi → samedi = 7 nuits, pas 0

  // Le minimum doit valoir base, base+7, base+14, ... 
  // Donc (minNights - base) doit être un multiple de 7, et minNights >= base.
  if (minNights < base || (minNights - base) % 7 !== 0) {
    return `Jour arrivée/départ ou nombre de nuits mini incorrect : avec arrivée ${arrivalDay} et départ ${departureDay}, les durées possibles sont ${base}, ${base + 7}, ${base + 14} nuits… (pas ${minNights}).`;
  }

  return null;
}

/**
 * GET : liste les périodes tarifaires. Réservé à l'admin connecté.
 */
export async function GET(request: Request) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const villa = searchParams.get("villa");

  let query = supabaseAdmin
    .from("pricing_periods")
    .select("id, villa_slug, start_date, end_date, price_per_night, weekly_discount_percent, label, min_nights, arrival_day, departure_day")
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
    min_nights,
    arrival_day,
    departure_day,
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

  const minN = Number(min_nights) || 1;
  const arrD = arrival_day || "tous";
  const depD = departure_day || "tous";

  // Vérification de cohérence jours / minimum de nuits
  const incoherence = verifierCoherence(minN, arrD, depD);
  if (incoherence) {
    return NextResponse.json({ error: incoherence }, { status: 400 });
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
      min_nights: minN,
      arrival_day: arrD,
      departure_day: depD,
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