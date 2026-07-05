import Link from "next/link";

export default function SynthesePage() {
  return (
    <main className="min-h-screen bg-[#f7f1e8] px-8 py-20">
      <section className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-5xl font-bold text-[#082f3a]">
          Synthèse de votre réservation
        </h1>

        <div className="rounded-3xl bg-white p-8 shadow-xl">
          <div className="space-y-4 text-slate-700">
            <p><strong>Demeure :</strong> Le Logis du Pêcheur</p>
            <p><strong>Séjour :</strong> dates sélectionnées</p>
            <p><strong>Voyageurs :</strong> adultes, enfants, bébés</p>
            <p><strong>Total :</strong> montant du devis</p>
            <p><strong>Acompte à régler :</strong> 40 %</p>
            <p><strong>Solde :</strong> à J-30</p>
          </div>

          <div className="mt-8 rounded-2xl bg-[#f7f1e8] p-6 text-sm text-slate-700">
            En cliquant sur le bouton ci-dessous, vous serez dirigé vers le
            paiement sécurisé de l’acompte.
          </div>

          <Link
            href="/paiement"
            className="mt-8 block w-full rounded-full bg-[#082f3a] px-8 py-4 text-center text-white"
          >
            Aller vers le paiement sécurisé
          </Link>
        </div>
      </section>
    </main>
  );
}