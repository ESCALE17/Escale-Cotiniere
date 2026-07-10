import type { Metadata } from "next";
import { getRecos } from "../parts";
import { VeloView } from "../views";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Location de vélo — Coup de cœur | Escale à La Cotinière",
  description: "Notre loueur de vélo partenaire à La Cotinière et votre code de réduction.",
};

export default async function VeloPage() {
  const recos = await getRecos("velo");
  return <VeloView recos={recos} />;
}
