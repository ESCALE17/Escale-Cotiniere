import type { Metadata } from "next";
import Accueil from "./Accueil";

export const metadata: Metadata = {
  title: "Coup de cœur & recommandations — Escale à La Cotinière",
  description:
    "Nos adresses préférées autour du Logis du pêcheur : restaurants, visites, location de vélo et producteurs locaux.",
};

export default function CoupDeCoeurPage() {
  return <Accueil />;
}
