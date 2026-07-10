import type { Metadata } from "next";
import Contenu from "./Contenu";

export const metadata: Metadata = {
  title: "Qui sommes-nous — Escale à La Cotinière",
  description:
    "L'histoire du Logis du pêcheur à La Cotinière, île d'Oléron : notre rénovation, pièce par pièce, en avant/après.",
};

export default function QuiSommesNousPage() {
  return <Contenu />;
}
