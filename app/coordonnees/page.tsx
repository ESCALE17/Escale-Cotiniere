"use client";

import Link from "next/link";

export default function CoordonneesPage() {
  return (
    <main className="min-h-screen bg-[#f7f1e8] px-8 py-20">
      <section className="mx-auto max-w-5xl">

        <h1 className="mb-10 text-5xl font-bold text-[#082f3a]">
          Vos coordonnées
        </h1>

        <div className="rounded-3xl bg-white p-10 shadow-xl">

          <div className="grid gap-6 md:grid-cols-2">

            <input
              className="rounded-xl border p-4"
              placeholder="Nom *"
            />

            <input
              className="rounded-xl border p-4"
              placeholder="Prénom *"
            />

            <input
              className="rounded-xl border p-4 md:col-span-2"
              placeholder="Adresse e-mail *"
            />

            <input
              className="rounded-xl border p-4"
              placeholder="Téléphone portable *"
            />

            <input
              className="rounded-xl border p-4"
              placeholder="Téléphone fixe (facultatif)"
            />

            <input
              className="rounded-xl border p-4 md:col-span-2"
              placeholder="Adresse"
            />

            <input
              className="rounded-xl border p-4"
              placeholder="Code postal"
            />

            <input
              className="rounded-xl border p-4"
              placeholder="Ville"
            />

            <input
              className="rounded-xl border p-4 md:col-span-2"
              placeholder="Pays"
            />

          </div>

          <div className="mt-10 rounded-2xl bg-[#f7f1e8] p-6">

            <label className="flex items-start gap-3">

              <input
                type="checkbox"
                className="mt-1"
              />

              <span>
                Je reconnais avoir pris connaissance des conditions générales de location et je les accepte.
              </span>

            </label>

          </div>

          <Link
            href="/synthese"
            className="mt-10 block w-full rounded-full bg-[#082f3a] py-5 text-center text-lg font-semibold text-white transition hover:bg-[#0d4757]"
          >
            Voir la synthèse de ma réservation
          </Link>

        </div>

      </section>
    </main>
  );
}