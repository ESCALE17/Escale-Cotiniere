import { supabase } from "@/app/lib/supabase";

export type Reco = {
  id: string;
  nom: string;
  description: string | null;
  avis: string | null;
  lien: string | null;
  code_promo: string | null;
  photo_url: string | null;
};

export type Produit = {
  id: string;
  categorie: string;
  nom: string;
  producteur: string | null;
  description: string | null;
  photo_url: string | null;
};

// Recommandations d'une catégorie (restaurant / visite / velo), actives uniquement.
export async function getRecos(categorie: string): Promise<Reco[]> {
  const { data } = await supabase
    .from("coup_de_coeur")
    .select("id, nom, description, avis, lien, code_promo, photo_url")
    .eq("categorie", categorie)
    .eq("actif", true)
    .order("ordre", { ascending: true })
    .order("created_at", { ascending: true });
  return (data as Reco[]) ?? [];
}

// Produits du panier — SANS le prix (jamais lu côté public).
export async function getProduits(): Promise<Produit[]> {
  const { data } = await supabase
    .from("panier_produits")
    .select("id, categorie, nom, producteur, description, photo_url")
    .eq("actif", true)
    .order("categorie", { ascending: true })
    .order("ordre", { ascending: true })
    .order("created_at", { ascending: true });
  return (data as Produit[]) ?? [];
}
