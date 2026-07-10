"use client";
import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { buildBookingQuery, readBookingQuery } from "@/app/lib/bookingQuery";
import { useLanguage } from "@/app/i18n/LanguageContext";
import PanierSelector from "@/app/synthese/PanierSelector";
export const dynamic = "force-dynamic";

type Loc = "fr" | "en" | "de" | "es";

const TXT: Record<Loc, { titre: string; intro: string; continuer: string; sans: string }> = {
  fr: {
    titre: "Votre panier d'accueil",
    intro: "Choisissez ce que vous souhaitez trouver dans la maison a votre arrivee. C'est entierement facultatif : vous pouvez continuer sans rien ajouter.",
    continuer: "Continuer",
    sans: "Continuer sans panier",
  },
  en: {
    titre: "Your welcome basket",
    intro: "Choose what you would like to find in the house when you arrive. It is entirely optional: you can continue without adding anything.",
    continuer: "Continue",
    sans: "Continue without a basket",
  },
  de: {
    titre: "Ihr Willkommenskorb",
    intro: "Waehlen Sie, was Sie bei Ihrer Ankunft im Haus vorfinden moechten. Es ist voellig freiwillig: Sie koennen ohne Auswahl fortfahren.",
    continuer: "Weiter",
    sans: "Ohne Korb fortfahren",
  },
  es: {
    titre: "Su cesta de bienvenida",
    intro: "Elija lo que desea encontrar en la casa a su llegada. Es totalmente opcional: puede continuar sin anadir nada.",
    continuer: "Continuar",
    sans: "Continuar sin cesta",
  },
};

function PanierPageContent() {
  const searchParams = useSearchParams();
  const booking = readBookingQuery(searchParams);
  const { locale } = useLanguage();
  const loc: Loc = (["fr", "en", "de", "es"].indexOf(locale as string) >= 0 ? (locale as Loc) : "fr");
  const txt = TXT[loc];
  const [panierCode, setPanierCode] = useState(booking.panier);

  const withPanier = buildBookingQuery({ ...booking, panier: panierCode });
  const withoutPanier = buildBookingQuery({ ...booking, panier: "" });

  return (
    <main className="min-h-screen bg-[#f7f1e8] px-8 pt-40 pb-20">
      <section className="mx-auto max-w-3xl">
        <h1 className="mb-4 text-5xl font-bold text-[#082f3a]">{txt.titre}</h1>
        <p className="mb-10 text-lg text-[#082f3a]/70">{txt.intro}</p>

        <div className="rounded-3xl bg-white p-8 shadow-xl">
          <PanierSelector
            initialCode={booking.panier}
            onChange={function (code) { setPanierCode(code); }}
          />

          <Link
            href={"/devis?" + withPanier}
            className="mt-8 block w-full rounded-full bg-[#082f3a] px-8 py-4 text-center font-semibold text-white transition hover:bg-[#0d4757]"
          >
            {txt.continuer}
          </Link>

          <Link
            href={"/devis?" + withoutPanier}
            className="mt-4 block text-center text-sm text-[#082f3a]/60 hover:underline"
          >
            {txt.sans}
          </Link>
        </div>
      </section>
    </main>
  );
}

export default function PanierPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f7f1e8]" />}>
      <PanierPageContent />
    </Suspense>
  );
}
