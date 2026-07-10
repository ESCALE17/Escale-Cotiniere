import type { Metadata } from "next";
import { getProduits } from "../parts";
import { ProducteursView } from "../views";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Producteurs — Coup de cœur | Escale à La Cotinière",
  description:
    "Nos producteurs sélectionnés : pineau, vin de Bordeaux, champagne, cognac et gourmandises locales.",
};

export default async function ProducteursPage() {
  const produits = await getProduits();
  return <ProducteursView produits={produits} />;
}
