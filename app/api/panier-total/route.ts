import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/app/lib/supabaseAdmin";

/**
 * Calcule le total d'un panier d'accueil SANS jamais exposer les prix.
 *
 * Entrée : { panier: "idA:2,idB:4" }  (code compact transporté dans l'URL)
 * Sortie : {
 *   total: number,                       // montant total du panier (secret côté serveur)
 *   lignes: { nom, producteur, quantite }[]  // pour l'affichage / le message d'accueil (SANS prix)
 * }
 *
 * Les prix (panier_produits.prix_unitaire) sont lus ici, côté serveur, via la
 * clé secrète. Ils ne quittent jamais le serveur : le navigateur ne reçoit que
 * le total et le récapitulatif des quantités.
 */
export async function POST(request: Request) {
  let panier = "";
  try {
    const body = await request.json();
    panier = typeof body.panier === "string" ? body.panier : "";
  } catch {
    panier = "";
  }

  // Panier vide → total 0, aucune ligne.
  if (!panier.trim()) {
    return NextResponse.json({ total: 0, lignes: [] });
  }

  // Décodage du code compact "id:qte,id:qte"
  const demande = new Map<string, number>();
  for (const part of panier.split(",")) {
    const [id, qteRaw] = part.split(":");
    const qte = Math.max(0, Math.floor(Number(qteRaw)));
    if (id && qte > 0) {
      demande.set(id, (demande.get(id) ?? 0) + qte);
    }
  }

  if (demande.size === 0) {
    return NextResponse.json({ total: 0, lignes: [] });
  }

  // Lecture des produits demandés (prix inclus, mais côté serveur uniquement).
  const ids = Array.from(demande.keys());
  const { data, error } = await supabaseAdmin
    .from("panier_produits")
    .select("id, nom, producteur, prix_unitaire, actif")
    .in("id", ids);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  let total = 0;
  const lignes: { nom: string; producteur: string | null; quantite: number }[] = [];

  for (const produit of data ?? []) {
    if (!produit.actif) continue; // on ignore un produit désactivé entre-temps
    const quantite = demande.get(produit.id) ?? 0;
    if (quantite <= 0) continue;
    total += Number(produit.prix_unitaire) * quantite;
    lignes.push({ nom: produit.nom, producteur: produit.producteur, quantite });
  }

  total = Math.round(total * 100) / 100;

  return NextResponse.json({ total, lignes });
}
