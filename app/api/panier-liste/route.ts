import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/app/lib/supabaseAdmin";

/**
 * Liste publique des produits du panier d'accueil, pour la sélection par le
 * client. Ne renvoie JAMAIS le prix : on sélectionne uniquement les colonnes
 * d'affichage. Lecture via la clé serveur pour ne pas dépendre des règles RLS.
 */
export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("panier_produits")
    .select("id, categorie, nom, producteur, description, photo_url")
    .eq("actif", true)
    .order("categorie", { ascending: true })
    .order("ordre", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ produits: data ?? [] });
}
