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
