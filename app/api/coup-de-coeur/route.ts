import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/app/lib/supabaseAdmin";
import { isAuthenticated } from "@/app/lib/requireAuth";

// Catégories autorisées pour une entrée "coup de cœur".
const CATEGORIES = ["restaurant", "velo", "visite", "producteur"];

const COLUMNS =
  "id, categorie, nom, description, avis, lien, code_promo, photo_url, ordre, actif, created_at";

/**
 * GET : liste toutes les entrées (admin connecté).
 * La page publique, elle, lira directement via le client public (RLS).
 */
export async function GET(request: Request) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { data, error } = await supabaseAdmin
    .from("coup_de_coeur")
    .select(COLUMNS)
    .order("ordre", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ entries: data ?? [] });
}

/**
 * POST : ajoute une entrée.
 */
export async function POST(request: Request) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const body = await request.json();
  const { categorie, nom, description, avis, lien, code_promo, photo_url, ordre, actif } = body;

  if (!categorie || !nom) {
    return NextResponse.json({ error: "La catégorie et le nom sont obligatoires." }, { status: 400 });
  }

  if (!CATEGORIES.includes(categorie)) {
    return NextResponse.json({ error: "Catégorie inconnue." }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from("coup_de_coeur")
    .insert({
      categorie,
      nom,
      description: description || null,
      avis: avis || null,
      lien: lien || null,
      code_promo: code_promo || null,
      photo_url: photo_url || null,
      ordre: Number(ordre) || 0,
      actif: actif === undefined ? true : !!actif,
    })
    .select(COLUMNS)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ entry: data });
}

/**
 * PUT : modifie une entrée existante (par son id).
 */
export async function PUT(request: Request) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const body = await request.json();
  const { id, categorie, nom, description, avis, lien, code_promo, photo_url, ordre, actif } = body;

  if (!id) {
    return NextResponse.json({ error: "id manquant" }, { status: 400 });
  }

  if (categorie && !CATEGORIES.includes(categorie)) {
    return NextResponse.json({ error: "Catégorie inconnue." }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from("coup_de_coeur")
    .update({
      categorie,
      nom,
      description: description ?? null,
      avis: avis ?? null,
      lien: lien ?? null,
      code_promo: code_promo ?? null,
      photo_url: photo_url ?? null,
      ordre: Number(ordre) || 0,
      actif: actif === undefined ? true : !!actif,
    })
    .eq("id", id)
    .select(COLUMNS)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ entry: data });
}

/**
 * DELETE : supprime une entrée par son id.
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

  const { error } = await supabaseAdmin.from("coup_de_coeur").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
