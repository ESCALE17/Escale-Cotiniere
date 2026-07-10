import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/app/lib/supabaseAdmin";
import { isAuthenticated } from "@/app/lib/requireAuth";

// Colonnes complètes (avec le prix) : réservées à l'admin authentifié.
const COLUMNS_ADMIN =
  "id, categorie, nom, producteur, description, photo_url, prix_unitaire, ordre, actif, created_at";

/**
 * GET : liste les produits AVEC le prix. Réservé à l'admin connecté.
 * La page publique NE PASSE PAS par ici : elle lit directement via le
 * client public en ne sélectionnant que les colonnes sans prix.
 */
export async function GET(request: Request) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { data, error } = await supabaseAdmin
    .from("panier_produits")
    .select(COLUMNS_ADMIN)
    .order("categorie", { ascending: true })
    .order("ordre", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ produits: data ?? [] });
}

/**
 * POST : ajoute un produit.
 */
export async function POST(request: Request) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const body = await request.json();
  const { categorie, nom, producteur, description, photo_url, prix_unitaire, ordre, actif } = body;

  if (!categorie || !categorie.trim() || !nom || !nom.trim()) {
    return NextResponse.json({ error: "La catégorie et le nom sont obligatoires." }, { status: 400 });
  }

  if (prix_unitaire !== undefined && prix_unitaire !== "" && Number(prix_unitaire) < 0) {
    return NextResponse.json({ error: "Le prix ne peut pas être négatif." }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from("panier_produits")
    .insert({
      categorie: categorie.trim(),
      nom: nom.trim(),
      producteur: producteur || null,
      description: description || null,
      photo_url: photo_url || null,
      prix_unitaire: Number(prix_unitaire) || 0,
      ordre: Number(ordre) || 0,
      actif: actif === undefined ? true : !!actif,
    })
    .select(COLUMNS_ADMIN)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ produit: data });
}

/**
 * PUT : modifie un produit.
 */
export async function PUT(request: Request) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const body = await request.json();
  const { id, categorie, nom, producteur, description, photo_url, prix_unitaire, ordre, actif } = body;

  if (!id) {
    return NextResponse.json({ error: "id manquant" }, { status: 400 });
  }

  if (prix_unitaire !== undefined && prix_unitaire !== "" && Number(prix_unitaire) < 0) {
    return NextResponse.json({ error: "Le prix ne peut pas être négatif." }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from("panier_produits")
    .update({
      categorie: categorie?.trim(),
      nom: nom?.trim(),
      producteur: producteur ?? null,
      description: description ?? null,
      photo_url: photo_url ?? null,
      prix_unitaire: Number(prix_unitaire) || 0,
      ordre: Number(ordre) || 0,
      actif: actif === undefined ? true : !!actif,
    })
    .eq("id", id)
    .select(COLUMNS_ADMIN)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ produit: data });
}

/**
 * DELETE : supprime un produit par son id.
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

  const { error } = await supabaseAdmin.from("panier_produits").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
