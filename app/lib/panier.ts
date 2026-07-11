import { supabaseAdmin } from "@/app/lib/supabaseAdmin";

/**
 * Calcule le montant total d'un panier d'accueil à partir de son code compact
 * ("idA:2,idB:4"), en lisant les prix CÔTÉ SERVEUR uniquement (jamais exposés).
 * Renvoie 0 si le panier est vide ou invalide.
 */
export async function computePanierTotal(panier: string | null | undefined): Promise<number> {
  if (!panier || !panier.trim()) return 0;

  const demande = new Map<string, number>();
  for (const part of panier.split(",")) {
    const [id, qteRaw] = part.split(":");
    const qte = Math.max(0, Math.floor(Number(qteRaw)));
    if (id && qte > 0) demande.set(id, (demande.get(id) ?? 0) + qte);
  }
  if (demande.size === 0) return 0;

  const { data, error } = await supabaseAdmin
    .from("panier_produits")
    .select("id, prix_unitaire, actif")
    .in("id", Array.from(demande.keys()));

  if (error || !data) return 0;

  let total = 0;
  for (const produit of data) {
    if (!produit.actif) continue;
    const quantite = demande.get(produit.id) ?? 0;
    total += Number(produit.prix_unitaire) * quantite;
  }
  return Math.round(total * 100) / 100;
}

export type PanierLigne = { nom: string; quantite: number };

/**
 * Renvoie la liste des produits d'un panier (nom + quantité), SANS prix.
 * Sert à afficher le "message d'accueil" sur la confirmation et dans l'email.
 * Renvoie [] si le panier est vide ou invalide.
 */
export async function computePanierLignes(panier: string | null | undefined): Promise<PanierLigne[]> {
  if (!panier || !panier.trim()) return [];

  const demande = new Map<string, number>();
  for (const part of panier.split(",")) {
    const [id, qteRaw] = part.split(":");
    const qte = Math.max(0, Math.floor(Number(qteRaw)));
    if (id && qte > 0) demande.set(id, (demande.get(id) ?? 0) + qte);
  }
  if (demande.size === 0) return [];

  const { data, error } = await supabaseAdmin
    .from("panier_produits")
    .select("id, nom, actif")
    .in("id", Array.from(demande.keys()));

  if (error || !data) return [];

  const lignes: PanierLigne[] = [];
  for (const produit of data) {
    if (!produit.actif) continue;
    const quantite = demande.get(produit.id) ?? 0;
    if (quantite > 0) lignes.push({ nom: produit.nom, quantite });
  }
  return lignes;
}
