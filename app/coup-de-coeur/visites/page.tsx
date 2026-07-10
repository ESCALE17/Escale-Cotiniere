import type { Metadata } from "next";
import { getRecos } from "../parts";
import { VisitesView } from "../views";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Visites — Coup de cœur | Escale à La Cotinière",
  description: "Les lieux à visiter autour de La Cotinière et sur l'île d'Oléron, dont l'île d'Aix.",
};

export default async function VisitesPage() {
  const recos = await getRecos("visite");
  return <VisitesView recos={recos} />;
}
