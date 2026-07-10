import type { Metadata } from "next";
import { getRecos } from "../parts";
import { RestaurantsView } from "../views";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Restaurants — Coup de cœur | Escale à La Cotinière",
  description: "Nos restaurants préférés autour de La Cotinière, île d'Oléron.",
};

export default async function RestaurantsPage() {
  const recos = await getRecos("restaurant");
  return <RestaurantsView recos={recos} />;
}
